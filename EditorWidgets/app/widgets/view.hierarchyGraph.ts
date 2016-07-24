import {Component, Directive, OnChanges, OnDestroy, Input, Output, ViewChild, ElementRef, Renderer,
  ViewContainerRef, EventEmitter, ComponentResolver} from '@angular/core';
import {nvD3} from 'ng2-nvd3/lib/ng2-nvd3';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';

declare let d3: any;
const color = d3.scale.category20();

@Component({
  selector: 'hierarchy-graph',
  inputs: ['item', 'relation', 'depth', 'properties'],
  template : `
    <div class="panel-body">
      <!--<svg #graphSvg class="svg-widget"></svg>-->
      <nvd3 *ngIf="active" [options]="graphOptions" [data]="data"></nvd3>
    </div>
  `,
  directives: [nvD3],
})
export class HierarchyGraphWidget implements OnChanges, OnDestroy{
  item: any;
  properties: string[] = [];

  relation: string;
  depth: number = -1;
  layout: string;
  active: boolean = true;

  svg: any;
  data: any;
  vp: any = {size: {width: 600, height: 400},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 20}}};

  graphOptions: any;
  @Output() setNode = new EventEmitter();
  subscription: Subscription;

  constructor(public renderer: Renderer,
              public el: ElementRef,
              private resizeService: ResizeService){
    let self = this;
    this.subscription = resizeService.resize$.subscribe(
      (event: any) => {
        if (event.target == "hierarchy-graph"){
          self.setPanelSize(event.size);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(){
    this.setGraphOptions();
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    if (this.item) {
      this.data = this.getGraphData(this.item, this.relation, this.depth);
    } else {
      this.data = {};
    }
  }

  setPanelSize(size: any){
    let delta = 10;
    if ((Math.abs(this.vp.size.width - size.width) > delta) || (Math.abs(this.vp.size.height - size.height) > delta)){
      this.vp.size = size;
      if (this.graphOptions){
        this.graphOptions.width = this.vp.size.width;
        this.graphOptions.height = this.vp.size.height;
        this.refresh();
      }
    }
  }

  refresh(){
    setTimeout(() => {this.active = false}, 10);
    setTimeout(() => {this.active = true}, 10);
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



