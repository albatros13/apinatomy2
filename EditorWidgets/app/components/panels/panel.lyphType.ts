/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {ILyphType} from "../../providers/service.apinatomy2";
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput} from '../component.general';
import {RepoLyphTypeTemplate} from '../templates/template.lyphType';

@Component({
  providers: [RestoreService],
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <materialType-panel [item]="item" 
        [dependency]="dependency" 
        (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('inheritsLayers')">
          <label for="inheritsLayers">Inherits layers: </label>
          <select-input [item]="item.inheritsLayers" [options]="dependency.lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsPatches')">
          <label for="inheritsPatches">Inherits patches: </label>
          <select-input [item]="item.inheritsPatches" [options]="dependency.lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsParts')">
          <label for="inheritsParts">Inherits parts: </label>
          <select-input [item]="item.inheritsParts" [options]="dependency.lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsMeasurables')">
          <label for="inheritsMeasurables">Inherits measurables: </label>
          <select-input [item]="item.inheritsMeasurables" [options]="dependency.lyphTypes"></select-input>
        </div>
        <br/>
        <div class="input-control" *ngIf="includeProperty('layers')">
          <repo-lyphType-template [model]="{caption: 'Layers', items: item.layers, options: dependency.lyphTypes}"></repo-lyphType-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('patches')">
          <repo-lyphType-template [model]="{caption: 'Patches', items: item.patches, options: dependency.lyphTypes}"></repo-lyphType-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('parts')">
          <repo-lyphType-template [model]="{caption: 'Parts', items: item.patches, options: dependency.lyphTypes}"></repo-lyphType-template>
        </div>
        <ng-content></ng-content>
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, RepoLyphTypeTemplate]
})
export class LyphTypePanel extends MaterialTypePanel{
  constructor(protected restoreService: RestoreService<ILyphType>){
    super(restoreService);
  }
}
