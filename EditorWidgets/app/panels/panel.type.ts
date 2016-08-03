/**
 * Created by Natallia on 6/17/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {TemplateName} from "../services/utils.model";

@Component({
  selector: 'type-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <resource-panel [item]="item" 
      [ignore]   ="ignore"
      [options]  ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
  
      <!--Supertypes-->
      <div class="input-control" *ngIf="includeProperty('supertypes')">
        <label for="name">Supertypes: </label>
        <select-input [items]="item.p('supertypes') | async" 
        (updated)="updateProperty('supertypes', $event)" 
        [options]="item.constructor.p('all') | async"></select-input>
      </div>
      
      <!--Subtypes-->
      <div class="input-control" *ngIf="includeProperty('subtypes')">
        <label for="name">Subtypes: </label>
        <select-input [items]="item.p('subtypes') | async" 
          (updated)="updateProperty('subtypes', $event)" 
        [options]="item.constructor.p('all') | async"></select-input>
      </div>

      <ng-content select="relationGroup"></ng-content>
      
      <ng-content select="providerGroup"></ng-content>

      <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput]
})
export class TypePanel extends ResourcePanel implements OnInit{
  templateName = TemplateName;
}
