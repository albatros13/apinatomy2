/**
 * Created by Natallia on 6/18/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {ItemHeader, SortToolbar, EditToolbar} from '../component.general';
import {ResourceName, TemplateName,
  Resource, Type, MaterialType, LyphType, CylindricalLyphType, BorderType, NodeType,
  CausalityType, MeasurableType, GroupType, ProcessType, OmegaTreeType,
  Publication, Correlation, ClinicalIndex
} from "../../providers/service.apinatomy2";
import {OrderBy} from "../../transformations/pipe.general";
import {PanelGeneral} from "./panel.general";

@Component({
  selector: 'repo-general',
  inputs: ['items', 'caption', 'dependencies', 'types'],
  template:`
     <div class="panel panel-info repo">
        <div class="panel-heading">{{caption}}</div>
        <div class="panel-body" >
          <sort-toolbar [options]="['ID', 'Name']" (sorted)="onSorted($event)"></sort-toolbar>
          <edit-toolbar [options]="types" (added)="onAdded($event)"></edit-toolbar>
          
          <accordion class="list-group" [closeOthers]="true" 
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items | orderBy : sortByMode; let i = index" class="list-group-item" 
            dnd-sortable [sortableIndex]="i" (click)="selected = item">
            <div accordion-heading><item-header [item]="item" [icon]="getIcon(item)"></item-header></div>
            
            <panel-general *ngIf="item == selected" [item]="item" 
              [dependencies]="dependencies" 
              (saved)="onSaved(item, $event)" 
              (canceled)="onCanceled($event)"
              (removed)="onRemoved(item)">
             </panel-general>            
          </accordion-group>        
          </accordion>       
        </div>
      </div>
  `,
  directives: [
    SortToolbar, EditToolbar,
    ItemHeader,
    PanelGeneral,
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [OrderBy]
})
export class RepoGeneral{
  @Output() updated = new EventEmitter();
  items: Array<any> = [];
  selected: any = null;
  resourceNames = ResourceName;
  types: Array<ResourceName | TemplateName> = [];
  zones: Array<string> = [];
  sortByMode: string = "id";

  ngOnInit(){
    if (!this.items) this.items = [];
    if (this.items[0]) this.selected = this.items[0];
    if (!this.types || (this.types.length == 0))
      this.types = Array.from(new Set(this.items.map(item => item.class)));
    this.zones = this.types.map(x => x + "_zone");
  }

  getIcon(item: any){
    switch (item.class){
      case this.resourceNames.Type          : return "images/type.png";
      case this.resourceNames.MaterialType  : return "images/materialType.png";
      case this.resourceNames.LyphType      : return "images/lyphType.png";
      case this.resourceNames.CylindricalLyphType: return "images/cylindricalLyphType.png";

      case this.resourceNames.ProcessType   : return "images/processType.png";
      case this.resourceNames.MeasurableType: return "images/measurableType.png";
      case this.resourceNames.CausalityType : return "images/causalityType.png";
      case this.resourceNames.NodeType      : return "images/nodeType.png";
      case this.resourceNames.BorderType    : return "images/borderType.png";

      case this.resourceNames.GroupType     : return "images/groupType.png";
      case this.resourceNames.OmegaTreeType : return "images/omegaTreeType.png";

      case this.resourceNames.Publication   : return "images/publication.png";
      case this.resourceNames.Correlation   : return "images/correlation.png";
      case this.resourceNames.ClinicalIndex : return "images/clinicalIndex.png";
    }
    return "images/resource.png";
  }

  protected onSaved(item: any, updatedItem: any){
    for (var key in updatedItem){
      if (updatedItem.hasOwnProperty(key)) item[key] = updatedItem[key];
    }
    this.updated.emit(this.items);
  }

  protected onCanceled(updatedItem: any){}

  protected onRemoved(item: any){
    if (!this.items) return;
    let index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
    this.updated.emit(this.items);
  }

  protected onSorted(prop: string){
    this.sortByMode = prop.toLowerCase();
  }

  protected onAdded(resourceType: ResourceName | TemplateName){
    let newItem: any;
    switch (resourceType){
      case this.resourceNames.Type          : newItem = new Type({}); break;
      case this.resourceNames.MaterialType  : newItem = new MaterialType({name: "New material"}); break;
      case this.resourceNames.LyphType      : newItem = new LyphType({name: "New lyph"}); break;
      case this.resourceNames.CylindricalLyphType: newItem = new CylindricalLyphType({name: "New cylindrical lyph"}); break;

      case this.resourceNames.ProcessType   : newItem = new ProcessType({name: "New process"}); break;
      case this.resourceNames.MeasurableType: newItem = new MeasurableType({name: "New measurable"}); break;
      case this.resourceNames.CausalityType : newItem = new CausalityType({name: "New casuality"}); break;
      case this.resourceNames.NodeType      : newItem = new NodeType({name: "New node"}); break;
      case this.resourceNames.BorderType    : newItem = new BorderType({name: "New border"}); break;

      case this.resourceNames.GroupType     : newItem = new GroupType({name: "New group"}); break;
      case this.resourceNames.OmegaTreeType : newItem = new OmegaTreeType({name: "New omge tree"}); break;

      case this.resourceNames.Publication   : newItem = new Publication({name: "New publication"}); break;
      case this.resourceNames.Correlation   : newItem = new Correlation({name: "New correlation"}); break;
      case this.resourceNames.ClinicalIndex : newItem = new ClinicalIndex({name: "New clinical index"}); break;
      default: newItem = new Resource();
    }
    this.items.push(newItem);
    this.updated.emit(this.items);
  }
}
