var brainMap = function () {

    var width = 1200, height = 600;
    var vp = {width: width, height: height};

    var svg = d3.select("#svgGraph").append("svg");

    var graph = new BorderGraph({}, []);
    var files = {
        "mid temporal": {
            nodes: "resources/midTemporalBorderNodes.txt",
            links: "resources/midTemporalBorderLinks.txt",
            connectors: [
                {source:"25", target:"2", distance: 1, direction: "tb"},
                {source:"34", target:"8", distance: 1, direction: "bt"}
            ]
        },
        "inf frontal": {
            nodes: "resources/infFrontalBorderNodes.txt",
            links: "resources/infFrontalBorderLinks.txt",
            connectors: [
                {source:"3", target:"2", distance: 1, direction: "tb"},
                {source:"17", target:"10", distance: 1, direction: "bt"}
            ]
        }
    };

    graph.load("resources/brainBorderNodes.txt", "resources/brainBorderLinks.txt")
        .then(
            function(){
                //Add fixing links
                graph.addConnectors([
                    {source: {x: 0, y: vp.height/2, id: "s"}, target: graph.nodeMaps["orbital"][0],
                        distance: 1, direction: "lr"},
                    {source: {x: vp.width, y: vp.height/2, id: "t"}, target: graph.nodeMaps["parahippocampal"][2],
                        distance: 1, direction: "rl"}
                ]);
                graph.draw(svg, vp, showContent);
            });

    function showContent(part){
        var tile = this;

        graph.selectTile(part, tile);

        var polygon = d3.select(tile);
        if (polygon.classed("selected")){
            if (files[part.key]) {
                var info = files[part.key];
                if (!graph.partContent[part.key]) {
                    var subGraph = new BorderGraph({}, []);
                    subGraph.parent = tile;
                    subGraph.parentGraph = graph;
                    subGraph.load(info.nodes, info.links)
                        .then(function () {
                            subGraph.addConnectors(info.connectors);
                            drawContent(subGraph);
                        });
                } else {
                    if (!graph.partContent[part.key].visible) {
                        drawContent(graph.partContent[part.key].graph);
                    }
                }
            }
        } else {
            if (graph.partContent[part.key]){
                graph.partContent[part.key].graph.svg.selectAll("g").remove();
                graph.partContent[part.key].visible = false;
            }
        }

        function drawContent(subGraph){
            if (!subGraph) return;
            var rect = graph.getCanvasSize(part.key);
            var svgContainer = d3.select(tile.parentNode).append("g").attr("name", part.key);
            subGraph.draw(svgContainer, rect, hideContent);
            graph.partContent[part.key] = {graph: subGraph, visible: true};
        }
    }

    function hideContent(){
        var tile = this;
        if (tile.parentNode)
            if (tile.parentNode.parentNode){
                var group = d3.select(tile.parentNode.parentNode);
                var name = group.attr("name");
                if (name && graph.partContent[name])
                    graph.partContent[name].visible = false;
                group.remove();
            }
            else
                d3.select(tile.parentNode).remove();
    }

    function BorderGraph(nodes, links){
        this.nodes = nodes;
        this.links = links;
        this.nodeMaps = {};
        this.selected = {};
        this.partContent = {};

        this.force = d3.layout.force();
        this.svg = null;
        this.vp = null;
        this.onClick = null;

        this.parent = null;
        this.parentGraph = null;

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
                                if (!graph.nodeMaps[part])
                                    graph.nodeMaps[part] = [];
                                for (var i = 1; i < terms.length; i++) {
                                    var node = terms[i].trim();
                                    if (!graph.nodes[node])
                                        graph.nodes[node] = {id: node, parts: [part]};
                                    else
                                        graph.nodes[node].parts.push(part);
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

        this.addConnectors = function(connectors){
            if (!connectors) return;
            connectors.forEach(function(d){
                if (graph.parentGraph){
                    var source = graph.nodes["_" + d.source] = {x: 0, y: 0};
                    var permanent = graph.parentGraph.nodes[d.source];
                } else {
                    source = graph.nodes["_" + d.source.id] = d.source;
                    permanent = {x: d.source.x, y: d.source.y};
                }
                var link = {
                    source   : source,
                    target   : graph.nodes[d.target],
                    distance : d.distance,
                    direction: d.direction,
                    connector: true,
                    permanent: permanent};
                graph.links.push(link);
            });
        };

        this.draw = function(svg, vp, onClick) {
            graph.svg = svg;
            graph.vp = vp;
            graph.onClick = onClick;

            svg.selectAll("g").remove();
            svg.attr("width", vp.width).attr("height", vp.height);
            if (vp.x && vp.y)
                svg.attr("transform", "translate(" + vp.x + "," + vp.y + ")");

            var scalingX = 1, scalingY = 1, forceScalingFactor = 1, scaling = 1;
            if (graph.parentGraph){
                scalingX = graph.vp.width / graph.parentGraph.vp.width;
                scalingY = graph.vp.height / graph.parentGraph.vp.height;
                scaling = Math.min(scalingX, scalingY);
                forceScalingFactor = scaling * 4;
            }


            function getBasicCharge(){
                var numNodes = d3.values(graph.nodes).length;
                var charge = -300;
                if (numNodes > 0){
                    var numSelected = d3.values(graph.selected).length;
                    charge = charge * numNodes / (numSelected * 20 + numNodes);
                }
                return charge;
            }

            graph.force.size([vp.width, vp.height])
                .charge(function(d){
                    var charge = getBasicCharge();
                    if (d.center) return 20 * charge;
                    return charge * forceScalingFactor;})
                .linkDistance(function (d) {
                    if (d.direction == "lr" || d.direction == "rl") return d.distance * scalingX;
                    if (d.direction == "tb" || d.direction == "bt") return d.distance * scalingY;
                    return d.distance;
                })
                .linkStrength(0.5);


            graph.force.nodes(d3.values(graph.nodes)).links(graph.links);

            var link = svg.append("g").selectAll("path")
                .data(graph.force.links())
                .enter().append("path")
                .style("stroke-dasharray", function(d){if (d.connector) return ("3, 3");})
                .attr("stroke", function(d){if (d.connector) return "#ccc";});

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

            var labels = svg.append("g").selectAll(".labels")
                .data(graph.force.nodes())
                .enter().append("text").attr("class", "labels")
                .text(function (d) {return d.id;});

            var text = svg.append("g").selectAll(".parts")
                .data(d3.entries(graph.nodeMaps))
                .enter().append("text").attr("class", "parts")
                .style("text-anchor", "middle")
                .text(function (d) {return d.key;});

            graph.force.on("tick", update).start();

            function update() {
                link.attr("d", function(d){
                    return linkArc(d);
                    //align link ends
                    //if (d.direction == "lr" || d.direction == "rl") d.source.y = d.target.y = (d.source.y + d.target.y)/2;
                    //if (d.direction == "tb" || d.direction == "bt") d.source.x = d.target.x = (d.source.x + d.target.x)/2;
                    //return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
                });

                function getCoords(vertice){
                    var node = graph.nodes[vertice];
                    if (node) return [node.x, node.y].join(",");
                    return "0,0";
                }

                polygon.attr("points", function (node) {
                    return node.value.map(function (d) {return getCoords(d);}).join(" ");
                });

                node.attr("transform", transform);

                labels.attr("transform", transform);

                text.attr("x", function(d) { return graph.centerOfMass(d).x;})
                    .attr("y", function(d) { return graph.centerOfMass(d).y;});

                //move content

                d3.entries(graph.partContent).forEach(function(entry){
                    var partContent = entry.value;
                    if (partContent.visible) {
                        var partName = entry.key;
                        var g = graph.partContent[partName].graph;
                        var rect = graph.getCanvasSize(partName);
                        var dt = 20;
                        if ((Math.abs(g.vp.width - rect.width) > dt) ||
                            (Math.abs(g.vp.height - rect.height) > dt)) {
                            g.vp = rect;
                            partContent.graph.draw(g.svg, g.vp, g.onClick);
                        } else {
                            if ((Math.abs(g.vp.x - rect.x) > dt) ||
                                (Math.abs(g.vp.y - rect.y) > dt)){
                                g.vp = rect;
                                partContent.graph.svg.attr("transform", "translate(" +rect.x + "," + rect.y + ")");
                            }
                        }
                    }
                });
            }
        };

        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }

        function linkArc(d) {
            function swap(d, prop){
                var tmp = d.source[prop];
                d.source[prop] = d.target[prop];
                d.target[prop] = tmp;
            }

            if (graph.parent){
                var coords = graph.parent.points;
                var shift = graph.vp;
                var link = d;
                var source = {x: link.source.x + shift.x, y: link.source.y + shift.y};
                var target = {x: link.target.x + shift.x, y: link.target.y + shift.y};
                var line = {source: source, target: target};
                var sourceIn = pointInPolygon(source, coords);
                var targetIn = pointInPolygon(target, coords);
                if (!sourceIn || !targetIn) {
                    var res = getBoundaryPoint(line, coords);
                    if (res && res.onLine1 && res.onLine2){
                        if (!sourceIn){
                            link.source.x = res.x - shift.x;
                            link.source.y = res.y - shift.y;
                        }
                        if (!targetIn){
                            link.target.x = res.x - shift.x;
                            link.target.y = res.y - shift.y;
                        }
                    }
                }
            } else {
                //screen boundaries
                ["source", "target"].forEach(function(prop){
                    d[prop].x = Math.min(graph.vp.width, Math.max(0, d[prop].x));
                    d[prop].y = Math.min(graph.vp.height, Math.max(0, d[prop].y));
                });

            }

            //connectors to minimize rotation
            if (d.connector && d.permanent){
                d.source.x = d.permanent.x;
                d.source.y = d.permanent.y;

                if (graph.parentGraph && graph.vp){
                    d.source.x -= graph.vp.x;
                    d.source.y -= graph.vp.y;
                } else {
                    if (d.direction == "lr" || d.direction == "rl")
                        d.target.y = d.source.y;
                    if (d.direction == "tb" || d.direction == "bt")
                        d.target.x = d.source.x;
                }

            }

            //preserve link directions
            if ((d.direction == "lr" && d.source.x > d.target.x) ||
                (d.direction == "rl" && d.source.x < d.target.x)) swap(d, "x");
            if ((d.direction == "tb" && d.source.y > d.target.y) ||
                (d.direction == "bt" && d.source.y < d.target.y)) swap(d, "y");

            return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
        }

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
            return {x: cx, y: cy};
        };

        this.selectTile = function(part, tile){
            if (!graph.svg) return;

            //hightlight
            var polygon = d3.select(tile);
            if (polygon.classed("selected"))
                polygon.classed("selected", false).style("fill", "#ccc");
            else
                polygon.classed("selected", true).style("fill", "#eee");

            var newSelected = graph.nodeMaps[part.key];

            //shrink/enlarge
            graph.force.stop();
            if (graph.selected[part.key]){
                var links = getSelectedLinks(part.key);
                for (var i = 0; i < links.length; i++)
                    graph.links.pop();
                delete graph.selected[part.key];
                delete graph.nodes[part.key];
            }
            else{
                graph.selected[part.key] = newSelected;
                var coords = graph.centerOfMass(part);
                var s = {id: part.key, x: coords.x, y: coords.y, parts: [part.key], center: true};
                graph.nodes[part.key] = s;
                graph.selected[part.key].forEach(function (d) {
                    var t = graph.nodes[d];
                    var distance = Math.sqrt((t.x - s.x) * (t.x - s.x) + (t.y - s.y) * (t.y - s.y));
                    var link = {source: s, target: t, distance: distance, direction: ""};
                    graph.links.push(link);
                });
            }
            graph.force.nodes(d3.values(graph.nodes)).links(graph.links);
            graph.force.start();
        };

        this.getCanvasSize = function(partName){
            var min = {x: 10000, y: 10000}, max = {x: 0, y: 0};
            var part = graph.nodeMaps[partName];
            if (part){
                for (var i = 0; i < part.length; i++){
                    var node = graph.nodes[part[i]];
                    if (node){
                        min.x = Math.min(min.x, node.x);
                        max.x = Math.max(max.x, node.x);
                        min.y = Math.min(min.y, node.y);
                        max.y = Math.max(max.y, node.y);
                    }
                }
            }
            var dt = 0;
            return {x: min.x + dt, y: min.y + dt, width: max.x - min.x - 2 * dt, height: max.y - min.y - 2* dt};
        };

        function getSelectedLinks(partName){
            var links = [];
            for (var i = 0; i < graph.selected[partName].length; i++){
                var sourceID = graph.selected[partName][i];
                if (i == graph.selected[partName].length - 1)
                    var targetID = graph.selected[partName][0];
                else
                    targetID = graph.selected[partName][i + 1];
                var link = graph.links.find(function(d){
                    if ((d.source.id == sourceID && d.target.id == targetID)
                        || (d.source.id == targetID && d.target.id == sourceID))
                        return d;
                });
                if (link) links.push(link);
            }
            return links;
        }

        function pointInPolygon (point, coords) {
            var x = point.x, y = point.y, inside = false;
            for (var i = 0, j = coords.length - 1; i < coords.length; j = i++) {
                var xi = coords[i].x, yi = coords[i].y,
                    xj = coords[j].x, yj = coords[j].y;
                var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
            return inside;
        }

        function getBoundaryPoint (line, coords){
            for (var i = 0, j = coords.length - 1; i < coords.length; j = i++) {
                var line2 = {
                    source: coords[i],
                    target: coords[j]
                };
                var res = getLineIntersection(line, line2);
                if (res.x && res.y && res.onLine1 && res.onLine2){
                    return res;
                }
            }
            return null;
        }

        function getLineIntersection(line1, line2) {
            var denominator, a, b, numerator1, numerator2;
            var result = {
                x: null,
                y: null,
                onLine1: false,
                onLine2: false
            };
            denominator = ((line2.target.y - line2.source.y) * (line1.target.x - line1.source.x)) - ((line2.target.x - line2.source.x) * (line1.target.y - line1.source.y));
            if (denominator == 0) {
                return result;
            }
            a = line1.source.y - line2.source.y;
            b = line1.source.x - line2.source.x;
            numerator1 = ((line2.target.x - line2.source.x) * a) - ((line2.target.y - line2.source.y) * b);
            numerator2 = ((line1.target.x - line1.source.x) * a) - ((line1.target.y - line1.source.y) * b);
            a = numerator1 / denominator;
            b = numerator2 / denominator;

            result.x = line1.source.x + (a * (line1.target.x - line1.source.x));
            result.y = line1.source.y + (a * (line1.target.y - line1.source.y));

            if (a > 0 && a < 1) result.onLine1 = true;

            if (b > 0 && b < 1) result.onLine2 = true;

            return result;
        }
    }
}();
