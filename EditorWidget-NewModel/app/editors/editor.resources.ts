import {Component, ElementRef} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {RepoNested} from '../repos/repo.nested';
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
      [items]="items | setToArray | hideClass : ['Border']" 
      [caption]="'Resources'" 
      (selectedItemChange)="onItemSelected($event)">
    </repo-general>
    <hierarchy-widget id = "hierarchy" [item]="selectedItem"></hierarchy-widget>
    <resource-widget id = "resource" [item]="selectedItem"></resource-widget>   
    <div id="main"></div>
  `,
  styles: [`#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}`],
  directives: [RepoGeneral, RepoNested, RelationshipWidget, ResourceWidget],
  pipes: [SetToArray, HideClass]
})
export class ResourceEditor {
  items:Array<any>;
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
          ],
          width: 50
        }
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

    let self = this;
    (async function() {

      /*Lyphs*/
      let renalH = model.Lyph.new({name: "Renal hilum"});
      let renalP = model.Lyph.new({name: "Renal parenchyma"});
      let renalC = model.Lyph.new({name: "Renal capsule"});

      var cLyphsGroup = [renalH, renalP, renalC];
      //await Promise.all(cLyphsGroup.map(p => p.commit()));

      let kidney = model.Lyph.new({name: "Kidney", layers: cLyphsGroup});
      //await kidney.commit();

      let layers = Array.from(kidney.layers);
      let parts = Array.from(kidney.parts);

      kidney.p('measurables').subscribe(
        x => {
          let measurablesP = Array.from(x);
        }
      );

      let measurable1 = model.Measurable.new({name: "Measurable 1"});
      kidney.measurables = [measurable1];

      let measurable2 = model.Measurable.new({name: "Measurable 2"});
      kidney.measurables.add(measurable2);

      //let kidneyLobus = model.Lyph.new({name: "Kidney lobus"});
      //await kidneyLobus.commit();

    })();

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


