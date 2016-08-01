import {Component, Inject, ElementRef, Renderer, Output, EventEmitter} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {RepoTemplate} from '../repos/repo.template';
import {HierarchyWidget} from '../widgets/widget.hierarchy';
import {ResourceWidget} from '../widgets/widget.resource';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';
import {ResourceName, TemplateName} from '../services/service.apinatomy2';
import * as model from "open-physiology-model";
import {SetToArray} from "../transformations/pipe.general";

declare var GoldenLayout:any;
declare var $: any;

@Component({
  selector: 'app',
  providers: [
    ResizeService
  ],
  template: `
    <repo-general id="repo"
      [items]="items | setToArray" 
      [caption]="'All resources'" 
      (selected)="onItemSelected($event)"
      (added)="onItemAdded($event)"
      (removed)="onItemRemoved($event)"
      (updated)="onItemUpdated($event)"
      >
    </repo-general>
    <hierarchy-widget id = "hierarchy" [item]="selectedItem"></hierarchy-widget>
    <resource-widget id = "resource" [item]="selectedItem"></resource-widget>   
    <repo-template id="repo2"
      [items]="[]" 
      [caption]="'All templates'" 
      [options]="{showSortToolbar: true, showFilterToolbar: true}"
      (selected)="onItemSelected($event)"
      (added)="onItemAdded($event)"
      (removed)="onItemRemoved($event)"
      (updated)="onItemUpdated($event)"
      >
    </repo-template>         
    <div id="main"></div>
  `,
  styles: [`#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}`],
  directives: [RepoGeneral, RepoTemplate, HierarchyWidget, ResourceWidget],
  pipes: [SetToArray]
})
export class ResourceAndTemplateEditor {
  protected resourceName = ResourceName;
  protected templateName = TemplateName;

  items        :Array<any> = [];
  selectedItem :any        = {};

  layoutConfig = {
    settings: {
      hasHeaders: false,
      constrainDragToContainer: true,
      reorderEnabled: true,
      showMaximiseIcon: true,
      showCloseIcon: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      showPopoutIcon: false
    },
    dimensions: {
      borderWidth: 2
    },
    content: [{
      type: 'row',
      content: [
        {
          type: 'component',
          componentName: 'RepoPanel'
        },
        {
          type: 'column',
          content: [
            {
              type: 'component',
              componentName: 'HierarchyPanel'
            },
            {
              type: 'component',
              componentName: 'ResourcePanel'
            }
          ]
        },
        {
          type: 'component',
          componentName: 'Repo2Panel'
        }
      ]
    }]
  };

  mainLayout:any;
  subscription: Subscription;

  constructor(private resizeService:ResizeService,
              public el:ElementRef) {

    this.subscription = model.Resource.p('all').subscribe(
      (data:any) => {
        this.items = data;
      });

    console.log("V.2");

    (async function () {
      /*Material type*/
      var water = model.MaterialType.new({name: "Water"});
      await water.commit();
      var vWater = model.MeasurableType.new({
        name: "Concentration of water", quality: "concentration",
        materials: [water]
      });
      await vWater.commit();

      /*Measurable type*/
      var sodiumIon = model.MaterialType.new({name: "Sodium ion"});
      await sodiumIon.commit();
      var vSodiumIon = model.MeasurableType.new({
        name: "Concentration of sodium ion", quality: "concentration",
        materials: [sodiumIon]
      });
      await vSodiumIon.commit();

      /*Process type*/
      var processes = [
        model.ProcessType.new({name: "Inflow Right Heart"}),
        model.ProcessType.new({name: "Outflow Right Heart"}),
        model.ProcessType.new({name: "Inflow Left Heart"}),
        model.ProcessType.new({name: "Outflow Left Heart"})];

      await Promise.all(processes.map(p => p.commit()));

    })();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onItemSelected(item:any) {
    setTimeout(() => {
      this.selectedItem = null;
    }, 0);
    setTimeout(() => {
      this.selectedItem = item;
    }, 0);
  }

  onItemAdded(item:any) {
  }

  onItemRemoved(item:any) {
  }

  onItemUpdated(item:any) {
  }

  ngOnInit() {
    let self = this;
    let main = $('app > #main');
    this.mainLayout = new GoldenLayout(this.layoutConfig, main);

    this.mainLayout.registerComponent('RepoPanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let content = $('app > #repo');
      content.detach().appendTo(panel);
    });

    this.mainLayout.registerComponent('HierarchyPanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #hierarchy');
      component.detach().appendTo(panel);
      //Notify components about window resize
      container.on('open', function() {
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "hierarchy-widget", size: size});
      });
      container.on('resize', function() {
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "hierarchy-widget", size: size});
      });
    });

    this.mainLayout.registerComponent('ResourcePanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #resource');
      component.detach().appendTo(panel);

      //Notify components about window resize
      container.on('open', function(){
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "resource-widget", size: size}) ;
      });
      container.on('resize', function(){
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "resource-widget", size: size}) ;
      });
    });

    this.mainLayout.registerComponent('Repo2Panel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #repo2');
      component.detach().appendTo(panel);
    });
    this.mainLayout.init();
  }
}


