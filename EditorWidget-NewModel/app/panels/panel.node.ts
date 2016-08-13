/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationPanel} from "./panel.measurableLocation";
import {MultiSelectInput} from '../components/component.select';
import {RepoNested} from '../repos/repo.nested';
import {SetToArray} from "../transformations/pipe.general";
import {model} from "../services/utils.model";
const {Node, Process} = model;

@Component({
  selector: 'node-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <measurableLocation-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Incoming processes-->
        <div class="input-control" *ngIf="includeProperty('incomingProcesses')">      
          <label for="incomingProcesses">{{getPropertyLabel('incomingProcesses')}}: </label>
          <select-input [items] = "item.incomingProcesses" 
            (updated) = "updateProperty('incomingProcesses', $event)"  
            [options] = "item.fields['incomingProcesses'].p('possibleValues') | async"></select-input>
        </div>
      
      <!--Outgoing processes-->
        <div class="input-control" *ngIf="includeProperty('outgoingProcesses')">      
          <label for="outgoingProcesses">{{getPropertyLabel('outgoingProcesses')}}: </label>
          <select-input [items] = "item.outgoingProcesses" 
            (updated) = "updateProperty('outgoingProcesses', $event)"   
            [options] = "item.fields['outgoingProcesses'].p('possibleValues') | async"></select-input>
        </div>    

      <ng-content></ng-content>   
 
      <relationGroup>
      <!--Channels-->
      <div class="input-control" *ngIf="includeProperty('channels')"> 
        <repo-nested [caption]="getPropertyLabel('channels')" 
          [items] = "item.p('channels') | async | setToArray" 
          (updated)="updateProperty('channels', $event)"     
          [types]="[ResourceName.Node]"></repo-nested>
        </div>
        <ng-content select="relationGroup"></ng-content>
      </relationGroup>      
    
    </measurableLocation-panel>
  `,
  directives: [MultiSelectInput, MeasurableLocationPanel, RepoNested],
  pipes: [SetToArray]
})
export class NodePanel extends MeasurableLocationPanel{
  Node = Node;
  Process = Process;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers');
  }
}
