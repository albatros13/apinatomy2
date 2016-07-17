/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';
import {MeasurableType} from "../../providers/service.apinatomy2";

@Component({
  providers: [RestoreService],
  selector: 'materialType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [(dependencies)] = "dependencies" [ignore]="ignore"
      (saved)    = "onSaved($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "onPropertyUpdated($event)">
        
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

        <!--Auxilliary field: measurables to generate-->
        <div class="generate-control">
          <label for="measurablesToReplicate"><img class="icon" src="images/measurableType.png"/> Measurables to generate </label>
          <select-input [items]="measurablesToReplicate" 
            (updated)="measurablesToReplicate = $event"
            [options]="supertypeMeasurables">
          </select-input>
        </div>

        <ng-content></ng-content>
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RepoTemplate]
})
export class MaterialTypePanel extends TypePanel{
  measurablesToReplicate: Array<any> = [];
  supertypeMeasurables: Array<any> = [];
  dependencies: any;

  onPropertyUpdated(event: any){
    let property = event.property;
    if (property == "supertypes"){
      let supertypes = event.values;
      this.supertypeMeasurables = [];
      for (let supertype of supertypes){
        if (supertype.measurables){
          let supertypeMeasurables = Array.from(new Set(supertype.measurables.map((item: any) => item.type)));
          for (let supertypeMeasurable of supertypeMeasurables){
            if (this.supertypeMeasurables.indexOf(supertypeMeasurable) < 0)
              this.supertypeMeasurables.push(supertypeMeasurable);
          }
        }
      }
      this.measurablesToReplicate = Array.from(this.supertypeMeasurables);
    }
    this.propertyUpdated.emit(event);
  }

  protected onSaved(event: any) {
    for (let measurable of this.measurablesToReplicate){
      let newMeasurable = new MeasurableType(measurable);
      delete newMeasurable["id"];
      //newMeasurable.materials = [this.item];
      if (this.dependencies && this.dependencies.measurables) {
        this.dependencies.measurables.push(newMeasurable);
      }
    }
    this.saved.emit(event);
  }

}
