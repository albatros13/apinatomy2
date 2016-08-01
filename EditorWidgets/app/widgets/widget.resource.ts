/**
 * Created by Natallia on 7/23/2016.
 */
import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {OmegaTreeWidget} from './view.omegaTree';
import {ResourceName} from '../services/service.apinatomy2';
import {ResizeService} from '../services/service.resize';
import { Subscription}   from 'rxjs/Subscription';

@Component({
  selector: 'resource-widget',
  inputs: ['item'],
  template : `
    <div class="panel panel-default">
      <div class="panel-heading">{{caption}}</div>
      <omega-tree *ngIf="item && (item.class == resourceName.OmegaTreeType)" [item]="item"></omega-tree>   
    </div>
  `,
  directives: [OmegaTreeWidget]
})
export class ResourceWidget implements OnChanges, OnDestroy {
  @Input() item: any;
  resourceName = ResourceName;

  subscription: Subscription;
  caption = "Resource";

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

  ngOnInit(){
    if (this.item)
      this.caption = "Resource: " + this.item.id + " - " + this.item.name;
  }

  ngOnChanges(changes: { [propName: string]: any }){}

  ngOnDestroy() {this.subscription.unsubscribe();}

}
