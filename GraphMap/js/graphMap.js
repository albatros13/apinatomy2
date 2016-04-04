var ontologyViewer = function () {

    var width = 1200, height = 600;
    var svg = d3.select("#svgGraph").append("svg")
        .attr("width", width)
        .attr("height", height);
    var vp = {size: {width: width, height: height}};

    var graph = new Graph({}, []);
    var files = {"mid temporal": {
            nodes: "resources/midTemporalBorderNodes.txt",
            links: "resources/midTemporalBorderLinks.txt"
        }
    };

    //loadPartCenters("resources/brainParts.txt", "resources/brainPartLinks.txt");
    /*d3.select(window)
        .on("keydown", function() {
            if(d3.event.keyCode == 86) {
                graph.drawVoronoi(svg, vp);
            }
            if(d3.event.keyCode == 71) {
                graph.drawPartCenters(svg, vp);
            }
        });*/

    graph.load("resources/brainBorderNodes.txt", "resources/brainBorderLinks.txt")
        .then(
            function(){
                //graph.selected = graph.nodeMaps["mid temporal"];
                //graph.selected.forEach(function(d){
               // var t = graph.nodes["1"];
               // var s = {id: "mid temporal", x: 0, y: 0, parts: ["mid temporal"], center: true};
               // graph.nodes["mid temporal"] = s;
                    //var distance = Math.sqrt((t.x - s.x)*(t.x - s.x) + (t.y - s.y)*(t.y - s.y));
               // var link = {source: s, target: t, distance: 0, direction: ""};
               // graph.links.push(link);
                //});

                graph.draw(svg, vp, showContent);
            });

    function showContent(part){
        var tile = this;
        graph.selectTile(part, tile);

        if (d3.event.shiftKey && files[part.key]) {
            if (!graph.nodeContent[part.key]){
                var subGraph = new Graph({}, []);
                subGraph.parent = tile;
                subGraph.load(files[part.key].nodes, files[part.key].links)
                    .then(function(){
                        drawContent(subGraph);
                    });
            } else {
                if (!graph.nodeContent[part.key].expanded){
                    drawContent(graph.nodeContent[part.key].graph);
                }
            }

            function drawContent(subGraph){
                if (!subGraph) return;
                var rect = graph.getRectangle(part.key);
                var svgContainer = d3.select(tile.parentNode).append("g").attr("name", part.key)
                    .attr("transform", "translate(" + rect.x + "," + rect.y + ")");
                var containerVP = {size: {width: rect.width, height: rect.height}};
                subGraph.draw(svgContainer, containerVP, hideContent);
                graph.nodeContent[part.key] = {graph: subGraph, expanded: true};
            }
        }
    }

    function hideContent(part){
        var tile = this;
        if (tile.parentNode)
            if (tile.parentNode.parentNode){
                var group = d3.select(tile.parentNode.parentNode);
                var name = group.attr("name");
                if (name && graph.nodeContent[name])
                    graph.nodeContent[name].expanded = false;
                group.remove();
            }
            else
                d3.select(tile.parentNode).remove();
    }
}();
