/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {TemplatePanel} from "./panel.template";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {SetToArray} from "../transformations/pipe.general";
import {RepoNested} from "../repos/repo.nested";

@Component({
  selector: 'border-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item] = "item" 
      [ignore] = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
            
      <!--Nature-->
      <div class="input-control" *ngIf="includeProperty('nature')">
        <fieldset>
          <legend>{{getPropertyLabel('nature')}}:</legend>
           <checkbox-group [(ngModel)]="item.nature" (ngModelChange)="onSelectChange(item.nature)">
             <input type="checkbox" value="open">open&nbsp;
             <input type="checkbox" value="closed">closed<br/>
           </checkbox-group>
        </fieldset>
      </div>
      
       <relationGroup>
          <!--Measurables-->
          <div class="input-control" *ngIf="includeProperty('measurables')">
            <repo-nested [caption]="getPropertyLabel('measurables')" 
            [items]="item.p('measurables') | async | setToArray" 
            (updated)="updateProperty('measurables', $event)" 
            [types]="[ResourceName.Measurable]"></repo-nested>
          </div>
           <ng-content select="relationGroup"></ng-content>
       </relationGroup>
      
     <ng-content></ng-content>  
            
    </template-panel>
  `,
  directives: [TemplatePanel, RepoNested, RADIO_GROUP_DIRECTIVES],
  pipes: [SetToArray]
})
export class BorderPanel extends TemplatePanel{

  onSelectChange(value){
    this.propertyUpdated.emit({property: 'nature', values: value});
  }

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('externals').add('species')
      .add('measurables').add('name').add('types').add('cardinalityBase').add('cardinalityMultipliers');
  }
}
