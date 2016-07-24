/**
 * Created by Natallia on 7/23/2016.
 */
import {Component, OnChanges, OnDestroy} from '@angular/core';
import {OmegaTreeWidget} from './view.omegaTree';
import {ResourceName} from '../services/service.apinatomy2';
import {ResizeService} from '../services/service.resize';
import { Subscription}   from 'rxjs/Subscription';

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
export class ResourceWidget implements OnChanges, OnDestroy {
  resourceName = ResourceName;
  subscription: Subscription;

  constructor(public resizeService: ResizeService) {
    this.subscription = resizeService.resize$.subscribe(
      (event: any) => {
        if (event.target == "resource-widget"){
          this.onSetPanelSize(event);
        }
      });
  }

  onSetPanelSize(event: any){
    this.resizeService.announceResize({target: "omega-tree", size: event.size});
  }

  ngOnChanges(changes: { [propName: string]: any }){}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
