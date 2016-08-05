/**
 * Created by Natallia on 7/23/2016.
 */
import {Component, Input} from '@angular/core';
import {OmegaTreeWidget} from './view.omegaTree';
import {ResourceName} from '../services/utils.model';
import {ResizeService} from '../services/service.resize';
import { Subscription}   from 'rxjs/Subscription';

@Component({
  selector: 'resource-widget',
  inputs: ['item'],
  template : `
    <div class="panel panel-default">
      <div class="panel-heading">Resource <strong>{{item?.id}}{{(item)? ': ' + item.name : ''}}</strong></div>
      <omega-tree *ngIf="item && (item.class == resourceName.OmegaTreeType)" [item]="item"></omega-tree>   
    </div>
  `,
  directives: [OmegaTreeWidget]
})
export class ResourceWidget{
  @Input() item: any;
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

  ngOnDestroy() {this.subscription.unsubscribe();}

}
