/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {GroupTypePanel} from "./panel.groupType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {SetToArray} from "../transformations/pipe.general";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'omegaTreeType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <groupType-panel [item]="item" 
      [ignore] = "myIgnore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Root-->
      <!--<div class="input-control" *ngIf="includeProperty('root')">      
        <label for="cause">Root: </label>
        <select-input-1 [item] = "item.root" 
          (updated)="updateProperty('root', $event)"   
          [options] = "NodeTemplate.p('all') | async"></select-input-1>
      </div>-->

      <ng-content></ng-content> 
    
    </groupType-panel>
  `,
  directives: [GroupTypePanel, MultiSelectInput, SingleSelectInput, RepoTemplate],
  pipes: [SetToArray]
})
export class OmegaTreeTypePanel extends GroupTypePanel{
  myIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.myIgnore = new Set<string>(this.ignore).add('supertypes').add('subtypes');
  }
}
