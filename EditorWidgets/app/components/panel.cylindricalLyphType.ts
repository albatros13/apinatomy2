/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../providers/service.restore";
import {ICylindricalLyphType} from "../providers/service.apinatomy2";
import {LyphTypePanel} from "./panel.lyphType";

@Component({
  providers: [RestoreService],
  selector: 'cLyphType-panel',
  inputs: ['item', 'ignore'],
  template:`
    <type-panel [item]="item" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <inputs>
        <h1>I am ICylindricalLyphType</h1>
        <ng-content select="inputs"></ng-content>
      </inputs>
    </type-panel>
  `,
  directives: [LyphTypePanel]
})
export class CylindricalLyphTypePanel extends LyphTypePanel{
  constructor(protected restoreService: RestoreService<ICylindricalLyphType>){
    super(restoreService);
  }
}
