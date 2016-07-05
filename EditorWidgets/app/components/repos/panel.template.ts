import {Component, Output, EventEmitter} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TemplateName} from "../../providers/service.apinatomy2";
import {TemplatePanel} from '../templates/template.type';
import {MeasurableTemplatePanel} from '../templates/template.measurableType';
import {NodeTemplatePanel} from '../templates/template.nodeType';
import {BorderTemplatePanel} from '../templates/template.borderType';
import {ProcessTemplatePanel} from '../templates/template.processType';
import {CausalityTemplatePanel} from '../templates/template.causalityType';
import {GroupTemplatePanel} from '../templates/template.groupType';
import {OmegaTreeTemplatePanel} from '../templates/template.omegaTreeType';

import {LyphTemplatePanel} from '../templates/template.lyphType';
import {CylindricalLyphTemplatePanel} from '../templates/template.cylindricalLyphType';

@Component({
  providers: [RestoreService],
  selector: 'panel-template',
  inputs: ['item', 'dependencies'],
  template:`
      <!--Generic template-->
      <template-panel *ngIf="item.class==templateNames.Template" [ignore]="['externals']"  
       [item]="item"  [dependencies]="{types: dependencies.types, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></template-panel>

      <!--Lyph template-->
      <lyphTemplate-panel *ngIf="item.class==templateNames.LyphTemplate"
      [item]="item"  [dependencies]="{types: dependencies.lyphs, templates: dependencies.templates}" 
      (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></lyphTemplate-panel>
    
      <!--Cylindrical lyphs-->      
      <cylindricalLyphTemplate-panel *ngIf="item.class==templateNames.CylindricalLyphTemplate"
       [item]="item"  [dependencies]="{types: dependencies.cylindricalLyphs, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></cylindricalLyphTemplate-panel>
      
      <!--Processes-->      
      <processTemplate-panel *ngIf="item.class==templateNames.ProcessTemplate"
       [item]="item"  [dependencies]="{types: dependencies.processes, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></processTemplate-panel>
      
      <!--Mesurables-->
      <measurableTemplate-panel *ngIf="item.class==templateNames.MeasurableTemplate"
       [item]="item"  [dependencies]="{types: dependencies.measurables, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></measurableTemplate-panel>
      
      <!--Causalities-->
      <causalityTemplate-panel *ngIf="item.class==templateNames.CausalityTemplate"
       [item]="item"  [dependencies]="{types: dependencies.causalities, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></causalityTemplate-panel>
      
      <!--Nodes-->
      <nodeTemplate-panel *ngIf="item.class==templateNames.NodeTemplate"
       [item]="item"  [dependencies]="{types: dependencies.nodes, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></nodeTemplate-panel>
     
      <!--Borders-->
      <borderTemplate-panel *ngIf="item.class==templateNames.BorderTemplate"
       [item]="item"  [dependencies]="{types: dependencies.borders, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></borderTemplate-panel>
      
      <!--Groups-->
      <groupTemplate-panel *ngIf="item.class==templateNames.GroupTemplate"
       [item]="item"  [dependencies]="{types: dependencies.groups, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></groupTemplate-panel>

      <!--Omega trees-->
      <omegaTreeTemplate-panel *ngIf="item.class==templateNames.OmegaTreeTemplate"
       [item]="item"  [dependencies]="{types: dependencies.omegaTrees, templates: dependencies.templates}" 
       (saved)="onSaved($event)" (canceled)="onCanceled($event)" (removed)="removed.emit($event)"></omegaTreeTemplate-panel>
  `,
  directives: [TemplatePanel, MeasurableTemplatePanel, NodeTemplatePanel, CausalityTemplatePanel, BorderTemplatePanel,
    ProcessTemplatePanel,
    LyphTemplatePanel, CylindricalLyphTemplatePanel,
    GroupTemplatePanel, OmegaTreeTemplatePanel]
})
export class PanelTemplate{
  templateNames = TemplateName;
  @Output() saved = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(protected restoreService: RestoreService){}

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
  }

}
