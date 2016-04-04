/**
 * Created by Natallia on 3/3/2016.
 */

function Graph(nodes, links){
    this.nodes = nodes;
    this.links = links;
    this.nodeMaps = {};
    this.selected = [];
    this.nodeContent = {};

    this.force = null;
    this.svg = null;
    this.parent = null;
    this.onClick;

    var graph = this;

    this.load = function(file1, file2) {
        function loadBorderLinks() {
            return new RSVP.Promise(function(resolve, reject){
                $.ajax({
                    url: file2,
                    success: function (data) {
                        var lines = data.split('\n');
                        for (var i = 0; i < lines.length; i++) {
                            var line = lines[i];
                            var terms = line.split(',');
                            if (terms.length >= 3) {
                                var sourceID = terms[0].trim();
                                var targetID = terms[1].trim();
                                var distance = parseFloat(terms[2]) / 2;
                                var direction = terms[3].trim();
                                var link = {
                                    source: graph.nodes[sourceID], target: graph.nodes[targetID],
                                    distance: distance, direction: direction
                                };
                                graph.links.push(link);
                            }
                        }
                        resolve(data);
                    },
                    error: function(jqXhr, textStatus, errorThrown){
                        reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                    }
                });
            })
        }

        function loadBorderNodes() {
            return new RSVP.Promise(function(resolve, reject) {
                $.ajax({
                    url: file1,
                    success: function (data) {
                        var lines = data.split('\n');
                        for (var j = 0; j < lines.length; j++) {
                            var line = lines[j];
                            var terms = line.split(',');
                            var part = terms[0].trim();
                            if (!graph.nodeMaps[part]) {
                                graph.nodeMaps[part] = [];
                            }
                            for (var i = 1; i < terms.length; i++) {
                                var node = terms[i].trim();
                                if (!graph.nodes[node])
                                    graph.nodes[node] = {id: node, parts: [part]};
                                else
                                    graph.nodes[node].parts.push(part);
                                //if (i == 1) graph.nodes[node].label = part;
                                graph.nodeMaps[part].push(node);
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

        return loadBorderNodes().then(loadBorderLinks);
    };

    this.draw = function(svg, vp, onClick) {
        graph.svg = svg;
        graph.onClick = onClick;
        svg.selectAll("g").remove();
        var width = vp.size.width, height = vp.size.height;
        graph.force = d3.layout.force()
            .size([width, height])
            .charge(function(d){
                if (d.center) return -5000;
                return -300;})
            .linkDistance(function (d) {
                return d.distance;
            });
            //.linkStrength(function(d){
            //    if ((graph.selected.indexOf(d.source.id) >= 0) && (graph.selected.indexOf(d.target.id) >= 0))
            //        return 0.5;
            //    return 1;});

        graph.force.nodes(d3.values(graph.nodes)).links(graph.links);

        var link = svg.append("g").selectAll("path")
            .data(graph.force.links())
            .enter().append("path");

        var polygon = svg.append("g").selectAll("polygon")
            .data(d3.entries(graph.nodeMaps))
            .enter().append("polygon")
            .attr("id", function(d){return d.key;})
            .on("click", onClick);

        var node = svg.append("g").selectAll("circle")
            .data(graph.force.nodes())
            .enter().append("circle")
            .attr("r", 3)
            .call(graph.force.drag);

        var text = svg.append("g").selectAll("text")
            .data(d3.entries(graph.nodeMaps))
            .enter().append("text")
            .style("text-anchor", "middle")
            .text(function (d) {return d.key;});

        graph.force.on("tick", update).start();

        function update() {
            link.attr("d", function(d){
                linkArc(d, width, height);
                //align link ends
                //if (d.direction == "lr" || d.direction == "rl") d.source.y = d.target.y = (d.source.y + d.target.y)/2;
                //if (d.direction == "tb" || d.direction == "bt") d.source.x = d.target.x = (d.source.x + d.target.x)/2;
                return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
            });

            function getCoords(vertice){
                var node = graph.nodes[vertice];
                if (node) {
                    return [node.x, node.y].join(",");
                }
                return "0,0";
            }

            polygon.attr("points", function (node) {
                return node.value.map(function (d) {return getCoords(d);}).join(" ");
            });

            node.attr("transform", transform);
            text.attr("x", function(d) { return graph.centerOfMass(d)[0];})
                .attr("y", function(d) { return graph.centerOfMass(d)[1];})

            //move content
            d3.entries(graph.nodeContent).forEach(function(entry){
                var partName = entry.key;
                var data = entry.value;

                if (data.expanded && data.graph) {
                    var rect = graph.getRectangle(partName);
                    data.graph.svg.attr("transform", "translate(" + rect.x + "," + rect.y + ")");
                }
            })
        }
    };

    this.centerOfMass = function(part){
        var cx = 0, cy = 0;
        if (part){
            var count = 0;
            for (var i = 0; i < part.value.length; i++){
                var node = graph.nodes[part.value[i]];
                if (node && node.x && node.y){
                    cx += node.x;
                    cy += node.y;
                    count++;
                }
            }
            if (count){
                cx /= count;
                cy /= count;
            }
        }
        return [cx, cy];
    };

    this.selectTile = function(part, tile){
        if (!graph.svg) return;

        //hightlight
        var polygon = d3.select(tile);
        var polygons = graph.svg.selectAll("polygon");
        polygons.filter(function(d){return d != polygon}).classed("selected", false).style("fill", "#ccc");
        polygon.classed("selected", !polygon.classed("selected")).style("fill", "#eee");

        var newSelected = graph.nodeMaps[part.key];
        if (!newSelected) return;

        graph.force.stop();
        //clean previous selected
        if (graph.selected == newSelected){
            var links = graph.getSelectedLinks();
            for (var i = 0; i < links.length; i++) {
                graph.links.pop();
            }
            graph.selected = [];
            polygon.style("fill", "#ccc");
        }
        else
            if (graph.selected != newSelected) {
                graph.selected = newSelected;
                var coords = graph.centerOfMass(part);
                var s = {id: part.key, x: coords[0], y: coords[1], parts: [part.key], center: true};
                graph.nodes["selected"] = s;
                graph.selected.forEach(function (d) {
                    var t = graph.nodes[d];
                    var distance = Math.sqrt((t.x - s.x) * (t.x - s.x) + (t.y - s.y) * (t.y - s.y));
                    var link = {source: s, target: t, distance: distance, direction: ""};
                    graph.links.push(link);
                });
            }
            graph.force.nodes(d3.values(graph.nodes)).links(graph.links);
            graph.force.start();
    };

    this.getRectangle = function(partName){
        var min = {x: 10000, y: 10000}, max = {x: 0, y: 0};
        var part = graph.nodeMaps[partName];
        if (part){
            for (var i = 0; i < part.length; i++){
                var node = graph.nodes[part[i]];
                if (node){
                    if (node.x) {
                        min.x = Math.min(min.x, node.x);
                        max.x = Math.max(max.x, node.x);
                    }
                    if(node.y){
                        min.y = Math.min(min.y, node.y);
                        max.y = Math.max(max.y, node.y);
                    }
                }
            }
        }
        return {x: min.x, y: min.y, width: max.x - min.x, height: max.y - min.y};
    };

    this.getSelectedLinks = function(){
        var links = [];
        for (var i = 0; i < graph.selected.length; i++){
            var sourceID = graph.selected[i];
            var targetID;
            if (i == graph.selected.length - 1)
                targetID = graph.selected[0];
            else
                targetID = graph.selected[i + 1];
            var link = graph.links.find(function(d){
                if ((d.source.id == sourceID && d.target.id == targetID)
                    || (d.source.id == targetID && d.target.id == sourceID))
                    return d;
            });
            if (link) links.push(link);
        }
        return links;
    };

    function linkArc(d, width, height) {
        function swap(d, prop){
            var tmp = d.source[prop];
            d.source[prop] = d.target[prop];
            d.target[prop] = tmp;
        }

        //screen boundaries
        ["source", "target"].forEach(function(prop){
            d[prop].x = Math.min(width, Math.max(0, d[prop].x));
            d[prop].y = Math.min(height, Math.max(0, d[prop].y));
        });

        //preserve link directions
        if ((d.direction == "lr" && d.source.x > d.target.x) ||
            (d.direction == "rl" && d.source.x < d.target.x)) swap(d, "x");
        if ((d.direction == "tb" && d.source.y > d.target.y) ||
            (d.direction == "bt" && d.source.y < d.target.y)) swap(d, "y");

        return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
    }

    function transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }
}