/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TransportPhenomenon} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {NodeTemplatePanel} from '../templates/template.nodeType';

@Component({
  providers: [RestoreService],
  selector: 'processType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['externals']" 
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
          <fieldset>
            <legend>Transport phenomenon:</legend>
            <radio-group [(ngModel)]="item.transportPhenomenon" [required]="true">
               <input type="radio" [value]="transportPhenomenon.diffusion">{{transportPhenomenon.diffusion}}&nbsp;
               <input type="radio" [value]="transportPhenomenon.advection">{{transportPhenomenon.advection}}<br/>
             </radio-group>
          </fieldset>
        </div>
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" [(ngModel)]="item.species">
        </div>
        <div class="input-control" *ngIf="includeProperty('measurables')">
          <repo-template caption='Measurables' [items]="item.measurables" 
          [dependencies]="dependencies" [types]="[templateName.MeasurableTemplate]"></repo-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('materials')">
          <label for="meterials">Materials: </label>
          <select-input [item]="item.materials" [options]="dependencies.materials"></select-input>
        </div>        
        <div class="input-control" *ngIf="includeProperty('source')">      
          <label for="source">Source: </label>
          <nodeTemplate-panel [item]="item.source" 
            [dependencies]="{types: dependencies.nodes, templates: dependencies.templates}" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></nodeTemplate-panel>
        </div>
        <div class="input-control" *ngIf="includeProperty('target')">      
          <label for="target">Target: </label>
          <nodeTemplate-panel [item]="item.target" 
            [dependencies]="{types: dependencies.nodes, templates: dependencies.templates}" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></nodeTemplate-panel>
        </div>        
    <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RADIO_GROUP_DIRECTIVES, NodeTemplatePanel]
})
export class ProcessTypePanel extends TypePanel{
  transportPhenomenon = TransportPhenomenon;
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
