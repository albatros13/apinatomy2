/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {ItemHeader, SortToolbar, EditToolbar} from '../component.general';
import {IResource, ResourceName, TemplateName,
  Resource, Type, MaterialType, LyphType, CylindricalLyphType, BorderType, NodeType,
  CausalityType, MeasurableType, GroupType, ProcessType, OmegaTreeType,
  Publication, Correlation, ClinicalIndex
} from "../../providers/service.apinatomy2";
import {OrderBy} from "../../transformations/widget.transform"

import {ResourcePanel} from '../panels/panel.resource';
import {TypePanel} from '../panels/panel.type';
import {MaterialTypePanel} from '../panels/panel.materialType';
import {LyphTypePanel} from '../panels/panel.lyphType';
import {CylindricalLyphTypePanel} from '../panels/panel.cylindricalLyphType';

import {GroupTypePanel} from '../panels/panel.groupType';
import {OmegaTreeTypePanel} from '../panels/panel.omegaTreeType';

import {MeasurableTypePanel} from '../panels/panel.measurableType';
import {CorrelationPanel} from '../panels/panel.correlation';

@Component({
  selector: 'repo-general',
  inputs: ['items', 'caption', 'dependencies'],
  template:`
     <div class="panel panel-info repo">
        <div class="panel-heading">{{caption}}</div>
        <div class="panel-body" >
          <sort-toolbar [options]="['ID', 'Name']" (sorted)="onSorted($event)"></sort-toolbar>
          <edit-toolbar [options]="itemTypes" (added)="onAdded($event)"></edit-toolbar>
          
          <accordion class="list-group" [closeOthers]="true" 
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items | orderBy : sortByMode; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
            <div accordion-heading><item-header [item]="item" [icon]="getIcon(item)"></item-header></div>
            <resource-panel *ngIf="!item.class || (item.class == resourceNames.Resource)"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></resource-panel>
            <type-panel *ngIf="item.class == resourceNames.Type"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></type-panel>
            <materialType-panel *ngIf="item.class==resourceNames.MaterialType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></materialType-panel>
            <lyphType-panel *ngIf="item.class==resourceNames.LyphType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></lyphType-panel>
            <cylindricalLyphType-panel *ngIf="item.class==resourceNames.CylindricalLyphType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></cylindricalLyphType-panel>
            
            <processType-panel *ngIf="item.class==resourceNames.ProcessType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></processType-panel>
            <measurableType-panel *ngIf="item.class==resourceNames.MeasurableType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></measurableType-panel>
            <causalityType-panel *ngIf="item.class==resourceNames.CausalityType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></causalityType-panel>
            <!--Resource panel is used to show nodes-->
            <resource-panel *ngIf="item.class==resourceNames.NodeType"  [ignore]="['equivalence', 'weakEquivalence']" 
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></resource-panel>
            <borderType-panel *ngIf="item.class==resourceNames.BorderType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></borderType-panel>
            
            <groupType-panel *ngIf="item.class==resourceNames.GroupType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></groupType-panel>
            <omegaTreeType-panel *ngIf="item.class==resourceNames.OmegaTreeType"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></omegaTreeType-panel>

             <!--Resource panel is used to show publications-->
             <resource-panel *ngIf="item.class==resourceNames.Publication"  [ignore]="['equivalence', 'weakEquivalence']" 
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></resource-panel>
             <correlation-panel *ngIf="item.class==resourceNames.Correlation"
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></correlation-panel>
             <!--Resource panel is used to show clinical indices-->
             <resource-panel *ngIf="item.class==resourceNames.ClinicalIndex"  [ignore]="['equivalence', 'weakEquivalence']" 
             [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></resource-panel>
          </accordion-group>        
          </accordion>       
        </div>
      </div>
  `,
  directives: [
    SortToolbar, EditToolbar,
    ItemHeader,
    ResourcePanel, TypePanel, MaterialTypePanel, LyphTypePanel, CylindricalLyphTypePanel,
    GroupTypePanel, OmegaTreeTypePanel,
    MeasurableTypePanel,
    CorrelationPanel,
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [OrderBy]
})
export class RepoGeneral{
  items: Array<IResource> = [];
  selected: IResource = null;
  resourceNames = ResourceName;
  itemTypes: Array<ResourceName | TemplateName> = [];
  zones: Array<string> = [];
  sortByMode: string = "id";

  ngOnInit(){
    if (!this.items) this.items = [];
    if (this.items[0]) this.selected = this.items[0];
    let types = new Set(this.items.map(item => item.class));
    this.itemTypes = Array.from(types);
    this.zones = this.itemTypes.map(x => x + "_zone");
  }

  getIcon(item: IResource){
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

  protected changeActive(item: IResource){
    this.selected = item;
  }

  protected onSaved(item: IResource, updatedItem: IResource){
    for (var key in updatedItem){
      if (updatedItem.hasOwnProperty(key)) item[key] = updatedItem[key];
    }
  }

  protected onRemoved(item: IResource){
    if (!this.items) return;
    let index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
  }

  protected onSorted(prop: string){
    this.sortByMode = prop.toLowerCase();
  }

  protected onAdded(resourceType: ResourceName | TemplateName){
    let newItem: IResource;
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
    return "images/resource.png";
  }
}
