/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {TemplatePanel} from "./template.type";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {TransportPhenomenon} from "../../providers/service.apinatomy2";
import {FilterByClass} from "../../transformations/pipe.general";

@Component({
  selector: 'processTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore'],
  template:`
    <template-panel [item]="item" 
      [dependencies]="dependencies" 
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
         [options] = "dependencies.lyphs"></select-input-1>
      </div>
      
      <!--Source-->
      <div class="input-control" *ngIf="includeProperty('source')">      
        <label for="source">Source: </label>
        <select-input-1 [item] = "item.source" 
          (updated)="updateProperty('source', $event)"   
          [options] = "dependencies.templates | filterByClass: [templateName.NodeTemplate]"></select-input-1>
      </div>
      
      <!--Target-->
      <div class="input-control" *ngIf="includeProperty('target')">      
        <label for="target">Target: </label>
        <select-input-1 [item] = "item.target" 
          (updated)="updateProperty('target', $event)"   
          [options] = "dependencies.templates | filterByClass: [templateName.NodeTemplate]"></select-input-1>
      </div>        
      
      <ng-content></ng-content>      
    
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel, RADIO_GROUP_DIRECTIVES],
  pipes: [FilterByClass]
})
export class ProcessTemplatePanel extends TemplatePanel{
  transportPhenomenon = TransportPhenomenon;

  //TODO: set properties of nodes: incomingProcesses, outgoingProcesses
}
