/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {LyphPanel} from "./panel.lyph";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RepoNested} from '../repos/repo.nested';
import {BorderPanel} from './panel.border';
import {SetToArray} from "../transformations/pipe.general";
import {TemplateValue} from '../components/component.templateValue';
import {model} from "../services/utils.model";
const {CylindricalLyph} = model;

@Component({
  selector: 'cylindricalLyph-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <lyph-panel [item]="item" 
      [ignore]="ignore" 
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Length-->
      <dimensionGroup>
        <template-value *ngIf="includeProperty('length')" 
            [caption]="getPropertyLabel('length')" 
            [item]="item.length"
            (updated)="updateProperty('length', $event)">
        </template-value>
      </dimensionGroup>
        
      <!--TreeParent-->
      <div  *ngIf="includeProperty('treeParent')" class="input-control">
        <label for="treeParent">{{getPropertyLabel('treeParent')}}: </label>
        <select-input-1 [item] = "item.p('treeParent') | async"
         (updated) = "updateProperty('treeParent', $event)"    
         [options] = "item.fields['treeParent'].p('possibleValues') | async"></select-input-1>
      </div>
      
      <!--TreeChildren-->
      <div class="input-control" *ngIf="includeProperty('treeChildren')">
        <label for="treeChildren">{{getPropertyLabel('treeChildren')}}: </label>
        <select-input 
          [items]="item.p('treeChildren') | async" 
          (updated)="updateProperty('treeChildren', $event)" 
          [options]="item.fields['treeChildren'].p('possibleValues') | async"></select-input>
      </div> 
        
        <ng-content></ng-content>   
              
        <relationGroup>
          <!--Segments-->
          <div class="input-control" *ngIf="includeProperty('segments', 'relations')">
            <repo-nested [caption]="getPropertyLabel('segments')" 
            [items] = "item.p('segments') | async | setToArray" 
            [ignore]="segmentsIgnore"
            (updated)="updateProperty('segments', $event)"
            [types]="[ResourceName.CylindricalLyph]"></repo-nested>
          </div>
        </relationGroup>
        
        <borderGroup>
          <!--MinusBorder-->
          <div class="input-control">      
            <label for="minusBorder">{{getPropertyLabel('minusBorder')}}: </label>
            <border-panel [item]="item.p('minusBorder') | async" 
              [options]="borderPanelOptions"
              (saved)  ="updateProperty('minusBorder', $event)"    
              (removed)="removeTemplate('minusBorder', $event)">
            </border-panel>
          </div>
        
          <!--PlusBorder-->        
          <div class="input-control">      
            <label for="plusBorder">{{getPropertyLabel('plusBorder')}}: </label>
            <border-panel [item]="item.p('plusBorder') | async" 
              [options]="borderPanelOptions"
              (saved)  ="updateProperty('plusBorder', $event)"    
              (removed)="removeTemplate('plusBorder', $event)">
            </border-panel>
          </div>
          
        </borderGroup>        
    
    </lyph-panel>
  `,
  directives: [LyphPanel, MultiSelectInput, SingleSelectInput,
    RepoNested, BorderPanel, BorderPanel, TemplateValue],
  pipes: [SetToArray]

})
export class CylindricalLyphPanel extends LyphPanel{
  CylindricalLyph = CylindricalLyph;
  segmentsIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.segmentsIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
    this.ignore = this.ignore.add('cardinalityMultipliers').add('treeParent').add('treeChildren');

    console.log("PlusBorder", this.item.plusBorder.nature);
    console.log("MinusBorder", this.item.minusBorder.nature);
    console.log("InnerBorder", this.item.innerBorder.nature);
    console.log("OuterBorder", this.item.outerBorder.nature);
  }
}
