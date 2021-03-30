let minWeight = 0;

window.onloadFuncs.push(() => {
    minWeight = 0;
    create_graph('graphs/PunggolBTO.json','#graph1')
    create_graph('graphs/PunggolResidential.json','#graph2')
    create_graph('graphs/JurongBTO.json','#graph3', 600, 480)
    create_graph('graphs/JurongResidential.json','#graph4', 600, 480)
    create_graph('graphs/ToaPayohBTO.json','#graph5', 500, 400)
    create_graph('graphs/ToaPayohResidential.json','#graph6', 500, 400)
})

let updateGraphs = () => {
    graphs.forEach(graphObject => {
        let data_links = graphObject.data.links.filter(link => link.Weight >= minWeight);

        graphObject.simulation  
            .force('link').links(data_links);

        graphObject.svg.selectAll('path')
            .attr('opacity', d => d.Weight >= minWeight ? 1 : 0)
        graphObject.svg.select('marker').selectAll('marker')
            .attr('opacity', d => d.Weight >= minWeight ? 1 : 0)
        });
}

let graphs = [];

let drag = simulation => {
    let dragstarted = event => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }
    let dragged = event => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }
    let dragended = event => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

let linkArc = d => {
    let r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
        M${d.source.x},${d.source.y}
        A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
    }

const sizeLinearScale = d3.scaleLinear()
    .domain([0,150])
    .range([2,50]);

const actionColorScale = d3.scaleOrdinal()
    .domain(['invite_member','text_reply','remove_member'])
    .range(['mediumaquamarine','dodgerblue','tomato']);

const lineWeightLinearScale = d3.scaleLinear()
    .domain([0,100])
    .range([1,10]);

const markerWeightLinearScale = d3.scaleLinear()
    .domain([0,100])
    .range([3,4]);

let create_graph = (url_path, svg_id, width=1000, height=800) => {
    d3.json(url_path).then(data => {

        let data_nodes = data.nodes;
        let data_links = data.links.filter(link => link.Weight > minWeight);

        let svg = d3.select(svg_id)
            .attr("viewBox", [0, 0, width, height]);

        let simulation = d3.forceSimulation(data_nodes)
            .force('link', d3.forceLink(data_links).id(d => d.id))
            .force('charge', d3.forceManyBody().strength(-40))
            .force("collide", d3.forceCollide(10))
            .force("radial", d3.forceRadial(20,width/2,height/2))
            .force("y", d3.forceY().y(height/2).strength(0.05))

        const nodeColorScale = d3.scaleOrdinal(d3.schemeCategory10);

        let marker = svg.append("g")
            .selectAll("marker")
            .data(Array.from(new Set(data_links.map(d => ({action: d.action, Weight: d.Weight})))))
            .enter()
            .append("marker")
                .attr("id", d => `arrow-${d.action}`)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 15)
                .attr("refY", -0.5)
                .attr("markerWidth", d => markerWeightLinearScale(d.Weight))
                .attr("markerHeight", d => markerWeightLinearScale(d.Weight))
                .attr("orient", "auto")
            .append("path")
                .attr("fill", d => actionColorScale(d.action))
                .attr("d", "M0,-5L10,0L0,5");

        let link = svg.append('g')
            .selectAll('path')
            .data(data_links)
            .enter()
            .append('path')
                .attr('stroke', d => actionColorScale(d.action))
                .attr('stroke-opacity', 0.3)
                .attr('stroke-width', d => lineWeightLinearScale(d.Weight))
                .attr('fill','none')
                .attr("marker-end", d => `url(${new URL(`#arrow-${d.action}`, location)})`);

        link.append("title")
            .text(d => 'action: ' + d.action + ', no. of interactions: ' + d.Weight);

        let node = svg.append('g')
                .attr("fill", "currentColor")
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
            .selectAll('g')
            .data(data_nodes)
            .enter()
            .append('g')
            .call(drag(simulation));
        
        node.append('circle')
            .attr('r', d => sizeLinearScale(d.outdegree))
            .attr('fill', d => nodeColorScale(d.modularity_class))
            .attr('stroke','black')
            .attr('stroke-width', 1.5);

        node.append("text")
            .attr("x", 4)
            .attr("y", "0.31em")
            .attr('font-size', 9)
            .text(d => d.id)
            .attr("color", "black")

        node.append("title")
            .text(d => 'user: ' + d.id + ', out-degree: ' + d.outdegree);
        
        simulation.on('tick', () => {
            link.attr("d", linkArc);
            node.attr("transform", d => `translate(${d.x},${d.y})`);
        })

        graphs.push({
            data: data,
            svg: svg,
            simulation: simulation,
        })
    });
}