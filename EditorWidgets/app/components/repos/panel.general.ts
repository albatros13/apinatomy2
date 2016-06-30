import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {ResourceName} from "../../providers/service.apinatomy2";
import {ResourcePanel} from '../panels/panel.resource';
import {TypePanel} from '../panels/panel.type';
import {MaterialTypePanel} from '../panels/panel.materialType';
import {LyphTypePanel} from '../panels/panel.lyphType';
import {CylindricalLyphTypePanel} from '../panels/panel.cylindricalLyphType';

import {GroupTypePanel} from '../panels/panel.groupType';
import {OmegaTreeTypePanel} from '../panels/panel.omegaTreeType';

import {MeasurableTypePanel} from '../panels/panel.measurableType';
import {CorrelationPanel} from '../panels/panel.correlation';

@Component({
  providers: [RestoreService],
  selector: 'panel-general',
  inputs: ['item', 'dependencies'],
  template:`
    <!--Resources-->
    <resource-panel *ngIf="!item.class || (item.class == resourceNames.Resource)"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></resource-panel>
    
    <!--Types-->
    <type-panel *ngIf="item.class == resourceNames.Type"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></type-panel>
    
    <!--Materials-->
    <materialType-panel *ngIf="item.class==resourceNames.MaterialType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></materialType-panel>
    
    <!--Lyphs-->      
    <lyphType-panel *ngIf="item.class==resourceNames.LyphType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></lyphType-panel>

    <!--Cylindrical lyphs-->      
    <cylindricalLyphType-panel *ngIf="item.class==resourceNames.CylindricalLyphType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></cylindricalLyphType-panel>
    
    <!--Processes-->      
    <processType-panel *ngIf="item.class==resourceNames.ProcessType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></processType-panel>
    
    <!--Mesurables-->
    <measurableType-panel *ngIf="item.class==resourceNames.MeasurableType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></measurableType-panel>
    
    <!--Causalities-->
    <causalityType-panel *ngIf="item.class==resourceNames.CausalityType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></causalityType-panel>
    
    <!--Nodes: generic panel-->
    <resource-panel *ngIf="item.class==resourceNames.NodeType" [ignore]="['externals']" 
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></resource-panel>

    <!--Borders-->
    <borderType-panel *ngIf="item.class==resourceNames.BorderType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></borderType-panel>
    
    <!--Groups-->
    <groupType-panel *ngIf="item.class==resourceNames.GroupType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></groupType-panel>

    <!--Omega trees-->
    <omegaTreeType-panel *ngIf="item.class==resourceNames.OmegaTreeType"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></omegaTreeType-panel>

     <!--Publications: generic panel-->
     <resource-panel *ngIf="item.class==resourceNames.Publication" 
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></resource-panel>

     <!--Correlations-->
     <correlation-panel *ngIf="item.class==resourceNames.Correlation"
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></correlation-panel>
     
     <!--Clinical indices: generic panel-->
     <resource-panel *ngIf="item.class==resourceNames.ClinicalIndex" [ignore]="['externals']"  
     [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)"></resource-panel>  
  `,
  directives: [ResourcePanel, TypePanel, MaterialTypePanel, LyphTypePanel, CylindricalLyphTypePanel,
    GroupTypePanel, OmegaTreeTypePanel,
    MeasurableTypePanel,
    CorrelationPanel]
})
export class PanelGeneral{
  resourceNames = ResourceName;
}
