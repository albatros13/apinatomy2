import {Component, Directive, OnChanges, Input, Output, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';
import {DclWrapperComponent} from "../components/component.test";
import {TemplateBox, AbstractHierarchyWidget} from "./hierarchy.general";

declare var d3:any;

@Component({
  selector: 'hierarchy-tree',
  inputs: ['item', 'options'],
  template : `
    <div class="panel panel-default">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" (window:resize)="onResize($event)">
        <svg #treeSvg class="svg-widget"></svg>
      </div>
    </div>
  `,
  directives: [DclWrapperComponent]//, PropertyToolbar
})
export class HierarchyTreeWidget extends AbstractHierarchyWidget implements OnChanges{
  caption: string = "Hierarchy";
  @Output() selected = new EventEmitter();

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
      this.caption = "Hierarchy: " + this.item.id + ": " + this.item.name;
      if (this.options){
        this.data = this.getTreeData(this.item, this.options.relation, this.options.depth);
        this.draw(this.svg, this.vp, this.data);
      }
    } else {
      this.data = {};
      this.svg.selectAll(".tree").remove();
    }
  }

  draw(svg: any, vp: any, data: any): void{
    let w = vp.size.width - 2 * vp.margin.x;
    let h = vp.size.height - 2 * vp.margin.y;

    svg.selectAll("g").remove();

    let treeSvg = svg.append("g").attr("class", "tree").attr("width", vp.size.width).attr("height", vp.size.height)
      .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")");

    let tree = d3.layout.tree().size([w, h]);

    let diagonal = d3.svg.diagonal().projection((d: any) => [d.x, d.y]);

    let nodes = tree.nodes(data);
    let links = tree.links(nodes);

    let dx = vp.node.size.width / 2;
    let dy = vp.node.size.height / 2;

    let link = treeSvg.selectAll(".treeLink")
       .data(links)
       .enter().append("path")
       .attr("class", "treeLink")
       .attr("d", diagonal);


    let node = treeSvg.selectAll(".treeNode")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "treeNode")
      .attr("transform", transform)
      .each((d: any) => {
          let item = new TemplateBox(d.resource);
          item.render(treeSvg, {center: {x: d.x - dx, y: d.y - dy}, size: vp.node.size});
         }
      );


    let text = treeSvg.selectAll("treeLabel").data(nodes)
      .enter()
      .append("g")
      .attr("class", "treeLabel")
      .append("text")
      //.attr("dx", 0).style("text-anchor", "middle")
      .attr("dx", -dx - 4).style("text-anchor", "end")
      .attr("dy", 2)
      .attr("transform", transform)
      .text((d: any) => ((d.id)? d.id: "?") + ": " + d.name);

    function transform(d: any): string {
      return "translate(" + d.x + "," + d.y + ")";
    }
  }

  getTreeData(item: any, property: string, depth: number) {//Format: {id: 1, name: "Parent", children: [{id: 2, name: "Child"},...]};
    let data:any = {};
    if (!item) return data;
    if (!property) return data;
    if (!depth) depth = -1;
    data = {id: item.id, name: item.name, resource: item.root, children: []};
    traverse(item, property, depth, data);
    return data;

    function traverse(root:any, property:string, depth:number, data:any) {
      if (!root) return;
      if (!root[property]) return;
      if (depth == 0) return;
      if (!data.children) data.children = [];
      for (let obj of root[property]) {
        var child = {id: obj.id, name: obj.name, resource: obj};
        data.children.push(child);
        traverse(obj, property, depth - 1, child);
      }
    }
  }
}

