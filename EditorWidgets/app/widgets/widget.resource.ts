/**
 * Created by Natallia on 7/23/2016.
 */
import {Component} from '@angular/core';
import {OmegaTreeWidget} from './view.omegaTree';
import {ResourceName} from '../providers/service.apinatomy2';

//Component visualization widget stub
export class TemplateBox{
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  render(svg: any, options: any) {
    return svg.append("rect")
      .attr("x", options.center.x).attr("y", options.center.y)
      .attr("width", options.size.width).attr("height", options.size.height)
      .style("stroke", "black").style("fill", "white");
  }
}

@Component({
  selector: 'resource-widget',
  inputs: ['item'],
  template : `
    <omega-tree *ngIf="item && (item.class == resourceName.OmegaTreeType)" [item]="item" [template]="TemplateBox"></omega-tree>   
  `,
  directives: [OmegaTreeWidget]
})
export class ResourceWidget {
  resourceName = ResourceName;

}
