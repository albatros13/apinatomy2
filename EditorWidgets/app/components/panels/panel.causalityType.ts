/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {MeasurableTemplatePanel} from '../templates/template.measurableType';
import {EditToolbar, SingleSelectInput} from '../component.general';
import {MeasurableTemplate} from '../../providers/service.apinatomy2';
import {FilterByClass} from "../../transformations/pipe.general";

@Component({
  providers: [RestoreService],
  selector: 'causalityType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['externals']"  
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
      <div class="input-control" *ngIf="includeProperty('cause')">      
        <label for="cause">Cause: </label>
        <select-input-1 [item] = "item.cause" 
          [options] = "dependencies.templates | filterByClass: [templateName.MeasurableTemplate]"></select-input-1>
        <edit-toolbar *ngIf="!item.cause" [options]="[templateName.MeasurableTemplate]" (added)="onCauseAdded($event)"></edit-toolbar>
        <measurableTemplate-panel [item]="item.cause" 
          [dependencies]="{types: dependencies.measurables, templates: dependencies.templates}" 
          (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></measurableTemplate-panel>
      </div>
      <div class="input-control" *ngIf="includeProperty('effect')">      
        <label for="effect">Effect: </label>
        <select-input-1 [item] = "item.effect" 
          [options] = "dependencies.templates | filterByClass: [templateName.MeasurableTemplate]"></select-input-1>
        <edit-toolbar *ngIf="!item.effect" [options]="[templateName.MeasurableTemplate]" (added)="onEffectAdded($event)"></edit-toolbar>
        <measurableTemplate-panel *ngIf="item.effect" [item]="item.effect" 
          [dependencies]="{types: dependencies.measurables, templates: dependencies.templates}" 
          (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></measurableTemplate-panel>
      </div>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MeasurableTemplatePanel, EditToolbar, SingleSelectInput],
  pipes: [FilterByClass]
})
export class CausalityTypePanel extends TypePanel{
  dependencies: any;
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }

  onCauseAdded(){
    this.item.cause = new MeasurableTemplate({name: "T: cause " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item.cause);
    }
  }

  onEffectAdded(){
    this.item.effect = new MeasurableTemplate({name: "T: effect " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item.effect);
    }
  }

  protected onCauseRemoved(node: MeasurableTemplate) {
    this.item.cause = null;
  }

  protected onEffectRemoved(node: MeasurableTemplate) {
    this.item.effect = null;
  }

}
