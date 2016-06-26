/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {RepoWrapper} from './repo.wrapper';
import {ItemHeader} from '../component.general';
import {MeasurableTypePanel} from '../panels/panel.measurableType';

@Component({
  selector: 'repo-measurableType',
  inputs: ['items', 'dependency'],
  template:`
      <repo-wrapper [model]="{items: items, caption: 'Measurables'}">
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['measurableType-zone']" [sortableData]="items">
          <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
              <div accordion-heading><item-header [item]="item" [icon]="'images/measurableType.png'"></item-header></div>
              <measurableType-panel [item]="item" 
              [dependnecy] = "dependency"
              (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></measurableType-panel>
          </accordion-group>        
        </accordion>       
      </repo-wrapper>
  `,
  directives: [RepoWrapper, ItemHeader, MeasurableTypePanel, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoMeasurableType extends RepoWrapper{}
