/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {TransportPhenomenon} from "../services/utils.model";
import {MeasurableLocationTypePanel} from "./panel.measurableLocationType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {NodeTemplatePanel} from './template.nodeTemplate';
import {SetToArray} from "../transformations/pipe.general";
import {ProcessType, MaterialType} from "open-physiology-model";

@Component({
  selector: 'processType-panel',
  inputs: ['item', 'ignore', "options"],
  template:`
    <measurableLocationType-panel [item]="item" 
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
           [options]="MaterialType.p('all') | async"></select-input>
          </div> 
        
         <relationGroup>
          <!--Segments-->
          <div class="input-control" *ngIf="includeProperty('segments')">
            <repo-template caption='Segments' 
            [items]="item.p('segments') | async | setToArray" 
            (updated)="updateProperty('segments', $event)" 
            [types]="[templateName.ProcessTemplate]">
            </repo-template>
          </div>
          
          <!--Channels-->
          <div class="input-control" *ngIf="includeProperty('channels')">
            <repo-template caption='Channels' 
            [items]="item.p('channels') | async | setToArray" 
            (updated)="updateProperty('channels', $event)"           
            [types]="[templateName.ProcessTemplate]"></repo-template>
          </div>
        
          <ng-content select="relationGroup"></ng-content>
        </relationGroup>

        <providerGroup>
           <!--MaterialProviders-->
          <div class="input-control" *ngIf="includeProperty('materialProviders')">
            <label for="materialProviders">Material providers: </label>
            <select-input [items]="item.p('materialProviders') | async" 
            (updated)="updateProperty('materialProviders', $event)" 
            [options]="ProcessType.p('all') | async"></select-input>
          </div>
          
           <!--SegmentProviders-->
          <div class="input-control" *ngIf="includeProperty('segmentProviders')">
            <label for="segmentProviders">Segment providers: </label>
            <select-input [items]="item.p('segmentProviders') | async" 
            (updated)="updateProperty('segmentProviders', $event)" 
            [options]="ProcessType.p('all') | async"></select-input>
          </div>
          
          <!--ChannelProviders-->
          <div class="input-control" *ngIf="includeProperty('channelProviders')">
            <label for="channelProviders">Channel providers: </label>
            <select-input [items]="item.p('channelProviders') | async" 
            (updated)="updateProperty('channelProviders', $event)"           
            [options]="ProcessType.p('all') | async"></select-input>
          </div>     
          
           <ng-content select="providerGroup"></ng-content>
        </providerGroup>
       
        <ng-content></ng-content>  
   
    </measurableLocationType-panel>
  `,
  directives: [MeasurableLocationTypePanel, MultiSelectInput, SingleSelectInput, RADIO_GROUP_DIRECTIVES, NodeTemplatePanel],
  pipes: [SetToArray]
})
export class ProcessTypePanel extends MeasurableLocationTypePanel{
  public transportPhenomenon = TransportPhenomenon;
  ProcessType = ProcessType;
  MaterialType = MaterialType;

  ngOnInit(){
    super.ngOnInit();
    if (!this.item.transportPhenomenon) this.item.transportPhenomenon = [];
  }
}
