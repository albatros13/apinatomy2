/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {TemplatePanel} from "./template.type";

@Component({
  selector: 'lyphTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <template-panel [item]="item" [dependencies]="dependencies" 
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
      <!--<template-value caption="Length:" [item]="item.length"-->
       <!--(updated)="updateProperty('length', $event)"></template-value>-->
      <!--<template-value caption="Width:" [item]="item.width"-->
       <!--(updated)="updateProperty('width', $event)"></template-value>-->
      <ng-content></ng-content>      
    </template-panel>
  `,
  directives: [SingleSelectInput, TemplateValue, TemplatePanel]
})
export class LyphTemplatePanel extends TemplatePanel{}
