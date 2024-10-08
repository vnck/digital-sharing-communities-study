window.onloadFuncs.push(() => {
    sigma.settings.minArrowSize = 25;

    sigma.classes.graph.addMethod('neighbors', function(nodeId) {
        var k,
            neighbors = {},
            index = this.allNeighborsIndex[nodeId] || {};

        for (k in index)
        neighbors[k] = this.nodesIndex[k];

        return neighbors;
    });

    let f = (s) => {
        // We first need to save the original colors of our
        // nodes and edges, like this:
        s.graph.nodes().forEach(function(n) {
            n.originalColor = n.color;
        });
        s.graph.edges().forEach(function(e) {
            e.originalColor = e.color;
            e.size = e.weight/10;
        });

        // When a node is clicked, we check for each node
        // if it is a neighbor of the clicked one. If not,
        // we set its color as grey, and else, it takes its
        // original color.
        // We do the same for the edges, and we only keep
        // edges that have both extremities colored.
        s.bind('clickNode', function(e) {
        var nodeId = e.data.node.id,
            toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        s.graph.nodes().forEach(function(n) {
            if (toKeep[n.id])
            n.color = n.originalColor;
            else
            n.color = '#eee';
        });

        s.graph.edges().forEach(function(e) {
            if (toKeep[e.source] && toKeep[e.target])
            e.color = e.originalColor;
            else
            e.color = '#eee';
        });

        // Since the data has been modified, we need to
        // call the refresh method to make the colors
        // update effective.
        s.refresh();
        });

        // When the stage is clicked, we just color each
        // node and edge with its original color.
        s.bind('clickStage', function(e) {
        s.graph.nodes().forEach(function(n) {
            n.color = n.originalColor;
        });

        s.graph.edges().forEach(function(e) {
            e.color = e.originalColor;
        });

        // Same as in the previous event:
        s.refresh();
        });
    }

    document.getElementById('analysis-tab').addEventListener('click', () => {
    sigma.parsers.gexf(
        'graphs/PunggolBTO.gexf',
        new sigma({
            container: 'punggolbto-container',
            renderer: {
                container: document.getElementById('punggolbto-container'),
                type: 'canvas'
            },
            settings: {
                defaultEdgeType: 'arrow',
                minArrowSize: 3,
                minEdgeSize: 0.1,
                maxEdgeSize: 10,
            }
        }),
        s => f(s));
    
    sigma.parsers.gexf(
        'graphs/PunggolResidential.gexf',
        new sigma({
            container: 'punggolresidential-container',
            renderer: {
                container: document.getElementById('punggolresidential-container'),
                type: 'canvas'
            },
            settings: {
                defaultEdgeType: 'arrow',
                minArrowSize: 3,
                minEdgeSize: 0.1,
                maxEdgeSize: 10,
            }
        }),
        s => f(s));

    sigma.parsers.gexf(
        'graphs/JurongResidential.gexf',
        new sigma({
            container: 'jurongresidential-container',
            renderer: {
                container: document.getElementById('jurongresidential-container'),
                type: 'canvas'
            },
            settings: {
                defaultEdgeType: 'arrow',
                minArrowSize: 3,
                minEdgeSize: 0.1,
                maxEdgeSize: 10,
            }
        }),
        s => f(s));

    sigma.parsers.gexf(
        'graphs/JurongBTO.gexf',
        new sigma({
            container: 'jurongbto-container',
            renderer: {
                container: document.getElementById('jurongbto-container'),
                type: 'canvas'
            },
            settings: {
                defaultEdgeType: 'arrow',
                minArrowSize: 3,
                minEdgeSize: 0.1,
                maxEdgeSize: 10,
            }
        }),
        s => f(s));

    sigma.parsers.gexf(
        'graphs/ToaPayohResidential.gexf',
        new sigma({
            container: 'toapayohresidential-container',
            renderer: {
                container: document.getElementById('toapayohresidential-container'),
                type: 'canvas'
            },
            settings: {
                defaultEdgeType: 'arrow',
                minArrowSize: 3,
                minEdgeSize: 0.1,
                maxEdgeSize: 10,
            }
        }),
        s => f(s));

    sigma.parsers.gexf(
        'graphs/ToaPayohBTO.gexf',
        new sigma({
            container: 'toapayohbto-container',
            renderer: {
                container: document.getElementById('toapayohbto-container'),
                type: 'canvas'
            },
            settings: {
                defaultEdgeType: 'arrow',
                minArrowSize: 3,
                minEdgeSize: 0.1,
                maxEdgeSize: 10,
            }
        }),
        s => f(s));
    })});