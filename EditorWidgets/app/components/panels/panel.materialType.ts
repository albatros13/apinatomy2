/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IMaterialType} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'materialType-panel',
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <type-panel [item]="item" 
      [dependency] = "dependency" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('materials')">
            <label for="meterials">Materials: </label>
            <select-input [item]="item.materials" [options]="dependency.materialTypes"></select-input>
          </div>
        <ng-content></ng-content>
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput]
})
export class MaterialTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<IMaterialType>){
    super(restoreService);
  }
}
