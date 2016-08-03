import {Component, Input, Output, OnChanges, OnDestroy, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';

import {getIcon, getColor} from "../services/utils.model";

declare var d3:any;

@Component({
  selector: 'hierarchy-tree',
  inputs: ['item', 'relations', 'depth'],
  template : `
    <div class="panel-content">
      <svg #treeSvg class="svg-widget"></svg>
    </div>
  `
})
export class RelationshipTree implements OnChanges, OnDestroy{
  @Input() item       : any;
  @Input() relations  : Set<string> = new Set<string>();
  @Input() depth      : number = -1;

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
      this.data = this.getTreeData(this.item, this.relations, this.depth);
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

    var i = 0;
    var duration = 750;
    var root : any;
    var nodes: any[] = [];
    var links: any[] = [];

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

    var zoom = d3.behavior.zoom()
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

    var drag = d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", dragstarted)
      .on("drag", dragged)
      .on("dragend", dragended);

    function zoomed() {
      svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    function dragstarted(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
    }

    function dragged(d) {
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d) {
      d3.select(this).classed("dragging", false);
    }

    let treeSvg = svg.append("g").attr("class", "tree")
      .attr("width", vp.size.width).attr("height", vp.size.height)
      .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")")
      .call(zoom);

    var svgGroup = treeSvg.append("g");

    root = data;
    root.x0 = h / 2;
    root.y0 = 0;
    update(root);
    centerNode(root);

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

    function centerNode(source:any) {
      let x = -source.y0 + vp.size.width / 2;
      let y = -source.x0 + vp.size.height / 2;
      d3.select('g').transition()
        .duration(duration).attr("transform", "translate(" + x + "," + y + ")");
    }

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

    function click(d:any) {
      if (d3.event.defaultPrevented) return;
      d = toggleChildren(d);
      update(d);
      centerNode(d);
    }

    function update(source:any) {
      let levelWidth: number[] = [1];

      function countChildren(level: any, node: any) {
        if (node.children && node.children.length > 0) {
          if (levelWidth.length <= level + 1) levelWidth.push(0);
          levelWidth[level + 1] += node.children.length;
          node.children.forEach(function (d: any) {
            countChildren(level + 1, d);
          });
        }
      }

      countChildren(0, root);

      var newHeight = d3.max(levelWidth) * 40; // 25 pixels per line
      tree = tree.size([newHeight, w]);

      nodes = tree.nodes(root).reverse();
      links = tree.links(nodes);

      nodes.forEach(function (d: any) {d.y = (d.depth * 80);});

      let node = svgGroup.selectAll("g.node").data(nodes, function (d: any) {return d.id;});

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d: any) {return "translate(" + source.y0 + "," + source.x0 + ")";})
        .on('click', click);

      nodeEnter.append("image")
        .attr("xlink:href", function (d: any) {return getIcon(d.resource.class);})
        .attr("x", 0).attr("y", 0)
        .attr("width", 0).attr("height", 0);

      nodeEnter.append("text")
        .attr("x", function (d: any) {return d.children || d._children ? -15 : 15;})
        .attr("dy", ".35em")
        .attr('class', 'nodeLabel')
        .attr("text-anchor", function (d: any) {return d.children || d._children ? "end" : "start";})
        .text(function (d: any) {return d.name});

      node.select('text')
        .attr("x", function (d: any) {return d.children || d._children ? -15 : 15;})
        .attr("text-anchor", function (d: any) {return  d.children || d._children ? "end" : "start";})
        .text(function (d: any) {return  d.name;});

      node.select("image")
        .attr("x", function (d: any) {return  d._children ? -12 : -8;})
        .attr("y", function (d: any){return   d._children ? -12 : -8;})
        .attr("width", function (d: any) {return  d._children ? 24 : 16;})
        .attr("height", function (d: any) {return  d._children ? 24 : 16;});

      // Transition nodes to their new position.
      node.transition().duration(duration).attr("transform", function (d: any) {return  "translate(" + d.y + "," + d.x + ")";});

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition().duration(duration)
        .attr("transform", function (d: any) {return "translate(" + source.y + "," + source.x + ")";
        }).remove();

      var link = svgGroup.selectAll("path.link").data(links);

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("stroke", function(d) {return getColor(d.target.relation);})
        .attr("d",() => {var o = {x: source.x0, y: source.y0}; return diagonal({source: o, target: o});});

      link.transition().duration(duration).attr("d", diagonal);
      link.exit().transition().duration(duration)
        .attr("d", () => {var o = {x: source.x, y: source.y}; return diagonal({source: o, target: o});}).remove();

      nodes.forEach(function (d: any) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

  }

  getTreeData(item: any, relations: Set<string>, depth: number) {//Format: {id: 1, name: "Parent", children: [{id: 2, name: "Child"},...]};
    let data:any = {};
    if (!item) return data;
    data = {id: item.id, name: item.name, resource: item, children: []};
    if (!depth) depth = -1;
    let i = 0;
    traverse(item, 0, data);
    return data;

    function traverse(root:any, level:number, data:any) {
      if (!root) return;
      for (let fieldName of Array.from(relations)){
        if (!root[fieldName]) continue;
        if ((depth - level) == 0) return;
        if (!data.children) data.children = [];

        for (let obj of Array.from(root[fieldName])) {
          var child = {id: "node_" + ++i, name: obj.name, resource: obj, depth: level, relation: fieldName};
          data.children.push(child);
          traverse(obj, level + 1, child);
        }
      }
    }
  }
}

