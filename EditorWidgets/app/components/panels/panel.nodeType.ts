/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  providers: [RestoreService],
  selector: 'nodeType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['externals']" 
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
      <repo-template caption="Channels" [items] = "item.channels" 
        [dependencies] = "dependencies" [types]="[templateName.NodeTemplate]"></repo-template>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, RepoTemplate]
})
export class NodeTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
