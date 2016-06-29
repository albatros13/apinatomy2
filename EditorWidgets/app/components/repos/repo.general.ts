/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {RepoWrapper} from './repo.wrapper';
import {ItemHeader} from '../component.general';
import {IResource, ResourceName, TemplateName} from "../../providers/service.apinatomy2";

import {ResourcePanel} from '../panels/panel.resource';
import {TypePanel} from '../panels/panel.type';
import {MaterialTypePanel} from '../panels/panel.materialType';
import {LyphTypePanel} from '../panels/panel.lyphType';
import {CylindricalLyphTypePanel} from '../panels/panel.cylindricalLyphType';

import {GroupTypePanel} from '../panels/panel.groupType';
import {OmegaTreeTypePanel} from '../panels/panel.omegaTreeType';

import {MeasurableTypePanel} from '../panels/panel.measurableType';

import {PublicationPanel} from '../panels/panel.publication';
import {CorrelationPanel} from '../panels/panel.correlation';
import {ClinicalIndexPanel} from '../panels/panel.clinicalIndex';

@Component({
  selector: 'repo-general',
  inputs: ['items', 'caption', 'dependencies'],
  template:`
       <repo-wrapper [items]="items" caption="{{caption}}">
        <accordion class="list-group" [closeOthers]="true" 
          dnd-sortable-container [dropZones]="getZones()" [sortableData]="items">
          <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
              <div accordion-heading><item-header [item]="item" [icon]="getIcon(item)"></item-header></div>
              <resource-panel *ngIf="!item.class || (item.class == className.Resource)"
               [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></resource-panel>
              <type-panel *ngIf="item.class == className.Type"
               [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></type-panel>
              <materialType-panel *ngIf="item.class==className.MaterialType"
               [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></materialType-panel>
              <lyphType-panel *ngIf="item.class==className.LyphType"
               [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></lyphType-panel>
              <cylindricalLyphType-panel *ngIf="item.class==className.CylindricalLyphType"
               [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></cylindricalLyphType-panel>
              
              <!--<measurableType-panel *ngIf="item.class==className.MeasurableType"-->
               <!--[item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></measurableType-panel>-->
              <!---->
              <!--<groupType-panel *ngIf="item.class==className.GroupType"-->
               <!--[item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></groupType-panel>-->
              <!--<omegaTreeType-panel *ngIf="item.class==className.OmegaTreeType"-->
               <!--[item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></omegaTreeType-panel>-->

               <!--<publication-panel *ngIf="item.class==className.Publication"-->
               <!--[item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></publication-panel>-->
               <!--<correlation-panel *ngIf="item.class==className.Correlation"-->
               <!--[item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></correlation-panel>-->
               <!--<clinicalIndex-panel *ngIf="item.class==className.ClinicalIndex"-->
               <!--[item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item, items)"></clinicalIndex-panel>-->
          </accordion-group>        
        </accordion>       
      </repo-wrapper>
  `,
  directives: [RepoWrapper, ItemHeader,
    ResourcePanel, TypePanel, MaterialTypePanel, LyphTypePanel, CylindricalLyphTypePanel,
    GroupTypePanel, OmegaTreeTypePanel,
    MeasurableTypePanel,
    PublicationPanel, CorrelationPanel, ClinicalIndexPanel,
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoGeneral extends RepoWrapper{
  public className = ResourceName;
  public itemTypes: Set<ResourceName | TemplateName> = new Set(ResourceName.Resource);

  ngOnInit(){
    this.itemTypes = new Set(this.items.map(item => item.class));
  }

  getZones(){
    return Array.from(this.itemTypes).map(x => x + "_zone");
  }

  getIcon(item: IResource){
    switch (item.class){
      case this.className.Type: return "images/type.png";
      case this.className.MaterialType: return "images/materialType.png";
      case this.className.LyphType: return "images/lyphType.png";
      case this.className.CylindricalLyphType: return "images/cylindricalLyphType.png";

      case this.className.MeasurableType: return "images/measurableType.png";

      case this.className.GroupType: return "images/groupType.png";
      case this.className.OmegaTreeType: return "images/omegaTreeType.png";

      case this.className.Publication: return "images/publication.png";
      case this.className.Correlation: return "images/correlation.png";
      case this.className.ClinicalIndex: return "images/clinicalIndex.png";
    }
    return "images/resource.png";
  }
}
