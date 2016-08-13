import {Component, Output, EventEmitter} from '@angular/core';
import {ResourcePanel}         from './panel.resource';
import {ExternalResourcePanel} from './panel.externalResource';
import {MaterialPanel}   from './panel.material';
import {LyphPanel}       from './panel.lyph';
import {CylindricalLyphPanel} from './panel.cylindricalLyph';

import {CausalityPanel}   from './panel.causality';
import {ProcessPanel}     from './panel.process';
import {NodePanel}        from './panel.node';
import {BorderPanel}      from './panel.border';
import {MeasurablePanel}  from './panel.measurable';
import {CorrelationPanel} from './panel.correlation';
import {CoalescencePanel} from './panel.coalescence';

import {GroupPanel}       from './panel.group';
import {OmegaTreePanel}   from './panel.omegaTree';
import {ResourceName}     from "../services/utils.model";
import {ToastyService, Toasty} from 'ng2-toasty/ng2-toasty';

@Component({
  selector: 'panel-general',
  inputs: ['item', 'ignore'],
  providers: [ToastyService],
  template:`
    <!--External resources-->
    <externalResource-panel *ngIf="item.class == ResourceName.ExternalResource"
     [item]="item" [ignore]="ignore"
     (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></externalResource-panel>

    <!--Materials-->
    <material-panel *ngIf="item.class==ResourceName.Material"
     [item]="item" [ignore]="ignore" 
      (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)">
    </material-panel>
    
     <!--Lyphs-->      
    <lyph-panel *ngIf="item.class==ResourceName.Lyph" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></lyph-panel>

    <!--Cylindrical lyphs-->      
    <cylindricalLyph-panel *ngIf="item.class==ResourceName.CylindricalLyph" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></cylindricalLyph-panel>

    <!--Processes-->      
    <process-panel *ngIf="item.class==ResourceName.Process" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></process-panel>
   
    <!--Mesurables-->
    <measurable-panel *ngIf="item.class==ResourceName.Measurable" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></measurable-panel>
   
    <!--Causalities-->
    <causality-panel *ngIf="item.class==ResourceName.Causality" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></causality-panel>
    
    <!--Nodes-->
    <node-panel *ngIf="item.class==ResourceName.Node" [ignore]="ignore" 
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></node-panel>

    <!--Borders-->
    <border-panel *ngIf="item.class==ResourceName.Border" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></border-panel>
    
    <!--Groups-->
    <group-panel *ngIf="item.class==ResourceName.Group" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></group-panel>

    <!--Omega trees-->
    <omegaTree-panel *ngIf="item.class==ResourceName.OmegaTree" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></omegaTree-panel>

     <!--Publications: generic panel-->
     <resource-panel *ngIf="item.class==ResourceName.Publication" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>

     <!--Correlations-->
     <correlation-panel *ngIf="item.class==ResourceName.Correlation" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></correlation-panel>

     <!--Clinical indices: generic panel-->
     <resource-panel *ngIf="item.class==ResourceName.ClinicalIndex" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></resource-panel>  

     <!--Coalescence-->
     <coalescence-panel *ngIf="item.class==ResourceName.Coalescence" [ignore]="ignore"
     [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></coalescence-panel>
     
     <ng2-toasty></ng2-toasty>
  `,
  directives:
    [
      ResourcePanel, ExternalResourcePanel,
      MaterialPanel,
      LyphPanel,
      CylindricalLyphPanel,
      MeasurablePanel,
      ProcessPanel,
      CausalityPanel, NodePanel, BorderPanel,
      CorrelationPanel, CoalescencePanel,
      GroupPanel, OmegaTreePanel, Toasty
    ]
})
export class PanelDispatchResources{
  item: any;
  ResourceName = ResourceName;

  @Output() saved = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() canceled = new EventEmitter();

  constructor(private toastyService:ToastyService){ }

  protected onSaved() {
     this.item.commit()
        .catch(reason => {
          let errorMsg = "Failed to commit resource: Relationship constraints violated! \n" +
            "See browser console (Ctrl+Shift+J) for technical details.";
          console.error(reason);
          this.toastyService.error(errorMsg);
        });
     this.saved.emit(this.item)
  }

  protected onCanceled() {
    this.item.rollback();
    this.canceled.emit(this.item);
  }
}
