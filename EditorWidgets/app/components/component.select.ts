/**
 * Created by Natallia on 7/23/2016.
 */
import {Component, Output, OnChanges, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {MapToOptions} from "../transformations/pipe.general";
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

@Component({
  selector: 'select-input',
  inputs: ['items', 'options'],
  template:`
    <div *ngIf="active">
      <ng-select
        [items]       = "_options | mapToOptions"
        [initData]    = "_items | mapToOptions"
        [multiple]    = true
        (data)        = "refreshValue($event)"
      ></ng-select>
    </div>
    `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [MapToOptions]
})
export class MultiSelectInput implements OnChanges{
  _items: Array<any>;
  _options: Array<any>;
  @Output() updated = new EventEmitter();

  active: boolean = true;
  externalChange = false;
  
  isSet = false;

  public set items (items:any) {
    if (items && (items instanceof Set)) {
      this._items = Array.from(items);
      this.isSet = true;
    }
    else 
      this._items = items;
  }

  public get items (): any {
    if (this._items && this.isSet) return new Set<any>(this._items);
    return this._items;
  }

  public set options (options:any) {
    if (options && (options instanceof Set)) {
      this._options = Array.from(options);
      this.isSet = true;
    }
    else
      this._options = options;
  }

  public get options (): any {
    if (this._options && this.isSet) return new Set<any>(this._options);
    return this._options;
  }

  protected ngOnInit(){
    if (!this._options) this._options = [];
    if (!this._items) this._items = [];
  }

  ngOnChanges(changes: {[propName: string]: any}) {
    if (this.externalChange){
      setTimeout(() => {this.active = false}, 0);
      setTimeout(() => {this.active = true}, 0);
    }
    this.externalChange = true;
  }

  refreshValue(value: Array<any>):void {
    let selected = value.map(x => x.id);
    let options: any[] = [];
    if (this._options[0] && this._options[0].children){
      //Flatten grouped options
      options = [].concat.apply([], this._options.map(x => x.children));
    } else{
      options = this._options;
    }
    this.externalChange = false;
    this._items = options.filter(y => (selected.indexOf((y.id)? y.id: y.name) != -1));
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
  options: Array<any>;
  @Output() updated = new EventEmitter();

  active: boolean = true;
  externalChange = false;

  protected ngOnInit(){
    if (!this.options) this.options = [];
    this.items = (this.item)? [this.item]: this.items = [];
  }

  ngOnChanges(changes: {[propName: string]: any}) {
    this.items = [];
    if (this.item) this.items = [this.item];

    if (this.externalChange){
      setTimeout(() => {this.active = false}, 0);
      setTimeout(() => {this.active = true}, 0);
    }
    this.externalChange = true;
  }

  public refreshValue(value: any):void {
    let options: any[] = [];
    if (this.options[0] && this.options[0].children){
      //Flatten grouped options
      options = [].concat.apply([], this.options.map(item => item.children));
    } else {
      options = this.options;
    }
    this.externalChange = false;
    this.item = options.find(y => (value.id == ((y.id)? y.id: y.name)));
    this.updated.emit(this.item);
  }
}
