/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';

@Component({
  providers: [RestoreService],
  selector: 'materialType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies] = "dependencies" [ignore]="ignore"
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
        <!--Materials-->
        <div class="input-control" *ngIf="includeProperty('materials')">
            <label for="materials">Materials: </label>
            <select-input 
              [items]="item.materials" 
              (updated)="updateProperty('materials', $event)" 
              [options]="dependencies.materials"></select-input>
        </div>
        
        <!--MaterialProviders-->
        <div class="input-control" *ngIf="includeProperty('materialProviders')">
          <label for="materialProviders">Inherits materials from: </label>
          <select-input 
            [items]="item.materialProviders" 
            (updated)="updateProperty('materialProviders', $event)" 
            [options]="dependencies.materials"></select-input>
        </div>

        <!--Measurables-->
        <div class="input-control" *ngIf="includeProperty('measurables')">
          <repo-template caption='Measurables' 
          [items]="item.measurables" 
          (updated)="updateProperty('measurables', $event)" 
          [dependencies]="dependencies"
          [types]="[templateName.MeasurableTemplate]"></repo-template>
        </div>

        <!--MeasurableProviders-->
        <div class="input-control" *ngIf="includeProperty('measurableProviders')">
          <label for="measurableProviders">Inherits measurables from: </label>
          <select-input [items]="item.measurableProviders" 
          (updated)="updateProperty('measurableProviders', $event)" 
          [options]="dependencies.materials"></select-input>
        </div>

        <ng-content></ng-content>
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RepoTemplate]
})
export class MaterialTypePanel extends TypePanel{}
