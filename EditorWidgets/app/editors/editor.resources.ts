import {Component, Inject, ElementRef, Renderer, Output, EventEmitter} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {ResourceProvider} from '../services/service.resourceProvider';
import {HierarchyWidget} from '../widgets/widget.hierarchy';
import {ResourceWidget} from '../widgets/widget.resource';
import {ResizeService} from '../services/service.resize';

declare var GoldenLayout:any;
declare var $: any;

@Component({
  selector: 'app',
  providers: [
    ResizeService,
    ResourceProvider
  ],
  template: `
    <repo-general id="repo"
      [items]="items" 
      [caption]="'All resources'" 
      [dependencies]="dependency" 
      (selected)="onItemSelect($event)">
    </repo-general>
    <hierarchy-widget id = "hierarchy" [item]="selectedItem" [relation]="materials"></hierarchy-widget>
    <resource-widget id = "resource" [item]="selectedItem"></resource-widget>          
    <div id="main"></div>
  `,
  styles: [`#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}`],
  directives: [RepoGeneral, HierarchyWidget, ResourceWidget]
})
export class ResourceEditor {
  items:Array<any>;
  selectedItem:any;
  dependency:any;

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
        }]
    }]
  };

  mainLayout:any;

  constructor(private resizeService:ResizeService,
              public el:ElementRef,
              private resourceP:ResourceProvider) {
    this.dependency = resourceP.data;
    this.items = this.dependency.types;
  }

  onItemSelect(item:any) {
    setTimeout(() => {
      this.selectedItem = null;
    }, 0);
    setTimeout(() => {
      this.selectedItem = item;
    }, 0);
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
    this.mainLayout.init();
  }
}


