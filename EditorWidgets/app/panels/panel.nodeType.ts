/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationTypePanel} from "./panel.measurableLocationType";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {SetToArray} from "../transformations/pipe.general";
import {model} from "../services/utils.model";
const {NodeType} = model;

@Component({
  selector: 'nodeType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <measurableLocationType-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <ng-content></ng-content>   
 
      <providerGroup>
        <!--ChannelProviders-->
        <div class="input-control" *ngIf="includeProperty('channelProviders')">
          <label for="channelProviders">{{getPropertyLabel('channelProviders')}}: </label>
          <select-input [items]="item.p('channelProviders') | async" 
          (updated)="updateProperty('channelProviders', $event)" 
          [options]="NodeType.p('all') | async"></select-input>
        </div>
        <ng-content select="providerGroup"></ng-content>
      </providerGroup>

      <relationGroup>
      <!--Channels-->
      <div class="input-control" *ngIf="includeProperty('channels')"> 
        <repo-template [caption]="getPropertyLabel('channels')" 
          [items] = "item.p('channels') | async | setToArray" 
          (updated)="updateProperty('channels', $event)"     
          [types]="[templateName.NodeTemplate]"></repo-template>
        </div>
        <ng-content select="relationGroup"></ng-content>
      </relationGroup>      
    
    </measurableLocationType-panel>
  `,
  directives: [MultiSelectInput, MeasurableLocationTypePanel, RepoTemplate],
  pipes: [SetToArray]
})
export class NodeTypePanel extends MeasurableLocationTypePanel{
  NodeType = NodeType;
}
