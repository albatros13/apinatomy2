"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var color = d3.scale.category20();
var HierarchyTreeWidget = (function () {
    function HierarchyTreeWidget(el, vc, resolver) {
        this.el = el;
        this.vc = vc;
        this.resolver = resolver;
        this.depth = -1;
        this.vp = { size: { width: 400, height: 600 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 20 } } };
        this.selected = new core_1.EventEmitter();
    }
    HierarchyTreeWidget.prototype.ngOnInit = function () {
        this.setPanelSize(window.innerWidth, window.innerHeight);
    };
    HierarchyTreeWidget.prototype.onResize = function (event) {
        this.setPanelSize(event.target.innerWidth, event.target.innerHeight);
    };
    HierarchyTreeWidget.prototype.setPanelSize = function (innerWidth, innerHeight) {
        var w = innerWidth / 2 - 2 * this.vp.margin.x;
        var h = innerHeight / 2 - 2 * this.vp.margin.y;
        var delta = 10;
        if ((Math.abs(this.vp.size.width - w) > delta) || (Math.abs(this.vp.size.height - h) > delta)) {
            this.vp.size = { width: w, height: h };
            if (this.svg) {
                this.draw(this.svg, this.vp, this.data);
            }
        }
    };
    HierarchyTreeWidget.prototype.ngOnChanges = function (changes) {
        this.svg = d3.select(this.el.nativeElement).select('svg');
        if (this.item) {
            this.data = this.getTreeData(this.item, this.relation, this.depth);
            this.draw(this.svg, this.vp, this.data);
        }
        else {
            this.data = {};
            this.svg.selectAll(".tree").remove();
        }
    };
    HierarchyTreeWidget.prototype.draw = function (svg, vp, data) {
        var w = vp.size.width - 2 * vp.margin.x;
        var h = vp.size.height - 2 * vp.margin.y;
        svg.selectAll("g").remove();
        var selectedNode = null;
        var draggingNode = null;
        var panSpeed = 200;
        var panBoundary = 20;
        var i = 0;
        var duration = 750;
        var root;
        var panTimer;
        var nodes = [];
        var links = [];
        var dragStarted;
        var domNode;
        function coordinates(d) {
            switch (this.layout) {
                case "top-to-bottom": return [d.x, d.y];
                case "right-to-left": return [w - d.y, d.x];
                case "bottom-to-top": return [d.x, h - d.y];
                case "left-to-right": return [d.y, d.x];
            }
            return [d.x, d.y];
        }
        var tree = d3.layout.tree().size([h, w]);
        var diagonal = d3.svg.diagonal().projection(function (d) {
            return [d.y, d.x];
        });
        // sort the tree according to the node names
        function sortTree() {
            tree.sort(function (a, b) {
                return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
            });
        }
        sortTree();
        function pan(domNode, direction) {
            var speed = panSpeed;
            if (panTimer) {
                clearTimeout(panTimer);
                var translateCoords = d3.transform(svgGroup.attr("transform"));
                if (direction == 'left' || direction == 'right') {
                    var translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                    var translateY = translateCoords.translate[1];
                }
                else if (direction == 'up' || direction == 'down') {
                    translateX = translateCoords.translate[0];
                    translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
                }
                var scale = zoomListener.scale();
                svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
                d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
                zoomListener.scale(zoomListener.scale());
                zoomListener.translate([translateX, translateY]);
                panTimer = setTimeout(function () {
                    pan(domNode, direction);
                }, 50);
            }
        }
        // Define the zoom function for the zoomable tree
        function zoom() {
            svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
        // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
        var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);
        // define the baseSvg, attaching a class for styling and the zoomListener
        var treeSvg = svg.append("g").attr("class", "tree").attr("width", vp.size.width).attr("height", vp.size.height)
            .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")")
            .call(zoomListener);
        function initiateDrag(d, domNode) {
            draggingNode = d;
            d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
            d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
            d3.select(domNode).attr('class', 'node activeDrag');
            svgGroup.selectAll("g.node").sort(function (a, b) {
                if (a.id != draggingNode.id)
                    return 1;
                else
                    return -1;
            });
            // if nodes has children, remove the links and nodes
            if (nodes.length > 1) {
                // remove link paths
                links = tree.links(nodes);
                var nodePaths = svgGroup.selectAll("path.link")
                    .data(links, function (d) {
                    return d.target.id;
                }).remove();
                // remove child nodes
                var nodesExit = svgGroup.selectAll("g.node")
                    .data(nodes, function (d) {
                    return d.id;
                }).filter(function (d, i) {
                    if (d.id == draggingNode.id) {
                        return false;
                    }
                    return true;
                }).remove();
            }
            // remove parent link
            var parentLink = tree.links(tree.nodes(draggingNode.parent));
            svgGroup.selectAll('path.link').filter(function (d, i) {
                if (d.target.id == draggingNode.id) {
                    return true;
                }
                return false;
            }).remove();
            dragStarted = null;
        }
        // Define the drag listeners for drag/drop behaviour of nodes.
        var dragListener = d3.behavior.drag()
            .on("dragstart", function (d) {
            if (d == root) {
                return;
            }
            dragStarted = true;
            nodes = tree.nodes(d);
            d3.event.sourceEvent.stopPropagation();
        })
            .on("drag", function (d) {
            // if (d == root) {return;}
            if (dragStarted) {
                domNode = this;
                initiateDrag(d, domNode);
            }
            // get coords of mouseEvent relative to svg container to allow for panning
            var el = svg; //d3.select('svg').get(0);
            var relCoords = d3.mouse(el);
            if (relCoords[0] < panBoundary) {
                panTimer = true;
                pan(this, 'left');
            }
            else if (relCoords[0] > (el.width() - panBoundary)) {
                panTimer = true;
                pan(this, 'right');
            }
            else if (relCoords[1] < panBoundary) {
                panTimer = true;
                pan(this, 'up');
            }
            else if (relCoords[1] > (el.height() - panBoundary)) {
                panTimer = true;
                pan(this, 'down');
            }
            else {
                try {
                    clearTimeout(panTimer);
                }
                catch (e) { }
            }
            d.x0 += d3.event.dy;
            d.y0 += d3.event.dx;
            var node = d3.select(this);
            node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
            updateTempConnector();
        })
            .on("dragend", function (d) {
            if (d == root) {
                return;
            }
            domNode = this;
            if (selectedNode) {
                // now remove the element from the parent, and insert it into the new elements children
                var index = draggingNode.parent.children.indexOf(draggingNode);
                if (index > -1) {
                    draggingNode.parent.children.splice(index, 1);
                }
                if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
                    if (typeof selectedNode.children !== 'undefined') {
                        selectedNode.children.push(draggingNode);
                    }
                    else {
                        selectedNode._children.push(draggingNode);
                    }
                }
                else {
                    selectedNode.children = [];
                    selectedNode.children.push(draggingNode);
                }
                // Make sure that the node being added to is expanded so user can see added node is correctly moved
                expand(selectedNode);
                sortTree();
                endDrag();
            }
            else {
                endDrag();
            }
        });
        function endDrag() {
            selectedNode = null;
            d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
            d3.select(domNode).attr('class', 'node');
            // now restore the mouseover event or we won't be able to drag a 2nd time
            d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
            updateTempConnector();
            if (draggingNode !== null) {
                update(root);
                centerNode(draggingNode);
                draggingNode = null;
            }
        }
        // Helper functions for collapsing and expanding nodes.
        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }
        function expand(d) {
            if (d._children) {
                d.children = d._children;
                d.children.forEach(expand);
                d._children = null;
            }
        }
        var overCircle = function (d) {
            selectedNode = d;
            updateTempConnector();
        };
        var outCircle = function (d) {
            selectedNode = null;
            updateTempConnector();
        };
        // Function to update the temporary connector indicating dragging affiliation
        var updateTempConnector = function () {
            var data = [];
            if (draggingNode !== null && selectedNode !== null) {
                // have to flip the source coordinates since we did this for the existing connectors on the original tree
                data = [{
                        source: {
                            x: selectedNode.y0,
                            y: selectedNode.x0
                        },
                        target: {
                            x: draggingNode.y0,
                            y: draggingNode.x0
                        }
                    }];
            }
            var link = svgGroup.selectAll(".tempLink").data(data);
            link.enter().append("path")
                .attr("class", "tempLink")
                .attr("d", d3.svg.diagonal())
                .attr('pointer-events', 'none');
            link.attr("d", d3.svg.diagonal());
            link.exit().remove();
        };
        // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.
        function centerNode(source) {
            var scale = zoomListener.scale();
            var x = -source.x0 * scale + vp.size.width / 2;
            var y = -source.y0 * scale + vp.size.height / 2;
            d3.select('g').transition()
                .duration(duration)
                .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
            zoomListener.scale(scale);
            zoomListener.translate([x, y]);
        }
        // Toggle children function
        function toggleChildren(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            }
            else if (d._children) {
                d.children = d._children;
                d._children = null;
            }
            return d;
        }
        // Toggle children on click.
        function click(d) {
            if (d3.event.defaultPrevented)
                return; // click suppressed
            d = toggleChildren(d);
            update(d);
            centerNode(d);
        }
        function update(source) {
            // Compute the new height, function counts total children of root node and sets tree height accordingly.
            // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
            // This makes the layout more consistent.
            var levelWidth = [1];
            var childCount = function (level, n) {
                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1)
                        levelWidth.push(0);
                    levelWidth[level + 1] += n.children.length;
                    n.children.forEach(function (d) {
                        childCount(level + 1, d);
                    });
                }
            };
            childCount(0, root);
            var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line
            tree = tree.size([newHeight, w]);
            // Compute the new tree layout.
            nodes = tree.nodes(root).reverse();
            links = tree.links(nodes);
            // Set widths between levels.
            nodes.forEach(function (d) {
                d.y = (d.depth * 50);
            });
            // Update the nodes…
            var node = svgGroup.selectAll("g.node")
                .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });
            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .call(dragListener)
                .attr("class", "node")
                .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
                .on('click', click);
            nodeEnter.append("circle")
                .attr('class', 'nodeCircle')
                .attr("r", 0);
            nodeEnter.append("text")
                .attr("x", function (d) {
                return d.children || d._children ? -10 : 10;
            })
                .attr("dy", ".35em")
                .attr('class', 'nodeLabel')
                .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
                .text(function (d) {
                return d.name;
            })
                .style("fill-opacity", 0);
            // phantom node to give us mouseover in a radius around it
            nodeEnter.append("circle")
                .attr('class', 'ghostCircle')
                .attr("r", 30)
                .attr("opacity", 0.2) // change this to zero to hide the target area
                .style("fill", "red")
                .attr('pointer-events', 'mouseover')
                .on("mouseover", function (node) {
                overCircle(node);
            })
                .on("mouseout", function (node) {
                outCircle(node);
            });
            // Update the text to reflect whether node has children or not.
            node.select('text')
                .attr("x", function (d) {
                return d.children || d._children ? -10 : 10;
            })
                .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
                .text(function (d) {
                return d.name;
            });
            // Change the circle radius depending on whether it has children and is collapsed
            node.select("circle.nodeCircle")
                .attr("r", function (d) {
                return d._children ? 7 : 4.5;
            })
                .style("fill", function (d) {
                return color(d.class);
            });
            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });
            // Fade the text in
            nodeUpdate.select("text")
                .style("fill-opacity", 1);
            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
                .remove();
            nodeExit.select("circle")
                .attr("r", 0);
            nodeExit.select("text")
                .style("fill-opacity", 0);
            // Update the links…
            var link = svgGroup.selectAll("path.link")
                .data(links, function (d) {
                return d.target.id;
            });
            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });
            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);
            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
                .remove();
            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
        // Append a group which holds all nodes and which the zoom Listener can act upon.
        var svgGroup = treeSvg.append("g");
        // Define the root
        root = data;
        root.x0 = h / 2;
        root.y0 = 0;
        // Layout the tree initially and center on the root node.
        update(root);
        centerNode(root);
    };
    HierarchyTreeWidget.prototype.getTreeData = function (item, property, depth) {
        var data = {};
        if (!item)
            return data;
        data = { id: item.id, name: item.name, resource: item.root, children: [] };
        if (!property)
            return data;
        if (!depth)
            depth = -1;
        traverse(item, property, 0, data);
        return data;
        function traverse(root, property, level, data) {
            if (!root)
                return;
            if (!root[property])
                return;
            if ((depth - level) == 0)
                return;
            if (!data.children)
                data.children = [];
            for (var _i = 0, _a = root[property]; _i < _a.length; _i++) {
                var obj = _a[_i];
                var child = { id: obj.id, name: obj.name, resource: obj, depth: level };
                data.children.push(child);
                traverse(obj, property, level + 1, child);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HierarchyTreeWidget.prototype, "selected", void 0);
    HierarchyTreeWidget = __decorate([
        core_1.Component({
            selector: 'hierarchy-tree',
            inputs: ['item', 'relation', 'depth', 'properties'],
            template: "\n    <div class=\"panel-body\" (window:resize)=\"onResize($event)\">\n      <svg #treeSvg class=\"svg-widget\"></svg>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.ComponentResolver])
    ], HierarchyTreeWidget);
    return HierarchyTreeWidget;
}());
exports.HierarchyTreeWidget = HierarchyTreeWidget;
//# sourceMappingURL=view.hierarchyTree.jse.js.map
