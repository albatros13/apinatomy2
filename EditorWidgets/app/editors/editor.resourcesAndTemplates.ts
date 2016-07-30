import {Component, Inject, ElementRef, Renderer, Output, EventEmitter} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {RepoTemplate} from '../repos/repo.template';
import {HierarchyWidget} from '../widgets/widget.hierarchy';
import {ResourceWidget} from '../widgets/widget.resource';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';
import {ResourceName, TemplateName} from '../services/service.apinatomy2';
import {AsyncResourceProvider} from '../services/service.asyncResourceProvider';

declare var GoldenLayout:any;
declare var $: any;

@Component({
  selector: 'app',
  providers: [
    ResizeService,
    AsyncResourceProvider
  ],
  template: `
    <repo-general id="repo"
      [items]="items" 
      [caption]="'All resources'" 
      [dependencies]="dependencies" 
      (selected)="onItemSelected($event)"
      (added)="onItemAdded($event)"
      (removed)="onItemRemoved($event)"
      (updated)="onItemUpdated($event)"
      >
    </repo-general>
    <hierarchy-widget id = "hierarchy" [item]="selectedItem"></hierarchy-widget>
    <resource-widget id = "resource" [item]="selectedItem"></resource-widget>   
    <repo-template id="repo2"
      [items]="dependencies.templates" 
      [caption]="'All templates'" 
      [dependencies]="dependencies" 
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
  directives: [RepoGeneral, RepoTemplate, HierarchyWidget, ResourceWidget]
})
export class ResourceAndTemplateEditor {
  protected resourceName = ResourceName;
  protected templateName = TemplateName;

  items        :Array<any> = [];
  selectedItem :any        = {};
  dependencies :any        = {};

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
              public el:ElementRef,
              public resourceProvider:AsyncResourceProvider) {

    this.subscription = resourceProvider.data$.subscribe(
      (updatedData: any) => {
        this.dependencies = updatedData;
        this.items = updatedData.types;
      });

    setTimeout(() => {resourceProvider.loadExtra()}, 1000);
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
    this.resourceProvider.addResource(item);
  }

  onItemRemoved(item:any) {
    this.resourceProvider.removeResource(item);
  }

  onItemUpdated(item:any) {
    //maybe not needed
    this.resourceProvider.addResource(item);
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


