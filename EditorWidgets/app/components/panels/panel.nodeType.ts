/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'nodeType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="ignore"
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
      <repo-template caption="Channels" [items] = "item.channels" 
        (updated)="updateProperty('channels', $event)"     
        [dependencies] = "dependencies" [types]="[templateName.NodeTemplate]"></repo-template>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, RepoTemplate]
})
export class NodeTypePanel extends TypePanel{}
