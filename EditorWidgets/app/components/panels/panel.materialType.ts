/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IMaterialType} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';
// import {RepoMeasurableTypeTemplate} from '../templates/template.measurableType';

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
          <select-input [item]="item.inheritsMaterials" [options]="dependencies.materialTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('materials')">
            <label for="meterials">Materials: </label>
            <select-input [item]="item.materials" [options]="dependencies.materialTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsMeasurables')">
          <label for="inheritsMeasurables">Inherits measurables: </label>
          <select-input [item]="item.inheritsMeasurables" [options]="dependencies.materialTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('measurables')">
          <repo-template caption='Measurables' [items]="item.measurables" [dependencies]="dependencies.measurableTypes"></repo-template>
        </div>
        <ng-content></ng-content>
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput]//, RepoMeasurableTypeTemplate]
})
export class MaterialTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<IMaterialType>){
    super(restoreService);
  }
}
