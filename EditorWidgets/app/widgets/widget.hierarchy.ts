/**
 * Created by Natallia on 7/15/2016.
 */
import {Component, OnInit, OnChanges} from '@angular/core';
import {
  FORM_BINDINGS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators} from '@angular/common';
import {SingleSelectInput, MultiSelectInput} from "../components/component.general";
import {HierarchyGraphWidget} from "./hierarchy.graph";
import {HierarchyTreeWidget}  from "./hierarchy.tree";

@Component({
  selector: 'hierarchy',
  inputs: ['item', 'options'],
  template : `
    <div class="panel panel-default">
      <div class="panel-heading">Configure relationship view</div>
       <div class="panel-body">
          <div>
            <!--Relation to show-->
              <div class="input-control">
                <label for="relation">Relation: </label>
                <select-input-1 [item] = "relation"
                   (updated)="updateProperty('relation', $event)"    
                   [options] = "allRelations">
                </select-input-1>
              </div>
              
              <!--Properties of resources to display-->
              <div class="input-control">
                <label for="properties">Properties to show: </label>
                <select-input [item] = "properties"
                   (updated)="updateProperty('properties', $event)"    
                   [options] = "allProperties">
                </select-input>
              </div>
        
              <!--Depth-->
               <div class="input-control">
                 <label for="depth">Depth: </label>
                 <input type="number" min="0" max="100" [(value)]="depth">
               </div>
               
              <!--Layout-->
               <div class="input-control">
                <label for="relation">Layout: </label>
                 <select-input-1 [item] = "layout"
                  (updated)="updateView($event)"    
                  [options] = "layouts"></select-input-1>
              </div>
            </div>
         <div style="float: right; padding: 4px">
            <button type="submit" class="btn btn-default">Apply</button>
         </div>
       </div>
    </div>      
    <hierarchy-tree *ngIf="layout.id != 'Force-directed'" [item]="item" [options]="options"></hierarchy-tree>
    <hierarchy-graph *ngIf="layout.id == 'Force-directed'" [item]="item" [options]="options"></hierarchy-graph>
  `,
  directives: [SingleSelectInput, MultiSelectInput, HierarchyGraphWidget, HierarchyTreeWidget]
})
export class HierarchyWidget implements OnInit, OnChanges{
  //Input
  item: any;
  options: any;

  //Parameter form
  relation = {id: "subtypes", name: "subtypes"};
  allRelations = [this.relation];
  properties: any[] = [];
  allProperties: any[] = [];

  layout = {id: "Bottom", name: "Bottom"};
  layouts = [
    {text: "Tree", children: ["Top", "Bottom", "Left", "Right", "Radial"].map(item => {return {id: item, name: item}})},
    {text: "Graph", children: ["Force-directed"].map(item => {return {id: item, name: item}})}];

  depth = -1;

  ngOnInit(){
    if (this.options){
      if(this.options.relation)
        this.relation = {id: this.options.relation, name: this.options.relation};
      if(this.options.depth)
        this.depth = this.options.depth;
      if(this.options.layout)
        this.layout = {id: this.options.layout, name: this.options.layout};
    }
    //console.dir(this.item.constructor.name);
  }

  updateView(item: any){
    if (item) this.layout = item;
  }

  ngOnChanges(changes: { [propName: string]: any }) {
  }

  updateProperty(prop: string, item: any){

  }

}
