import {Component, Output, EventEmitter} from '@angular/core';
import {TemplateName} from "../services/utils.model";
import {TemplatePanel} from './template.template';
import {MeasurableTemplatePanel} from './template.measurableTemplate';
import {NodeTemplatePanel} from './template.nodeTemplate';
import {BorderTemplatePanel} from './template.borderTemplate';
import {ProcessTemplatePanel} from './template.processTemplate';
import {CausalityTemplatePanel} from './template.causalityTemplate';
import {GroupTemplatePanel} from './template.groupTemplate';
import {OmegaTreeTemplatePanel} from './template.omegaTreeTemplate';
import {LyphTemplatePanel} from './template.lyphTemplate';
import {CylindricalLyphTemplatePanel} from './template.cylindricalLyphTemplate';

@Component({
  selector: 'panel-template',
  inputs: ['item', 'ignore'],
  template:`
      <!--Generic template-->
      <template-panel *ngIf="item.class==templateName.Template" [ignore]="ignore"  
       [item]="item" (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></template-panel>

      <!--Lyph template-->
      <lyphTemplate-panel *ngIf="item.class==templateName.LyphTemplate" [ignore]="ignore"
      [item]="item"   
      (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></lyphTemplate-panel>
    
      <!--Cylindrical lyphs-->      
      <cylindricalLyphTemplate-panel *ngIf="item.class==templateName.CylindricalLyphTemplate" [ignore]="ignore"
       [item]="item"   
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></cylindricalLyphTemplate-panel>
      
      <!--Processes-->      
      <processTemplate-panel *ngIf="item.class==templateName.ProcessTemplate" [ignore]="ignore"
       [item]="item"   
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></processTemplate-panel>
      
      <!--Mesurables-->
      <measurableTemplate-panel *ngIf="item.class==templateName.MeasurableTemplate" [ignore]="ignore"
       [item]="item"   
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></measurableTemplate-panel>
      
      <!--Causalities-->
      <causalityTemplate-panel *ngIf="item.class==templateName.CausalityTemplate" [ignore]="ignore"
       [item]="item"   
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></causalityTemplate-panel>
      
      <!--Nodes-->
      <nodeTemplate-panel *ngIf="item.class==templateName.NodeTemplate" [ignore]="ignore"
       [item]="item"   
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></nodeTemplate-panel>
     
      <!--Borders-->
      <borderTemplate-panel *ngIf="item.class==templateName.BorderTemplate" [ignore]="ignore"
       [item]="item"  
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></borderTemplate-panel>
      
      <!--Groups-->
      <groupTemplate-panel *ngIf="item.class==templateName.GroupTemplate" [ignore]="ignore"
       [item]="item"  
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></groupTemplate-panel>

      <!--Omega trees-->
      <omegaTreeTemplate-panel *ngIf="item.class==templateName.OmegaTreeTemplate" [ignore]="ignore"
       [item]="item"   
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></omegaTreeTemplate-panel>
  `,
  directives: [TemplatePanel, MeasurableTemplatePanel, NodeTemplatePanel, CausalityTemplatePanel, BorderTemplatePanel,
    ProcessTemplatePanel,
    LyphTemplatePanel, CylindricalLyphTemplatePanel,
    GroupTemplatePanel, OmegaTreeTemplatePanel]
})
export class PanelDispatchTemplates{
  item: any;
  templateName = TemplateName;
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
