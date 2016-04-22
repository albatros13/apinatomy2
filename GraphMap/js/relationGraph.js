var relationGraph = function () {

    var width = 1200, height = 600;
    var vp = {width: width, height: height};

    var svg = d3.select("#svgGraph").append("svg");

    var graph = new RelationGraph({}, []);

    graph.load("resources/graph/brain_nodes_example.txt", "resources/graph/brain_edges_example.txt")
        .then(
            function(){
                graph.draw(svg, vp);
            });

    $(document).keypress(function(e) {
        if(e.which == 13) {
            graph.connectParts();
        }
    });

    function RelationGraph(nodes, links){
        this.nodes = nodes;
        this.links = links;
        this.root = null;
        this.selected = [];
        this.solution = [];

        var directedLinkTypes = ["PARTONOMY", "CORRELATION"];
        var linkColors = {"PARTONOMY": "#ccc", "CORRELATION": "green", "CONNECTIVITY": "hotPink"};

        this.force = d3.layout.force();
        this.svg = null;
        this.vp = null;

        var graph = this;

        this.load = function(file1, file2) {
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
                                    var link = {
                                        source: graph.nodes[sourceID], target: graph.nodes[targetID],
                                        relation: relation
                                    };
                                    graph.links.push(link);
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
                                if (!graph.nodes[id])
                                    graph.nodes[id] = {id: id, type: terms[1].trim()};
                            });
                            resolve(data);
                        },
                        error: function (jqXhr, textStatus, errorThrown) {
                            reject({jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                        }
                    });
                });
            }
            return loadNodes().then(loadLinks);
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
                .charge(-300)
                .linkDistance(50);

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
                    var ratio = (dr - 10) / dr;
                    dx *= (1 - ratio);
                    dy *= (1 - ratio);
                    //return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
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

        this.connectParts = function(){
            // enter pressed
            var nodes = d3.values(graph.nodes);
            var edges = graph.links.map(function(d){return {
                from: d.source, to: d.target,
                weight: (d.relation == "CONNECTIVITY")? 0.5: (d.relation =="CORRELATION")? 0: 1}});
            graph.links.forEach(function(d){
                if (d.relation == "CONNECTIVITY")
                    edges.push({from: d.target, to: d.source, weight: 0.5});
            });
            var required = d3.values(graph.selected);
            if (required.length > 0){
                graph.solution = steiner(nodes, edges, required);
                console.dir(graph.solution);
                graph.draw(graph.svg, graph.vp);
            }
        };

        this.connectIndices = function(){
            // enter pressed
            var nodes = d3.values(graph.nodes);
            var edges = [];
            graph.links.forEach(function(d){
                if (d.relation == "PARTONOMY")
                    edges.push({from: d.source, to: d.target, weight: 1});
                if (d.relation == "CONNECTIVITY"){
                    edges.push({from: d.source, to: d.target, weight: 0.5});
                    edges.push({from: d.target, to: d.source, weight: 1.5});
                }
                if (d.relation == "CORRELATION"){
                    if (graph.selected[d.source.id]){
                        edges.push({from: d.source, to: d.target, weight: 0});
                        edges.push({from: d.target, to: d.source, weight: 0});
                    }
                }
            });
            var required = d3.values(graph.selected);
            if (required.length > 0){
                graph.solution = steiner(nodes, edges, required);
                console.dir(graph.solution);
                graph.draw(graph.svg, graph.vp);
            }
        };

        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }

        /*
        function regionDblClickHandler (node){
            var rect = d3.select(this);
            rect.classed("selected", !rect.classed("selected"));
            if (!graph.selected[node.id]){
                graph.selected[node.id] = node;
            } else {
                delete graph.selected[node.id];
            }
            graph.reset();
        }*/

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
