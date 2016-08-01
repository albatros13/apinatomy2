/**
 * Created by Natallia on 7/14/2016.
 */
import {Component, OnChanges, Input, Output, ViewChild, ElementRef, Renderer, EventEmitter} from '@angular/core';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';

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
     <div class="panel-body">
        <svg #treeSvg class="svg-widget"></svg>
     </div>
  `,
  directives: []
})
export class OmegaTreeWidget implements OnChanges {
  item: any;
  template: any;

  //depth: number = -1;
  //layout: string;

  svg: any;
  data: any;
  vp: any = {size: {width: 400, height: 600},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 40}}};
  subscription: Subscription;

  constructor(public renderer: Renderer,
              public el: ElementRef,
              private resizeService: ResizeService) {
    this.subscription = resizeService.resize$.subscribe(
    (event:any) => {
      if (event.target == "omega-tree") {
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
      this.data = this.getOmegaTreeData(this.item, "elements");
      this.draw(this.svg, this.vp, this.data);
    } else {
      this.data = {};
      this.svg.selectAll("g").remove();
    }
  }

  draw(svg: any, vp: any, data: any): void{
    let w = vp.size.width - 2 * vp.margin.x;
    let h = vp.size.height - 2 * vp.margin.y;

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
      .append("circle")
      .attr("class", "node")
      .attr("r", function (d: any) {
        return d.children ? 4.5: 0;
      })
      .style("fill", function(d: any){
        return color(d.class);
      })
      .attr("transform", transform);

    let dx = vp.node.size.width / 2;
    let dy = vp.node.size.height / 2;

    let icon = treeSvg.selectAll(".icon")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "icon")
      .attr("transform", transform)
      .each((d: any) => {
          if (d.source){
            let item = new TemplateBox(d.source.resource);
            item.render(treeSvg,
              {center: {x: (d.source.x + d.target.x) / 2 - dx, y: (d.source.y + d.target.y) / 2- dy}, size: vp.node.size});
          }
        }
      );

    let text = treeSvg.selectAll("nodeLabel")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "nodeLabel")
      .append("text")
      .attr("dx", -5)
      .style("text-anchor", "end")
      .attr("x", function(d: any){return (d.source.x + d.target.x) / 2 - dx; })
      .attr("y", function(d: any){return (d.source.y + d.target.y) / 2; })
      .text((d: any) => ((d.source.id)? d.source.id: "?") + ": " + d.source.name);

    function transform(d: any): string {
      return "translate(" + d.x + "," + d.y + ")";
    }
  }

  getOmegaTreeData(item: any, property: string) {
    let data:any = {};
    if (!item) return data;
    if (!property) return data;
    if (!item[property] || !item[property][0]) return data;
    let obj = item[property][0];
    let parent: any = {id: obj.id, name: obj.name, resource: obj};
    data = parent;

    for (let i = 1; i < item[property].length; i++) {
      let obj = item[property][i];
      let child = {id: obj.id, name: obj.name, resource: obj};
      parent.children = [child];
      parent = child;
    }
    //fake node
    parent.children = [{skip: true}];

    return data;
  }
}
