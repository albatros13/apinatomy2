import {Component, Directive, OnChanges, Input, Output, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';
//import {DclWrapperComponent} from "../components/component.test";
import {nvD3} from 'ng2-nvd3/lib/ng2-nvd3';

declare let d3: any;
const color = d3.scale.category20();

@Component({
  selector: 'hierarchy-graph',
  inputs: ['item', 'relation', 'depth', 'properties'],
  template : `
    <div class="panel-body" (window:resize)="onResize($event)">
      <!--<svg #graphSvg class="svg-widget"></svg>-->
      <nvd3 *ngIf="active" [options]="graphOptions" [data]="data"></nvd3>
    </div>
  `,
  directives: [nvD3],
})
export class HierarchyGraphWidget implements OnChanges{
  item: any;
  properties: string[] = [];

  relation: string;
  depth: number = -1;
  layout: string;
  active: boolean = true;

  svg: any;
  data: any;
  vp: any = {size: {width: 400, height: 600},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 20}}};

  graphOptions: any;
  @Output() setNode = new EventEmitter();

  constructor(public renderer: Renderer,
              public el: ElementRef,
              public vc: ViewContainerRef,
              private resolver: ComponentResolver){
  }

  ngOnInit(){
    this.setPanelSize(window.innerWidth, window.innerHeight);
    this.setGraphOptions();
  }

  onResize(event: any){
   this.setPanelSize(event.target.innerWidth, event.target.innerHeight);
  }

  //TODO: replace
  setPanelSize(innerWidth: number, innerHeight: number){
    let w = innerWidth / 2 - 2 * this.vp.margin.x;
    let h = innerHeight / 2 - 2 * this.vp.margin.y;
    let delta = 10;
    if ((Math.abs(this.vp.size.width - w) > delta) || (Math.abs(this.vp.size.height - h) > delta)){
      this.vp.size = {width: w, height: h};
      if (this.graphOptions){
        this.graphOptions.width = w;
        this.graphOptions.height = h;
        this.refresh();
      }
    }
  }

  refresh(){
    setTimeout(() => {this.active = false}, 0);
    setTimeout(() => {this.active = true}, 0);
  }

  setGraphOptions(){

    let visibleProperties = this.properties;

    function formatValue(value: any){
      let res = "[";
      for (let i = 0; i < value.length; i++){
        res += "{" + ((value[i].id)? value[i].id: "?") + ": " + value[i].name + "}" + ",";
      }
      res = res.replace(/,\s*$/, "");
      res += "]";
      return res;
    }

    this.graphOptions = {
      chart: {
        type: 'forceDirectedGraph',
        width: this.vp.size.width,
        height: this.vp.size.height,
        margin:{top: 20, right: 20, bottom: 20, left: 20},
        color: function(d: any){
          return color(d.class)
        },
        tooltip: {
          contentGenerator: function(d: any) {
            var html = "<b>"+ ((d.id)? d.id: "?") + ": " + d.name+"</b> <ul>";
            if (visibleProperties){
              d.series.forEach(function(elem: any){
                if (visibleProperties.indexOf(elem.key) > -1){
                  html += "<li><style='color:" + elem.color+"'>" + elem.key + ": " +
                    "<b>"+formatValue(elem.value)+"</b></li>";
                }
              })
            }
            html += "</ul>";
            return html;
          }
        },
        nodeExtras: function(node: any) {
          node && node
            .append("text")
            .attr("dx", 8)
            .attr("dy", ".35em")
            .text(function(d: any) { return d.name })
            .attr("class", "nodeLabel");
        }
      }
    };
  }



  ngOnChanges(changes: { [propName: string]: any }) {
    if (this.item) {
      this.data = this.getGraphData(this.item, this.relation, this.depth);
    } else {
      this.data = {};
    }
  }

  draw(){}

  getGraphData(item: any, property: string, depth: number) {
    let data:any = {nodes: [], links  : []};
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
        data.links.push({source: root, target: child});
        if (data.nodes.indexOf(child) == -1){
          data.nodes.push(child);
          traverse(child, property, depth - 1, data);
        }
      }
    }
  }
}



