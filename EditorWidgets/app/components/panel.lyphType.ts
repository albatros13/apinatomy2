/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../providers/service.restore";
import {ILyphType} from "../providers/service.apinatomy2";
import {MaterialTypePanel} from "./panel.materialType";
import {SelectInput} from './component.general';

@Component({
  providers: [RestoreService],
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'lyphTypes'],
  template:`
    <materialType-panel [item]="item" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <inputs>
        <div class="input-control" *ngIf="includeProperty('inheritsLayers')">
          <label for="name">Inherits layers: </label>
          <select-input [item]="item.inheritsLayers" [options]="lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsPatches')">
          <label for="name">Inherits patches: </label>
          <select-input [item]="item.inheritsPatches" [options]="lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsParts')">
          <label for="name">Inherits parts: </label>
          <select-input [item]="item.inheritsParts" [options]="lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsMeasurables')">
          <label for="name">Inherits measurables: </label>
          <select-input [item]="item.inheritsMeasurables" [options]="lyphTypes"></select-input>
        </div>
        <ng-content select="inputs"></ng-content>
      </inputs>
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, SelectInput]
})
export class LyphTypePanel extends MaterialTypePanel{
  constructor(protected restoreService: RestoreService<ILyphType>){
    super(restoreService);
  }
}
