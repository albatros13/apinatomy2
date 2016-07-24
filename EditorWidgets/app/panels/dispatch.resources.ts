import {Component, Output, EventEmitter} from '@angular/core';
import {RestoreService} from "../services/service.restore";
import {ResourceName} from "../services/service.apinatomy2";
import {ResourcePanel} from './panel.resource';
import {TypePanel} from './panel.type';
import {MaterialTypePanel} from './panel.materialType';
import {LyphTypePanel} from './panel.lyphType';
import {CylindricalLyphTypePanel} from './panel.cylindricalLyphType';
import {CausalityTypePanel} from './panel.causalityType';
import {ProcessTypePanel} from './panel.processType';
import {NodeTypePanel} from './panel.nodeType';
import {BorderTypePanel} from './panel.borderType';

import {GroupTypePanel} from './panel.groupType';
import {OmegaTreeTypePanel} from './panel.omegaTreeType';

import {MeasurableTypePanel} from './panel.measurableType';
import {CorrelationPanel} from './panel.correlation';
import {CoalescencePanel} from './panel.coalescence';


@Component({
  providers: [RestoreService],
  selector: 'panel-general',
  inputs: ['item', 'dependencies'],
  template:`
    <!--Resources-->
    <resource-panel *ngIf="!item.class || (item.class == resourceName.Resource)"
     [item]="item" [(dependencies)]="dependencies" 
     (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>
    
    <!--Types-->
    <type-panel *ngIf="item.class == resourceName.Type"
     [item]="item" [(dependencies)]="dependencies"
      (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)">
    </type-panel>
    
    <!--Materials-->
    <materialType-panel *ngIf="item.class==resourceName.MaterialType"
     [item]="item" [(dependencies)]="dependencies" 
      (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)">
    </materialType-panel>
    
    <!--Lyphs-->      
    <lyphType-panel *ngIf="item.class==resourceName.LyphType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></lyphType-panel>

    <!--Cylindrical lyphs-->      
    <cylindricalLyphType-panel *ngIf="item.class==resourceName.CylindricalLyphType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></cylindricalLyphType-panel>
    
    <!--Processes-->      
    <processType-panel *ngIf="item.class==resourceName.ProcessType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></processType-panel>
    
    <!--Mesurables-->
    <measurableType-panel *ngIf="item.class==resourceName.MeasurableType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></measurableType-panel>
    
    <!--Causalities-->
    <causalityType-panel *ngIf="item.class==resourceName.CausalityType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></causalityType-panel>
    
    <!--Nodes-->
    <nodeType-panel *ngIf="item.class==resourceName.NodeType" [ignore]="['externals']" 
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></nodeType-panel>

    <!--Borders-->
    <borderType-panel *ngIf="item.class==resourceName.BorderType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></borderType-panel>
    
    <!--Groups-->
    <groupType-panel *ngIf="item.class==resourceName.GroupType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></groupType-panel>

    <!--Omega trees-->
    <omegaTreeType-panel *ngIf="item.class==resourceName.OmegaTreeType" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></omegaTreeType-panel>

     <!--Publications: generic panel-->
     <resource-panel *ngIf="item.class==resourceName.Publication" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>

     <!--Correlations-->
     <correlation-panel *ngIf="item.class==resourceName.Correlation" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></correlation-panel>

     <!--Coalescence-->
     <coalescence-panel *ngIf="item.class==resourceName.Coalescence" [ignore]="['externals']"
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></coalescence-panel>

     <!--Clinical indices: generic panel-->
     <resource-panel *ngIf="item.class==resourceName.ClinicalIndex" [ignore]="['externals']"  
     [item]="item" [(dependencies)]="dependencies" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>  
  `,
  directives: [ResourcePanel, TypePanel, MaterialTypePanel, LyphTypePanel, CylindricalLyphTypePanel,
    GroupTypePanel, OmegaTreeTypePanel,
    MeasurableTypePanel, ProcessTypePanel, CausalityTypePanel, NodeTypePanel, BorderTypePanel,
    CorrelationPanel, CoalescencePanel]
})
export class PanelDispatchResources{
  resourceName = ResourceName;
  @Output() saved = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() canceled = new EventEmitter();

  constructor(protected restoreService: RestoreService){
  }

   protected set item (item: any) {
   this.restoreService.setItem(item);
   }

   protected get item () {
     return this.restoreService.getItem();
   }

  protected onSaved() {
    this.item = this.restoreService.getItem();
    this.saved.emit(this.item);
  }

  protected onCanceled() {
    this.item = this.restoreService.restoreItem();
    this.canceled.emit(this.item);
  }
}
