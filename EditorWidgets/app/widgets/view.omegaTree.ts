/**
 * Created by Natallia on 7/14/2016.
 */
import {Component, Input, Output, ViewChild, ElementRef, Renderer, EventEmitter} from '@angular/core';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';
import {getIcon, getColor, getTreeData, compareLinkedParts, compareLinkedElements, TemplateName, model} from "../services/utils.model";

declare var d3:any;

//Resource visualization widget stub
export class TemplateBox{
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  render(svg: any, options: any) {
    let lyph = svg.append("rect")
      .attr("x", options.center.x).attr("y", options.center.y)
      .attr("width", options.size.width).attr("height", options.size.height)
      .style("stroke", "black").style("fill", "white");

    if (this.model.layers && (this.model.layers.size > 0)){
      let layers = Array.from(this.model.layers);
        let x0 = options.center.x;
        let y0 = options.center.y;
        let dx = options.size.width / layers.length;
        let dy = options.size.height;
        for (let i = 0; i < layers.length; i++){
          lyph.append("rect")
            .attr("x", x0 + i * dx).attr("y", y0)
            .attr("width", dx).attr("height", dy)
            .style("stroke", "black").style("fill", getColor(layers[i].id));
        }
    }

    return lyph;
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
export class OmegaTreeWidget{
  @Input() item       : any;
  template: any;

  svg : any;
  data: any;
  vp: any = {size: {width: 600, height: 400},
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
      this.data = this.getOmegaTreeData(this.item);
      this.draw(this.svg, this.vp, this.data);
    } else {
      this.data = {};
      this.svg.selectAll(".tree").remove();
    }
  }

  draw(svg: any, vp: any, data: any): void{
    let w = vp.size.width - 2 * vp.margin.x;
    let h = vp.size.height - 2 * vp.margin.y;
    svg.selectAll(".tree").remove();

    let tree = d3.layout.tree().size([w, h]);
    let diagonal = d3.svg.diagonal().projection((d: any) => [d.x, d.y]);

    var zoom = d3.behavior.zoom()
      .scaleExtent([0.5, 2])
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

    let treeSvg = svg.append("g").attr("class", "tree").attr("width",
      vp.size.width).attr("height", vp.size.height)
      .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")")
      .call(zoom);

    var svgGroup = treeSvg.append("g");

    let nodes = tree.nodes(data);
    let links = tree.links(nodes);

    let link = svgGroup.selectAll(".link")
     .data(links)
     .enter().append("path")
     .attr("class", "link")
     .attr("stroke", d => getColor(d.relation))
     .attr("d", diagonal);

    let node = svgGroup.selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 4.5)
      .style("fill", d => getColor(d.class))
      .attr("transform", transform);

    let dx = vp.node.size.width / 2;
    let dy = vp.node.size.height / 2;

    let icon = svgGroup.selectAll(".icon")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "icon")
      .each((d: any) => {
        if (d.target){
          let position = {x: (d.source.x + d.target.x) / 2 - dx, y: (d.source.y + d.target.y) / 2 - dy};
          if (d.target.resource.class == TemplateName.OmegaTreeTemplate){
            svgGroup.append("image")
              .attr("xlink:href", getIcon(TemplateName.OmegaTreeTemplate))
              .attr("x", position.x + dx - 12).attr("y", position.y + dy - 12)
              .attr("width", 24).attr("height", 24);
          } else {
            let item = new TemplateBox(d.target.resource);
            item.render(svgGroup, {center: position, size: vp.node.size});
          }
         }
      });

    let text = svgGroup.selectAll("nodeLabel")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "nodeLabel")
      .append("text")
      .attr("dx", -5)
      .style("text-anchor", "end")
      .attr("x", d => (d.source.x + d.target.x) / 2 - dx)
      .attr("y", d => (d.source.y + d.target.y) / 2)
      .text((d: any) => ("level " + (d.target.depth) + ": " + d.target.name));

    function transform(d: any): string {
      return "translate(" + d.x + "," + d.y + ")";
    }
  }


  getOmegaTreeData(item: any) {
    if (!item) return {};

    function linkParts(root, item) {
      let relations = new Set<string>().add("parts");
      let treeData = getTreeData(item, relations, -1); //creates structure for d3 tree out of item.parts
      let parts = treeData.children;

      let queue: Array<any> = [root];
      if (!parts) return queue;
      parts.sort((a, b) => compareLinkedParts(a.resource, b.resource));

      for (let i = 0; i < parts.length; i++) {
        let child: any = {id: parts[i].id, name: parts[i].name, resource: parts[i].resource};
        let link = parts[i].resource.treeParent;
        if (!link){
          root.children.push(child);
          child.parent = root;
        } else {
            let parent = queue.find(x => (x.resource == link));
            if (parent){
              if (!parent.children) parent.children = [];
              parent.children.push(child);
              child.parent = parent;
            }
        }
        if (!queue.find(x => (x.resource === parts[i].resource))){
          queue.push(child);
        }
      }
      return queue;
    }

    let root: any = {id:  "#0", name: item.name, children: []};
    let tree = linkParts(root, item);

    let subtrees = tree.filter(x => (x.resource && (x.resource.class === TemplateName.OmegaTreeTemplate)));
    while (subtrees.length > 0){
      for (let subtree of subtrees){
        let subtreeRoot = subtree.parent;
        if (subtreeRoot) {
          let i = subtreeRoot.children.indexOf(subtree);
          if (i > -1) subtreeRoot.children.splice(i, 1);
        }
        if (subtree.resource.type){
          let expandedTree = linkParts(subtreeRoot, subtree.resource.type);
          //replace subtree in the main tree with expanded view
          if (expandedTree){
            if (subtree.children) {
              //relink items following the expanded tree to its leaves
              for (let next of subtree.children) {
                let leaves = expandedTree.filter(x => !x.children);
                if (leaves.length > 0){
                  next.parent = leaves[0];
                  for (let j = 1; j < leaves.length; j++){
                    //replicate following nodes
                  }
                }
              }
            }
          }
        }
      }
      subtrees = tree.filter(x => (x.resource && (x.resource.class === TemplateName.OmegaTreeTemplate)));
    }

    return tree[0];
  }

  //Old - tree via cardinality multipliers
  getOmegaTreeFromMultipliers(item: any) {
    if (!item) return {};

    function linkElements(root, item) {
      let relations = new Set<string>().add("elements");
      let treeData = getTreeData(item, relations, -1); //creates structure for d3 tree out of item.elements
      let elements = treeData.children;

      let queue: Array<any> = [root];
      if (!elements) return queue;
      elements.sort((a, b) => compareLinkedElements(a.resource, b.resource));

      for (let i = 0; i < elements.length; i++) {
        let child = {id: elements[i].id, name: elements[i].name, resource: elements[i].resource};
        let links = elements[i].resource.cardinalityMultipliers;
        if (!links || (links.size == 0)){
          root.children.push(child);
        } else {
          links.forEach(link => {
            let parent = queue.find(x => (x.resource == link));
            if (parent){
              if (!parent.children) parent.children = [];
              parent.children.push(child);
            }
          });
        }
      }
      return queue;
    }

    let root: any = {id:  "#0", name: item.name, children: []};
    let tree = linkElements(root, item);
    //TODO: unwrap recursively trees in the queue
    return tree[0];
  }
}
