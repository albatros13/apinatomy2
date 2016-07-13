/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../component.general';
import {TemplateName} from "../../providers/service.apinatomy2";

@Component({
  selector: 'type-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <resource-panel [item]="item" 
      [(dependencies)]="dependencies" 
      [ignore]="ignore"
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
export class TypePanel extends ResourcePanel{
  protected templateName = TemplateName;
}
