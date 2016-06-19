/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../providers/service.restore";
import {IMaterialType} from "../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {SelectInput} from './component.general';

@Component({
  providers: [RestoreService],
  selector: 'materialType-panel',
  inputs: ['item', 'ignore'],
  template:`
    <type-panel [item]="item" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <inputs>
        <div class="input-control" *ngIf="includeProperty('materials')">
            <label for="name">Materials: </label>
            <select-input [item]="item.materials"></select-input>
          </div>
        <ng-content select="inputs"></ng-content>
      </inputs>
    </type-panel>
  `,
  directives: [TypePanel, SelectInput]
})
export class MaterialTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<IMaterialType>){
    super(restoreService);
  }
}
