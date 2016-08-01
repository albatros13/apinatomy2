/**
 * Created by Natallia on 7/15/2016.
 */
import {Component, OnChanges, OnDestroy} from '@angular/core';
import {HierarchyGraphWidget} from "./view.hierarchyGraph";
import {HierarchyTreeWidget}  from "./view.hierarchyTree";
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';
import {CustomPropertyToolbar} from '../components/toolbar.propertySettings';

@Component({
  selector: 'hierarchy-widget',
  inputs: ['item', 'relations', 'properties'],
  template : `
    <div class="panel panel-default">
      <div class="panel-heading">
        Relations of <strong>{{(item)? item.id: ''}}{{(item)? ': ' + item.name : ''}}</strong>
      </div>
      <div class="panel-body">
          <!--Relations-->
          <custom-property-toolbar  
            [options] = "relations"
            (change) = "updateRelations()"
            caption = 'Relations'>
          </custom-property-toolbar>
          
          <!--Properties-->
          <custom-property-toolbar  
            [options] = "properties"
            (change) = "updateProperties()"
            caption = 'Properties'
            >
          </custom-property-toolbar>

          <!--Depth-->
          <div class="input-group input-group-sm" style="width: 150px; float: left;">
            <span class="input-group-addon" id="basic-addon1">Depth</span>
            <input type="number" class="form-control" aria-describedby="basic-addon1"
              min="0" max="50" [(ngModel)]="depth" >
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

        <hierarchy-tree *ngIf="layout == 'tree'" 
          [item]="item" [relation]="relations" [depth]="depth" [properties]="properties"></hierarchy-tree>
        <hierarchy-graph *ngIf="layout == 'graph'" 
          [item]="item" [relation]="relations"  [depth]="depth" [properties]="properties"></hierarchy-graph>
    </div>      
  `,
  directives: [HierarchyGraphWidget, HierarchyTreeWidget,
    DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, CustomPropertyToolbar]
})
export class HierarchyWidget implements OnChanges, OnDestroy{
  //Input
  item: any;
  relations: Array<any> = [];

  layout = "tree";
  properties: any;

  depth = 2;
  subscription: Subscription;

  constructor(public resizeService: ResizeService) {
    this.subscription = resizeService.resize$.subscribe(
      (event: any) => {
        if (event.target == "hierarchy-widget") {
          this.onSetPanelSize(event);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSetPanelSize(event: any){
    this.resizeService.announceResize({target: "hierarchy-tree", size: event.size});
    this.resizeService.announceResize({target: "hierarchy-graph", size: event.size});
  }

  ngOnInit(){
    this.updateRelations();
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    this.updateRelations();
  }

  updateRelations(){
    this.relations = [];
    if (this.item){
      let relations = Object.assign({}, this.item.constructor.relationshipShortcuts);
      for (let relation in relations) {
        this.relations.push({value: relation, selected: false});
      }
      if (this.relations.length > 0) this.relations[0].selected = true;
    }
  }

  updateProperties(){
    this.properties = [];
    if (this.relations){
      for (let relation in this.relations){
        let target = this.item[relation];
        if (target.constructor){
          let properties = Object.assign({}, target.constructor.relationshipShortcuts);
          for (let property in properties){
            if (this.properties.find((x: any) => (x.value == property))){
              this.properties.push({value: property, selected: false});
            }
          }
        }
      }
      if (this.properties.length > 0) this.properties[0].selected = true;
    }
  }
}
