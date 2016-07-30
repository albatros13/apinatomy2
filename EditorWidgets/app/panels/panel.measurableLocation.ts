/**
 * Created by Natallia on 6/17/2016.
 */
import {Component, Input} from '@angular/core';
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../components/component.select';
import {FilterByClass} from "../transformations/pipe.general";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'measurableLocation-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]      ="ignore"
      [options]     ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
       <fieldset *ngIf="includeProperty('providers')">  
          <legend>Providers</legend> 
          <!--MeasurableProviders-->
          <div class="input-control" *ngIf="includeProperty('measurableProviders')">
            <label for="measurableProviders">Inherits measurables from: </label>
            <select-input [items]="item.measurableProviders" 
            (updated)="updateProperty('measurableProviders', $event)" 
            [options]="dependencies.materials"></select-input>
          </div>
          <ng-content select="providerGroup"></ng-content>
        </fieldset>
        
       <fieldset *ngIf="includeProperty('relations')">  
        <legend>Relations</legend>  
          <!--Measurables-->
          <div class="input-control" *ngIf="includeProperty('measurables')">
            <repo-template caption='Measurables' 
            [items]="item.measurables" 
            (updated)="updateProperty('measurables', $event)" 
            [dependencies]="dependencies"
            [types]="[templateName.MeasurableTemplate]"></repo-template>
          </div>
          <ng-content select="relationGroup"></ng-content>
      </fieldset>
  
      <ng-content></ng-content>      

    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RepoTemplate],
  pipes: [FilterByClass]
})
export class MeasurableLocationPanel extends TypePanel{}
