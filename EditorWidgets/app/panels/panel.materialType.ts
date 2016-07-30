/**
 * Created by Natallia on 6/17/2016.
 */
import {Component, Input} from '@angular/core';
import {RestoreService} from "../services/service.restore";
import {MeasurableLocationPanel} from "./panel.measurableLocation";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {MeasurableType} from "../services/service.apinatomy2";

@Component({
  providers: [RestoreService],
  selector: 'materialType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <measurableLocation-panel [item]="item" 
      [dependencies] = "dependencies" 
      [ignore]="ignore"
      [options] ="options"
      (saved)    = "onSaved($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "onPropertyUpdated($event)">
      
        <ng-content select="headerGroup"></ng-content>
        
        <!--Materials-->
        <div class="input-control" *ngIf="includeProperty('materials')">
          <label for="materials">Materials: </label>
          <select-input 
            [items]="item.materials" 
            (updated)="updateProperty('materials', $event)" 
            [options]="dependencies.materials"></select-input>
        </div>
        
        <providerGroup>             
          <!--MaterialProviders-->
          <div class="input-control" *ngIf="includeProperty('materialProviders')">
            <label for="materialProviders">Inherits materials from: </label>
            <select-input 
              [items]="item.materialProviders" 
              (updated)="updateProperty('materialProviders', $event)" 
              [options]="dependencies.materials"></select-input>
          </div>
          <ng-content select="providerGroup"></ng-content>
        </providerGroup>

        <!--Auxilliary field: measurables to generate-->
        <!--TODO: replace with modal-->
        <!--<generateFromSupertype>-->
          <!--<div class="generate-control">-->
            <!--<label for="measurablesToReplicate"><img class="icon" src="images/measurableType.png"/> Measurables to generate </label>-->
            <!--<select-input [items]="measurablesToReplicate" -->
              <!--(updated)="measurablesToReplicate = $event"-->
              <!--[options]="supertypeMeasurables">-->
            <!--</select-input>-->
          <!--</div>-->
        <!--</generateFromSupertype>-->
        
        <ng-content></ng-content>
    </measurableLocation-panel>
  `,
  directives: [MeasurableLocationPanel, MultiSelectInput, RepoTemplate]
})
export class MaterialTypePanel extends MeasurableLocationPanel{
  measurablesToReplicate: Array<any> = [];
  supertypeMeasurables: Array<any> = [];

  ngOnInit(){
    this.ignore = this.ignore.add("providers");
  }

  //TODO: Move generation of measurables to modal window
  onPropertyUpdated(event: any){
    let property = event.properties;
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
