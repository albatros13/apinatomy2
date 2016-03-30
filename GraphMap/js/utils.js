/**
 * Created by Natallia on 3/3/2016.
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

function Graph(links, nodes){
    this.links = links;
    this.nodes = nodes;

    var graph = this;

    var width = 1200, height = 600;
    var svg = d3.select("#svgGraph").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
        .size([width, height])
        .charge(-1000)
        .linkDistance(function(d) { return d.distance;});

    force.nodes(d3.values(nodes)).links(links);

    this.draw = function() {
        svg.selectAll("g").remove();

        var link = svg.append("g").selectAll("path")
            .data(force.links())
            .enter().append("path")
            //.attr("stroke", "#000");
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

        /*
        var node = svg.append("g").selectAll("circle")
            .data(force.nodes())
            .enter().append("circle")
            .attr("r", 3)
            .call(force.drag);*/

        var text = svg.append("g").selectAll("text")
            .data(force.nodes())
            .enter().append("text")
            .style("text-anchor", "middle")
            .text(function (d) {return d.id + ((d.label)? ":" + d.label: "") ;});

        force.on("tick", update).start();

        function update() {
            link.attr("d", linkArc);
            node.attr("transform", transform);
            text.attr("transform", transform);
        }
    };

    this.drawVoronoi = function(){
        svg.selectAll("g").remove();

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

        //var hull = svg.append("g").append("path").attr("class", "hull");

        force.on("tick", update).start();

        function update() {
            path.data(d3_geom_voronoi(vertices))
                .enter().append("path")
                .attr("fill", "#fff")
                .attr("stroke", "#000")
                .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

            link.attr("d", linkArc);
            node.attr("transform", transform);
            text.attr("transform", transform);

            //var points = vertices.map(function(d) {return [d.x, d.y];});
            //hull.datum(d3.geom.hull(points)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
        }
    };

    function linkArc(d) {
        function swapX(d){
            var tmp = d.source.x;
            d.source.x = d.target.x;
            d.target.x = tmp;
        }

        function swapY(d){
            var tmp = d.source.y;
            d.source.y = d.target.y;
            d.target.y = tmp;
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
        if (d.direction == "lr" && d.source.x > d.target.x) swapX(d);
        if (d.direction == "rl" && d.source.x < d.target.x) swapX(d);
        if (d.direction == "tb" && d.source.y > d.target.y) swapY(d);
        if (d.direction == "bt" && d.source.y < d.target.y) swapY(d);

        /*
        if (d.direction == "lr" || d.direction == "rl"){
            var delta = Math.abs(d.source.x - d.target.x);
            if (delta < d.distance){
                d.source.x -= (d.distance - delta)/2;
                d.target.x += (d.distance - delta)/2;
            }
        }

        if (d.direction == "tb" || d.direction == "bt"){
            var delta = Math.abs(d.source.y - d.target.y);
            if (delta < d.distance){
                d.source.y -= (d.distance - delta)/2;
                d.target.y += (d.distance - delta)/2;
            }
        }*/

        //guarantee min distance

        return "M" + d.source.x + ' ' + d.source.y + " L" + d.target.x + ' ' + d.target.y;
    }

    function transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }
}