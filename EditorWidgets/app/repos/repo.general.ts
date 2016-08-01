"use strict";
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';

import {EditToolbar} from '../components/toolbar.repoEdit';
import {FilterToolbar} from '../components/toolbar.filter';
import {SortToolbar} from '../components/toolbar.sort';

import {ResourceName} from "../services/service.apinatomy2";
import {OrderBy, FilterBy} from "../transformations/pipe.general";
import {PanelDispatchResources} from "../panels/dispatch.resources";
import {ItemHeader, RepoAbstract} from "./repo.abstract";

import * as model from "open-physiology-model";

@Component({
  selector: 'repo-general',
  inputs: ['items', 'caption', 'ignore', 'types', 'selectedItem', 'options'],
  template:`
     <div class="panel panel-info repo">
        <div class="panel-heading">{{caption}}</div>
        <div class="panel-body">
          <sort-toolbar [options]="['Name', 'ID']" (sorted)="onSorted($event)"></sort-toolbar>
          <edit-toolbar [options]="types" (added)="onAdded($event)"></edit-toolbar>
          <filter-toolbar [filter]="searchString" [options]="['Name', 'ID', 'Class']" (applied)="onFiltered($event)"></filter-toolbar>
          
          <accordion class="list-group" [closeOthers]="true"> 
            <!--dnd-sortable-container [dropZones]="zones" [sortableData]="items">-->
          <accordion-group *ngFor="let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index">
            <!--class="list-group-item" dnd-sortable [sortableIndex]="i"> -->
            <div accordion-heading (click)="onHeaderClick(item)"><item-header [item]="item" [selectedItem]="selectedItem" [isSelectedOpen]="isSelectedOpen" [icon]="getIcon(item.class)"></item-header></div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-general *ngIf="item == selectedItem" [item]="item"
                [ignore]="ignore"
                (saved)="onSaved(item, $event)" 
                (canceled)="onCanceled($event)"
                (removed)="onRemoved(item)">
               </panel-general>            
            </div>
                
          </accordion-group>        
          </accordion>       
        </div>
      </div>
  `,
  styles: ['.repo{ width: 100%}'],
  directives: [
    SortToolbar, EditToolbar, FilterToolbar,
    ItemHeader,
    PanelDispatchResources,
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [OrderBy, FilterBy]
})
export class RepoGeneral extends RepoAbstract{
  resourceName = ResourceName;

  ngOnInit(){
    super.ngOnInit();
    if (this.types.length == 0)
      for (let x in ResourceName) {
        if ((x == ResourceName.Resource) || (x == ResourceName.Type) || (x == ResourceName.MeasurableLocationType))
          continue;
        this.types.push(x);
      }
    this.zones = this.types.map(x => x + "_zone");
  }

  protected getIcon(Class: any){
    switch (Class){
      case this.resourceName.ExternalResource : return "images/external.png";
      case this.resourceName.MaterialType  : return "images/materialType.png";
      case this.resourceName.LyphType      : return "images/lyphType.png";
      case this.resourceName.CylindricalLyphType: return "images/cylindricalLyphType.png";

      case this.resourceName.ProcessType   : return "images/processType.png";
      case this.resourceName.MeasurableType: return "images/measurableType.png";
      case this.resourceName.CausalityType : return "images/causalityType.png";
      case this.resourceName.NodeType      : return "images/nodeType.png";
      case this.resourceName.BorderType    : return "images/borderType.png";
      case this.resourceName.Coalescence   : return "images/coalescence.png";

      case this.resourceName.GroupType     : return "images/groupType.png";
      case this.resourceName.OmegaTreeType : return "images/omegaTreeType.png";

      case this.resourceName.Publication   : return "images/publication.png";
      case this.resourceName.Correlation   : return "images/correlation.png";
      case this.resourceName.ClinicalIndex : return "images/clinicalIndex.png";
    }
    return "images/resource.png";
  }

  protected onAdded(Class: any){
    let newItem: any;

    newItem = model[Class].new({name: "New " + Class});

/*    switch (Class){
      case this.resourceName.ExternalResource : newItem = model.ExternalResource.new({name: "New external resource"}); break;

      case this.resourceName.MaterialType  : newItem = model.MaterialType.new({name: "New material",
        externals:[], supertypes: [], subtypes: [], materials: [], materialProviders: []}); break;

      case this.resourceName.LyphType      : newItem = model.LyphType.new({name: "New lyph"}); break;
      case this.resourceName.CylindricalLyphType: newItem = model.CylindricalLyphType.new({name: "New cylindrical lyph"}); break;

      case this.resourceName.ProcessType   : newItem = model.ProcessType.new({name: "New process"}); break;
      case this.resourceName.MeasurableType: newItem = model.MeasurableType.new({name: "New measurable"}); break;
      case this.resourceName.CausalityType : newItem = model.CausalityType.new({name: "New casuality"}); break;
      case this.resourceName.NodeType      : newItem = model.NodeType.new({name: "New node"}); break;
      case this.resourceName.BorderType    : newItem = model.BorderType.new({name: "New border"}); break;
      case this.resourceName.Coalescence   : newItem = model.Coalescence.new({name: "New coalescence"}); break;

      case this.resourceName.GroupType     : newItem = model.GroupType.new({name: "New group"}); break;
      case this.resourceName.OmegaTreeType : newItem = model.OmegaTreeType.new({name: "New omge tree"}); break;

      case this.resourceName.Publication   : newItem = model.Publication.new({name: "New publication"}); break;
      case this.resourceName.Correlation   : newItem = model.Correlation.new({name: "New correlation"}); break;
      case this.resourceName.ClinicalIndex : newItem = model.ClinicalIndex.new({name: "New clinical index"}); break;

      default: newItem = model.Resource.new({name: "New resource"});
    }*/

    this.items.push(newItem);
    this.added.emit(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }
}
