import {Component, OnChanges, OnDestroy, Output, ElementRef, Renderer,
  EventEmitter} from '@angular/core';
import {nvD3} from 'ng2-nvd3/lib/ng2-nvd3';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';

declare let d3: any;
const color = d3.scale.category20();

@Component({
  selector: 'hierarchy-graph',
  inputs: ['item', 'relations', 'properties', 'depth'],
  template : `
    <div class="panel-body">
      <nvd3 *ngIf="active" [options]="graphOptions" [data]="data"></nvd3>
    </div>
  `,
  directives: [nvD3],
})
export class HierarchyGraphWidget implements OnChanges, OnDestroy{
  item: any;
  relations : Array<any> = [];
  properties: Array<any> = [];

  depth    : number = -1;
  active   : boolean = true;

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
    if (!this.relations) this.relations = [];

    this.setGraphOptions();
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    if (this.item) {
      this.data = this.getGraphData(this.item, this.relations, this.depth);
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
        setTimeout(() => {this.active = false}, 0);
        setTimeout(() => {this.active = true}, 0);
      }
    }
  }

  setGraphOptions(){
    let visibleProperties = this.properties.filter(x => x.selected).map(x => x.value);

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

  getGraphData(item: any, relations: Array<any>, depth: number) {
    let data:any = {nodes: [], links  : []};
    if (!item) return data;
    data.nodes.push(item);
    if (!relations || (relations.length == 0)) return data;
    if (!depth) depth = -1;
    let fields = this.relations.filter(x => x.selected).map(x => x.value);
    if (!depth) depth = -1;
    traverse(item, depth, data);
    return data;

    function traverse(root: any, depth: number, data: any) {
      if (!root) return;
      if (depth == 0) return root;
      for (let fieldName of fields) {
        if (!root[fieldName]) return;
        var children = root[fieldName];
        for (let child of children) {
          data.links.push({source: root, target: child});
          if (data.nodes.indexOf(child) == -1) {
            data.nodes.push(child);
            traverse(child, depth - 1, data);
          }
        }
      }
    }
  }
}



