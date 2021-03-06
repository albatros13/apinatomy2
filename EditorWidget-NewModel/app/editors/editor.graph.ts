import {Component, ElementRef} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {RepoNested} from '../repos/repo.nested';
import {GraphWidget} from '../widgets/widget.graph';
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
      [items]="items | setToArray | hideClass : ['Border', 'Node']" 
      [caption]="'Resources'" 
      [options]="{showActive: true}"
      (selectedItemChange)="updateSelected($event)"
      (activeItemChange)  ="updateActive($event)"
      (highlightedItemChange)="updateHighlighted($event)"
      >
    </repo-general>
    <graph-widget id = "graphWidget" 
      [activeItem]="activeItem" [highlightedItem]="highlightedItem" 
      [brain]="brain" [bloodVessel]="bloodVessel">
    </graph-widget>
    <div id="main"></div>
  `,
  styles: [`#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}`],
  directives: [RepoGeneral, RepoNested, GraphWidget],
  pipes: [SetToArray, HideClass]
})
export class GraphEditor {
  items : Array<any>;
  selectedItem : any;
  activeItem   : any;
  highlightedItem : any;

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
          type: 'component',
          componentName: 'GraphWidgetPanel'
        }
      ]
    }]
  };

  mainLayout:any;

  rs: Subscription;
  ts: Subscription;

  brain: any;
  bloodVessel: any;

  constructor(private resizeService:ResizeService,
              public el:ElementRef) {
    this.rs = model.Resource.p('all').subscribe(
      (data: any) => {
        this.items = data
      });

    let self = this;
    (async function() {

      let vesselWall, bloodLayer, node1, node2;
      let bloodVessel = model.Lyph.new({
        name: 'Blood Vessel',
        layers: [
          vesselWall = model.Lyph.new(
            { name: 'Vessel Wall' },
            { createRadialBorders: true }
          ),
          bloodLayer = model.Lyph.new({
            name: 'Blood Layer',
            parts: [
              model.Lyph.new(
                { name: 'Sublyph' },
                { createAxis: true, createRadialBorders: true }
              )
            ]
          }, { createRadialBorders: true })
        ],
        nodes: [
          node1 = model.Node.new()
        ]
      }, { createAxis: true, createRadialBorders: true });

      let brain = model.Lyph.new({
        name: 'Brain',
        nodes: [
          node2 = model.Node.new()
        ]
      }, { createAxis: true, createRadialBorders: true });

      self.bloodVessel = bloodVessel;
      self.brain = brain;

    })();

  }
  ngOnDestroy() {
    this.rs.unsubscribe();
  }

  updateSelected(item:any) {
    setTimeout(() => {
      this.selectedItem = null;
    }, 0);
    setTimeout(() => {
      this.selectedItem = item;
    }, 0);
  }

  updateActive(item:any) {
    this.activeItem = item;
  }

  updateHighlighted(item:any) {
    this.highlightedItem = item;
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

    this.mainLayout.registerComponent('GraphWidgetPanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #graphWidget');
      component.detach().appendTo(panel);
      //Notify components about window resize
      container.on('open', function() {
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "graph-widget", size: size});
      });
      container.on('resize', function() {
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "graph-widget", size: size});
      });
    });

    this.mainLayout.init();
  }
}


