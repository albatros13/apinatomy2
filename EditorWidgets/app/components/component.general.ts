/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, TemplateRef, Input, ContentChild} from '@angular/core';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {IResource} from '../providers/service.apinatomy2';

@Component({
  selector: 'select-input',
  inputs: ['item', 'options'],
  template:`
      <ng-select
        [items]       = "getSelectionSource()"
        [initData]    = "getSelected()"
        [multiple]    = true
        (data)="refreshValue($event)"
        (selected)="itemSelected($event)"
        (removed)="itemRemoved($event)"
        (typed)="itemTyped($event)"
      ></ng-select>
  `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class MultiSelectInput {
  item: Array<IResource>;
  options: Array<IResource> = [];

  constructor(){}

  protected getSelectionSource(){
    if (this.options)
      return this.options.map((entry: IResource) => ({id: entry.id, text: entry.name? entry.name: entry.id}));
  }

  protected getSelected(){
    if (this.item)
      return this.item.map((entry: IResource) => ({id: entry.id, text: entry.name? entry.name: entry.id}));
    return [];
  }

  public itemSelected(value:any):void {}

  public itemRemoved(value:any):void {}

  public itemTyped(value:any):void {}

  public refreshValue(value:any):void {
    this.item = value;
  }
}

@Component({
  selector: 'select-input-1',
  inputs: ['item', 'options'],
  template:`
      <ng-select
        [items]       = "getSelectionSource()"
        [initData]    = "getSelected()"
        [multiple]    = false
        (data)="refreshValue($event)"
        (selected)="itemSelected($event)"
        (removed)="itemRemoved($event)"
        (typed)="itemTyped($event)"
      ></ng-select>
  `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class SingleSelectInput {
  item: IResource;
  options: Array<IResource> = [];

  constructor(){}

  protected getSelectionSource(){
    if (this.options)
      return this.options.map((entry: IResource) => ({id: entry.id, text: entry.name? entry.name: entry.id}));
  }

  protected getSelected(){
    if (this.item) return [{id: this.item.id, text: this.item.name? this.item.name: this.item.id}];
    return [];
  }

  public itemSelected(value:any):void {}

  public itemRemoved(value:any):void {}

  public itemTyped(value:any):void {}

  public refreshValue(value:any):void {
    this.item = value[0];
  }
}

@Component({
  selector: 'quality-input',
  inputs: ['item'],
  template:`
     <div class="input-control">
       <label for="quality">Quality: </label>
       <input type="text" required [(ngModel)]="item">
     </div>
  `,
  directives: []
})
export class QualityInput {
  constructor(){}
}

@Component({
  selector: 'list',
  inputs: ['items'],
  template: `<template ngFor [ngForOf]="items" [ngForTemplate]="contentTemplate"></template>`
})
export class List {
  @ContentChild(TemplateRef) contentTemplate: TemplateRef<any>;
}

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


