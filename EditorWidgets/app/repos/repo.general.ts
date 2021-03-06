"use strict";
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';

import {AddToolbar} from '../components/toolbar.add';
import {FilterToolbar} from '../components/toolbar.filter';
import {SortToolbar} from '../components/toolbar.sort';

import {ResourceName, TemplateName, model} from "../services/utils.model";

import {OrderBy, FilterBy} from "../transformations/pipe.general";
import {PanelDispatchResources} from "../panels/dispatch.resources";
import {PanelDispatchTemplates} from "../panels/dispatch.templates";
import {ItemHeader, RepoAbstract} from "./repo.abstract";

import {getIcon, model} from "../services/utils.model";


@Component({
  selector: 'repo-general',
  inputs: ['items', 'caption', 'ignore', 'types', 'selectedItem', 'options'],
  template:`
     <div class="panel panel-info repo">
        <div class="panel-heading">{{caption}}</div>
        <div class="panel-body">
          <sort-toolbar [options]="['Name', 'ID', 'Class']" (sorted)="onSorted($event)"></sort-toolbar>
          <add-toolbar [options]="types" [transform]="getClassLabel" (added)="onAdded($event)"></add-toolbar>
          <filter-toolbar [filter]="searchString" [options]="['Name', 'ID', 'Class']" (applied)="onFiltered($event)"></filter-toolbar>
          
<!--          <property-toolbar  
            [options] = "properties"
            [transform] = "getClassLabel"
            (selectionChanged) = "hiddenTypesChanged($event)">
          </property-toolbar>-->
          
          <accordion class="list-group" [closeOthers]="true"> 
            <!--dnd-sortable-container [dropZones]="zones" [sortableData]="items">-->
          <accordion-group *ngFor="let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index">
            <!--class="list-group-item" dnd-sortable [sortableIndex]="i"> -->
            <div accordion-heading (click)="onHeaderClick(item)">
              <item-header [item]="item" 
                [selectedItem]="selectedItem" 
                [isSelectedOpen]="isSelectedOpen" 
                [icon]="getIcon(item.class)">
              </item-header>
            </div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-general *ngIf="item == selectedItem" [item]="item"
                [ignore]="ignore"
                (saved)="onSaved(item, $event)" 
                (canceled)="onCanceled($event)"
                (removed)="onRemoved(item)">
               </panel-general>   
               <panel-template *ngIf="item == selectedItem" [item]="item"
                [ignore]="ignore"
                (saved)="onSaved(item, $event)" 
                (canceled)="onCanceled($event)"
                (removed)="onRemoved(item)">
               </panel-template> 
            </div>
                
          </accordion-group>        
          </accordion>       
        </div>
      </div>
  `,
  styles: ['.repo{ width: 100%}'],
  directives: [
    SortToolbar, AddToolbar, FilterToolbar,
    ItemHeader,
    PanelDispatchResources, PanelDispatchTemplates,
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [OrderBy, FilterBy]
})
export class RepoGeneral extends RepoAbstract{
  getIcon = getIcon;
  hiddenTypes = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    if (this.types.length == 0){
      //Resources
      for (let x in ResourceName) {
        if ((x == ResourceName.Resource) || (x == ResourceName.Type) || (x == ResourceName.MeasurableLocationType))
          continue;
        this.types.push(x);
      }
      //Templates
      for (let x in TemplateName) {
        if (x == TemplateName.Template) continue;
        this.types.push(x);
      }
    }
    this.zones = this.types.map(x => x + "_zone");
  }

  hiddenTypesChanged(option: any){
    if ( this.hiddenTypes.has(option.value) &&  option.selected) this.hiddenTypes.delete(option.value);
    if (!this.hiddenTypes.has(option.value) && !option.selected) this.hiddenTypes.add(option.value);
  }
}
