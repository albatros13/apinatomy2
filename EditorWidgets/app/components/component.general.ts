/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Input, Output, OnChanges, KeyValueDiffers, EventEmitter} from '@angular/core';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';
import {MapToOptions} from "../transformations/pipe.general";

@Component({
  selector: 'select-input',
  inputs: ['items', 'options'],
  template:`
      <ng-select
        [items]       = "options | mapToOptions"
        [initData]    = "items | mapToOptions"
        [multiple]    = true
        (data)        ="refreshValue($event)"        
      ></ng-select>
  `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [MapToOptions]
})
export class MultiSelectInput implements OnChanges{
  items: Array<any>;
  options: Array<any> = [];
  @Output() updated = new EventEmitter();

  protected ngOnInit(){
    if (!this.options) this.options = [];
    if (!this.items) this.items = [];
  }

  ngOnChanges(changes: {[propName: string]: any}) {
  //  console.log('onChanges - items = ', changes['items'].currentValue);
  }

  public refreshValue(value: Array<any>):void {
    let selected = value.map(x => x.id);
    this.items = this.options.filter(y => (selected.indexOf(y.id + "-" + y.name) != -1));
    this.updated.emit(this.items);
  }
}

@Component({
  selector: 'select-input-1',
  inputs: ['item', 'options'],
  template:`
      <ng-select
        [items]       = "options | mapToOptions"
        [initData]    = "items | mapToOptions"
        [multiple]    = false
        (data)        = "refreshValue($event)"
      ></ng-select>
  `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [MapToOptions]
})
export class SingleSelectInput{
  item: any;
  items: Array<any>;
  options: Array<any> = [];
  @Output() updated = new EventEmitter();

  protected ngOnInit(){
    if (!this.options) this.options = [];
    this.items = [];
    if (this.item) this.items = [this.item];
  }

  public refreshValue(value: any):void {
    this.item = this.options.find(y => (value.id == (y.id + "-" + y.name)));
    this.updated.emit(this.item);
  }
}

// @Component({
//   selector: 'list',
//   inputs: ['materials'],
//   template: `<template ngFor [ngForOf]="materials" [ngForTemplate]="contentTemplate"></template>`
// })
// export class List {
//   @ContentChild(TemplateRef) contentTemplate: TemplateRef<any>;
// }

@Component({
  selector: 'item-header',
  inputs: ['item', 'icon'],
  template: `
      <i class="pull-left glyphicon" 
        [ngClass]="{'glyphicon-chevron-down': item == selected, 'glyphicon-chevron-right': item != selected}"></i>&nbsp;
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

