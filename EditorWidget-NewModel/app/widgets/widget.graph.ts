/**
 * Created by Natallia on 7/14/2016.
 */
import {Component, Input, Output, ElementRef, Renderer, EventEmitter} from '@angular/core';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';
import {getIcon, ResourceName, model} from "../services/utils.model";
import {Canvas,
SelectTool,
DragDropTool,
ResizeTool,
ZoomTool,
PanTool,
BorderToggleTool,
LyphRectangle,
NodeGlyph,
ProcessLine
} from "lyph-edit-widget";
import {combineLatest} from "rxjs/observable/combineLatest";

declare var $:any;

@Component({
  selector: 'graph-widget',
  inputs: ['item', 'bloodVessel', 'brain'],
  template : `
     <div class="panel panel-success">
     <div class="panel-heading">Graph editor</div>
       <div class="panel-body">
          <svg id="graphSvg" class="svg-widget"></svg>
       </div>
    </div> 
  `
})
export class GraphWidget{
  @Input() item: any;

  @Input() bloodVessel: any;
  @Input() brain: any;

  svg : any;
  root: any;
  vp: any = {size: {width: 600, height: 600},
    margin: {x: 20, y: 20},
    node: {size: {width: 40, height: 40}}};
  subscription: Subscription;

  constructor(public renderer: Renderer,
              public el: ElementRef,
              private resizeService: ResizeService) {
    this.subscription = resizeService.resize$.subscribe(
    (event:any) => {
      if (event.target == "graph-widget") {
        this.setPanelSize(event.size);
      }
    });
  }

  setPanelSize(size: any){
    let delta = 10;
    if ((Math.abs(this.vp.size.width - size.width) > delta) || (Math.abs(this.vp.size.height - size.height) > delta)){
      this.vp.size = {width: size.width, height: size.height - 40};
      if (this.svg){
      }
    }
  }

  ngOnInit() {
    this.svg = $('#graphSvg');
    if (this.svg) {
      this.root = new Canvas({element: this.svg});
    }
    if (!this.root) return;


    new SelectTool      (this.root.context);
    new DragDropTool    (this.root.context);
    new ResizeTool      (this.root.context);
    new ZoomTool        (this.root.context);
    new PanTool         (this.root.context);
    new BorderToggleTool(this.root.context);

    /* put a test lyph or two in there */ // TODO: remove; use toolbar to add stuff
    let bloodVesselRectangle = new LyphRectangle({
      model:  this.bloodVessel,
      x:      100,
      y:      100,
      width:  200,
      height: 150
      // rotation: 45 // TODO: remove when done testing
    });
    bloodVesselRectangle.parent = this.root;

    let brainRectangle = new LyphRectangle({
      model:  this.brain,
      x:      300,
      y:      300,
      width:  150,
      height: 150
    });
    brainRectangle.parent = this.root;

    combineLatest(
      bloodVesselRectangle.freeFloatingStuff.e('add').filter(c=>c instanceof NodeGlyph),
      brainRectangle      .freeFloatingStuff.e('add').filter(c=>c instanceof NodeGlyph)
    ).take(1).subscribe(([node1, node2]) => {
      let processEdge = new ProcessLine({
        source: node1,
        target: node2
      });
      processEdge.parent = this.root;
    });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
