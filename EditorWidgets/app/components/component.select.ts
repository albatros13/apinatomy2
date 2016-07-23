/**
 * Created by Natallia on 7/23/2016.
 */
import {Component, Output, OnChanges, EventEmitter} from '@angular/core';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
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
  externalChange = false;

  protected ngOnInit(){
    if (!this.options) this.options = [];
    if (!this.items) this.items = [];
  }

  ngOnChanges(changes: {[propName: string]: any}) {
    if (this.externalChange)
      this.refresh();
    this.externalChange = true;
  }

  refresh(){
    setTimeout(() => {this.active = false}, 0);
    setTimeout(() => {this.active = true}, 0);
  }

  refreshValue(value: Array<any>):void {
    let selected = value.map(x => x.id);
    let options: any[] = [];
    if (this.options[0] && this.options[0].children){//Flatten grouped options
      options = [].concat.apply([], this.options.map(item => item.children));
    } else
      options = this.options;
    this.externalChange = false;
    this.items = options.filter(y => (selected.indexOf((y.id)? y.id: y.name) != -1));
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
  externalChange = false;

  protected ngOnInit(){
    if (!this.options) this.options = [];
    this.items = [];
    if (this.item) this.items = [this.item];
  }

  ngOnChanges(changes: {[propName: string]: any}) {
    this.items = [];
    if (this.item) this.items = [this.item];

    if (this.externalChange)
      this.refresh();
    this.externalChange = true;
  }

  refresh(){
    setTimeout(() => {this.active = false}, 0);
    setTimeout(() => {this.active = true}, 0);
  }

  public refreshValue(value: any):void {
    let options: any[] = [];
    if (this.options[0] && this.options[0].children){
      //Flatten grouped options
      options = [].concat.apply([], this.options.map(item => item.children));
    } else options = this.options;
    this.externalChange = false;
    this.item = options.find(y => (value.id == ((y.id)? y.id: y.name)));
    this.updated.emit(this.item);
  }
}
