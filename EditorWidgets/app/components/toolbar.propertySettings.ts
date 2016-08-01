/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DROPDOWN_DIRECTIVES} from "ng2-dropdown";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'property-toolbar',
  inputs: ['options'],
  template: `
    <div class="dropdown" dropdown>
      <button type="button" class="btn btn-default"  dropdown-open>
        <span class="glyphicon glyphicon-list"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-right" dropdown-not-closable-zone>
        <li *ngFor="let option of options">
          <a class="small" href="#"><input type="checkbox" 
          [(ngModel)]="option.selected" (ngModelChange)="selectionChanged.emit(option)"/>&nbsp;{{option.value}}</a>
        </li>
      </ul>
    </div>
    `,
  styles: [':host {float: right;}'],
  directives:[DROPDOWN_DIRECTIVES, RADIO_GROUP_DIRECTIVES]
})
export class PropertyToolbar {
  @Output() selectionChanged = new EventEmitter();
}

@Component({
  selector: 'custom-property-toolbar',
  inputs: ['options', 'caption'],
  template: `
    <div class="dropdown" dropdown>
      <button type="button" class="btn btn-default" dropdown-open>
        {{caption}} <span class="caret"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-right" dropdown-not-closable-zone>
        <li *ngFor="let option of options; let i = index">
          <a class="small" href="#"><input type="checkbox" [(ngModel)]="option.selected"/>&nbsp;{{option.value}}</a>
        </li>
      </ul>
    </div>
    `,
  styles: [':host {float: left;}'],
  directives:[DROPDOWN_DIRECTIVES, RADIO_GROUP_DIRECTIVES]
})
export class CustomPropertyToolbar {
  constructor(){}
}
