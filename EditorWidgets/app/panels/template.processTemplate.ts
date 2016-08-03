"use strict";
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {TransportPhenomenon} from "../services/utils.model";
import {FilterByClass} from "../transformations/pipe.general";

import {NodeTemplate, LyphType} from "open-physiology-model";

@Component({
  selector: 'processTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "myIgnore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--TransportPhenomenon-->
      <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
        <fieldset>
          <legend>Transport phenomenon:</legend>
          <radio-group [(ngModel)]="item.transportPhenomenon" [required]="true">
             <input type="radio" [value]="transportPhenomenon.diffusion">{{transportPhenomenon.diffusion}}&nbsp;
             <input type="radio" [value]="transportPhenomenon.advection">{{transportPhenomenon.advection}}<br/>
           </radio-group>
        </fieldset>
      </div>
      
      <!--ConveyingLyph-->
      <div class="input-control" *ngIf="includeProperty('conveyingLyph')">
        <label for="conveyingLyph">Conveying lyph: </label>
        <select-input-1 [item] = "item.conveyingLyph"
         (updated)="updateProperty('conveyingLyph', $event)"    
         [options] = "LyphType.p('all') | async"></select-input-1>
      </div>
      
      <!--Source-->
      <div class="input-control" *ngIf="includeProperty('source')">      
        <label for="source">Source: </label>
        <select-input-1 [item] = "item.source" 
          (updated)="onSourceChanged($event)"   
          [options] = "NodeTemplate.p('all') | async"></select-input-1>
      </div>
      
      <!--Target-->
      <div class="input-control" *ngIf="includeProperty('target')">      
        <label for="target">Target: </label>
        <select-input-1 [item] = "item.target" 
          (updated) = "onTargetChanged($event)"   
          [options] = "NodeTemplate.p('all') | async"></select-input-1>
      </div>        
      
      <ng-content></ng-content>      
    
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel, RADIO_GROUP_DIRECTIVES],
  pipes: [FilterByClass]
})
export class ProcessTemplatePanel extends TemplatePanel{
  transportPhenomenon = TransportPhenomenon;
  LyphType = LyphType;
  NodeTemplate = NodeTemplate;

  myIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.myIgnore = new Set<string>(this.ignore).add('cardinalityBase').add('cardinalityMultipliers')
  }

  onSourceChanged(node: NodeTemplate){
    if (this.item.source) {
      let index = this.item.source.outgoingProcesses.indexOf(this.item);
      if (index > -1) this.item.source.outgoingProcesses.slice(index, 1);
    }
    super.updateProperty("source", node);
    if (node){
      if (!node.outgoingProcesses) node.outgoingProcesses = [];
      node.outgoingProcesses.push(this.item);
    }
  }

  onTargetChanged(node: NodeTemplate){
    if (this.item.target) {
      let index = this.item.target.incomingProcesses.indexOf(this.item);
      if (index > -1) this.item.target.incomingProcesses.slice(index, 1);
    }
    super.updateProperty("target", node);
    if (node){
      if (!node.incomingProcesses) node.incomingProcesses = [];
      node.incomingProcesses.push(this.item);
    }
  }
}
