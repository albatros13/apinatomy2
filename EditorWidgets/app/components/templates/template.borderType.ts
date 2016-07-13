/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {TemplatePanel} from "./template.type";
import {FormType, BorderTemplate} from "../../providers/service.apinatomy2";

@Component({
  selector: 'borderTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <template-panel [item]="item" 
      [dependencies] = "dependencies"  
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--Position: Template-->
      <!--<template-value caption="Position:" [item]="item.position"-->
      <!--(updated)="updateProperty('position', $event)"></template-value>-->
      
      <!--Form: {open, closed}-->
<!--      <div class="input-control" *ngIf="includeProperty('form')">
        <fieldset>
          <legend>Form:</legend>
          <radio-group [(ngModel)]="item.form" [required]="true">
             <input type="radio" [value]="form.open">{{formType.open}}&nbsp;
             <input type="radio" [value]="form.closed">{{formType.closed}}<br/>
          </radio-group>
        </fieldset>
      </div>-->
      
      <ng-content></ng-content>   
         
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel]
})
export class BorderTemplatePanel extends TemplatePanel{
  public formType = FormType;
  item: any;

  constructor(){
    super();
    if (!this.item) {this.item = new BorderTemplate({});}
  }
}
