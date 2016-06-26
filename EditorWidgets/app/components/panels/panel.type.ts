/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IType, TypeProvider} from "../../providers/service.apinatomy2";
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'type-panel',
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <resource-panel [item]="item" [dependency]="dependency" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
         <div class="input-control" *ngIf="includeProperty('supertypes')">
            <label for="name">Supertypes: </label>
            <select-input [item]="item.supertypes" [options]="dependency.types"></select-input>
          </div>
        <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput]
})
export class TypePanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<IType>){
    super(restoreService);
  }
}
