/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {SetToArray} from "../transformations/pipe.general";
import {BorderTemplatePanel} from "../templates/template.borderTemplate";

import {LyphType, ProcessTemplate, BorderTemplate} from "open-physiology-model";

@Component({
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <materialType-panel [item]="item" 
        [ignore]="ignore"
        [options] ="options"
        (saved)    = "saved.emit($event)"
        (canceled) = "canceled.emit($event)"
        (removed)  = "removed.emit($event)"
        (propertyUpdated) = "propertyUpdated.emit($event)">
        
        <!--Species-->
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" class="form-control" [(ngModel)]="item.species">
        </div>
         
           
        
        <providerGroup>
          <!--LayerProviders-->
          <div class="input-control" *ngIf="includeProperty('layerProviders')">
            <label for="layerProviders">Inherits layers from: </label>
            <select-input [items]="item.p('layerProviders') | async" 
            (updated)="updateProperty('layerProviders', $event)" 
            [options]="LyphType.p('all') | async"></select-input>
          </div>
            
          <!--PatchProviders-->
          <div class="input-control" *ngIf="includeProperty('patchProviders')">
            <label for="patchProviders">Inherits patches from: </label>
            <select-input [items]="item.p('patchProviders') | async" 
            (updated)="updateProperty('patchProviders', $event)" 
            [options]="LyphType.p('all') | async"></select-input>
          </div>
          
          <!--PartProviders-->
          <div class="input-control" *ngIf="includeProperty('partProviders')">
            <label for="partProviders">Inherits parts from: </label>
            <select-input [items]="item.p('partProviders') | async"
            (updated)="updateProperty('partProviders', $event)" 
            [options]="LyphType.p('all') | async"></select-input>
          </div>
          <ng-content select="providerGroup"></ng-content>
        </providerGroup>           
       
        <relationGroup>      
          <!--Layers-->
          <div class="input-control" *ngIf="includeProperty('layers')">
            <repo-template caption="Layers" 
            [items]  = "item.p('layers') | async | setToArray" 
            [ignore]="layersIgnore"
            (updated)= "updateProperty('layers', $event)" 
            [types]  = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
          </div>          
  
          <!--Patches-->
          <div class="input-control" *ngIf="includeProperty('patches')">
            <repo-template caption="Patches" 
            [items] = "item.p('patches') | async | setToArray" 
            [ignore]="patchesIgnore"
            (updated)="updateProperty('patches', $event)" 
            [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
          </div>
                  
          <!--Parts-->
          <div class="input-control" *ngIf="includeProperty('parts')">
            <repo-template caption="Parts" 
            [items] = "item.p('parts') | async | setToArray" 
            [ignore]="partsIgnore"
            (updated)="updateProperty('parts', $event)" 
            [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
          </div>
          
          <!--Processes-->
          <div class="input-control" *ngIf="includeProperty('processes')">
            <repo-template caption="Processes" 
             [items] = "item.p('processes') | async | setToArray" 
             (updated)="updateProperty('processes', $event)"           
             [types] = "[templateName.ProcessTemplate]" 
               (added)  ="onProcessAdded($event)" 
               (removed)="onProcessRemoved($event)"></repo-template>
          </div>
          
          <!--Nodes-->
          <div class="input-control" *ngIf="includeProperty('nodes')">
            <repo-template caption="Nodes" 
            [items] = "item.p('nodes') | async | setToArray" 
            (updated)="updateProperty('nodes', $event)"
            [types] = "[templateName.NodeTemplate]"></repo-template>
          </div>            
          <ng-content select="relationGroup"></ng-content>
        </relationGroup>     
        
        <fieldset *ngIf="includeProperty('borders')" >  
          <legend>Borders</legend>
          
          <!--InnerBorder-->
          <div class="input-control">      
            <label for="innerBorder">Inner border: </label>
            <borderTemplate-panel [item]="item.innerBorder" 
              [options]="borderPanelOptions"
              (added)  ="addTemplate('innerBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('innerBorder', $event)"    
              (removed)="removeTemplate('innerBorder', $event)">
            </borderTemplate-panel>
          </div>              
        
          <!--OuterBorder-->        
          <div class="input-control">      
            <label for="outerBorder">Outer border: </label>
            <borderTemplate-panel [item]="item.outerBorder" 
              [options]="borderPanelOptions"
              (added)  = "addTemplate('outerBorder', templateName.BorderTemplate)"
              (saved)  = "updateProperty('outerBorder', $event)"  
              (removed)= "removeTemplate('outerBorder', $event)">
            </borderTemplate-panel>
          </div>
          
          <ng-content select="borderGroup"></ng-content>
        </fieldset>
        
       <ng-content></ng-content>   
        
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, SingleSelectInput,
    RepoTemplate, BorderTemplatePanel],
  pipes: [SetToArray]
})
export class LyphTypePanel extends MaterialTypePanel{
  LyphType = LyphType;
  borderPanelOptions = {'hideSave': true, 'hideRestore': true};

  layersIgnore: Set<string> = new Set<string>();
  patchesIgnore: Set<string> = new Set<string>();
  partsIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.layersIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers']);
    this.patchesIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers']);
    this.partsIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers']);
  }

  onProcessAdded(process: ProcessTemplate){
    if (process) process.conveyingLyph = this.item;
  }

  onProcessRemoved(process: ProcessTemplate){
    if (process && (process.conveyingLyph == this.item)) process.conveyingLyph = null;
  }

}
