/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {model} from "../services/utils.model";
const {MaterialType} = model;

@Component({
  selector: 'materialType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <type-panel [item]="item" 
      [ignore]="ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">        
        
        <!--Materials-->
        <div class="input-control" *ngIf="includeProperty('materials')">
          <label for="materials">{{getPropertyLabel('materials')}}: </label>
          <select-input 
            [items]="item.p('materials') | async" 
            (updated)="updateProperty('materials', $event)" 
            [options]="MaterialType.p('all') | async"></select-input>
        </div>
        
        <providerGroup>             
          <!--MaterialProviders-->
          <div class="input-control" *ngIf="includeProperty('materialProviders')">
            <label for="materialProviders">{{getPropertyLabel('materialProviders')}}: </label>
            <select-input 
              [items]="item.p('materialProviders') | async" 
              (updated)="updateProperty('materialProviders', $event)" 
              [options]="MaterialType.p('all') | async"></select-input>
          </div>
          <ng-content select="providerGroup"></ng-content>
        </providerGroup>

       
        <ng-content></ng-content>
        
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RepoTemplate]
})
export class MaterialTypePanel extends TypePanel{
  MaterialType = MaterialType;
}
