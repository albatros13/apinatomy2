import {Component, Directive, OnChanges, Input, Output, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';
import {DclWrapperComponent} from "../components/component.test";
import {TemplateBox, AbstractHierarchyWidget} from "./hierarchy.general";

declare var d3:any;

@Component({
  selector: 'hierarchy-graph',
  inputs: ['item', 'options'],
  template : `
    <div class="panel panel-danger">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" (window:resize)="onResize($event)">
        <svg #graphSvg class="svg-widget"></svg>
      </div>
    </div>
  `,
  directives: [DclWrapperComponent]
})
export class HierarchyGraphWidget extends AbstractHierarchyWidget implements OnChanges{
  caption: string = "Relationship graph";
  graph: any = null;

  @Output() setNode = new EventEmitter();


  constructor(public renderer: Renderer,
              public el: ElementRef,
              public vc: ViewContainerRef,
              private resolver: ComponentResolver){
    super();
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    //changes['item'].currentValue;
    this.svg = d3.select(this.el.nativeElement).select('svg');
    if (this.item) {
      this.caption = "Relationship graph: " + this.item.id + " - " + this.item.name;
      if (this.options){
        this.data = this.getGraphData(this.item, this.options.relation, this.options.depth);
        this.graph = null;
        this.draw(this.svg, this.vp, this.data);
      }
    } else {
      this.data = {};
      this.svg.selectAll(".graph").remove();
    }
  }

  draw(svg: any, vp: any, data: any){
    if (!this.graph){
      this.graph = new Graph(svg, vp, data);
      this.graph.createSubGraph(this.item, 2);
    } else {
      this.graph.vp = this.vp;
      this.graph.update();
    }
  }

  getGraphData(item: any, property: string, depth: number) {
    let data:any = {nodes: [], edges: []};
    if (!item) return data;
    data.nodes.push(item);
    if (!property) return data;
    if (!depth) depth = -1;
    traverse(item, property, depth, data);
    return data;

    function traverse(root: any, property: string, depth: number, data: any) {
      if (!root) return;
      if (!root[property]) return;
      if (depth == 0) return root;
      var children = root[property];
      for (let child of children){
        data.edges.push({source: root, target: child});
        if (data.nodes.indexOf(child) == -1){
          data.nodes.push(child);
          traverse(child, property, depth - 1, data);
        }
      }
    }
  }
}

class Graph{
  //nodes: any[] = [];
  links: any[] = [];
  visibleNodes = {};
  visibleLinks: Array<any> = [];
  incrementStep: number = 1;
  svg: any;
  vp: any;
  force = d3.layout.force();
  tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  constructor(svg: any, vp: any, data: any){
    this.svg = svg;
    this.vp = vp;
    //this.nodes = data.nodes;
    this.links = data.edges;
  }

  setVisibleLinks(linkSet: Array<any>){
    let graph = this;
    graph.visibleNodes = {};
    graph.visibleLinks = [];
    linkSet.forEach(function(link: any) {
      ["source", "target"].forEach(function(prop){
        let obj = link[prop];
        if (link[prop].id) {
          obj = new Object(link[prop]);
          link[prop] = link[prop].id;
        }

        link[prop] = graph.visibleNodes[link[prop]] || (graph.visibleNodes[link[prop]] = obj);
        graph.visibleLinks.push(link);
      });

    });
  };

  reset(){
    this.visibleNodes = {};
    this.visibleLinks = [];
  };

  breadthSearch(linkSet: Array<any>, nodeID: any, radius: number){
    if (radius == 0) return [];
    var newLinks: Array<any> = [];

    var traverse = function(rootID: any, hop: number){
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
    if (linkSet)
      traverse(nodeID, 0);

    return newLinks;
  }

  createSubGraph(rootID: any, radius: number){
    let graph = this;
    graph.reset();
    var newLinks = graph.breadthSearch(graph.links, rootID, radius);
    graph.setVisibleLinks(newLinks);
    if (graph.visibleNodes[rootID]) graph.visibleNodes[rootID].radius = radius;
    graph.update();
  };

  expandSubGraph(rootID: any, radius: number){
    let graph = this;
    var newLinks = graph.breadthSearch(graph.links, rootID, radius);
    var toAdd: any[] = [];
    for (var i = 0; i < newLinks.length; i++){
      var link = newLinks[i];
      var exists = false;
      for (var j = 0; j < graph.visibleLinks.length; j++){
        var d = graph.visibleLinks[j];
        if ((d.source.id == link.source || d.source.id == link.source.id) &&
          (d.target.id == link.target || d.target.id == link.target.id) &&
          (d.type == link.type)){
          exists = true;
          break;
        }
      }
      if (!exists) toAdd.push(link);
    }
    if (toAdd.length > 0) {
      graph.visibleLinks = graph.visibleLinks.concat(toAdd);
      graph.setVisibleLinks(graph.visibleLinks);
    }
    if (graph.visibleNodes[rootID]) graph.visibleNodes[rootID].radius = radius;
    if (toAdd.length >0) graph.update();
  };

  contactSubGraph(rootID: any, radius: number){
    let graph = this;
    var toRemove = graph.breadthSearch(graph.visibleLinks, rootID, radius);

    function removeAll(toRemove: Array<any>, array: Array<any>){
      toRemove.forEach((d: any) => {
        var index = array.indexOf(d);
        if (index > -1){
          array.splice(index, 1);
        }
      });
    }

    if (toRemove.length > 0) {
      removeAll(toRemove, graph.visibleLinks);

      if (graph.visibleNodes[rootID]) graph.visibleNodes[rootID].present = true;
      graph.visibleLinks.forEach((link: any) => {
        ["source", "target"].forEach(function (prop) {
          if (graph.visibleNodes[link[prop].id])
            graph.visibleNodes[link[prop].id].present = true;
        });
      });

      var nodesToRemove: any[] = [];
      for (var key in graph.visibleNodes) {
        if (graph.visibleNodes.hasOwnProperty(key)) {
          if (!graph.visibleNodes[key].present)
            nodesToRemove.push(key);
          else
            delete graph.visibleNodes[key].present;
        }
      }

      if (nodesToRemove.length > 0) {
        nodesToRemove.forEach(function (key) {
          delete graph.visibleNodes[key];
        })
      }
      graph.setVisibleLinks(graph.visibleLinks);
    }
    if (graph.visibleNodes[rootID]) graph.visibleNodes[rootID].radius = 0;
    if (toRemove.length > 0) graph.update();

  };

  public update() {
    let graph = this;
    let w = graph.vp.size.width - 2 * graph.vp.margin.x;
    let h = graph.vp.size.height - 2 * graph.vp.margin.y;

    graph.svg.selectAll(".graph").remove();
    let svg = graph.svg.append("g")
      .attr("class", "graph").attr("width", graph.vp.size.width).attr("height", graph.vp.size.height)
      .attr("transform", "translate(" + graph.vp.margin.x + "," + graph.vp.margin.y + ")");

    graph.force.size([w, h])
      .linkDistance(60)
      .charge(-300);

    graph.force.nodes(d3.values(graph.visibleNodes))
      .links(graph.visibleLinks)
      .on("tick", tick)
      .start();

    svg.append("defs").selectAll("marker")
      .data(["end"])      // Different link/path types can be defined here
      .enter().append("marker")    // This section adds in the arrows
      .attr("id", (d: any) => {return ('marker' + d.key);})
      .attr('fill', "#ccc")
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
      .style("stroke", (d: any) => {return "#ccc";})
      .attr("marker-end", (d: any) => {return "url(#marker" + d.type +")";});

    link.on("mouseover", (d: any) => {
      graph.tooltip.transition().duration(200).style("opacity", .9);
      graph.tooltip.html(graph.getHTMLLinkAnnotation(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
      .on("mouseout", function() {
        graph.tooltip.transition().duration(500).style("opacity", 0);
      });

    var myGroups = svg.append('g').selectAll(".term").data(graph.force.nodes());
    var myGroupsEnter = myGroups.enter().append("g").attr("class", "graphNode");
    var node = myGroupsEnter.append("circle")
      .attr("r", (d: any) =>{
        if (d.radius) return 12;
        return 7;
      })
      .attr("class", (d: any) => {
        if (d.radius) return "expanded";
        return "";
      });

    node.on('dblclick', nodeDblClickHandler)
      .on('click', nodeClickHandler)
      .call(graph.force.drag);

    node.on("mouseover", (d: any) => {
      graph.tooltip.transition().duration(200).style("opacity", .9);
      graph.tooltip.html(graph.getHTMLNodeAnnotation(d))
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      graph.tooltip.transition().duration(500).style("opacity", 0);
    });

    //var icon = myGroupsEnter.append("g").attr("class", "icon");
    //icon.each((d: any) => {});

    var text = myGroupsEnter.append("text")
      .attr("x", 8)
      .attr("y", ".31em")
      .text((d: any) => {return (d.name? d.name: d.id);});

    ////////////////////////////////////////////

    function nodeDblClickHandler(node: any){
      var circle = d3.select(this);
      circle.classed("expanded", !circle.classed("expanded"));
      if (node.radius){
        graph.contactSubGraph(node.id, graph.incrementStep);
      } else {
        graph.expandSubGraph(node.id, graph.incrementStep);
      }
    }

    function nodeClickHandler (node: any){
      //TODO: Emit node selection event
      var circle = d3.select(this);
      var circles = svg.selectAll("circle");
      var other = circles.filter((d: any) => {return d != circle;});
      other.classed("selected", false);
      circle.classed("selected", !circle.classed("selected"));
    }

    function tick() {
      link.attr("d", linkArc);
      myGroups.attr("transform", transform);
    }

    function linkArc(d: any) {
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

    function transform(d: any) {
      return "translate(" + d.x + "," + d.y + ")";
    }
  };

  getHTMLNodeAnnotation(d: any){
    if (!d) return "";
    var res = d.id;
    if (d.name) res += ": " + d.name;
    return "<div>" + res + "</div>";
  }

  getHTMLLinkAnnotation(d: any){
    if (!d) return "";
    var res = d.type;
    res += "<div  class='dotted'>" + this.getHTMLNodeAnnotation(d.source) + "</div>";
    res += "<div  class='dotted'>" + this.getHTMLNodeAnnotation(d.target) + "</div>";
    return "<div>" + res + "</div>";
  }
}

