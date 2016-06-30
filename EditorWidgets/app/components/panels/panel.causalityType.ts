/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {MeasurableTemplatePanel} from '../templates/template.measurableType';


@Component({
  providers: [RestoreService],
  selector: 'causalityType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
      <div class="input-control" *ngIf="includeProperty('cause')">      
        <label for="cause">Cause: </label>
        <measurableTemplate-panel [item]="item.cause" 
          [dependencies]="dependencies.measurables" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></measurableTemplate-panel>
      </div>
      <div class="input-control" *ngIf="includeProperty('effect')">      
        <label for="effect">Effect: </label>
        <measurableTemplate-panel [item]="item.effect" 
          [dependencies]="dependencies.measurables" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></measurableTemplate-panel>
      </div>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MeasurableTemplatePanel]
})
export class CausalityTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }

}
