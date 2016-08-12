/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {SetToArray} from "../transformations/pipe.general";
import {BorderTemplatePanel} from "./template.borderTemplate";
import {TemplateValue} from '../components/component.templateValue';
import {ResourceName, TemplateName} from '../services/utils.model';
import {model} from "../services/utils.model";
const {ProcessTemplate, BorderTemplate} = model;

@Component({
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <materialType-panel [item]="item" 
        [ignore]  = "ignore"
        [options] = "options"
        (saved)   = "saved.emit($event)"
        (canceled)= "canceled.emit($event)"
        (removed) = "removed.emit($event)"
        (propertyUpdated) = "propertyUpdated.emit($event)">
        
        <!--Species-->
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" class="form-control" [(ngModel)]="item.species">
        </div>
         
        <!--Thickness-->
        <template-value *ngIf="includeProperty('thickness')" 
          [caption]="getPropertyLabel('thickness')" 
          [item]="item.thickness"
          (updated)="updateProperty('thickness', $event)"
        ></template-value>
        <ng-content select="dimensionGroup"></ng-content>  
        
        <ng-content></ng-content>   
        
        <!--Auxilliary field: measurables to generate-->
        <!--TODO: replace with modal-->
        <!--<generateFromSupertype>-->
          <!--<div class="generate-control">-->
            <!--<label for="measurablesToReplicate"><img class="icon" src="images/measurableType.png"/> Measurables to generate </label>-->
            <!--<select-input [items]="measurablesToReplicate" -->
              <!--(updated)="measurablesToReplicate = $event"-->
              <!--[options]="supertypeMeasurables">-->
            <!--</select-input>-->
          <!--</div>-->
        <!--</generateFromSupertype>-->
        
        <providerGroup>
          <!--MixIn from MeasurableLocationType-->
          <!--MeasurableProviders-->
          <div class="input-control" *ngIf="includeProperty('measurableProviders')">
            <label for="measurableProviders">{{getPropertyLabel('measurableProviders')}}: </label>
            <select-input [items]="item.p('measurableProviders') | async" 
            (updated)="updateProperty('measurableProviders', $event)" 
            [options]="item.constructor.p('all') | async"></select-input>
          </div>
          
          <!--LayerProviders-->
          <div class="input-control" *ngIf="includeProperty('layerProviders')">
            <label for="layerProviders">{{getPropertyLabel('layerProviders')}}: </label>
            <select-input [items]="item.p('layerProviders') | async" 
            (updated)="updateProperty('layerProviders', $event)" 
            [options]="item.constructor.p('all') | async"></select-input>
          </div>
            
          <!--PatchProviders-->
          <div class="input-control" *ngIf="includeProperty('patchProviders')">
            <label for="patchProviders">{{getPropertyLabel('patchProviders')}}: </label>
            <select-input [items]="item.p('patchProviders') | async" 
            (updated)="updateProperty('patchProviders', $event)" 
            [options]="item.constructor.p('all') | async"></select-input>
          </div>
          
          <!--PartProviders-->
          <div class="input-control" *ngIf="includeProperty('partProviders')">
            <label for="partProviders">{{getPropertyLabel('partProviders')}}: </label>
            <select-input [items]="item.p('partProviders') | async"
            (updated)="updateProperty('partProviders', $event)" 
            [options]="item.constructor.p('all') | async"></select-input>
          </div>
          <ng-content select="providerGroup"></ng-content>
        </providerGroup>           
       
        <relationGroup>   
           <!--Measurables-->
          <div class="input-control" *ngIf="includeProperty('measurables')">
            <repo-template [caption]="getPropertyLabel('measurables')" 
            [items]  = "item.p('measurables') | async | setToArray" 
            (updated)= "updateProperty('measurables', $event)" 
            [types]  = "[templateName.MeasurableTemplate]"></repo-template>
          </div> 
           
          <!--Layers-->
          <div class="input-control" *ngIf="includeProperty('layers')">
            <repo-template [caption]="getPropertyLabel('layers')" 
            [items]  = "item.p('layers') | async | setToArray" 
            [ignore] = "layersIgnore"
            (updated)= "updateProperty('layers', $event)" 
            [types]  = "[templateClass]"></repo-template>
          </div>          
  
          <!--Patches-->
          <div class="input-control" *ngIf="includeProperty('patches')">
            <repo-template [caption]="getPropertyLabel('patches')" 
            [items]  = "item.p('patches') | async | setToArray" 
            [ignore] = "patchesIgnore"
            (updated)= "updateProperty('patches', $event)" 
            [types]  = "[templateClass]"></repo-template>
          </div>
                  
          <!--Parts-->
          <div class="input-control" *ngIf="includeProperty('parts')">
            <repo-template [caption]="getPropertyLabel('parts')" 
            [items]  = "item.p('parts') | async | setToArray" 
            [ignore] = "partsIgnore"
            (updated)= "updateProperty('parts', $event)" 
            [types]  = "[templateClass]"></repo-template>
          </div>
          
          <!--Processes-->
          <div class="input-control" *ngIf="includeProperty('processes')">
            <repo-template [caption]="getPropertyLabel('processes')" 
             [items]  = "item.p('processes') | async | setToArray" 
             (updated)= "updateProperty('processes', $event)"           
             [types]  = "[templateName.ProcessTemplate]" 
             (added)  = "onProcessAdded($event)" 
             (removed)= "onProcessRemoved($event)"></repo-template>
          </div>
          
          <!--Nodes-->
          <div class="input-control" *ngIf="includeProperty('nodes')">
            <repo-template [caption]="getPropertyLabel('nodes')" 
            [items]  = "item.p('nodes') | async | setToArray" 
            (updated)= "updateProperty('nodes', $event)"
            [types]  = "[templateName.NodeTemplate]"></repo-template>
          </div>            
          <ng-content select="relationGroup"></ng-content>
        </relationGroup>     
        
        <fieldset *ngIf="includeProperty('borders')" >  
          <legend>Borders</legend>
          
          <!--InnerBorder-->
          <div class="input-control">      
            <label for="innerBorder">{{getPropertyLabel('innerBorder')}}: </label>
            <borderTemplate-panel [item]="item.innerBorder" 
              [options]="borderPanelOptions"
              (added)  ="addTemplate('innerBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('innerBorder', $event)"    
              (removed)="removeTemplate('innerBorder', $event)">
            </borderTemplate-panel>
          </div>              
        
          <!--OuterBorder-->        
          <div class="input-control">      
            <label for="outerBorder">{{getPropertyLabel('outerBorder')}}: </label>
            <borderTemplate-panel [item]="item.outerBorder" 
              [options]= "borderPanelOptions"
              (added)  = "addTemplate('outerBorder', templateName.BorderTemplate)"
              (saved)  = "updateProperty('outerBorder', $event)"  
              (removed)= "removeTemplate('outerBorder', $event)">
            </borderTemplate-panel>
          </div>
          
          <ng-content select="borderGroup"></ng-content>
        </fieldset>
        
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, SingleSelectInput,
    RepoTemplate, BorderTemplatePanel, TemplateValue],
  pipes: [SetToArray]
})
export class LyphTypePanel extends MaterialTypePanel{
  borderPanelOptions = {'hideRemove': true, 'hideSave': true, 'hideRestore': true};

