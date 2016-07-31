/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationTypePanel} from "./panel.measurableLocationType";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'nodeType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <measurableLocationType-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <ng-content></ng-content>   
      
      <relationGroup>
      <!--Channels-->
      <repo-template caption="Channels" [items] = "item.channels" 
        (updated)="updateProperty('channels', $event)"     
        [dependencies] = "dependencies" [types]="[templateName.NodeTemplate]"></repo-template>
  
        <ng-content select="relationGroup"></ng-content>
      </relationGroup>
    
    </measurableLocationType-panel>
  `,
  directives: [MeasurableLocationTypePanel, RepoTemplate]
})
export class NodeTypePanel extends MeasurableLocationTypePanel{}
