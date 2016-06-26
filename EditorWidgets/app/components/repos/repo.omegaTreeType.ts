/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {RepoWrapper} from './repo.wrapper';
import {ItemHeader} from '../component.general';
import {OmegaTreeTypePanel} from '../panels/panel.omegaTreeType';

@Component({
  selector: 'repo-omegaTreeType',
  inputs: ['items', 'dependency'],
  template:`
      <repo-wrapper [model]="{items: items, caption: 'Omega trees'}">
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['omegaTreeType-zone']" [sortableData]="items">
            <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
                <div accordion-heading><item-header [item]="item" [icon]="'images/omegaTreeType.png'"></item-header></div>
                <omegaTreeType-panel [item]="item" 
                [dependency]="dependency" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></omegaTreeType-panel>
            </accordion-group>        
        </accordion>       
      </repo-wrapper>
  `,
  directives: [RepoWrapper, ItemHeader, OmegaTreeTypePanel, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoOmegaTreeType extends RepoWrapper{}
