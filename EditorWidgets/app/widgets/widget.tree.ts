import {Component, Directive, OnChanges, Input, Output, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';
import {DclWrapperComponent} from "../components/component.test";
import {SingleSelectInput, MultiSelectInput} from "../components/component.general";

declare var d3:any;


@Component({
  selector: 'property-toolbar',
  inputs: ['relation', 'options'],
  template: `
      <!--Relation to show-->
      <div class="input-control">
        <label for="relation">Relation: </label>
        <select-input-1 [item] = "relation"
           (updated)="updateProperty('relation', $event)"    
           [options] = "options">
        </select-input-1>
      </div>
      <!--Relation to show-->
      <!--<div class="input-control">-->
        <!--<label for="properties">Properties: </label>-->
      <!--</div>-->
      <!---->
 
      <!--Tree layout-->
      <div class="input-control">
        <label for="relation">Layout: </label>
         <select-input-1 [item] = "layout"
          (itemChanged)="layout = $event.target.value"    
          [options] = "layouts"></select-input-1>
      </div>
  
    `,
  directives: [SingleSelectInput, MultiSelectInput]
})
export class PropertyToolbar {
  layout = "bottom";
  layouts = ["top", "bottom", "left", "right", "radial"];
}


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
  selector: 'tree',
  inputs: ['item', 'options'],
  template : `
    <div class="panel panel-success">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" (window:resize)="onResize($event)">
        <svg #treeSvg class="svg-widget"></svg>
      </div>
    </div>
  `,
  directives: [DclWrapperComponent]//, PropertyToolbar
})
export class TreeWidget implements OnChanges{
  item: any;
  data: any;
  caption: string = "Hierarchy";
  options: any; //{property: ,}
  vp: any = {size: {width: 400, height: 600},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 20}}};
  @Output() setNode = new EventEmitter();

  treeSvg: any;

  constructor(public renderer: Renderer, public el: ElementRef, public vc: ViewContainerRef,
      private resolver: ComponentResolver){
  }

  ngOnInit(){
    this.setPanelSize(window.innerWidth, window.innerHeight);
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    //console.log('Tree widget - item = ', changes['item'].currentValue);
    this.treeSvg = d3.select(this.el.nativeElement).select('svg');
    if (this.item) {
      this.caption = this.item.id + " - " + this.item.name;
      this.data = this.getTreeData();
      this.drawTree(this.treeSvg, this.vp, this.data);
    } else {
      this.data = {};
      this.treeSvg.selectAll("g").remove();
    }
  }

  ngAfterViewInit() {
    //Use ViewChild
    //let node =  this.renderer.createElement(this.treeSvg.nativeElement, 'h1', null);
    //this.renderer.setText(node, "HELLO");
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
      if (this.treeSvg){
        this.drawTree(this.treeSvg, this.vp, this.data);
      }
    }
  }

  drawTree(svg: any, vp: any, data: any): void{
    let tree = this;
    let w = vp.size.width - 2 * vp.margin.x;
    let h = vp.size.height - 2 * vp.margin.y;

    svg.selectAll("g").remove();

    let treeSvg = svg.append("g").attr("class", "tree").attr("width", vp.size.width).attr("height", vp.size.height)
      .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")");

    let cluster = d3.layout.tree().size([w, h]);

    let diagonal = d3.svg.diagonal().projection((d: any) => [d.x, d.y]);

    let nodes = cluster.nodes(data);
    let links = cluster.links(nodes);

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
      .attr("dx", 0).style("text-anchor", "middle")
      //.attr("dx", -dx - 4).style("text-anchor", "end")
      .attr("dy", 2)
      .attr("transform", transform)
      .text((d: any) => d.id);

    function transform(d: any): string {
      return "translate(" + d.x + "," + d.y + ")";
    }
  }

  getTreeData() {//Format: {id: 1, name: "Parent", children: [{id: 2, name: "Child"},...]};
    let data:any = {};
    if (!this.item) return data;
    if (!this.options || !this.options.property) return data;
    let depth = this.options.depth;
    if (!depth) depth = -1;
    data = {id: this.item.id, name: this.item.name, resource: this.item.root, children: []};
    traverse(this.item, this.options.property, depth, data);
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

  getListData(){//Format: [{id: 1, name: "Parent"}, {id: 2, name: "Child"},...];
    let data: any = {};
    if (!this.item) return data;
    if (!this.options || !this.options.property) return data;
    let depth = this.options.depth;
    if (!depth) depth = -1;
    traverse(this.item, this.options.property, depth, data);
    return data;

    function traverse(root: any, property: string, depth: number, data: any) {
      if (!root) return;
      if (!root[property]) return;
      if (depth == 0) return root;
      var children = root[property];
      for (let child of children){
        data.push(child);
        traverse(child, property, depth - 1, data);
      }
    }
  }
}

