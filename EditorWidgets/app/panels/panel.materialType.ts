/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationTypePanel} from "./panel.measurableLocationType";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {MaterialType, MeasurableType} from "open-physiology-model";

@Component({
  selector: 'materialType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <measurableLocationType-panel [item]="item" 
      [ignore]="ignore"
      [options] ="options"
      (saved)    = "onSaved($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "onPropertyUpdated($event)">        
        
        <!--Materials-->
        <div class="input-control" *ngIf="includeProperty('materials')">
          <label for="materials">Materials: </label>
          <select-input 
            [items]="item.p('materials') | async" 
            (updated)="updateProperty('materials', $event)" 
            [options]="materialTypeClass.p('all') | async"></select-input>
        </div>
        
        <providerGroup>             
          <!--MaterialProviders-->
          <div class="input-control" *ngIf="includeProperty('materialProviders')">
            <label for="materialProviders">Inherits materials from: </label>
            <select-input 
              [items]="item.p('materialProviders') | async" 
              (updated)="updateProperty('materialProviders', $event)" 
              [options]="materialTypeClass.p('all') | async"></select-input>
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
        
    </measurableLocationType-panel>
  `,
  directives: [MeasurableLocationTypePanel, MultiSelectInput, RepoTemplate]
})
export class MaterialTypePanel extends MeasurableLocationTypePanel{
  materialTypeClass   = MaterialType;
  measurableTypeClass = MeasurableType;

  measurablesToReplicate: Array<any> = [];
  supertypeMeasurables: Array<any> = [];

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
      delete measurable["id"];
      let newMeasurable = this.measurableTypeClass.new(measurable);
      newMeasurable.location = this.item;
    }
    this.saved.emit(event);
  }

}
