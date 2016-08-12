import {Component, ElementRef} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {RepoTemplate} from '../repos/repo.template';
import {RelationshipWidget} from '../widgets/widget.relations';
import {ResourceWidget} from '../widgets/widget.resource';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';
import {SetToArray, HideClass} from "../transformations/pipe.general";
import {model} from "../services/utils.model";

import 'rxjs/add/operator/map';

declare var GoldenLayout:any;
declare var $: any;

@Component({
  selector: 'app',
  providers: [
    ResizeService
  ],
  template: `
    <repo-general id="repo"
      [items]="items | setToArray | hideClass: ['BorderTemplate']" 
      [caption]="'Resources'" 
      (selected)="onItemSelected($event)">
    </repo-general>
    <hierarchy-widget id = "hierarchy" [item]="selectedItem"></hierarchy-widget>
    <resource-widget id = "resource" [item]="selectedItem"></resource-widget>   
    <!--<repo-template id="repoTemplate"
      [items]="templates | setToArray" 
      [caption]="'Templates'" 
      [options]="{sortToolbar: true, filterToolbar: true}"
      (selected)="onItemSelected($event)">
    </repo-template>-->
    <div id="main"></div>
  `,
  styles: [`#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}`],
  directives: [RepoGeneral, RepoTemplate, RelationshipWidget, ResourceWidget],
  pipes: [SetToArray, HideClass]
})
export class ResourceEditor {
  items:Array<any>;
  templates:Array<any>;
  selectedItem:any;

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
          componentName: 'RepoPanel',
          //width: 25
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
          ],
          width: 50
        },
        /*{
          type: 'component',
          componentName: 'RepoTemplatePanel',
          width: 25
        },*/
      ]
    }]
  };

  mainLayout:any;

  rs: Subscription;
  ts: Subscription;

  constructor(private resizeService:ResizeService,
              public el:ElementRef) {
    this.rs = model.Resource.p('all').subscribe(
      (data: any) => {
        this.items = data
      });

/*    this.rs = model.Resource.p('all').subscribe(
      (data: any) => {this.items = data});*/

   /* this.ts = model.classes.Template.p('all').subscribe(
      (data: any) => {this.templates = data;});
*/
   /* (async function() {

      /!*External resources*!/
      let fma7203  = model.ExternalResource.new({name: "FMA:7203", uri: ""});
      let fma15610 = model.ExternalResource.new({name: "FMA:15610", uri: ""});
      let fma66610 = model.ExternalResource.new({name: "FMA:66610", uri: ""});
      let fma17881 = model.ExternalResource.new({name: "FMA:17881", uri: ""});

      var externals = [fma7203, fma15610, fma66610, fma17881];

      await Promise.all(externals.map(p => p.commit()));


      //create tree from user story

    })();*/

  }
  ngOnDestroy() {
    this.rs.unsubscribe();
  }

  onItemSelected(item:any) {
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

   /* this.mainLayout.registerComponent('RepoTemplatePanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let content = $('app > #repoTemplate');
      content.detach().appendTo(panel);
    });*/

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


