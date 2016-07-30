/**
 * Created by Natallia on 7/23/2016.
 */
import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {MapToOptions, SetToArray} from "../transformations/pipe.general";
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

////////////////////////////////////////////////////////////////////////////////
// select-input ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'select-input',
  template:`
    <div *ngIf="active">
      <ng-select
        [items]       = "options | setToArray | mapToOptions"
        [initData]    = "items   | setToArray | mapToOptions"
        [multiple]    = "true"
        (data)        = "refreshValue($event)"
      ></ng-select>
    </div>
    `,
  directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [MapToOptions, SetToArray]
})
export class MultiSelectInput /*implements OnChanges*/ {

  @Input()  options: Set<any>;
  @Input()  items:   Set<any>;
  @Output() updated = new EventEmitter();

  active: boolean = true;

  externalChange = false;
  ngOnChanges(changes: {[propName: string]: any}) {

    console.log('--changes--', changes);

    if (this.externalChange){
      setTimeout(() => { this.active = false }, 0);
      setTimeout(() => { this.active = true  }, 0);
    }
    this.externalChange = true;
  }

  refreshValue(value: Array<any>):void {
    let selected = value.map(x => x.id);
    // this.externalChange = false;
    let newItems = Array.from(this.options).filter(y => (selected.indexOf((y.id)? y.id: y.name) != -1));
    this.updated.emit(new Set(newItems));
  }
}

////////////////////////////////////////////////////////////////////////////////
// select-1-input //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
export class SingleSelectInput {
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
