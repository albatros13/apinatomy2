/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {LyphTemplatePanel} from "./template.lyphTemplate";
import {BorderTemplatePanel} from "../templates/template.borderTemplate";

@Component({
  selector: 'cylindricalLyphTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <lyphTemplate-panel [item]="item" 
      [ignore]="ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
    
      <borderGroup>
        <!--MinusBorder-->
        <div class="input-control">      
          <label for="minusBorder">Minus border: </label>
          <borderTemplate-panel [item]="item.minusBorder" 
            (added)  ="addTemplate('minusBorder', templateName.BorderTemplate)"
            (saved)  ="updateProperty('minusBorder', $event)"    
            (removed)="removeTemplate('minusBorder', $event)">
          </borderTemplate-panel>
        </div>
      
        <!--PlusBorder-->        
        <div class="input-control">      
          <label for="plusBorder">Plus border: </label>
          <borderTemplate-panel [item]="item.plusBorder" 
            (added)  ="addTemplate('plusBorder', templateName.BorderTemplate)"
            (saved)  ="updateProperty('plusBorder', $event)"    
            (removed)="removeTemplate('plusBorder', $event)">
          </borderTemplate-panel>
        </div>
          
      </borderGroup>
    <ng-content></ng-content>      
    
    </lyphTemplate-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, LyphTemplatePanel, BorderTemplatePanel]
})
export class CylindricalLyphTemplatePanel extends LyphTemplatePanel{}
