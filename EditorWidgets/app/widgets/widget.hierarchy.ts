/**
 * Created by Natallia on 7/15/2016.
 */
import {Component, OnInit, OnChanges} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from "../components/component.general";
import {HierarchyGraphWidget} from "./hierarchy.graph";
import {HierarchyTreeWidget}  from "./hierarchy.tree";
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';

@Component({
  selector: 'hierarchy',
  inputs: ['item', 'relation'],
  template : `
    <div class="panel panel-default">
      <div class="panel-heading">Resource relation{{(item)? ':' + item.id:''}} {{(item)? ':' + item.name:''}}</div>
      <div class="controls-group">
          <!--Relation to show-->
          <div class="btn-group" style="float: left;" dropdown>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" aria-label="Relation" dropdownToggle>
              Relation <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu" aria-labelledby="Relation">
              <li *ngFor="let option of relations; let i = index" role="menuitem" (click)="onRelationChanged(option)">
                <a class="dropdown-item" href="#"> 
                  <span *ngIf="relation == option">&#10004;</span>{{option}}</a>
              </li>
            </ul>
          </div>

          <!--Properties of resources to display-->
          <!--<div class="input-control">-->
            <!--<label for="properties">Property: </label>-->
            <!--<select-input [item] = "properties"-->
               <!--(updated)="properties = $event"    -->
               <!--[options] = "allProperties">-->
            <!--</select-input>-->
          <!--</div>-->
        
          <!--Depth-->
          <div class="input-group input-group-sm" style="width: 150px; float: left;">
            <span class="input-group-addon" id="basic-addon1">Depth</span>
            <input type="number" class="form-control" aria-describedby="basic-addon1"
              min="0" max="50" [(value)]="depth" >
          </div>
          
          <!--Layout-->
          <div class="btn-group">
            <button type="button" class="btn btn-default" 
              [ngClass]="{'active': layout == 'tree'}" (click)="layout = 'tree'">
              <img class="icon" src="images/tree.png"/>
            </button>
            <button type="button" class="btn btn-default" 
              [ngClass]="{'active': layout == 'graph'}" (click)="layout = 'graph'">
              <img class="icon" src="images/graph.png"/>
            </button>
          </div>
              
        </div>
    <hierarchy-tree *ngIf="layout == 'tree'" 
      [item]="item" [relation]="relation" [depth]="depth" [properties]="properties" ></hierarchy-tree>
    <hierarchy-graph *ngIf="layout == 'graph'" 
      [item]="item" [relation]="relation" [depth]="depth" [properties]="properties"></hierarchy-graph>
    </div>      
  `,
  directives: [SingleSelectInput, MultiSelectInput, HierarchyGraphWidget, HierarchyTreeWidget,
    DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})
export class HierarchyWidget implements OnChanges{
  //Input
  item: any;
  relation: string = "subtrees";
  layout = "tree";

  //Parameter form
  relations = [this.relation];
  properties: any;
  allProperties: any[] = [];

  depth = 2;

  ngOnInit(){
    this.updateRelations();
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    this.updateRelations();
  }

  onRelationChanged(item: any){
    this.relation = item;
    this.updateProperties();
  }

  updateRelations(){
    this.relations = [];
    if (this.item){
      for (let relation in this.item){//TODO: replace with relations in the manifest
        if (this.item[relation] instanceof Array){
          this.relations.push(relation);
        }
      }
    }
  }

  updateProperties(){
    this.allProperties = [];
    let propertyNames: string[] = [];
    if (this.relation){
      let obj = this.item[this.relation];
      for (let i = 0; i < obj.length; i++){
        for (let property in obj[i])
          if (obj[i][property] instanceof Array)
            if (propertyNames.indexOf(property) == - 1) propertyNames.push(property);
      }
    }

    this.allProperties = propertyNames.map(item => {return {id: item, name: item}});
    if (this.allProperties.length > 0)
      this.properties = [this.allProperties[0]];
  }

}
