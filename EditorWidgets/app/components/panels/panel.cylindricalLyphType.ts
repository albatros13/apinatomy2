/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {ICylindricalLyphType, SideType} from "../../providers/service.apinatomy2";
import {LyphTypePanel} from "./panel.lyphType";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  providers: [RestoreService],
  selector: 'cylindricalLyphType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <lyphType-panel 
      [item]="item" [dependencies]="dependencies" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('minusSide')">
          <label for="minusSide">Minus side: </label>
           <radio-group [(ngModel)]="item.plusSide" [required]="true">
             <input type="radio" [value]="sideType.open">{{sideType.open}}&nbsp
             <input type="radio" [value]="sideType.closed">{{sideType.closed}}<br/>
           </radio-group>
        </div>
        <div class="input-control" *ngIf="includeProperty('plusSide')">
          <label for="plusSide">Plus side: </label>
          <radio-group [(ngModel)]="item.minusSide" [required]="true">
             <input type="radio" [value]="sideType.open">{{sideType.open}}&nbsp
             <input type="radio" [value]="sideType.closed">{{sideType.closed}}<br/>
           </radio-group>
        </div>
        <ng-content></ng-content>
    </lyphType-panel>
  `,
  directives: [LyphTypePanel, RADIO_GROUP_DIRECTIVES]
})
export class CylindricalLyphTypePanel extends LyphTypePanel{
  item: ICylindricalLyphType;
  public sideType = SideType;

  constructor(protected restoreService: RestoreService<ICylindricalLyphType>){
    super(restoreService);
  }

  ngOnInit(){
    if (!this.item.plusSide) this.item.plusSide = this.sideType.closed;
    if (!this.item.minusSide) this.item.minusSide = this.sideType.closed;
  }
}
