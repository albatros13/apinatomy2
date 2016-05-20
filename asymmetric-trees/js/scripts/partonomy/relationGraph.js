var relationGraph = function () {

    var vp = {width: 1200, height: 600};
    var svg = d3.select("#svgGraph").append("svg");
    var graph = new RelationGraph({}, []);

    function init(nodes, links){
        graph.nodes = nodes;
        graph.links = links;
    }

    function draw(){
        graph.draw(svg, vp);
    }

    $(document).keypress(function(e) {
        if(e.which == 13) {
            graph.connectNodes();
        }
    });

    $(window).resize(function() {
        var win = $(this);
        var win = $(this);
        vp.width = win.width();
        vp.height = win.height();
        graph.draw(svg, vp);
    });

    function printList(array){
        if (!array) return "";
        var str = "";
        for (var i = 0; i < array.length; i++)
            str += array[i] + ((i < array.length - 1)? ", ": "");
        return str;
    }

    function getHTMLNodeAnnotation(d){
        if (!d) return "";
        var res = d.id;
        if (d.name) res += ": " + d.name;
        if (d.fmaID) res += '</br>' + d.fmaID;
        if (d.cocomacIDs) res += '</br>' + printList(d.cocomacIDs);
        return "<div>" + res + "</div>";
    }

    function getWeight(d){
        var count= 1;
        if (d.count) count = d.count;
        if (d.relation == "CORRELATION") return 0;
        if (d.relation == "CONNECTIVITY") return (Math.round(1000000 / count) / 100);
        return 1;
    }

    function getHTMLLinkAnnotation(d){
        if (!d) return "";
        var res = d.relation;
        res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.source) + "</div>";
        res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.target) + "</div>";
        res += "Weight: " + getWeight(d);
        return "<div>" + res + "</div>";
    }

    function RelationGraph(nodes, links){
        this.nodes = nodes;
        this.links = links;
        this.selected = {};
        this.solution = [];

        var directedLinkTypes = ["PARTONOMY", "CORRELATION"];
        var linkColors = {"PARTONOMY": "#ccc", "CORRELATION": "green", "CONNECTIVITY": "hotPink"};

        this.force = d3.layout.force();
        this.svg = null;
        this.vp = null;

        var graph = this;

        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        this.reset = function(){
            var update = graph.solution.length > 0;
            graph.solution = [];
            if (update) graph.draw(graph.svg, graph.vp);
        };

        function inSolution(d){
            if (graph.solution){
                var res = graph.solution.find(function(e){
                    return (e.from == d.source) && (e.to == d.target);});

                if (!res && (d.relation == "CONNECTIVITY" || d.relation == "CORRELATION")) {
                    res = graph.solution.find(function(e) {
                        return (e.from == d.target) && (e.to == d.source);
                    });
                }
                return res;
            }
            return false;
        }

        this.draw = function(svg, vp) {
            graph.svg = svg;
            graph.vp = vp;

            graph.svg.selectAll("g").remove();
            svg.attr("width", vp.width).attr("height", vp.height);
            if (vp.x && vp.y)
                svg.attr("transform", "translate(" + vp.x + "," + vp.y + ")");

            graph.force.size([vp.width, vp.height])
                .charge(-150)
                .linkDistance(30)
                .linkStrength(function(link){
                    if (link.relation == "PARTONOMY") return 1.0;
                    return 0.5;
                });

            graph.force.nodes(d3.values(graph.nodes)).links(graph.links);

            svg.append("defs").selectAll("marker")
                .data(directedLinkTypes)
                .enter().append("marker")    //
                .attr("id", function(d){return ('marker' + d);})
                .attr('fill', function(d) { return linkColors[d];})
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 12)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr('markerUnits', 'strokeWidth')
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5");

            var link = svg.append("g").selectAll("path")
                .data(graph.force.links())
                .enter().append("path")
                .attr("stroke", function(d){return linkColors[d.relation];})
                .attr("marker-end", function (d) {
                    return "url(#marker" + d.relation + ")";
                });

            link.on("mouseover", function(d) {
                    tooltip.transition().duration(200).style("opacity", .9);
                    tooltip.html(getHTMLLinkAnnotation(d))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition().duration(500).style("opacity", 0);
                });


            var solution = svg.append("g").selectAll("path")
                .data(graph.force.links().filter(function(d){return inSolution(d);}))
                .enter().append("path")
                .attr("stroke", function(d){return linkColors[d.relation];})
                .attr("class", "solution");

            var region = svg.append("g").selectAll("rect")
                .data(graph.force.nodes().filter(function(d){ return d.type == "REGION";}))
                .enter().append("rect")
                .attr("width", 20)
                .attr("height", 20)
                .attr("x", -10)
                .attr("y", -10)
                .attr("fill", "#eee")
                .attr("stroke", "#000")
                .attr("class", function(d){
                    if (graph.selected[d.id]) return "selected";
                    return "";})
                .call(graph.force.drag);

            region.on("mouseover", function(d) {
                    tooltip.transition().duration(200).style("opacity", .9);
                    tooltip.html(getHTMLNodeAnnotation(d))
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition().duration(500).style("opacity", 0);
                });

            var index = svg.append("g").selectAll("path")
                .data(graph.force.nodes().filter(function(d){ return d.type == "INDEX";}))
                .enter().append("path")
                .attr("d", "M -10 7 L 0 -7 L 10 7 L -10 7")
                .attr("fill", "green")
                .attr("stroke", "#000")
                .attr("class", function(d){
                    if (graph.selected[d.id]) return "selected";
                    return "";})
                .on('dblclick', indexDblClickHandler)
                .call(graph.force.drag);

            index.on("mouseover", function(d) {
                    tooltip.transition().duration(200).style("opacity", .9);
                    tooltip.html(getHTMLNodeAnnotation(d))
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition().duration(500).style("opacity", 0);
                });

            var text = svg.append("g").selectAll("text")
                .data(graph.force.nodes())
                .enter().append("text")
                .attr("y", 4)
                .style("text-anchor", "middle")
                .text(function (d) {return d.id;});

            graph.force.on("tick", update).start();

            function update(e) {
                var k = 6 * e.alpha;
                //var k = 0;

                link.attr("d", function(d){
                    // Push sources up and targets down to form a weak tree.
                    if (d.relation == "PARTONOMY"){
                        d.source.y -= k;
                        d.target.y += k;
                    }

                    //screen boundaries
                    ["source", "target"].forEach(function(prop){
                        d[prop].x = Math.min(graph.vp.width, Math.max(0, d[prop].x));
                        d[prop].y = Math.min(graph.vp.height, Math.max(0, d[prop].y));
                    });

                    var dx = (d.target.x - d.source.x),
                        dy = (d.target.y - d.source.y),
                        dr = Math.sqrt(dx * dx + dy * dy);
                    if (dr > 0){
                        var ratio = Math.abs(dr - 10) / dr;
                        dx *= (1 - ratio);
                        dy *= (1 - ratio);
                    }
                    return "M" + d.source.x + ' ' + d.source.y + " L" + (d.target.x  - dx) + ' ' + (d.target.y - dy);

                    //return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
                });

                solution.attr("d", function(d){
                    return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
                });

                region.attr("transform", transform);
                index.attr("transform", transform);
                text.attr("transform", transform);
            }
        };

        this.connectNodes = function(){
            var required = d3.values(graph.selected);
            if (required.length > 0){
                var edges = graph.getFullDerivedGraph();
                graph.solution = steiner(edges, required).edges;
                graph.draw(graph.svg, graph.vp);
            }
        };

        //TODO: fix
        this.getDerivedGraph = function(excludeCorrelations){
            var edges = [];
            var visited = [];

            var traverse = function(source){
                var queue = graph.links.filter(function(d){
                    return ((d.source.id == source.id) && (d.relation == "PARTONOMY"))
                        || ((d.source.id == source.id) && (d.relation == "CONNECTIVITY"))
                        || ((d.target.id == source.id) && (d.relation == "CONNECTIVITY"));
                });
                visited.push(source.id);

                for (var i = 0; i < queue.length; i++){
                    var target = queue[i].target;
                    if (target.id == source.id) target = queue[i].source;
                    if (visited.indexOf(target.id) < 0) {
                        edges.push({from: source, to: target, weight: getWeight(queue[i]), relation: queue[i].relation});
                        /*var danglingParents = graph.links.filter(function(d){
                            return (d.source.id != source.id) && (d.target.id == target.id)
                                && (d.relation == "PARTONOMY") && d.source.dangling;});
                        danglingParents.forEach(function(link){
                            edges.push({from: link.target, to: link.source, weight: getWeight(link), relation: link.relation});
                            traverse(link.source);
                        });*/

                        traverse(target);
                    }
                    visited.push(target.id);
                }
            };

            var nextToSelected = graph.links.filter(function(d){return graph.selected[d.source.id]
                && (d.relation == "CORRELATION");});
            if (!excludeCorrelations){
                nextToSelected.forEach(function(d){
                    edges.push({from: d.source, to: d.target, weight: getWeight(d), relation: d.relation});
                    edges.push({from: d.target, to: d.source, weight: getWeight(d), relation: d.relation});
                });
            }

            var selectedParts = nextToSelected.map(function(d){return d.target;});
            selectedParts.forEach(function(d){
                traverse(d);
            });
            return edges;
        };

        this.getFullDerivedGraph = function(excludeCorrelations){
            var edges = [];

             graph.links.forEach(function(d){
                 if (d.relation == "PARTONOMY"){
                     edges.push({from: d.source, to: d.target, weight: getWeight(d), relation: d.relation});
                     //if (d.source.dangling){
                     //    edges.push({from: d.target, to: d.source, weight: getWeight(d), relation: d.relation});
                     //}
                 } else {
                     if (d.relation == "CONNECTIVITY"){
                         edges.push({from: d.source, to: d.target, weight: getWeight(d), relation: d.relation});
                         edges.push({from: d.target, to: d.source, weight: getWeight(d), relation: d.relation});
                     } else
                     if (!excludeCorrelations) {
                         if (d.relation == "CORRELATION") {
                             edges.push({from: d.source, to: d.target, weight: getWeight(d), relation: d.relation});
                             edges.push({from: d.target, to: d.source, weight: getWeight(d), relation: d.relation});
                         }
                     }
                 }
             });

            return edges;
        };

        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }

        function indexDblClickHandler (node){
            var triangle = d3.select(this);
            triangle.classed("selected", !triangle.classed("selected"));

            if (!graph.selected[node.id]){
                graph.selected[node.id] = node;
            } else {
                delete graph.selected[node.id];
            }
            graph.reset();
        }
    }

    return {
        init: init,
        draw: draw,
        graph: graph
    }
}();
