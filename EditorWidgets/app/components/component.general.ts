/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'select-input',
  inputs: ['item', 'options'],
  template:`
        <ng-select
          [items]       = "getSelectionSource()"
          [initData]    = "getSelected()"
          [multiple]    = "true"
          (data)="refreshValue(prop, $event)"
          (selected)="itemSelected($event)"
          (removed)="itemRemoved($event)"
          (typed)="itemTyped($event)"
        ></ng-select>
  `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class SelectInput {
  item: Array<any>;
  options: Array<any> = [];

  constructor(){}

  protected getSelectionSource(){
    if (this.options)
      return this.options.map((entry: any) => ({id: entry.id, text: entry.name? entry.name: entry.id}));
  }

  protected getSelected(){
    if (this.item)
      return this.item.map((entry: any) => ({id: entry.id, text: entry.name? entry.name: entry.id}));
    return [];
  }

  public itemSelected(value:any):void {}

  public itemRemoved(value:any):void {}

  public itemTyped(value:any):void {}

  public refreshValue(value:any):void {
    this.item = value;
  }
}
