/**
 * Created by Natallia on 7/14/2016.
 */
import {Component, OnInit} from '@angular/core';

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

export abstract class AbstractHierarchyWidget implements OnInit{
  item: any;
  options: any;
  data: any;
  vp: any = {size: {width: 400, height: 600},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 20}}};

  svg: any;

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
      if (this.svg){
        this.draw(this.svg, this.vp, this.data);
      }
    }
  }

  abstract draw(svg: any, vp: any, data: any): void;

  getListData(item: any, property: string, depth: number){//Format: [{id: 1, name: "Parent"}, {id: 2, name: "Child"},...];
    let data: any = {};
    if (!item) return data;
    if (!depth) depth = -1;
    traverse(item, property, depth, data);
    return data;

    function traverse(root: any, property: string, depth: number, data: any) {
      if (!root) return;
      if (!root[property]) return;
      if (depth == 0) return root;
      var children = root[property];
      for (let child of children){
        if (data.indexOf(child) == -1)
          data.push(child);
        traverse(child, property, depth - 1, data);
      }
    }
  }
}
