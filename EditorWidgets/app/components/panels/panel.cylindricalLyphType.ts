/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {ICylindricalLyphType, SideType} from "../../providers/service.apinatomy2";
import {LyphTypePanel} from "./panel.lyphType";

@Component({
  providers: [RestoreService],
  selector: 'cylindricalLyphType-panel',
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <lypType-panel [item]="item" [dependency]="dependency" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('minusSide')">
          <label for="minusSide">Minus side: </label>
        </div>
        <div class="input-control" *ngIf="includeProperty('plusSide')">
          <label for="plusSide">Plus side: </label>
        </div>
        <ng-content></ng-content>
    </lypType-panel>
  `,
  directives: [LyphTypePanel]
})
export class CylindricalLyphTypePanel extends LyphTypePanel{
  constructor(protected restoreService: RestoreService<ICylindricalLyphType>){
    super(restoreService);
  }
}
