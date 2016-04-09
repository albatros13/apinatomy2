/**
 * Created by Natallia on 3/3/2016.
 */
function extractID(url){
    var delimeterPos;
    if (url.indexOf("fma#") > 0)
        delimeterPos = url.indexOf("fma#") + 4;
    else if (url.indexOf("gene_ontology#") > 0)
        delimeterPos = url.indexOf("gene_ontology") + "gene_ontology#".length;
    else
        delimeterPos = url.lastIndexOf("/") +1;
    return url.substring(delimeterPos).trim();
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
    var res = d.type;
    res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.source) + "</div>";
    res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.target) + "</div>";
    return "<div>" + res + "</div>";
}

var CSS_COLOR_NAMES = ["Black","Blue","BlueViolet","Brown", "Chocolate",
    "DarkBlue","DarkCyan", "DarkGrey","DarkGreen","DarkKhaki","DarkMagenta",
    "DarkOliveGreen","Darkorange", "DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue",
    "DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue"];

function Graph(links, nodeAnnotations){
    this.links = links;
    this.nodeAnnotations = nodeAnnotations;
    this.incrementStep = 1;

    var graph = this;

    var visibleNodes = {};
    var visibleLinks = [];
    var linkTypes = [];

    this.setVisibleLinks = function(linkSet){
        var graph = this;
        visibleLinks = linkSet;
        linkTypes = [];
        visibleLinks.forEach(function(link) {
            ["source", "target"].forEach(function(prop){
                if (link[prop].id) link[prop] = link[prop].id;
                var obj = {id: link[prop]};
                var annotation = graph.nodeAnnotations[link[prop]];
                if (annotation){
                    obj.label = annotation.label;
                    obj.URI = annotation.URI;
                }
                link[prop] = visibleNodes[link[prop]] ||
                    (visibleNodes[link[prop]] = obj);

            });
            if (linkTypes.indexOf(link.type) < 0) linkTypes.push(link.type);
        });
    };

    this.reset = function(){
        visibleNodes = {};
        visibleLinks = [];
    };

    function breadthSearch(linkSet, nodeID, radius){
        if (radius == 0) return [];
        var selectedLinks = [];

        var traverse = function(rootID, hop){
            var queue = linkSet.filter(function(d){
                return (
                    d.source.id && (d.source.id === rootID) ||
                    d.target.id && (d.target.id === rootID) ||
                    d.source === rootID ||
                    d.target === rootID
                );
            });

            if (!queue) return;
            queue.forEach(function(d){
                if (selectedLinks.indexOf(d) < 0) selectedLinks.push(d);
                if ((hop + 1) < radius){
                    var newRootID = "";
                    if (d.target.id && d.target.id != rootID) newRootID = d.target.id;
                    if (d.source.id && d.source.id != rootID) newRootID = d.source.id;
                    if (newRootID == ""){
                        if (d.target && d.target != rootID) newRootID = d.target;
                        if (d.source && d.source != rootID) newRootID = d.source;
                    }
                    traverse(newRootID, hop + 1);
                }
            })
        };
        traverse(nodeID, 0);

        return selectedLinks;
    }

    this.createSubGraph = function(rootID, radius){
        this.reset();
        var selectedLinks = breadthSearch(graph.links, rootID, radius);
        this.setVisibleLinks(selectedLinks);
        if (visibleNodes[rootID]) visibleNodes[rootID].radius = radius;
        this.update();
    };

    this.expandSubGraph = function(rootID, radius){
        var selectedLinks = breadthSearch(graph.links, rootID, radius);
        var toAdd = [];
        for (var i = 0; i < selectedLinks.length; i++){
            var link = selectedLinks[i];
            var exists = false;
            for (var j = 0; j < visibleLinks.length; j++){
                var d = visibleLinks[j];
                if ((d.source.id == link.source || d.source.id == link.source.id) &&
                    (d.target.id == link.target || d.target.id == link.target.id) &&
                    (d.type == link.type)){
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                toAdd.push(link);
            }
        }
        if (toAdd.length >0) {
            toAdd.forEach(function (d) {
                visibleLinks.push(d);
            });
            this.setVisibleLinks(visibleLinks);
        }
        if (visibleNodes[rootID]) visibleNodes[rootID].radius = radius;
        if (toAdd.length >0) this.update();

    };

    this.contactSubGraph = function(rootID, radius){
        var toRemove = breadthSearch(visibleLinks, rootID, radius);

        function removeAll(toRemove, array){
            toRemove.forEach(function(d){
                var index = array.indexOf(d);
                if (index > -1){
                    array.splice(index, 1);
                }
            });
        }

        if (toRemove.length > 0) {
            removeAll(toRemove, visibleLinks);

            if (visibleNodes[rootID]) visibleNodes[rootID].present = true;
            visibleLinks.forEach(function (link) {
                ["source", "target"].forEach(function (prop) {
                    if (visibleNodes[link[prop].id])
                        visibleNodes[link[prop].id].present = true;
                });
            });

            var nodesToRemove = [];
            for (var key in visibleNodes) {
                if (visibleNodes.hasOwnProperty(key)) {
                    if (!visibleNodes[key].present)
                        nodesToRemove.push(key);
                    else
                        delete visibleNodes[key].present;
                }
            }

            if (nodesToRemove.length > 0) {
                nodesToRemove.forEach(function (key) {
                    delete visibleNodes[key];
                })
            }
            this.setVisibleLinks(visibleLinks);
        }
        if (visibleNodes[rootID]) visibleNodes[rootID].radius = 0;
        if (toRemove.length > 0) this.update();

    };

    var w = 1000, h = 500;
    var svg = d3.select("#svgGraph").append("svg")
        .attr("width", w)
        .attr("height", h);

    var force = d3.layout.force()
        .size([w, h])
        .linkDistance(60)
        .charge(-300);

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    ///////////////////////////////
    this.update = function() {
        svg.selectAll('g').remove();
        svg.selectAll("defs").remove();

        force.nodes(d3.values(visibleNodes))
            .links(visibleLinks)
            .on("tick", tick)
            .start();

        svg.append("defs").selectAll("marker")
            .data(linkTypes)      // Different link/path types can be defined here
            .enter().append("marker")    // This section adds in the arrows
            .attr("id", function(d){return ('marker' + d);})
            .attr('fill', function(d, i) {return CSS_COLOR_NAMES [i % CSS_COLOR_NAMES.length];})
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
            .data(force.links())
            .enter().append("path")
            .style("stroke", function (d) {
                return CSS_COLOR_NAMES [linkTypes.indexOf(d.type) % CSS_COLOR_NAMES.length];
            })
            .attr("marker-end", function (d) {
                return "url(#marker" + d.type +")";
            })
            .on('click', linkClickHandler);

        link.on("mouseover", function(d) {
            tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(getHTMLLinkAnnotation(d))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition().duration(500).style("opacity", 0);
            });


        var node = svg.append("g").selectAll("circle")
            .data(force.nodes())
            .enter().append("circle")
            .attr("r", function(d){
                if (d.radius) return 12;
                return 7;
            })
            .attr("class", function(d){
                if (d.radius) return "expanded";
                return "";
            })
            .on('dblclick', nodeDblClickHandler)
            .on('click', nodeClickHandler)
            .call(force.drag);

        node.on("mouseover", function(d) {
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(getHTMLNodeAnnotation(d))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition().duration(500).style("opacity", 0);
            });

        var text = svg.append("g").selectAll("text")
            .data(force.nodes())
            .enter().append("text")
            .attr("x", 8)
            .attr("y", ".31em")
            .text(function (d) {return (d.label? d.label: d.id);});

        ////////////////////////////////////////////

        function nodeDblClickHandler(node){
            var circle = d3.select(this);
            circle.classed("expanded", !circle.classed("expanded"));
            if (node.radius){
                graph.contactSubGraph(node.id, graph.incrementStep);
            } else {
                graph.expandSubGraph(node.id, graph.incrementStep);
            }
        }

        function nodeClickHandler (node){
            var circle = d3.select(this);
            var circles = svg.selectAll("circle");
            var other = circles.filter(function(d){return d != circle;});
            other.classed("selected", false);
            circle.classed("selected", !circle.classed("selected"));
            if (graph.nodeClickHandler) graph.nodeClickHandler(node);
        }

        function linkClickHandler (link){
            var path = d3.select(this);
            var paths = svg.selectAll("path");
            var other = paths.filter(function(d){return d != path;});
            other.classed("selected", false);
            path.classed("selected", !path.classed("selected"));
            if (graph.linkClickHandler) graph.linkClickHandler(link);
        }

        // Use elliptical arc path segments to doubly-encode directionality.
        function tick() {
            link.attr("d", linkArc);
            node.attr("transform", transform);
            text.attr("transform", transform);
        }

        function linkArc(d) {
            var dx = (d.target.x - d.source.x),
                dy = (d.target.y - d.source.y),
                dr = Math.sqrt(dx * dx + dy * dy),
                ratio = (dr - 10) / dr;
            dx *= (1 - ratio), dy *= (1 - ratio);
            //return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            return "M" + d.source.x + ' ' + d.source.y + " L" + (d.target.x  - dx) + ' ' + (d.target.y - dy);
        }

        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }
    }

}