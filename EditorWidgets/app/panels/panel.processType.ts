/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {TransportPhenomenon} from "../services/service.apinatomy2";
import {MeasurableLocationTypePanel} from "./panel.measurableLocationType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {NodeTemplatePanel} from '../templates/template.nodeTemplate';
import {FilterByClass} from "../transformations/pipe.general";

@Component({
  selector: 'processType-panel',
  inputs: ['item', 'ignore', 'dependencies', "options"],
  template:`
    <measurableLocationType-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]  ="ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

        
          <!--Species-->
          <div class="input-control" *ngIf="includeProperty('species')">
            <label for="species">Species: </label>
            <input type="text" class="form-control" [(ngModel)]="item.species">
          </div>
          
        <!--TransportPhenomenon-->
          <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
            <fieldset>
              <legend>Transport phenomenon:</legend>
              <checkbox-group [(ngModel)]="item.transportPhenomenon" [required]="true">
                 <input type="checkbox" [value]="transportPhenomenon.diffusion">{{transportPhenomenon.diffusion}}&nbsp;
                 <input type="checkbox" [value]="transportPhenomenon.advection">{{transportPhenomenon.advection}}<br/>
               </checkbox-group>
            </fieldset>
          </div>
          
         <!--Materials-->
        <div class="input-control" *ngIf="includeProperty('materials')">
          <label for="meterials">Materials: </label>
          <select-input [items]="item.p('materials') | async" 
          (updated)="updateProperty('materials', $event)" 
           [options]="dependencies.materials"></select-input>
          </div> 
        
         <relationGroup>
          <!--Measurables-->
          <div class="input-control" *ngIf="includeProperty('measurables')">
            <repo-template caption='Measurables' [items]="item.p('measurables')" 
            (updated)="updateProperty('measurables', $event)" 
            [dependencies]="dependencies" [types]="[templateName.MeasurableTemplate]"></repo-template>
          </div>
          
          <!--Segments-->
          <div class="input-control" *ngIf="includeProperty('segments')">
            <repo-template caption='Segments' [items]="item.segments" 
            (updated)="updateProperty('segments', $event)" 
            [dependencies]="dependencies" [types]="[templateName.ProcessTemplate]">
            </repo-template>
          </div>
          
          <!--Channels-->
          <div class="input-control" *ngIf="includeProperty('channels')">
            <repo-template caption='Channels' [items]="item.channels" 
            (updated)="updateProperty('channels', $event)"           
            [dependencies]="dependencies" [types]="[templateName.ProcessTemplate]"></repo-template>
          </div>
        
          <ng-content select="relationGroup"></ng-content>
        </relationGroup>

        <providerGroup>
          <!--MeasurableProviders-->
          <div class="input-control" *ngIf="includeProperty('measurableProviders')">
            <label for="measurableProviders">Inherits measurables from: </label>
            <select-input [items]="item.p('measurableProviders') | async" 
            (updated)="updateProperty('measurableProviders', $event)" 
            [options]="dependencies.processes"></select-input>
          </div>
          
           <!--MaterialProviders-->
          <div class="input-control" *ngIf="includeProperty('materialProviders')">
            <label for="materialProviders">Inherits materials from: </label>
            <select-input [items]="item.p('materialProviders') | async" 
            (updated)="updateProperty('materialProviders', $event)" 
            [options]="dependencies.processes"></select-input>
          </div>
          
           <!--SegmentProviders-->
          <div class="input-control" *ngIf="includeProperty('segmentProviders')">
            <label for="segmentProviders">Inherits segments from: </label>
            <select-input [items]="item.p('segmentProviders') | async" 
            (updated)="updateProperty('segmentProviders', $event)" 
            [options]="dependencies.processes"></select-input>
          </div>
          
          <!--ChannelProviders-->
          <div class="input-control" *ngIf="includeProperty('channelProviders')">
            <label for="channelProviders">Inherits channels from: </label>
            <select-input [items]="item.p('channelProviders') | async" 
            (updated)="updateProperty('channelProviders', $event)"           
            [options]="dependencies.channels"></select-input>
          </div>     
          
           <ng-content select="providerGroup"></ng-content>
        </providerGroup>
       
        <ng-content></ng-content>  
   
    </measurableLocationType-panel>
  `,
  directives: [MeasurableLocationTypePanel, MultiSelectInput, SingleSelectInput, RADIO_GROUP_DIRECTIVES, NodeTemplatePanel],
  pipes: [FilterByClass]
})
export class ProcessTypePanel extends MeasurableLocationTypePanel{
  public transportPhenomenon = TransportPhenomenon;

  ngOnInit(){
    if (!this.item.transportPhenomenon) this.item.transportPhenomenon = [];
  }
}
