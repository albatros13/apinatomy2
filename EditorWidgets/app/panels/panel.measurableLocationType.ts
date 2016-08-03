/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {MaterialType, MeasurableTemplate, MeasurableType} from "open-physiology-model";
import {SetToArray} from "../transformations/pipe.general";

@Component({
  selector: 'measurableLocationType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <type-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
       <providerGroup>
          <!--MeasurableProviders-->
          <div class="input-control" *ngIf="includeProperty('measurableProviders')">
            <label for="measurableProviders">Measurable providers: </label>
            <select-input [items]="item.p('measurableProviders') | async" 
            (updated)="updateProperty('measurableProviders', $event)" 
            [options]="item.constructor.p('all') | async"></select-input>
          </div>
          <ng-content select="providerGroup"></ng-content>
       </providerGroup>
        
       <relationGroup>
          <!--Measurables-->
          <div class="input-control" *ngIf="includeProperty('measurables')">
            <repo-template caption='Measurables' 
            [items]="item.p('measurables') | async | setToArray" 
            (updated)="updateProperty('measurables', $event)" 
            [types]="[templateName.MeasurableTemplate]"></repo-template>
          </div>
           <ng-content select="relationGroup"></ng-content>
       </relationGroup>      
      
       <ng-content></ng-content>      

    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RepoTemplate],
  pipes: [SetToArray]
})
export class MeasurableLocationTypePanel extends TypePanel{
  MaterialType = MaterialType;
  MeasurableTemplate = MeasurableTemplate;
}
