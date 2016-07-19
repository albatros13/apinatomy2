/**
 * Created by Natallia on 7/14/2016.
 */
import {Component, OnChanges, Input, Output, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';

declare var d3:any;
const color = d3.scale.category20();

//Resource visualization widget stub
export class TemplateBox{
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  render(svg: any, options: any) {
    return svg.append("rect")
      .attr("x", options.center.x).attr("y", options.center.y)
      .attr("width", options.size.width).attr("height", options.size.height)
      .style("stroke", "black").style("fill", "white");
  }
}


@Component({
  selector: 'omega-tree',
  inputs: ['item'],
  template : `
    <div class="panel panel-default">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" (window:resize)="onResize($event)">
        <svg #treeSvg class="svg-widget"></svg>
      </div>
    </div>
  `,
  directives: []
})
export class OmegaTreeWidget implements OnChanges {
  caption: string = "Omega function ";
  item: any;

  relation: string;
  depth: number = -1;
  layout: string;

  svg: any;
  data: any;
  vp: any = {size: {width: 400, height: 600},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 20}}};

  @Output() setNode = new EventEmitter();

  constructor(public renderer: Renderer,
              public el: ElementRef,
              public vc: ViewContainerRef,
              private resolver: ComponentResolver){
  }

  ngOnInit(){
    this.setPanelSize(window.innerWidth, window.innerHeight);
  }

  onResize(event: any){
    this.setPanelSize(event.target.innerWidth, event.target.innerHeight);
  }

  setPanelSize(innerWidth: number, innerHeight: number){
    let w = innerWidth / 2 - 2 * this.vp.margin.x;
    let h = innerHeight / 2 - 2 * this.vp.margin.y;
    let delta = 10;
    if ((Math.abs(this.vp.size.width - w) > delta) || (Math.abs(this.vp.size.height - h) > delta)){
      this.vp.size = {width: w, height: h};
      this.draw(this.svg, this.vp, this.data);
    }
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    this.svg = d3.select(this.el.nativeElement).select('svg');
    if (this.item) {
      this.caption = "Omega function: " + this.item.id + " - " + this.item.name;
      this.data = this.getOmegaTreeData(this.item);
      this.draw(this.svg, this.vp, this.data);
    } else {
      this.data = {};
      this.svg.selectAll("g").remove();
    }
  }

  draw(svg: any, vp: any, data: any): void{
    let w = vp.size.width - 2 * vp.margin.x;
    let h = vp.size.height - 2 * vp.margin.y;
    let dx = vp.node.size.width / 2;
    let dy = vp.node.size.height / 2;

    svg.selectAll(".tree").remove();

    let diagonal = d3.svg.diagonal().projection((d: any) => [d.x, d.y]);

    let tree = d3.layout.tree().size([w, h]);

    let treeSvg = svg.append("g").attr("class", "tree").attr("width",
      vp.size.width).attr("height", vp.size.height)
      .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")");

    let nodes = tree.nodes(data);
    let links = tree.links(nodes);

    let link = treeSvg.selectAll(".link")
     .data(links)
     .enter().append("path")
     .attr("class", "link")
     .attr("d", diagonal);

    let node = treeSvg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", transform)
      .each((d: any) => {
          let item = new TemplateBox(d.resource);
          item.render(treeSvg, {center: {x: d.x - dx, y: d.y - dy}, size: vp.node.size});
        }
      );

    let text = treeSvg.selectAll("nodeLabel").data(nodes)
      .enter()
      .append("g")
      .attr("class", "nodeLabel")
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

  getOmegaTreeData(item: any) {
    let data:any = {};
    if (!item) return data;
    if (!item.elements || !item.elements[0]) return data;
    let obj = item.elements[0];
    let parent: any = {id: obj.id, name: obj.name, resource: obj};
    data = parent;

    for (let i = 1; i < item.elements.length; i++) {
      let obj = item.elements[i];
      let child = {id: obj.id, name: obj.name, resource: obj};
      parent.children = [child];
      parent = child;
    }
    return data;
  }
}
