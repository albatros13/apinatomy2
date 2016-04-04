/**
 * Created by Natallia on 4/2/2016.
 */

var rowColor = function(i){
    var CSS_COLORS = [
        "#1f77b4", "#ff7f0e","#2ca02c","#d62728","#9467bd",
        "#8c564b","#e377c2","#7f7f7f", "#bcbd22", "#17becf",
        "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099",
        "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395",
        "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300",
        "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    return CSS_COLORS [i % CSS_COLORS.length];
};

function scale(domain, range, value) {
    var scale = d3.scale.linear()
        .domain(domain)
        .range(range);
    return scale(value);
}

this.loadPartCenters = function(file1, file2){
    function loadLinks() {
        return new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: file2,
                success: function (data) {
                    var lines = data.split('\n');
                    for (var i = 0; i < lines.length; i++) {
                        var line = graph.lines[i];
                        var terms = line.split(',');
                        if (terms.length >= 2) {
                            var sourceID = graph.nodeMaps[terms[0].trim()];
                            var targetID = graph.nodeMaps[terms[1].trim()];
                            if (sourceID && targetID) {
                                var distance1 = (graph.nodes[sourceID].width + graph.nodes[targetID].width) / 2;
                                var distance2 = (graph.nodes[sourceID].height + graph.nodes[targetID].height) / 2;
                                var distance = distance1;
                                var direction = "";
                                if (terms.length >= 3) {
                                    direction = terms[2].trim();
                                    if ((direction == "tb") || (direction == "bt"))
                                        distance = distance2;
                                } else {
                                    distance = Math.min(distance1, distance2);
                                }
                                var link = {source: graph.nodes[sourceID], target: graph.nodes[targetID],
                                    distance: distance, direction: direction
                                };
                                graph.links.push(link);
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

    function loadNodes(){
        return new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: file1,
                success: function(data) {
                    var lines = data.split('\n');
                    for(var i = 0; i < lines.length; i++){
                        var line = lines[i];
                        var terms = line.split(',');
                        var name = terms[0].trim();
                        if (!graph.nodeMaps[name]){
                            graph.nodes[i + 1] = {id: i + 1, label: name,
                                width: parseFloat(terms[1]),
                                height: parseFloat(terms[2])
                            };
                            graph.nodeMaps[name] = i + 1;
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
    return loadNodes().then(loadLinks);
};

this.drawPartCenters = function(svg, vp) {
    svg.selectAll("g").remove();
    var width = vp.size.width, height = vp.size.height;
    var force = d3.layout.force()
        .size([width, height])
        .charge(-300)
        .linkDistance(function(d) { return d.distance;});

    force.nodes(d3.values(nodes)).links(links);

    var link = svg.append("g").selectAll("path")
        .data(force.links())
        .enter().append("path")
        .style("stroke-dasharray", ("3, 3"))
        .attr("stroke", "#ccc");

    var node = svg.append("g").selectAll("rect")
        .data(force.nodes())
        .enter().append("rect")
        .attr("width", function(d){return d.width;})
        .attr("height", function(d){return d.height;})
        .attr("x", function(d){return -d.width/2;})
        .attr("y", function(d){return -d.height/2;})
        .attr("fill", "#eee")
        .attr("stroke", "#000")
        .call(force.drag);

    var text = svg.append("g").selectAll("text")
        .data(force.nodes())
        .enter().append("text")
        .style("text-anchor", "middle")
        .text(function (d) {return d.id + ((d.label)? ":" + d.label: "") ;});

    force.on("tick", update).start();

    function update() {
        link.attr("d", function(d){
            return linkArc(d, width, height);
        });
        node.attr("transform", transform);
        text.attr("transform", transform);
    }

};

this.drawVoronoi = function(svg, vp){
    svg.selectAll("g").remove();
    var width = vp.size.width, height = vp.size.height;
    var force = d3.layout.force()
        .size([width, height])
        .charge(-300)
        .linkDistance(function(d) { return d.distance;});

    force.nodes(d3.values(nodes)).links(links);

    var d3_geom_voronoi = d3.geom.voronoi().x(function(d) { return d.x; }).y(function(d) { return d.y;});

    var vertices = force.nodes();
    var path = svg.append("g").selectAll("path");

    var text = svg.append("g").selectAll("text")
        .data(vertices)
        .enter()
        .append("text")
        .attr("y", -5)
        .style("text-anchor", "middle")
        .text(function (d) {return d.id +(d.label)? ":" + d.label: "" ;});

    var link = svg.append("g").selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("stroke", "#ccc")
        .style("stroke-dasharray", ("3, 3"));

    var node = svg.append("g").selectAll("circle")
        .data(vertices)
        .enter().append("circle")
        .attr("r", 3)
        .call(force.drag);

    force.on("tick", update).start();

    function update() {
        path.data(d3_geom_voronoi(vertices))
            .enter().append("path")
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

        link.attr("d", function(d){
            return linkArc(d, width, height);
        });
        node.attr("transform", transform);
        text.attr("transform", transform);
    }
};

function collide(alpha) {
    var padding = 1; // separation between nodes
    var quadtree = d3.geom.quadtree(graph.nodes);
    return function(d) {
        var rx = d.width + padding,
            ry = d.height + padding,
            nx1 = d.x - rx,
            nx2 = d.x + rx,
            ny1 = d.y - ry,
            ny2 = d.y + ry;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y;
                if (x < rx) {
                    var dx = (x - rx) / x * alpha;
                    d.x -= x *= dx;
                    quad.point.x += x;
                }
                if (y < ry){
                    var dy = (y - ry) / y * alpha;
                    d.y -= y *= dy;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}

function linkArc(d, width, height) {
    function swap(d, prop){
        var tmp = d.source[prop];
        d.source[prop] = d.target[prop];
        d.target[prop] = tmp;
    }

    //screen boundaries
    if (d.source.x < d.source.width/2) d.source.x = d.source.width/2;
    if (d.source.y < d.source.height/2) d.source.y = d.source.height/2;
    if (d.source.x > width - d.source.width/2)  d.source.x = width - d.source.width/2;
    if (d.source.y > height - d.source.height/2) d.source.y = height - d.source.height/2;

    if (d.target.x < d.target.width/2) d.target.x = d.target.width/2;
    if (d.target.y < d.target.height/2) d.target.y = d.target.height/2;
    if (d.target.x > width - d.target.width / 2) d.target.x = width - d.target.width / 2;
    if (d.target.y > height - d.target.height / 2) d.target.y = height - d.target.height / 2;

    //preserve link directions
    if ((d.direction == "lr" && d.source.x > d.target.x) ||
        (d.direction == "rl" && d.source.x < d.target.x)) swap(d, "x");
    if ((d.direction == "tb" && d.source.y > d.target.y) ||
        (d.direction == "bt" && d.source.y < d.target.y)) swap(d, "y");

    return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
}

//Scales distances of selected links
this.scaleDistances = function (scaleFactor){
    if (graph.selected){
        var links = graph.getSelectedLinks();
        for (var i = 0; i < links.length; i++){
            links[i].distance = links[i].distance * scaleFactor;
        }
    }
};