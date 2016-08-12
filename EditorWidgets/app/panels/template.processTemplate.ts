"use strict";
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {FilterByClass} from "../transformations/pipe.general";
import {model} from "../services/utils.model";
const {NodeTemplate, LyphType, LyphTemplate} = model;

@Component({
  selector: 'processTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--TransportPhenomenon-->
      <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
        <fieldset>
          <legend>{{getPropertyLabel('transportPhenomenon')}}:</legend>
          <radio-group [(ngModel)]="item.transportPhenomenon" [required]="true">
             <input type="radio" value="diffusion">diffusion&nbsp;
             <input type="radio" value="advection">advection<br/>
           </radio-group>
        </fieldset>
      </div>
      
      <!--ConveyingLyph-->
      <div class="input-control" *ngIf="includeProperty('conveyingLyph')">
        <label for="conveyingLyph">{{getPropertyLabel('conveyingLyph')}}: </label>
        <select-input-1 [item] = "item.p('conveyingLyph') | async"
         (updated) = "updateProperty('conveyingLyph', $event)"    
         [options] = "LyphType.p('all') | async"></select-input-1>
      </div>
      
      <!--SourceContainer-->
      <div class="input-control" *ngIf="includeProperty('sourceLyph')">      
        <label for="sourceLyph">{{getPropertyLabel('sourceLyph')}}: </label>
        <select-input-1 [item] = "item.sourceLyph" 
          (updated) = "onSourceLyphChanged($event)"  
          [options] = "LyphTemplate.p('all') | async"></select-input-1>
      </div>
      
      <!--TargetContainer-->
      <div class="input-control" *ngIf="includeProperty('targetLyph')">      
        <label for="targetLyph">{{getPropertyLabel('targetLyph')}}: </label>
        <select-input-1 [item] = "item.targetLyph" 
          (updated) = "onTargetLyphChanged($event)"   
          [options] = "LyphTemplate.p('all') | async"></select-input-1>
      </div>        
      
      <!--Source-->
      <div class="input-control" *ngIf="includeProperty('source')">      
        <label for="source">{{getPropertyLabel('source')}}: </label>
        <select-input-1 [item] = "item.source" 
          (updated) = "onSourceChanged($event)"   
          [options] = "NodeTemplate.p('all') | async"></select-input-1>
      </div>
      
      <!--Target-->
      <div class="input-control" *ngIf="includeProperty('target')">      
        <label for="target">{{getPropertyLabel('target')}}: </label>
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
  LyphType = LyphType;
  NodeTemplate = NodeTemplate;
  LyphTemplate = LyphTemplate;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers');
  }

  onSourceLyphChanged(lyph: LyphTemplate){
    super.updateProperty("sourceLyph", lyph);
  }

  onTargetLyphChanged(lyph: LyphTemplate){
    super.updateProperty("targetLyph", lyph);
  }

  onSourceChanged(node: NodeTemplate){
    super.updateProperty("source", node);
  }

  onTargetChanged(node: NodeTemplate){
    super.updateProperty("target", node);
  }
}
