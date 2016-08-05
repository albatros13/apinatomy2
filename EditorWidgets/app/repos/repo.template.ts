/**
 * Created by Natallia on 6/28/2016.
 */
import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {TemplateName} from '../services/utils.model';

import {EditToolbar} from '../components/toolbar.repoEdit';
import {FilterToolbar} from '../components/toolbar.filter';
import {SortToolbar} from '../components/toolbar.sort';

import {PanelDispatchTemplates} from "../panels/dispatch.templates";
import {ItemHeader, RepoAbstract} from "./repo.abstract";
import {OrderBy, FilterBy, SetToArray} from "../transformations/pipe.general";

import {getIcon} from "../services/utils.model";


@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'ignore', 'types', 'selectedItem', 'options'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
        <sort-toolbar *ngIf  = "options?.sortToolbar" [options]="['Name', 'ID', 'Class']" (sorted)="onSorted($event)"></sort-toolbar>
        <edit-toolbar *ngIf  = "!options?.headersOnly" [options]="types" [transform]="getClassLabel" (added)="onAdded($event)"></edit-toolbar>
        <filter-toolbar *ngIf= "options?.filterToolbar" [filter]="searchString" [options]="['Name', 'ID', 'Class']" (applied)="onFiltered($event)"></filter-toolbar>
          
        <accordion class="list-group" [closeOthers]="true" (onDropSuccess)="onItemSwap($event)"
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index" 
            class="list-group-item" dnd-sortable 
           [sortableIndex]="i" (click)="onHeaderClick(item)">
            <div accordion-heading><item-header [item]="item" [selectedItem]="selectedItem" [isSelectedOpen]="isSelectedOpen" [icon]="getIcon(item.class)"></item-header></div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-template *ngIf="item == selectedItem" 
                [item]="item" 
                [ignore]="ignore"
                (saved)="onSaved(item, $event)" 
                (removed)="onRemoved(item)"></panel-template>            
            </div>
          </accordion-group>        
        </accordion>       
      </div>
    </div>
  `,
  directives: [ItemHeader, SortToolbar, EditToolbar, FilterToolbar,
    PanelDispatchTemplates, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [OrderBy, FilterBy, SetToArray]
})
export class RepoTemplate extends RepoAbstract{
  getIcon = getIcon;

  ngOnInit(){
    super.ngOnInit();
    if (this.types.length == 0){
      for (let x in TemplateName) {
        if (x == TemplateName.Template) continue;
        this.types.push(x);
      }
    }
    this.zones = this.types.map(x => x + "_zone");
  }

  onItemSwap(event: any){
    console.log("Sortable", event);
  }
}
