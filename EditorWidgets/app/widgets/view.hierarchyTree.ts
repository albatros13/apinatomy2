import {Component, OnChanges, OnDestroy, Input, Output, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';

declare var d3:any;
const color = d3.scale.category20();

@Component({
  selector: 'hierarchy-tree',
  inputs: ['item', 'relations', 'properties', 'depth'],
  template : `
    <div class="panel-content">
      <svg #treeSvg class="svg-widget"></svg>
    </div>
  `
})
export class HierarchyTreeWidget implements OnChanges, OnDestroy{
  item       : any;
  relations  : Array<any> = [];
  properties : Array<any> = [];
  depth      : number = -1;

  //layout  : string;

  svg : any;
  vp  : any = {size: {width: 600, height: 400},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 20}}};
  data: any;

  @Output() selected = new EventEmitter();
  subscription: Subscription;

  constructor(public el: ElementRef,
              public vc: ViewContainerRef,
              private resolver: ComponentResolver,
              private resizeService: ResizeService){
    this.subscription = resizeService.resize$.subscribe(
      (event: any) => {
        if (event.target == "hierarchy-tree"){
          this.setPanelSize(event.size);
        }
      });
  }

  ngOnInit(){
    if (!this.relations) this.relations = [];
    if (!this.properties) this.properties = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setPanelSize(size: any){
    let delta = 10;
    if ((Math.abs(this.vp.size.width - size.width) > delta) || (Math.abs(this.vp.size.height - size.height) > delta)){
      this.vp.size = {width: size.width, height: size.height - 40};
      if (this.svg){
        this.draw(this.svg, this.vp, this.data);
      }
    }
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    this.svg = d3.select(this.el.nativeElement).select('svg');
    if (this.item) {
      this.data = this.getTreeData(this.item, this.relations, 3);
      this.draw(this.svg, this.vp, this.data);
    } else {
      this.data = {};
      this.svg.selectAll(".tree").remove();
    }
  }

  draw(svg: any, vp: any, data: any): void {
    let w = vp.size.width - 2 * vp.margin.x;
    let h = vp.size.height - 2 * vp.margin.y;
    svg.selectAll(".tree").remove();

    var selectedNode:any = null;
    var draggingNode:any = null;
    var panSpeed = 200;
    var panBoundary = 20;
    var i = 0;
    var duration = 750;
    var root:any;
    var panTimer: any;
    var nodes: any[] = [];
    var links: any[] = [];

    var dragStarted:any;
    var domNode:any;

/*
    function coordinates(d: any){
      switch(this.layout){
        case "top-to-bottom": return [d.x, d.y];
        case "right-to-left": return [w - d.y, d.x];
        case "bottom-to-top": return [d.x, h - d.y];
        case "left-to-right": return [d.y, d.x]
      }
      return  [d.x, d.y];
    }
*/

    let tree = d3.layout.tree().size([h, w]);
    var diagonal = d3.svg.diagonal().projection(function (d:any) {
      return [d.y, d.x];
    });

    // sort the tree according to the node names
    function sortTree() {
      tree.sort(function (a:any, b:any) {
        if (a.name && b.name)
          return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
        return 0;
      });
    }
    sortTree();

    function pan(domNode: any, direction: any) {
      let speed = panSpeed;
      if (panTimer) {
        clearTimeout(panTimer);
        let translateCoords = d3.transform(svgGroup.attr("transform"));
        if (direction == 'left' || direction == 'right') {
          var translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
          var translateY = translateCoords.translate[1];
        } else if (direction == 'up' || direction == 'down') {
          translateX = translateCoords.translate[0];
          translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
        }
        let scale = zoomListener.scale();
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
    var zoomListener = d3.behavior.zoom().scaleExtent([0.5, 3]).on("zoom", zoom);

    // define the baseSvg, attaching a class for styling and the zoomListener
    let treeSvg = svg.append("g").attr("class", "tree")
      .attr("width", vp.size.width).attr("height", vp.size.height)
        .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")")
      .call(zoomListener);

    function initiateDrag(d: any, domNode: any) {
      draggingNode = d;
      d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
      d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
      d3.select(domNode).attr('class', 'node activeDrag');

      svgGroup.selectAll("g.node").sort(function (a: any, b: any) {
        if (a.id != draggingNode.id) return 1;
        else return -1;
      });
      // if nodes has children, remove the links and nodes
      if (nodes.length > 1) {
        // remove link paths
        links = tree.links(nodes);
        let nodePaths = svgGroup.selectAll("path.link")
          .data(links, function (d: any) {
            return d.target.id;
          }).remove();
        // remove child nodes
        let nodesExit = svgGroup.selectAll("g.node")
          .data(nodes, function (d: any) {
            return d.id;
          }).filter(function (d: any, i: number) {
            if (d.id == draggingNode.id) {
              return false;
            }
            return true;
          }).remove();
      }

      // remove parent link
      let parentLink = tree.links(tree.nodes(draggingNode.parent));
      svgGroup.selectAll('path.link').filter(function (d: any, i: number) {
        if (d.target.id == draggingNode.id) {
          return true;
        }
        return false;
      }).remove();

      dragStarted = null;
    }

    // Define the drag listeners for drag/drop behaviour of nodes.
    let dragListener = d3.behavior.drag()
      .on("dragstart", function (d: any) {
        if (d == root) {return;}
        dragStarted = true;
        nodes = tree.nodes(d);
        d3.event.sourceEvent.stopPropagation();
      })
      .on("drag", function (d: any) {
        if (d == root) {return;}
        if (dragStarted) {
          domNode = this;
          initiateDrag(d, domNode);
        }

        // get coords of mouseEvent relative to svg container to allow for panning
        let el = svg;
        let relCoords = d3.mouse(el);
        if (relCoords[0] < panBoundary) {
          panTimer = true;
          pan(this, 'left');
        } else if (relCoords[0] > (el.width() - panBoundary)) {
          panTimer = true;
          pan(this, 'right');
        } else if (relCoords[1] < panBoundary) {
          panTimer = true;
          pan(this, 'up');
        } else if (relCoords[1] > (el.height() - panBoundary)) {
          panTimer = true;
          pan(this, 'down');
        } else {
          try {
            clearTimeout(panTimer);
          } catch (e) {}
        }

        d.x0 += d3.event.dy;
        d.y0 += d3.event.dx;
        var node = d3.select(this);
        node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
        updateTempConnector();
      })
      .on("dragend", function (d: any) {
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
          } else {
            selectedNode._children.push(draggingNode);
          }
        } else {
          selectedNode.children = [];
          selectedNode.children.push(draggingNode);
        }
        // Make sure that the node being added to is expanded so user can see added node is correctly moved
        expand(selectedNode);
        sortTree();
        endDrag();
      } else {
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

    function collapse(d: any) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function expand(d: any) {
      if (d._children) {
        d.children = d._children;
        d.children.forEach(expand);
        d._children = null;
      }
    }

    var overCircle = function (d: any) {
      selectedNode = d;
      updateTempConnector();
    };
    var outCircle = function (d: any) {
      selectedNode = null;
      updateTempConnector();
    };

    // Function to update the temporary connector indicating dragging affiliation

    var updateTempConnector = function () {
      var data: any[] = [];
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

    function centerNode(source:any) {
      let scale = zoomListener.scale();
      let x = -source.y0 * scale + vp.size.width / 2;
      let y = -source.x0 * scale + vp.size.height / 2;
      d3.select('g').transition()
        .duration(duration)
        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
      zoomListener.scale(scale);
      zoomListener.translate([x, y]);
    }

    // Toggle children function

    function toggleChildren(d:any) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      return d;
    }

    // Toggle children on click.

    function click(d:any) {
      if (d3.event.defaultPrevented) return; // click suppressed
      d = toggleChildren(d);
      update(d);
      centerNode(d);
    }

    function update(source:any) {
      // Compute the new height, function counts total children of root node and sets tree height accordingly.
      var levelWidth = [1];
      var childCount = function (level: any, n: any) {

        if (n.children && n.children.length > 0) {
          if (levelWidth.length <= level + 1) levelWidth.push(0);

          levelWidth[level + 1] += n.children.length;
          n.children.forEach(function (d: any) {
            childCount(level + 1, d);
          });
        }
      };

      childCount(0, root);
      var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line
      tree = tree.size([newHeight, w]);

      nodes = tree.nodes(root).reverse();
      links = tree.links(nodes);

      nodes.forEach(function (d: any) {
         d.y = (d.depth * 50);
      });

      let node = svgGroup.selectAll("g.node")
        .data(nodes, function (d: any) {
          return d.id || (d.id = ++i);
        });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
        .call(dragListener)
        .attr("class", "node")
        .attr("transform", function (d: any) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

      nodeEnter.append("circle")
        .attr('class', 'nodeCircle')
        .attr("r", 0);

      nodeEnter.append("text")
        .attr("x", function (d: any) {
          return d.children || d._children ? -10 : 10;
        })
        .attr("dy", ".35em")
        .attr('class', 'nodeLabel')
        .attr("text-anchor", function (d: any) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d: any) {
          return d.name;
        })
        .style("fill-opacity", 0);

      // phantom node for mouseover in a radius around it
      nodeEnter.append("circle")
        .attr('class', 'ghostCircle')
        .attr("r", 30)
        .attr("opacity", 0.2) // change this to zero to hide the target area
        .style("fill", "red")
        .attr('pointer-events', 'mouseover')
        .on("mouseover", function (node: any) {
          overCircle(node);
        })
        .on("mouseout", function (node: any) {
          outCircle(node);
        });

      // Update the text to reflect whether node has children or not.
      node.select('text')
        .attr("x", function (d: any) {
          return d.children || d._children ? -10 : 10;
        })
        .attr("text-anchor", function (d: any) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d: any) {
          return d.name;
        });

      // Change the circle radius depending on whether it has children and is collapsed
      node.select("circle.nodeCircle")
        .attr("r", function (d: any) {
          return d._children ? 7 : 4.5;
        })
        .style("fill", function(d: any){
          return color(d.class);
        });

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d: any) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Fade the text in
      nodeUpdate.select("text")
        .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d: any) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      nodeExit.select("circle")
        .attr("r", 0);

      nodeExit.select("text")
        .style("fill-opacity", 0);

      // Update the links…
      var link = svgGroup.selectAll("path.link")
        .data(links, function (d: any) {
          return d.target.id;
        });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function (d: any) {
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
        .attr("d", function (d: any) {
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
      nodes.forEach(function (d: any) {
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
  }

  getTreeData(item: any, relations: Array<any>, depth: number) {//Format: {id: 1, name: "Parent", children: [{id: 2, name: "Child"},...]};
    let data:any = {};
    if (!item) return data;
    data = {id: item.id, name: item.name, resource: item.root, children: []};
    if (!relations || (relations.length == 0)) return data;
    if (!depth) depth = -1;
    let fields = this.relations.filter(x => x.selected).map(x => x.value);
    traverse(item, 0, data);
    return data;

    function traverse(root:any, level:number, data:any) {
      if (!root) return;
      for (let fieldName of fields){
        if (!root[fieldName]) return;
        if ((depth - level) == 0) return;
        if (!data.children) data.children = [];

        //TODO: test
        for (let obj in root[fieldName]) {

          var child = {id: obj.id, name: obj.name, resource: obj, depth: level};
          data.children.push(child);
          traverse(obj, level + 1, child);
        }
      }
    }
  }
}

