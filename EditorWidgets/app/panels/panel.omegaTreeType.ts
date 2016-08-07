/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {GroupTypePanel} from "./panel.groupType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {SetToArray} from "../transformations/pipe.general";
import {RepoTemplate} from '../repos/repo.template';
import {NodeTemplate} from "open-physiology-model";

@Component({
  selector: 'omegaTreeType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <groupType-panel [item]="item" 
      [ignore] = "ignore"
      [options] = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "onPropertyUpdate($event)">
      
      <!--Root-->
      <div class="input-control" *ngIf="includeProperty('root')">      
        <label for="root">Root: </label>
        <select-input [item] = "item.p('root') | async" 
          (updated) = "updateProperty('root', $event)"   
          [options] = "NodeTemplate.p('all') | async"></select-input>
      </div>
      
      <!-- <relationGroup>
        &lt;!&ndash;Parts&ndash;&gt;
        <div class="input-control" *ngIf="includeProperty('parts')">
           <repo-template caption="Parts" 
           [items] = "item.p('parts') | async | setToArray" 
           (updated)="updateProperty('parts', $event)"
           [options]="{linked: true}"
           [types]="[templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]"></repo-template>
        </div>
         <ng-content select="relationGroup"></ng-content> 
      </relationGroup>-->

      <ng-content></ng-content> 
    
    </groupType-panel>
  `,
  directives: [GroupTypePanel, MultiSelectInput, SingleSelectInput, RepoTemplate],
  pipes: [SetToArray]
})
export class OmegaTreeTypePanel extends GroupTypePanel{
  NodeTemplate = NodeTemplate;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('supertypes').add('subtypes');//.add('elements');
  }

  onPropertyUpdate(event){
    this.propertyUpdated.emit(event);
  }
}
