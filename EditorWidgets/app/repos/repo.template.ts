/**
 * Created by Natallia on 6/28/2016.
 */
import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {TemplateName, getIcon, compareLinkedElements} from '../services/utils.model';

import {EditToolbar} from '../components/toolbar.repoEdit';
import {FilterToolbar} from '../components/toolbar.filter';
import {SortToolbar} from '../components/toolbar.sort';

import {PanelDispatchTemplates} from "../panels/dispatch.templates";
import {ItemHeader, RepoAbstract} from "./repo.abstract";
import {OrderBy, FilterBy, SetToArray} from "../transformations/pipe.general";

import * as model from "open-physiology-model";


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
          
        <accordion class="list-group" [closeOthers]="true"
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index" 
            class="list-group-item" dnd-sortable (onDragStart)="onDragStart()" (onDragEnd)="onDragEnd()"
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

  ngOnChanges(changes: { [propName: string]: any }) {
    //Set correct initial order for linked set
    if (this.options.linked && this.items)
      this.items.sort((a, b) => compareLinkedElements(a, b));
  }

  onDragStart(){
    //TODO: swap 2 elements?
  }

  onDragEnd(){
    if (this.options.linked){
      this.items[0].cardinalityMultipliers.clear();
      for (let i = 1; i < this.items.length; i++){
        this.items[i].cardinalityMultipliers.clear();
        this.items[i].cardinalityMultipliers.add(this.items[i - 1]);
      }
    }
  }

  protected onAdded(Class: any){
    super.onAdded(Class);
    if (this.options.linked){
      if (this.selectedItem){
        let index = this.items.indexOf(this.selectedItem);
        if (index > 0) {
          this.selectedItem.cardinalityMultipliers.add(this.items[index -1]);
        }
      }
    }
  }
}
