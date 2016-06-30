/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  providers: [RestoreService],
  selector: 'borderType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['externals']" 
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
      <!--TODO: replace with slider-->
      <div class="input-control">
        <label for="position">Position: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.position">
      </div>
      <repo-template caption="Elements" [items] = "item.elements" 
        [dependencies] = "dependencies" [types]="[templateName.NodeTemplate]"></repo-template>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, RepoTemplate]
})
export class BorderTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
