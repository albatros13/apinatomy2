/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";

@Component({
  providers: [RestoreService],
  selector: 'measurableType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" [dependencies]="dependencies" [ignore]="['equivalence', 'weakEquivalence']" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <div class="input-control">
       <label for="quality">Quality: </label>
       <input type="text" required [(ngModel)]="item.quality">
      </div>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel]
})
export class MeasurableTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
