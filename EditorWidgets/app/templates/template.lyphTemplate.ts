/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {BorderTemplate} from '../services/service.apinatomy2';
import {BorderTemplatePanel} from "../templates/template.borderTemplate";

@Component({
  selector: 'lyphTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [types]="dependencies.lyphs"
      [templates]= "dependencies.templates" 
      [ignore]="ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
  
        <fieldset *ngIf="includeProperty('borders')" >  
          <legend>Borders</legend>
          
          <!--InnerBorder-->
          <div class="input-control">      
            <label for="innerBorder">Inner border: </label>
            <borderTemplate-panel [item]="item.innerBorder" 
              [dependencies]="dependencies" 
              (added)  ="addTemplate('innerBorder', borderTemplate)"
              (saved)  ="updateProperty('innerBorder', $event)"    
              (removed)="removeTemplate('innerBorder', $event)">
            </borderTemplate-panel>
          </div>
        
          <!--OuterBorder-->        
          <div class="input-control">      
            <label for="outerBorder">Inner border: </label>
            <borderTemplate-panel [item]="item.outerBorder" 
              [dependencies]="dependencies" 
              (added)  ="addTemplate('outerBorder', borderTemplate)"
              (saved)  ="updateProperty('outerBorder', $event)"    
              (removed)="removeTemplate('outerBorder', $event)">
            </borderTemplate-panel>
          </div>
          
          <ng-content select="borderGroup"></ng-content>
        </fieldset>
        
      <ng-content></ng-content>      
  
    </template-panel>
  `,
  directives: [SingleSelectInput, TemplateValue, TemplatePanel, BorderTemplatePanel]
})
export class LyphTemplatePanel extends TemplatePanel{
  borderTemplate = BorderTemplate;
}
