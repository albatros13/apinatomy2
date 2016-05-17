var relationGraph = function () {

    var width = 1200, height = 600;
    var vp = {width: width, height: height};

    var svg = d3.select("#svgGraph").append("svg");

    var graph = new RelationGraph({}, []);

    //graph.load("resources/graph/brain_nodes_partonomy.txt", "resources/graph/brain_edges.txt","resources/graph/fmaNames.txt")
    //graph.load("resources/graph/brain_nodes.txt", "resources/graph/brain_edges.txt","resources/graph/fmaNames.txt")
    graph.load("resources/graph/brain_nodes_example.txt", "resources/graph/brain_edges_example.txt")
        .then(
            function(){
                graph.draw(svg, vp);
            });

    $(document).keypress(function(e) {
        if(e.which == 13) {
            graph.connectIndices();
        }
    });

    function getWeight(d){
        var count= 1;
        if (d.count) count = d.count;
        if (d.relation == "CORRELATION") return 0;
        if (d.relation == "CONNECTIVITY") return 1000 / count;
        return 1 / count;
    }

    function getHTMLNodeAnnotation(d){
        if (!d) return "";
        var res = d.id;
        if (d.label) res += ": " + d.label;
        if (d.URI) res += '</br>' + d.URI;
        return "<div>" + res + "</div>";
    }

    function getHTMLLinkAnnotation(d){
        if (!d) return "";
        var res = d.relation;
        res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.source) + "</div>";
        res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.target) + "</div>";
        res += "Weight: " + getWeight(d);
        return "<div>" + res + "</div>";
    }

    function extractID(url) {
        var delimeterPos;
        if (url.indexOf("fma#") > 0)
            delimeterPos = url.indexOf("fma#") + 4;
        else if (url.indexOf("gene_ontology#") > 0)
            delimeterPos = url.indexOf("gene_ontology") + "gene_ontology#".length;
        else
            delimeterPos = url.lastIndexOf("/") + 1;
        return url.substring(delimeterPos).trim();
    }

    function RelationGraph(nodes, links){
        this.nodes = nodes;
        this.links = links;
        this.root = null;
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

        this.load = function(file1, file2, file3) {
            function loadLinks() {
                return new RSVP.Promise(function(resolve, reject){
                    $.ajax({
                        url: file2,
                        success: function (data) {
                            var lines = data.split('\n');
                            lines.forEach(function(line){
                                var terms = line.split(',');
                                if (terms.length >= 3) {
                                    var sourceID = terms[0].trim();
                                    var targetID = terms[1].trim();
                                    var relation = terms[2].trim();
                                    if (graph.nodes[sourceID] && graph.nodes[targetID]){
                                        var link = {
                                            source: graph.nodes[sourceID], target: graph.nodes[targetID],
                                            relation: relation
                                        };
                                        graph.links.push(link);
                                    }
                                }
                            });
                            resolve(data);
                        },
                        error: function(jqXhr, textStatus, errorThrown){
                            reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                        }
                    });
                })
            }

            function loadNodes() {
                return new RSVP.Promise(function (resolve, reject) {
                    $.ajax({
                        url: file1,
                        success: function(data) {
                            var lines = data.split('\n');
                            lines.forEach(function(line){
                                var terms = line.split(',');
                                var id = terms[0].trim();
                                var type = "REGION";
                                if (terms.length > 1)
                                    type = terms[1].trim();
                                if (!graph.nodes[id])
                                    graph.nodes[id] = {id: id, type: type};
                            });
                            resolve(data);
                        },
                        error: function (jqXhr, textStatus, errorThrown) {
                            reject({jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                        }
                    });
                });
            }

            function loadNodeAnnotations(){
                return new RSVP.Promise(function (resolve, reject) {
                    if (!file3) resolve();
                    $.ajax({
                        url: file3,
                        success: function (data) {
                            var lines = data.split('\n');
                            for (var i = 0; i < lines.length; i++) {
                                var line = lines[i];
                                var endOfURI = line.indexOf(' ');
                                if (endOfURI > -1) {
                                    var URI = line.substring(0, endOfURI);
                                    var id = extractID(line.substring(0, endOfURI));
                                    if (graph.nodes[id]) {
                                        graph.nodes[id].label = line.substring(endOfURI + 1);
                                        graph.nodes[id].URI = URI;
                                    }
                                }
                            }
                            resolve(data);
                        },
                        error: function (jqXhr, textStatus, errorThrown) {
                            reject({jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                        }
                    });
                });
            }
            return loadNodes().then(loadLinks).then(loadNodeAnnotations);
        };

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
                .charge(-100)
                .linkDistance(50)
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
               // .on('dblclick', regionDblClickHandler)
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

        this.connectIndices = function(){
            var required = d3.values(graph.selected);
            if (required.length > 0){
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
                            edges.push({from: source, to: target, weight: getWeight(queue[i])});
                            traverse(target);
                        }
                        visited.push(target.id);
                    }
                };

                var nextToSelected = graph.links.filter(function(d){return graph.selected[d.source.id]
                    && (d.relation == "CORRELATION");});
                nextToSelected.forEach(function(d) {
                    edges.push({from: d.source, to: d.target, weight: getWeight(d)});
                    edges.push({from: d.target, to: d.source, weight: getWeight(d)});
                });

                var selectedParts = nextToSelected.map(function(d){return d.target;});
                selectedParts.forEach(function(d){
                    traverse(d);
                });

                graph.solution = steiner(edges, required);
                graph.draw(graph.svg, graph.vp);
            }
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
}();
