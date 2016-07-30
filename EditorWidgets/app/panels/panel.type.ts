/**
 * Created by Natallia on 6/17/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {TemplateName} from "../services/service.apinatomy2";

@Component({
  selector: 'type-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <resource-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]      ="ignore"
      [options]     ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
  
      <!--Supertypes-->
      <div class="input-control" *ngIf="includeProperty('supertypes')">
        <label for="name">Supertypes: </label>
        <select-input [items]="item.supertypes" 
        (updated)="updateProperty('supertypes', $event)" 
        [options]="dependencies.types"></select-input>
      </div>
      <ng-select select="generateFromSupertype"></ng-select>

      <!--Subtypes-->
      <div class="input-control" *ngIf="includeProperty('subtypes')">
        <label for="name">Subtypes: </label>
        <select-input [items]="item.subtypes" 
          (updated)="updateProperty('subtypes', $event)" 
        [options]="dependencies.types"></select-input>
      </div>

      <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput]
})
export class TypePanel extends ResourcePanel implements OnInit{
  protected templateName = TemplateName;
}
