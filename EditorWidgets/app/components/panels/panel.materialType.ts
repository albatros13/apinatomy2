/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'materialType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies] = "dependencies" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('inheritsMaterials')">
          <label for="inheritsMaterials">Inherits materials: </label>
          <select-input [item]="item.inheritsMaterials" [options]="dependencies.materials"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('materials')">
            <label for="meterials">Materials: </label>
            <select-input [item]="item.materials" [options]="dependencies.materials"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsMeasurables')">
          <label for="inheritsMeasurables">Inherits measurables: </label>
          <select-input [item]="item.inheritsMeasurables" [options]="dependencies.materials"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('measurables')">
          <repo-template caption='Measurables' [items]="item.measurables" [dependencies]="dependencies"
          [types]="[templateName.MeasurableTemplate]"></repo-template>
        </div>
        <ng-content></ng-content>
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput]
})
export class MaterialTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
