/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Output, OnChanges, KeyValueDiffers, EventEmitter} from '@angular/core';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';
import {MapToOptions} from "../transformations/pipe.general";

@Component({
  selector: 'select-input',
  inputs: ['items', 'options'],
  template:`
    <div *ngIf="active">
      <ng-select 
        [items]       = "options | mapToOptions"
        [initData]    = "items | mapToOptions"
        [multiple]    = true
        (data)        = "refreshValue($event)"        
      ></ng-select>
    </div>
    `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [MapToOptions]
})
export class MultiSelectInput implements OnChanges{
  items: Array<any>;
  options: Array<any> = [];
  @Output() updated = new EventEmitter();

  active: boolean = true;
  prev: Array<any>;

  protected ngOnInit(){
    if (!this.options) this.options = [];
    if (!this.items) this.items = [];
  }

  ngOnChanges(changes: {[propName: string]: any}) {
    //console.log('onChanges - items = ', changes['items'].currentValue);
    if (this.selectionChanged(this.prev, this.items)){//Fixes bug in the component!
      this.prev = this.items;
      this.refresh();
    }
  }

  selectionChanged(prev: Array<any>, current: Array<any>){
    if (!prev && !current) return false;
    if (!prev != !current) return true;
    if (prev.length != current.length) return true;
    var diff = prev.filter((item: any) => {return (current.indexOf(item) == -1);});
    if (diff && (diff.length > 0)) return true;
    return false;
  }

  refresh(){
    setTimeout(() => {this.active = false}, 0);
    setTimeout(() => {this.active = true}, 0);
  }

  refreshValue(value: Array<any>):void {
    let selected = value.map(x => x.id);
    this.items = this.options.filter(y => (selected.indexOf(y.id + "-" + y.name) != -1));
    this.updated.emit(this.items);
  }
}

@Component({
  selector: 'select-input-1',
  inputs: ['item', 'options'],
  template:`
    <div *ngIf="active">
      <ng-select
        [items]       = "options | mapToOptions"
        [initData]    = "items | mapToOptions"
        [multiple]    = false
        (data)        = "refreshValue($event)"
      ></ng-select>
    </div>
  `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [MapToOptions]
})
export class SingleSelectInput{
  item: any;
  items: Array<any>;
  options: Array<any> = [];
  @Output() updated = new EventEmitter();

  active: boolean = true;
  prev: any;

  protected ngOnInit(){
    if (!this.options) this.options = [];
    this.items = [];
    if (this.item) this.items = [this.item];
  }

  ngOnChanges(changes: {[propName: string]: any}) {
    this.items = [];
    if (this.item) this.items = [this.item];
  }

  public refreshValue(value: any):void {
    this.item = this.options.find(y => (value.id == (y.id + "-" + y.name)));
    this.updated.emit(this.item);
  }
}

@Component({
  selector: 'item-header',
  inputs: ['item', 'icon'],
  template: `
      <i class="pull-left glyphicon"
        [ngClass]="{'glyphicon-chevron-down': item == selectedItem, 'glyphicon-chevron-right': item != selectedItem}"></i>&nbsp;
        {{item.id}} - {{item.name}}
        <img class="pull-right icon" src="{{icon}}"/>
  `
})
export class ItemHeader {}

@Component({
  selector: 'sort-toolbar',
  inputs: ['options'],
  template: `
      <div class="btn-group" dropdown>
        <button type="button" class="btn btn-default dropdown-toggle" aria-label="SortAsc" dropdownToggle>
          <span class="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="SortAsc">
          <li *ngFor="let option of options; let i = index" role="menuitem" (click)="sorted.emit(option)">
            <a class="dropdown-item" href="#">{{option}}</a>
          </li>
        </ul>
      </div>
      <div class="btn-group" dropdown>
        <button type="button" class="btn btn-default dropdown-toggle" aria-label="SortDesc" dropdownToggle>
          <span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="SortDesc">
          <li *ngFor="let option of options; let i = index" role="menuitem" (click)="sorted.emit('-'+option)">
            <a class="dropdown-item" href="#">{{option}}</a>
          </li>
        </ul>
      </div>
    `,
  directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})
export class SortToolbar {
  @Output() sorted = new EventEmitter();
  constructor(){}
}

@Component({
  selector: 'filter-toolbar',
  inputs: ['filter', 'options'],
  template: `
      <input type="text" [value]="filter" (input)="updateValue($event)" (keyup.enter)="applied.emit({filter: filter, mode: mode});"/>
      <div class="btn-group" dropdown>
        <button type="button" class="btn btn-default dropdown-toggle" aria-label="Filter" dropdownToggle>
          <span class="glyphicon glyphicon-filter" aria-hidden="true"></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="Filter">
          <li *ngFor="let option of options; let i = index" role="menuitem" (click)="updateMode(option)">
            <a class="dropdown-item" href="#">{{option}}</a>
          </li>
        </ul>
      </div>
    `,
  styles: [':host {float: right;}'],
  directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})
export class FilterToolbar {
  options: string[];
  filter: string;
  mode: string;
  @Output() applied = new EventEmitter();

  constructor(){}

  ngOnInit(){
    if (this.options && (this.options.length > 0)) this.mode = this.options[0];
  }

  updateMode(option: string){
    this.mode = option;
    this.applied.emit({filter: this.filter, mode: this.mode});
  }

  updateValue(event: any){
    this.filter = event.target.value;
    //Remove filter if search string is empty
    if (this.filter.trim().length == 0)
      this.applied.emit({filter: this.filter, mode: this.mode});
  }

}

@Component({
  selector: 'edit-toolbar',
  inputs: ['options'],
  template: `
      <div class="btn-group" dropdown>
        <button type="button" class="btn btn-default dropdown-toggle" aria-label="Add" dropdownToggle>
          <span class="glyphicon glyphicon-plus"></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="Add">
          <li *ngFor="let option of options; let i = index" role="menuitem" (click)="added.emit(option)">
            <a class="dropdown-item" href="#">{{option}}</a>
          </li>
        </ul>
      </div>
    `,
  directives:[DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})
export class EditToolbar {
  @Output() added = new EventEmitter();
  constructor(){}
}

@Component({
  selector: 'form-toolbar',
  template: `
    <button type="button" class="btn btn-default" aria-label="Remove" (click)="removed.emit()">
      <span class="glyphicon glyphicon-remove"></span>
    </button>
    <button type="button" class="btn btn-default" aria-label="Save" (click)="saved.emit()">
      <span class="glyphicon glyphicon-check"></span>
    </button>
    <button type="button" class="btn btn-default" aria-label="Restore" (click)="canceled.emit()">
      <span class="glyphicon glyphicon-refresh"></span>
    </button>
    `
})
export class FormToolbar {
  @Output() removed = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() saved = new EventEmitter();

  constructor(){};
}




