let minWeight = 0;
let nodeSize = '';
let selectedGraph = '';

let graph_data = {
    punggolBTO: {
        width: 1000,
        height: 800,
    },
    PunggolResidential: {
        width: 1000,
        height: 800,
    },
    JurongBTO: {
        width: 600,
        height: 480,
    },
    JurongResidential: {
        width: 600,
        height: 480,
    },
    ToaPayohBTO: {
        width: 500,
        height: 400,
    },
    ToaPayohResidential: {
        width: 500,
        height: 400,
    },
};

window.onloadFuncs.push(() => {
    minWeight = 0;
    nodeSize = 'outdegree';
    Promise.all([d3.json('graphs/PunggolBTO.json'),
                 d3.json('graphs/PunggolResidential.json'),
                 d3.json('graphs/JurongBTO.json'),
                 d3.json('graphs/JurongResidential.json'),
                 d3.json('graphs/ToaPayohBTO.json'),
                 d3.json('graphs/ToaPayohResidential.json')])
    .then(data => {
        graph_data.punggolBTO.data = data[0];
        graph_data.PunggolResidential.data = data[1];
        graph_data.JurongBTO.data = data[2];
        graph_data.JurongResidential.data = data[3];
        graph_data.ToaPayohBTO.data = data[4];
        graph_data.ToaPayohResidential.data = data[5];
    }).then(()=> {
        selectedGraph = d3.select('#inlineFormSelectPref').node().value;
        create_graph(selectedGraph);
    })
    // create_graph('graphs/PunggolBTO.json','#graph1')
    // create_graph('graphs/PunggolResidential.json','#graph2')
    // create_graph('graphs/JurongBTO.json','#graph3', 600, 480)
    // create_graph('graphs/JurongResidential.json','#graph4', 600, 480)
    // create_graph('graphs/ToaPayohBTO.json','#graph5', 500, 400)
    // create_graph('graphs/ToaPayohResidential.json','#graph6', 500, 400)
})


let updateGraphs = () => {
    let data_links = currentGraph.data.links.filter(link => link.Weight >= minWeight);
    
    currentGraph.simulation  
        .force('link').links(data_links);

    currentGraph.svg.selectAll('path')
        .attr('opacity', d => d.Weight >= minWeight ? 1 : 0);
    currentGraph.svg.select('marker').selectAll('marker')
        .attr('opacity', d => d.Weight >= minWeight ? 1 : 0);
}

let currentGraph = {};

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

let create_graph = (graph_name) => {
    let g = graph_data[graph_name];
    let width = g.width;
    let height = g.height;
    let data_nodes = g.data.nodes;
    let data_links = g.data.links;

    let svg = d3.select('#graph')
        .attr("viewBox", [0, 0, width, height]);
    svg.selectAll("*").remove();

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
            .attr("d", "M0,-5L10,0L0,5")
            .attr('opacity', d => d.Weight >= minWeight ? 1 : 0);

    let link = svg.append('g')
        .selectAll('path')
        .data(data_links)
        .enter()
        .append('path')
            .attr('stroke', d => actionColorScale(d.action))
            .attr('stroke-opacity', 0.3)
            .attr('stroke-width', d => lineWeightLinearScale(d.Weight))
            .attr('fill','none')
            .attr("marker-end", d => `url(${new URL(`#arrow-${d.action}`, location)})`).attr('opacity', d => d.Weight >= minWeight ? 1 : 0);

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
        .attr('r', d => nodeSize === 'eigencentrality' ? sizeLinearScale(50*d[nodeSize]) : sizeLinearScale(d[nodeSize]))
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
        .text(d => 'user: ' + d.id + ', '+ nodeSize+': ' + d[nodeSize]);
    
    simulation.on('tick', () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    })

    currentGraph.data = g.data;
    currentGraph.simulation = simulation;
    currentGraph.svg = svg;
}