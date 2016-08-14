/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {TemplatePanel} from "./panel.template";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {SetToArray} from "../transformations/pipe.general";
import {model} from "../services/utils.model";
import {RepoNested} from "../repos/repo.nested";
const {Node, Lyph} = model;

@Component({
  selector: 'process-panel',
  inputs: ['item', 'ignore', "options"],
  template:`
    <template-panel [item]="item" 
      [ignore]  ="ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
        
      <!--TransportPhenomenon-->
        <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
          <fieldset>
            <legend>{{getPropertyLabel('transportPhenomenon')}}:</legend>
            <checkbox-group [(ngModel)]="item.transportPhenomenon" [required]="true">
               <input type="checkbox" value="diffusion">diffusion&nbsp;
               <input type="checkbox" value="advection">advection<br/>
             </checkbox-group>
          </fieldset>
        </div>
          
        <!--ConveyingLyph-->
      <div class="input-control" *ngIf="includeProperty('conveyingLyph')">
        <label for="conveyingLyph">{{getPropertyLabel('conveyingLyph')}}: </label>
        <select-input-1 [item] = "item.p('conveyingLyph') | async"
         (updated) = "updateProperty('conveyingLyph', $event)"    
         [options] = "item.fields['conveyingLyph'].p('possibleValues') | async"></select-input-1>
      </div>
      
      <!--SourceContainer-->
      <div class="input-control" *ngIf="includeProperty('sourceLyph')">      
        <label for="sourceLyph">{{getPropertyLabel('sourceLyph')}}: </label>
        <select-input-1 [item] = "item.p('sourceLyph') | async" 
          (updated) = "onSourceLyphChanged($event)"  
          [options] = "item.fields['sourceLyph'].p('possibleValues') | async"></select-input-1>
      </div>
      
      <!--TargetContainer-->
      <div class="input-control" *ngIf="includeProperty('targetLyph')">      
        <label for="targetLyph">{{getPropertyLabel('targetLyph')}}: </label>
        <select-input-1 [item] = "item.p('targetLyph') | async" 
          (updated) = "onTargetLyphChanged($event)"   
          [options] = "item.fields['targetLyph'].p('possibleValues') | async"></select-input-1>
      </div>        
      
      <!--Source-->
      <div class="input-control" *ngIf="includeProperty('source')">      
        <label for="source">{{getPropertyLabel('source')}}: </label>
        <select-input-1 [item] = "item.p('source') | async" 
          (updated) = "onSourceChanged($event)"   
          [options] = "item.fields['source'].p('possibleValues') | async"></select-input-1>
      </div>
      
      <!--Target-->
      <div class="input-control" *ngIf="includeProperty('target')">      
        <label for="target">{{getPropertyLabel('target')}}: </label>
        <select-input-1 [item] = "item.p('target') | async" 
          (updated) = "onTargetChanged($event)"  
          [options] = "item.fields['target'].p('possibleValues') | async"></select-input-1>
      </div>   
          
       <!--Materials-->
      <div class="input-control" *ngIf="includeProperty('materials')">
        <label for="meterials">{{getPropertyLabel('materials')}}: </label>
        <select-input [items]="item.p('materials') | async" 
        (updated)="updateProperty('materials', $event)" 
         [options]="item.fields['materials'].p('possibleValues') | async"></select-input>
      </div> 
        
       <relationGroup>
        <!--Segments-->
        <div class="input-control" *ngIf="includeProperty('segments')">
          <repo-nested [caption]="getPropertyLabel('segments')" 
          [items]="item.p('segments') | async | setToArray" 
          (updated)="updateProperty('segments', $event)" 
          [types]="[ResourceName.Process]">
          </repo-nested>
        </div>
        
        <!--Channels-->
        <div class="input-control" *ngIf="includeProperty('channels')">
          <repo-nested [caption]="getPropertyLabel('channels')" 
          [items]="item.p('channels') | async | setToArray" 
          (updated)="updateProperty('channels', $event)"           
          [types]="[ResourceName.Process]"></repo-nested>
        </div>
      
        <ng-content select="relationGroup"></ng-content>
      </relationGroup>
       
        <ng-content></ng-content>  
   
    </template-panel>
  `,
  directives: [TemplatePanel, MultiSelectInput, SingleSelectInput, RepoNested, RADIO_GROUP_DIRECTIVES],
  pipes: [SetToArray]
})
export class ProcessPanel extends TemplatePanel{

  ngOnInit(){
    super.ngOnInit();
    if (!this.item.transportPhenomenon) this.item.transportPhenomenon = [];
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers');
  }

  onSourceLyphChanged(lyph: Lyph){
    super.updateProperty("sourceLyph", lyph);
  }

  onTargetLyphChanged(lyph: Lyph){
    super.updateProperty("targetLyph", lyph);
  }

  onSourceChanged(node: Node){
    super.updateProperty("source", node);
  }

  onTargetChanged(node: Node){
    super.updateProperty("target", node);
  }

}