  layersIgnore: Set<string> = new Set<string>();
  patchesIgnore: Set<string> = new Set<string>();
  partsIgnore: Set<string> = new Set<string>();

  templateClass = TemplateName.LyphTemplate;

  ngOnInit(){
    super.ngOnInit();
    this.layersIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
    this.patchesIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
    this.partsIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);

    if (this.item && (this.item.class == ResourceName.CylindricalLyphType)) this.templateClass = TemplateName.CylindricalLyphTemplate;

    if (this.item){
      this.item.p('layers').subscribe(x => {
        console.log("Layers updated", x);
      })
      this.item.p('parts').subscribe(x => {
        console.log("Parts updated", x);
      })
    }
  }

  onProcessAdded(process: any){
    if (process) process.conveyingLyph = this.item;
  }

  onProcessRemoved(process: any){
    if (process && (process.conveyingLyph == this.item)) process.conveyingLyph = null;
  }

  //MeasurableType = MeasurableType;
  //measurablesToReplicate: Array<any> = [];
  //supertypeMeasurables  : Array<any> = [];

  //TODO: Move generation of measurables to modal window
  /*onPropertyUpdated(event: any){
   let property = event.properties;
   if (property == "supertypes"){
   let supertypes = event.values;
   this.supertypeMeasurables = [];
   for (let supertype of supertypes){
   if (supertype.measurables){
   let supertypeMeasurables = Array.from(new Set(supertype.measurables.map((item: any) => item.type)));
   for (let supertypeMeasurable of supertypeMeasurables){
   if (this.supertypeMeasurables.indexOf(supertypeMeasurable) < 0)
   this.supertypeMeasurables.push(supertypeMeasurable);
   }
   }
   }
   this.measurablesToReplicate = Array.from(this.supertypeMeasurables);
   }
   this.propertyUpdated.emit(event);
   }

   protected onSaved(event: any) {
   for (let measurable of this.measurablesToReplicate){
   delete measurable["id"];
   let newMeasurable = MeasurableType.new(measurable);
   newMeasurable.location = this.item;
   }
   this.saved.emit(event);
   }*/


}
