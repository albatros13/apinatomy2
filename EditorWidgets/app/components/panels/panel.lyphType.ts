/**
 * Created by Natallia on 6/17/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput, SingleSelectInput, EditToolbar} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';
import {ProcessTemplate, BorderTemplate} from '../../providers/service.apinatomy2';
import {BorderTemplatePanel} from '../templates/template.borderType';
import {FilterByClass} from "../../transformations/pipe.general";

@Component({
  providers: [RestoreService],
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <materialType-panel [item]="item" 
        [dependencies]="dependencies" 
        (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <!--Species-->
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" [(ngModel)]="item.species">
        </div>

        <!--Layers-->
        <div class="input-control" *ngIf="includeProperty('layers')">
          <repo-template caption="Layers" [items] = "item.layers" [dependencies] = "dependencies" 
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate, templateName.NodeTemplate]"></repo-template>
        </div>
        
        <!--LayerProviders-->
        <div class="input-control" *ngIf="includeProperty('layerProviders')">
          <label for="layerProviders">Inherits layers from: </label>
          <select-input [item]="item.layerProviders" [options]="dependencies.lyphs"></select-input>
        </div>

        <!--Patches-->
        <div class="input-control" *ngIf="includeProperty('patches')">
          <repo-template caption="Patches" [items] = "item.patches" [dependencies] = "dependencies"
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>
        
        <!--PatchProviders-->
        <div class="input-control" *ngIf="includeProperty('patchProviders')">
          <label for="patchProviders">Inherits patches from: </label>
          <select-input [item]="item.patchProviders" [options]="dependencies.lyphs"></select-input>
        </div>

        <!--Parts-->
        <div class="input-control" *ngIf="includeProperty('parts')">
          <repo-template caption="Parts" [items] = "item.parts" [dependencies] = "dependencies"
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>
        
        <!--PartProviders-->
        <div class="input-control" *ngIf="includeProperty('partProviders')">
          <label for="partProviders">Inherits parts from: </label>
          <select-input [item]="item.partProviders" [options]="dependencies.lyphs"></select-input>
        </div>

        <!--Processes-->
        <div class="input-control" *ngIf="includeProperty('processes')">
          <repo-template caption="Processes" [items] = "item.processes" [dependencies] = "dependencies"
          [types] = "[templateName.ProcessTemplate]" (added)="onProcessAdded($event)"></repo-template>
        </div>
        
        <!--Nodes-->
        <div class="input-control" *ngIf="includeProperty('nodes')">
          <repo-template caption="Nodes" [items] = "item.nodes" [dependencies] = "dependencies"
          [types] = "[templateName.NodeTemplate]"></repo-template>
        </div>
        
        <!--InnerBorder-->
        <div class="input-control" *ngIf="includeProperty('innerBorder')">      
          <label for="item.innerBorder">Inner border: </label>
          <select-input-1 [item] = "item.innerBorder" (selected)="onInnerBorderSelected($event)"
            [options] = "dependencies.templates | filterByClass: [templateName.BorderTemplate]"></select-input-1>
          <edit-toolbar *ngIf="!item.innerBorder" [options]="[templateName.BorderTemplate]" (added)="onInnerBorderAdded($event)"></edit-toolbar>
          <borderTemplate-panel *ngIf="item.innerBorder" [item]="item.innerBorder" 
            [dependencies]="{types: dependencies.borders, templates: dependencies.templates}" 
            (saved)="onInnerBorderSaved(item, $event)" (removed)="onInnerBorderRemoved(item)"></borderTemplate-panel>
        </div>
        
        <!--OuterBorder-->
        <div class="input-control" *ngIf="includeProperty('outerBorder')">      
          <label for="item.outerBorder">Outer border: </label>
          <select-input-1 [item] = "item.outerBorder" (selected)="onOuterBorderSelected($event)"
            [options] = "dependencies.templates | filterByClass: [templateName.BorderTemplate]">
          </select-input-1>
          <edit-toolbar *ngIf="!item.outerBorder" [options]="[templateName.BorderTemplate]" (added)="onOuterBorderAdded($event)"></edit-toolbar>
          <borderTemplate-panel *ngIf="item.outerBorder" [item]="item.outerBorder" 
            [dependencies]="{types: dependencies.borders, templates: dependencies.templates}" 
            (saved)="onOuterBorderSaved(item, $event)" (removed)="onOuterBorderRemoved(item)"></borderTemplate-panel>
        </div>    
        
        <ng-content></ng-content>
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, SingleSelectInput, RepoTemplate, BorderTemplatePanel, EditToolbar],
  pipes: [FilterByClass]

})
export class LyphTypePanel extends MaterialTypePanel{
  dependencies: any;

  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }

  onInnerBorderSelected(item: any){
  }

  onOuterBorderSelected(item: any){
  }

  onInnerBorderSaved(){
  }

  onOuterBorderSaved(){
  }

  onInnerBorderAdded(){
    this.item.innerBorder = new BorderTemplate({name: "T: Inner border " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item.innerBorder);
    }
  }

  onOuterBorderAdded(){
    this.item.outerBorder = new BorderTemplate({name: "T: Outer border " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item.outerBorder);
    }
  }

  onInnerBorderRemoved(){
    this.item.innerBorder = null;
  }

  onOuterBorderRemoved(){
    this.item.outerBorder = null;
  }

  onProcessAdded(process: ProcessTemplate){
    if (process) process.conveyingLyph = this.item;
  }

}
