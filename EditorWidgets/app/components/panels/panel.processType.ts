/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {TransportPhenomenon, NodeTemplate} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput, SingleSelectInput, EditToolbar} from '../component.general';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {NodeTemplatePanel} from '../templates/template.nodeType';
import {FilterByClass} from "../../transformations/pipe.general";

@Component({
  selector: 'processType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" [ignore]="ignore"
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">

        <!--TransportPhenomenon-->
        <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
          <fieldset>
            <legend>Transport phenomenon:</legend>
            <check-group [(ngModel)]="item.transportPhenomenon" [required]="true">
               <input type="checkbox" [value]="transportPhenomenon.diffusion">{{transportPhenomenon.diffusion}}&nbsp;
               <input type="checkbox" [value]="transportPhenomenon.advection">{{transportPhenomenon.advection}}<br/>
             </check-group>
          </fieldset>
        </div>
        
        <!--Species-->
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" [(ngModel)]="item.species">
        </div>
        
        <!--Measurables-->
        <div class="input-control" *ngIf="includeProperty('measurables')">
          <repo-template caption='Measurables' [items]="item.measurables" 
          (updated)="updateProperty('measurables', $event)" 
          [dependencies]="dependencies" [types]="[templateName.MeasurableTemplate]"></repo-template>
        </div>
        
        <!--MeasurableProviders-->
        <div class="input-control" *ngIf="includeProperty('measurableProviders')">
          <label for="measurableProviders">Inherits measurables from: </label>
          <select-input [items]="item.measurableProviders" 
          (updated)="updateProperty('measurableProviders', $event)" 
          [options]="dependencies.processes"></select-input>
        </div>
        
        <!--Materials-->
        <div class="input-control" *ngIf="includeProperty('materials')">
          <label for="meterials">Materials: </label>
          <select-input [items]="item.materials" 
          (updated)="updateProperty('materials', $event)" 
          [options]="dependencies.materials"></select-input>
        </div>        
        
         <!--MaterialProviders-->
        <div class="input-control" *ngIf="includeProperty('materialProviders')">
          <label for="materialProviders">Inherits materials from: </label>
          <select-input [items]="item.materialProviders" 
          (updated)="updateProperty('materialProviders', $event)" 
          [options]="dependencies.processes"></select-input>
        </div>
        
        <!--Segments-->
        <div class="input-control" *ngIf="includeProperty('segments')">
          <repo-template caption='Segments' [items]="item.segments" 
          (updated)="updateProperty('segments', $event)" 
          [dependencies]="dependencies" [types]="[templateName.ProcessTemplate]"></repo-template>
        </div>
        
        <!--SegmentProviders-->
        <div class="input-control" *ngIf="includeProperty('segmentProviders')">
          <label for="segmentProviders">Inherits segments from: </label>
          <select-input [items]="item.segmentProviders" 
          (updated)="updateProperty('segmentProviders', $event)" 
          [options]="dependencies.processes"></select-input>
        </div>
        
        <!--Channels-->
        <div class="input-control" *ngIf="includeProperty('channels')">
          <repo-template caption='Channels' [items]="item.channels" 
          (updated)="updateProperty('channels', $event)"           
          [dependencies]="dependencies" [types]="[templateName.ProcessTemplate]"></repo-template>
        </div>
        
        <!--ChannelProviders-->
        <div class="input-control" *ngIf="includeProperty('channelProviders')">
          <label for="channelProviders">Inherits channels from: </label>
          <select-input [items]="item.channelProviders" 
          (updated)="updateProperty('channelProviders', $event)"           
          [options]="dependencies.channels"></select-input>
        </div>
        
        <!--Source-->
        <div class="input-control" *ngIf="includeProperty('source')">      
          <label for="source">Source: </label>
          <select-input-1 [item] = "item.source" 
            (updated)="updateProperty('source', $event)"   
            [options] = "dependencies.templates | filterByClass: [templateName.NodeTemplate]"></select-input-1>
          <edit-toolbar *ngIf="!item.source" [options]="[templateName.NodeTemplate]" 
            (added)="addProperty('source', $event)"></edit-toolbar>
          <nodeTemplate-panel *ngIf="item.source" [item]="item.source" 
            [dependencies]="{types: dependencies.nodes, templates: dependencies.templates}" 
            (saved)="updateProperty('source', $event)"    
            (removed)="updateProperty('source', null)">            
          </nodeTemplate-panel>
        </div>
        
        <!--Target-->
        <div class="input-control" *ngIf="includeProperty('target')">      
          <label for="target">Target: </label>
          <select-input-1 [item] = "item.target" 
            (updated)="updateProperty('target', $event)"   
            [options] = "dependencies.templates | filterByClass: [templateName.NodeTemplate]"></select-input-1>
          <edit-toolbar *ngIf="!item.target" [options]="[templateName.NodeTemplate]" 
            (added)="addProperty('target', $event)"></edit-toolbar>
          <nodeTemplate-panel *ngIf="item.target" [item]="item.target" 
            [dependencies]="{types: dependencies.nodes, templates: dependencies.templates}" 
            (saved)="updateProperty('target', $event)"    
            (removed)="updateProperty('target', null)">
          </nodeTemplate-panel>
        </div>        
    <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, SingleSelectInput, RADIO_GROUP_DIRECTIVES, NodeTemplatePanel, EditToolbar],
  pipes: [FilterByClass]
})
export class ProcessTypePanel extends TypePanel{
  dependencies: any;
  @Output() saved = new EventEmitter();
  transportPhenomenon = TransportPhenomenon;
  
  addProperty(property: string){
    this.item[property] = new NodeTemplate({name: "T: " + property + " " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item[property]);
    }
  }

}
