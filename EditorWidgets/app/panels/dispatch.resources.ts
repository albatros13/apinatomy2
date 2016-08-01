import {Component, Output, EventEmitter} from '@angular/core';
import {ResourcePanel}         from './panel.resource';
import {ExternalResourcePanel} from './panel.externalResource';
import {MaterialTypePanel}   from './panel.materialType';
import {LyphTypePanel}       from './panel.lyphType';
import {CylindricalLyphTypePanel} from './panel.cylindricalLyphType';

import {CausalityTypePanel}  from './panel.causalityType';
import {ProcessTypePanel}    from './panel.processType';
import {NodeTypePanel}       from './panel.nodeType';
import {BorderTypePanel}     from './panel.borderType';
import {MeasurableTypePanel} from './panel.measurableType';
import {CorrelationPanel}    from './panel.correlation';
import {CoalescencePanel}    from './panel.coalescence';

import {GroupTypePanel}      from './panel.groupType';
import {OmegaTreeTypePanel}  from './panel.omegaTreeType';
import {ResourceName} from "../services/service.apinatomy2";


@Component({
  selector: 'panel-general',
  inputs: ['item', 'ignore'],
  template:`
       <!--Resources-->
    <resource-panel *ngIf="item.class == resourceName.Resource"
     [item]="item" [ignore]="ignore"
     (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>
    
    <!--External resources-->
     <externalResource-panel *ngIf="item.class == resourceName.ExternalResource"
     [item]="item" [ignore]="ignore"
     (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></externalResource-panel>

    <!--Materials-->
    <materialType-panel *ngIf="item.class==resourceName.MaterialType"
     [item]="item" [ignore]="ignore" 
      (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)">
    </materialType-panel>
    
     <!--Lyphs-->      
    <lyphType-panel *ngIf="item.class==resourceName.LyphType" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></lyphType-panel>

    <!--Cylindrical lyphs-->      
    <cylindricalLyphType-panel *ngIf="item.class==resourceName.CylindricalLyphType" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></cylindricalLyphType-panel>
    
    <!--Processes-->      
    <processType-panel *ngIf="item.class==resourceName.ProcessType" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></processType-panel>
   
    <!--Mesurables-->
    <measurableType-panel *ngIf="item.class==resourceName.MeasurableType" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></measurableType-panel>
   
    <!--Causalities-->
    <causalityType-panel *ngIf="item.class==resourceName.CausalityType" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></causalityType-panel>
    
    <!--Nodes-->
    <nodeType-panel *ngIf="item.class==resourceName.NodeType" [ignore]="ignore.add('externals')" 
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></nodeType-panel>

    <!--Borders-->
    <borderType-panel *ngIf="item.class==resourceName.BorderType" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></borderType-panel>
    
    <!--Groups-->
    <groupType-panel *ngIf="item.class==resourceName.GroupType" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></groupType-panel>

    <!--Omega trees-->
    <omegaTreeType-panel *ngIf="item.class==resourceName.OmegaTreeType" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></omegaTreeType-panel>

     <!--Publications: generic panel-->
     <resource-panel *ngIf="item.class==resourceName.Publication" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>

     <!--Correlations-->
     <correlation-panel *ngIf="item.class==resourceName.Correlation" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></correlation-panel>

     <!--Clinical indices: generic panel-->
     <resource-panel *ngIf="item.class==resourceName.ClinicalIndex" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>  

     <!--Coalescence-->
     <coalescence-panel *ngIf="item.class==resourceName.Coalescence" [ignore]="ignore.add('externals')"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></coalescence-panel>

  `,
  directives:
    [ResourcePanel, ExternalResourcePanel,
      MaterialTypePanel, LyphTypePanel, CylindricalLyphTypePanel,
      MeasurableTypePanel,
      ProcessTypePanel,
      CausalityTypePanel, NodeTypePanel, BorderTypePanel,
      CorrelationPanel, CoalescencePanel,
      GroupTypePanel, OmegaTreeTypePanel]
})
export class PanelDispatchResources{
  item: any;
  resourceName = ResourceName;

  @Output() saved = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() canceled = new EventEmitter();

  protected onSaved() {
    this.item.commit();
    this.saved.emit(this.item);
  }

  protected onCanceled() {
    this.item.rollback();
    this.canceled.emit(this.item);
  }
}
