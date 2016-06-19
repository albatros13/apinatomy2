/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../providers/service.restore";
import {IType} from "../providers/service.apinatomy2";
import {ResourcePanel} from "./panel.resource";
import {SelectInput} from './component.general';

@Component({
  providers: [RestoreService],
  selector: 'type-panel',
  inputs: ['item', 'ignore'],
  template:`
    <resource-panel [item]="item" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <inputs>
         <div class="input-control" *ngIf="includeProperty('supertypes')">
            <label for="name">Supertypes: </label>
            <select-input [item]="item.supertypes"></select-input>
          </div>
        <ng-content select="inputs"></ng-content>      
      </inputs>
    </resource-panel>
  `,
  directives: [ResourcePanel, SelectInput]
})
export class TypePanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<IType>){
    super(restoreService);
  }
}
