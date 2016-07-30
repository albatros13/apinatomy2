/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationPanel} from "./panel.measurableLocation";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'nodeType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <measurableLocation-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--Channels-->
      <repo-template caption="Channels" [items] = "item.channels" 
        (updated)="updateProperty('channels', $event)"     
        [dependencies] = "dependencies" [types]="[templateName.NodeTemplate]"></repo-template>
      
      <ng-content></ng-content>      
    
    </measurableLocation-panel>
  `,
  directives: [MeasurableLocationPanel, RepoTemplate]
})
export class NodeTypePanel extends MeasurableLocationPanel{}
