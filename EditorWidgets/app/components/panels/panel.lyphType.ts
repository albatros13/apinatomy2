/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {ILyphType} from "../../providers/service.apinatomy2";
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';

@Component({
  providers: [RestoreService],
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <materialType-panel [item]="item" 
        [dependencies]="dependencies" 
        (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('inheritsLayers')">
          <label for="inheritsLayers">Inherits layers: </label>
          <select-input [item]="item.inheritsLayers" [options]="dependencies.lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsPatches')">
          <label for="inheritsPatches">Inherits patches: </label>
          <select-input [item]="item.inheritsPatches" [options]="dependencies.lyphTypes"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('inheritsParts')">
          <label for="inheritsParts">Inherits parts: </label>
          <select-input [item]="item.inheritsParts" [options]="dependencies.lyphTypes"></select-input>
        </div>
        <br/>
        <div class="input-control" *ngIf="includeProperty('layers')">
          <repo-template caption="Layers" [items] = "item.layers" [dependencies] = "dependencies.lyphTypes"></repo-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('patches')">
          <repo-template caption="Patches" [items] = "item.patches" [dependencies] = "dependencies.lyphTypes"></repo-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('parts')">
          <repo-template caption="Parts" [items] = "item.parts" [dependencies] = "dependencies.lyphTypes"></repo-template>
        </div>
        <ng-content></ng-content>
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, RepoTemplate]
})
export class LyphTypePanel extends MaterialTypePanel{
  item: ILyphType;

  constructor(protected restoreService: RestoreService<ILyphType>){
    super(restoreService);
  }
}
