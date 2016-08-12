/**
 * Created by Natallia on 6/28/2016.
 */
import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {TemplateName, getIcon, compareLinkedParts} from '../services/utils.model';

import {AddToolbar} from '../components/toolbar.add';
import {FilterToolbar} from '../components/toolbar.filter';
import {SortToolbar} from '../components/toolbar.sort';

import {PanelDispatchTemplates} from "../panels/dispatch.templates";
import {ItemHeader, RepoAbstract} from "./repo.abstract";
import {OrderBy, FilterBy, SetToArray, FilterByClass} from "../transformations/pipe.general";
import {SingleSelectInput} from "../components/component.select";

import {Subscription}   from 'rxjs/Subscription';
import {ToastyService, Toasty} from 'ng2-toasty/ng2-toasty';
import {model} from "../services/utils.model";


@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'ignore', 'types', 'selectedItem', 'options'],
  providers: [ToastyService],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
        <select-input-1 style="float: left;" [item] = "itemToInclude"
         (updated) = "itemToInclude = $event"    
         [options] = "allItems">
        </select-input-1>
        <button type="button" class="btn btn-default" (click)="onIncluded(itemToInclude)">
          <span class="glyphicon glyphicon-save"></span>
        </button>
        
        <sort-toolbar *ngIf  = "options?.sortToolbar" [options]="['Name', 'ID', 'Class']" (sorted)="onSorted($event)"></sort-toolbar>
        <add-toolbar *ngIf = "!options?.headersOnly" [options]="types" [transform]="getClassLabel" (added)="onAdded($event)"></add-toolbar>
        <filter-toolbar *ngIf= "options?.filterToolbar" [filter]="searchString" [options]="['Name', 'ID', 'Class']" (applied)="onFiltered($event)"></filter-toolbar>
          
        <accordion class="list-group" [closeOthers]="true"
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items 
            | orderBy : sortByMode 
            | filterBy: [searchString, filterByMode]; let i = index" 
            class="list-group-item" dnd-sortable (onDragStart)="onDragStart()" (onDragEnd)="onDragEnd()"
           [sortableIndex]="i" (click)="onHeaderClick(item)">
            <div accordion-heading>
              <item-header [item]="item" 
                [selectedItem]="selectedItem" 
                [isSelectedOpen]="isSelectedOpen" 
                [icon]="getIcon(item.class)">
              </item-header>
            </div>

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
    <ng2-toasty></ng2-toasty>
  `,
  directives: [ItemHeader, SortToolbar, AddToolbar, FilterToolbar, SingleSelectInput,
    PanelDispatchTemplates, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES,
    Toasty],
  pipes: [OrderBy, FilterBy, SetToArray]
})
export class RepoTemplate extends RepoAbstract{
  getIcon = getIcon;
  includeExisting = false;
  itemToInclude: any = null;
  allItems: Set<any> = new Set<any>();

  ts: Subscription;

  constructor(private toastyService:ToastyService){
    super();
  }

  ngOnInit(){
    super.ngOnInit();
    if (this.types.length == 0){
      for (let x in TemplateName) {
        if (x == TemplateName.Template) continue;
        this.types.push(x);
      }
    }
    this.zones = this.types.map(x => x + "_zone");

    if (this.types.length == 1){
      this.ts = model[this.types[0]].p('all').subscribe(
        (data: any) => {this.allItems = data});
    } else {
      if (this.types.length > 1){
        let setToArray = new SetToArray();
        let filterByClass = new FilterByClass();

        this.ts = model.Template.p('all').subscribe(
          (data: any) => {this.allItems = new Set(filterByClass.transform(setToArray.transform(data), this.types))});
      }
    }

/*    this.ts = model.Template.p('all').subscribe(
      (data: any) => {this.allItems = data});*/
  }

  ngOnDestroy() {
    this.ts.unsubscribe();
  }

  ngOnChanges(changes: { [propName: string]: any }) {
    //Set correct initial order for linked set
    if (this.options.linked && this.items){
      //this.items.sort((a, b) => compareLinkedElements(a, b));
      this.items.sort((a, b) => compareLinkedParts(a, b));
    }
  }

  onDragStart(){
    //TODO: swap 2 elements?
  }

  onDragEnd(){
    if (this.options.linked){
      this.items[0].treeParent = null;
      //this.items[0].cardinalityMultipliers.clear();
      for (let i = 1; i < this.items.length; i++){
        // this.items[i].cardinalityMultipliers.clear();
        // this.items[i].cardinalityMultipliers.add(this.items[i - 1]);
        this.items[i].treeParent = this.items[i - 1];
      }
    }
  }

  protected onAdded(Class: any){
    super.onAdded(Class);
    if (this.options.linked){
      if (this.selectedItem){
        let index = this.items.indexOf(this.selectedItem);
        if (index > 0) {
          //this.selectedItem.cardinalityMultipliers.add(this.items[index -1]);
          this.selectedItem.treeParent = this.items[index -1];
        }
      }
    }
  }

  onIncluded(newItem: any){
    if (newItem){
      if (this.items.indexOf(newItem) < 0){
        this.items.push(newItem);
        this.added.emit(newItem);
        this.updated.emit(this.items);
        this.selectedItem = newItem;
      } else {
        this.toastyService.error("Selected template is already included to the set!");
      }
    }
  }
}
