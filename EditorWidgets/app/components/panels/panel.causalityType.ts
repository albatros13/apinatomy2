/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
import {MeasurableTemplatePanel} from '../templates/template.measurableType';
import {EditToolbar, SingleSelectInput} from '../component.general';
import {MeasurableTemplate} from '../../providers/service.apinatomy2';
import {FilterByClass} from "../../transformations/pipe.general";

@Component({
  selector: 'causalityType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" [ignore]="ignore"
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
      
      <!--Cause-->
      <div class="input-control" *ngIf="includeProperty('cause')">      
        <label for="cause">Cause: </label>
        <select-input-1 [item] = "item.cause" 
          (updated)="updateProperty('cause', $event)"    
          [options] = "dependencies.templates | filterByClass: [templateName.MeasurableTemplate]"></select-input-1>
        <edit-toolbar *ngIf="!item.cause" [options]="[templateName.MeasurableTemplate]" 
          (added)="addProperty('cause', $event)"></edit-toolbar>
        <measurableTemplate-panel [item]="item.cause" 
          [dependencies]="{types: dependencies.measurables, templates: dependencies.templates}" 
          (saved)="updateProperty('cause', $event)"    
          (removed)="updateProperty('cause', null)">
        </measurableTemplate-panel>
      </div>
      
      <!--Effect-->
      <div class="input-control" *ngIf="includeProperty('effect')">      
        <label for="effect">Effect: </label>
        <select-input-1 [item] = "item.effect" 
          (updated)="updateProperty('effect', $event)"    
          [options] = "dependencies.templates | filterByClass: [templateName.MeasurableTemplate]"></select-input-1>
        <edit-toolbar *ngIf="!item.effect" [options]="[templateName.MeasurableTemplate]" 
          (added)="addProperty('effect', $event)"></edit-toolbar>
        <measurableTemplate-panel *ngIf="item.effect" 
          [item]="item.effect" 
          [dependencies]="{types: dependencies.measurables, templates: dependencies.templates}" 
          (saved)="updateProperty('effect', $event)"    
          (removed)="updateProperty('effect',null)">
        </measurableTemplate-panel>
      </div>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MeasurableTemplatePanel, EditToolbar, SingleSelectInput],
  pipes: [FilterByClass]
})
export class CausalityTypePanel extends TypePanel{
  dependencies: any;

  addProperty(property: string){
    this.item[property] = new MeasurableTemplate({name: "T: " + property + " " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item[property]);
    }
  }
}
