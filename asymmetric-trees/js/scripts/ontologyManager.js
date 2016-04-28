var OntologyManager = (function(){

    var links = [];
    var nodeAnnotations = [];
    var linkTypes = {};

    var allLinks = links;

    var resources = {
        fma: {relations: "resources/fmaParts.txt", annotations: "resources/fmaNames.txt"},
        cl: {relations: "resources/cl-basicRelations.txt", annotations: "resources/cl-basicNames.txt"},
        brain: {relations: "resources/fmaBrainGraph.txt", annotations: "resources/fmaNames.txt"}
    };

    var graph = new Graph(links, nodeAnnotations);

    graph.nodeClickHandler = function(d){
        $( "#nodeInfo").html(getHTMLNodeAnnotation(d));
    };
    graph.linkClickHandler = function (d){
        $( "#linkInfo").html(getHTMLLinkAnnotation(d));
    };
    graph.iconClickHandler = function (d){
        $( "#lyphInfo").html(getHTMLIconAnnotation(d));
        $( "#btnShowLyph").prop("disabled", false);
        $( "#btnRemoveLyph").prop("disabled", false);
    };

    function init() {
        $( "#btnUpdate" ).on('click', function() {
            updateView(true);
        });

        $( "#btnExtend" ).on('click', function() {
            updateView(false);
        });

        $( "#btnClean" ).on('click', function() {
            graph.reset();
            graph.update();
        });

        $( "#btnLoad" ).on('click', function() {
            selectOntologies();
        });

        $( "#btnAddLyph" ).on('click', function() {
            if (graph.lyphRepo){
                var newObj = graph.lyphRepo.defaultObject();
                graph.lyphRepo.add(newObj);
                //update (new)
                newObj.fmaID = graph.selectedNode.id;
                newObj.name = graph.selectedNode.label;
                newObj.status = "new";
                //update view and open
                graph.lyphRepo.updateContent();
                newObj.open();
                graph.update();
            }
        });

        $( "#btnRemoveLyph" ).on('click', function() {
            if (graph.lyphRepo && graph.selectedLyph){
                graph.selectedLyph.remove();
                $( "#lyphInfo").html("");
                $( "#btnShowLyph").prop("disabled", true);
                $( "#btnRemoveLyph").prop("disabled", true);
                graph.update();
            }
        });

        $( "#btnShowLyph" ).on('click', function() {
            if (graph.lyphRepo && graph.showLyph){
                graph.showLyph(graph.selectedLyph);
            }
        });

        $("input:checkbox[name=ontology]").change(function() {
            $( "#btnLoad").prop("disabled", false);
        });

        $(function() {
            var result = null;
            $( "#ontname" ).autocomplete({
                source: function( request, response ) {
                    $.ajax({
                        url: "http://open-physiology.org:5052/autocomplete-case-insensitive/" + request.term,
                        dataType: "jsonp",
                        data: {
                            q: request.term
                        },
                        success: function( data ) {
                            result = data;
                            response( data.Results);
                        }
                    });
                },
                minLength: 1,
                select: function( event, ui ) {
                    var index = result.Results.indexOf(ui.item.value);
                    if (index >= 0){
                        var value = result.IRIs[index][0].iri;
                        $('#ontid').val(ApiNATOMY2.Utils.extractID(value));
                    }
                }
            });
        });

        selectOntologies();
    }

    function updateView(reset){
        var root =  $('#ontid').val();
        if (root.length == 0) return;
        var radius = $("#radius").val();
        if (!radius) radius = 2;
        var step = $("#step").val();
        if (!step) step = 1;
        graph.incrementStep = step;
        if (reset){
            graph.createSubGraph(root, radius);
        } else {
            graph.expandSubGraph(root, radius);
        }
        $( "#nodeInfo").html("");
        $( "#linkInfo").html("");
        $( "#lyphInfo").html("");
    }

    function updateLinkTypes(){
        linkTypes = {};
        graph.links.forEach(function(link){
            if (!linkTypes[link.type])
                linkTypes[link.type] = 0;
            else linkTypes[link.type] += 1;
        });
        $("#linkTypes").html("<legend>Link types</legend>");

        for (var key in linkTypes){
            var input = $('<input type="checkbox" name="linkType" value="' + key + '" checked>' + key + " " + "</input>");
            input.appendTo($("#linkTypes"));
            graph.visibleLinkTypes[key] = {color: ApiNATOMY2.Utils.rowColor(d3.keys(linkTypes).indexOf(key))};
        }

        $('input:checkbox[name=linkType]').click (function(){
            var linkType = $(this).val();
            if (this.checked){
                var toAdd = allLinks.filter(function(link){return link.type == linkType;});
                graph.links = graph.links.concat(toAdd);
                graph.visibleLinkTypes[linkType] = {color: ApiNATOMY2.Utils.rowColor(d3.keys(linkTypes).indexOf(linkType))};
            } else {
                graph.links = graph.links.filter(function(link){return link.type != linkType;});
                delete graph.visibleLinkTypes[linkType];
            }
            updateView(true);
        });
    }

    function loadOntologyData(ontology){
        var file = resources[ontology].relations;
        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                for(var i = 0; i < lines.length; i++){
                    var line = lines[i];
                    var terms = line.split(' ');
                    if (terms.length >= 3){
                        var link = {source: ApiNATOMY2.Utils.extractID(terms[1]), target: ApiNATOMY2.Utils.extractID(terms[2]),
                            type: terms[0].trim(), ontology: ontology};
                        links.push(link);
                    }
                }
                resources[ontology].included = true;
                $( "#graphInfo").html("Loaded relations: " + graph.links.length);
                allLinks = links.slice(0, links.length);
                updateLinkTypes();
                if (!resources[ontology].annotated)
                    loadNodeAnnotations(ontology);
            }
        });
    }

    function loadNodeAnnotations(ontology){
        var file = resources[ontology].annotations;
        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                for(var i = 0; i < lines.length; i++){
                    var line = lines[i];
                    var endOfURI = line.indexOf(' ');
                    if (endOfURI > -1){
                        var URI = line.substring(0, endOfURI);
                        var id = ApiNATOMY2.Utils.extractID(line.substring(0, endOfURI));
                        nodeAnnotations[id] = {label: line.substring(endOfURI + 1), URI: URI}
                    }
                }
                resources[ontology].annotated = true;
            },
            complete: function(){
                updateView(true);
            }
        });
    }

    function selectOntologies(){
        links = allLinks;
        var toRemove = [];
        $("input:checkbox[name=ontology]").each(function(){
            var ontology = $(this).val();
            if (this.checked){
                if (!resources[ontology].included){
                    loadOntologyData(ontology);
                }
            }
            else {
                if (resources[ontology].included){
                    toRemove.push(ontology);
                    resources[ontology].included = false;
                }
            }
        });
        if (toRemove.length > 0){
            links = links.filter(function(d){
                return (toRemove.indexOf(d.ontology) < 0);
            });
            allLinks = allLinks.filter(function(d){
                return (toRemove.indexOf(d.ontology) < 0);
            });
        }
        graph.links = links;
        $( "#graphInfo").html("Loaded relations: " + graph.links.length);
        updateLinkTypes();
        $( "#btnLoad").prop("disabled", true);
    }

    function showTerm(value, name){
        $('#ontid').val(value);
        $('#ontname').val(name);
        updateView(true);
    }

    function getHTMLNodeAnnotation(d){
        if (!d) return "";
        var res = d.id;
        if (d.label) res += ": " + d.label;
        if (d.URI) res += '</br>' + d.URI;
        return "<div>" + res + "</div>";
    }

    function getHTMLIconAnnotation(d){
        if (!d) return "";
        var res = d.id;
        if (d.name) res += ": " + d.name;
        if (d.fmaID) res += '</br> Ontology ID: ' + d.fmaID;
        return "<div>" + res + "</div>";
    }

    function getHTMLLinkAnnotation(d){
        if (!d) return "";
        var res = d.type;
        res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.source) + "</div>";
        res += "<div  class='dotted'>" + getHTMLNodeAnnotation(d.target) + "</div>";
        return "<div>" + res + "</div>";
    }

    function Graph(links, nodeAnnotations){
        this.links = links;
        this.nodeAnnotations = nodeAnnotations;
        this.incrementStep = 1;
        this.lyphRepo = null;

        this.selectedNode = null;
        this.selectedLink = null;
        this.selectedLyph = null;

        var graph = this;

        var visibleNodes = {};
        var visibleLinks = [];
        this.visibleLinkTypes = {};

        this.vp = {size: {width: 1000, height: 500}};

        var force = d3.layout.force();
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        this.getVisibleLinks = function(){
            return visibleLinks;
        };

        this.setVisibleLinks = function(linkSet){
            var graph = this;
            visibleNodes = {};
            visibleLinks = [];
            linkSet.forEach(function(link) {
                if (graph.visibleLinkTypes[link.type]) {
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
                        visibleLinks.push(link);
                    });
                }
            });
        };

        this.reset = function(){
            visibleNodes = {};
            visibleLinks = [];
        };

        function breadthSearch(linkSet, nodeID, radius){
            if (radius == 0) return [];
            var newLinks = [];

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
                    if (newLinks.indexOf(d) < 0) newLinks.push(d);
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

            return newLinks;
        }

        this.createSubGraph = function(rootID, radius){
            this.reset();
            this.rootID = rootID;
            var newLinks = breadthSearch(graph.links, rootID, radius);
            this.setVisibleLinks(newLinks);
            if (visibleNodes[rootID]) visibleNodes[rootID].radius = radius;
            this.update();
        };

        this.expandSubGraph = function(rootID, radius){
            var newLinks = breadthSearch(graph.links, rootID, radius);
            var toAdd = [];
            for (var i = 0; i < newLinks.length; i++){
                var link = newLinks[i];
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

        ///////////////////////////////
        this.update = function() {
            var w = graph.vp.size.width;
            var h = graph.vp.size.height;

            var svg = d3.select("#ontologyGraph").attr("width", w).attr("height", h);

            svg.selectAll('g').remove();
            svg.selectAll("defs").remove();

            force.size([w, h])
                .linkDistance(60)
                .charge(-300);

            force.nodes(d3.values(visibleNodes))
                .links(visibleLinks)
                .on("tick", tick)
                .start();

            svg.append("defs").selectAll("marker")
                .data(d3.entries(graph.visibleLinkTypes))      // Different link/path types can be defined here
                .enter().append("marker")    // This section adds in the arrows
                .attr("id", function(d){return ('marker' + d.key);})
                .attr('fill', function(d) {return d.value.color;})
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
                    return graph.visibleLinkTypes[d.type].color;
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

            var myGroups = svg.append('g').selectAll(".term").data(force.nodes());
            var myGroupsEnter = myGroups.enter().append("g").attr("class", "term");
            var node = myGroupsEnter.append("circle")
                .attr("r", function(d){
                    if (d.radius) return 12;
                    return 7;
                })
                .attr("class", function(d){
                    if (d.radius) return "expanded";
                    return "";
                });

            node.on('dblclick', nodeDblClickHandler)
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

            var icon = myGroupsEnter.append("g").attr("class", "icon");

            if (graph.lyphRepo) {
                icon.each(function(d){
                    var lyphTemplates = graph.lyphRepo.getItemsByOntologyID(d.id);
                    if (lyphTemplates && lyphTemplates.length > 0){
                        var vpIcon = new ApiNATOMY2.VisualParameters({
                            scale : {width: 20, height: 4},
                            size  : {width: 20, height: 20},
                            margin: {x: 10, y: 10}
                        });
                        var iconSvg = d3.select(this).data([d]);
                        lyphTemplates.forEach(function(d){
                            if (d.isValid()){
                                d.drawIcon(iconSvg, vpIcon, iconClickHandler);
                                vpIcon.margin.x += 20;
                            }
                        });
                    }
                });
            }

            var text = myGroupsEnter.append("text")
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
                graph.selectedNode = node;
                var circle = d3.select(this);
                var circles = svg.selectAll("circle");
                var other = circles.filter(function(d){return d != circle;});
                other.classed("selected", false);
                circle.classed("selected", !circle.classed("selected"));
                if (graph.nodeClickHandler) graph.nodeClickHandler(node);
            }

            function linkClickHandler (link){
                graph.selectedLink = link;
                var path = d3.select(this);
                var paths = svg.selectAll("path");
                var other = paths.filter(function(d){return d != path;});
                other.classed("selected", false);
                path.classed("selected", !path.classed("selected"));
                if (graph.linkClickHandler) graph.linkClickHandler(link);
            }

            function iconClickHandler(lyph, lyphGroup){
                graph.selectedLyph = lyph;
                var lyphGroups = svg.selectAll(".lyph");
                var other = lyphGroups.filter(function(d){return d != lyphGroup});
                other.classed("selected", false).style("outline", "");
                lyphGroup.classed("selected", true);
                lyphGroup.style("outline", "thin solid red");
                if (graph.iconClickHandler) graph.iconClickHandler(lyph);
            }

            function tick() {
                link.attr("d", linkArc);
                myGroups.attr("transform", transform);
            }

            function linkArc(d) {
                ["source", "target"].forEach(function(prop){
                    d[prop].x = Math.min(w, Math.max(0, d[prop].x));
                    d[prop].y = Math.min(h, Math.max(0, d[prop].y));
                });

                var dx = (d.target.x - d.source.x),
                    dy = (d.target.y - d.source.y),
                    dr = Math.sqrt(dx * dx + dy * dy),
                    ratio = (dr - 10) / dr;
                dx *= (1 - ratio); dy *= (1 - ratio);

                return "M" + d.source.x + ' ' + d.source.y + " L" + (d.target.x  - dx) + ' ' + (d.target.y - dy);
            }

            function transform(d) {
                return "translate(" + d.x + "," + d.y + ")";
            }
        }
    }

    return {
        init: init,
        showTerm: showTerm,
        graph: graph
    }
}());