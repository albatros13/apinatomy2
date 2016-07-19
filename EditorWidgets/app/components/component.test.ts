/**
 * Created by Natallia on 7/7/2016.
 */
import {Component, ComponentRef, Directive, ContentChild, TemplateRef, ElementRef,
  Input, ViewChild, ViewContainerRef, ComponentResolver, ComponentFactory} from '@angular/core';

declare var GoldenLayout:any;
declare var d3:any;

@Component({
  selector: 'editor-layout',
  template: '<div #main></div>'
})
export class EditorLayout{
  @Input() inputConfig: any;
  //@ViewChild('lyphTypeRepoComponent', {read: ViewContainerRef}) repo: any;

  config = {
    content: [{
      type: 'row',
      content:[{
        type: 'component',
        componentName: 'LyphTypeRepo',
        title: "Lyph types",
        showPopoutIcon: false,
        width: 60,
        componentState: {
          content: `<div id="lyphTypeRepo" #lyphTypeRepoComponent></div>`
        },
        template: ``
      },
        {
          type: 'stack',
          content: [
            {
              type: 'component',
              componentName: 'LyphType',
              title: "Lyph type",
              showPopoutIcon: false,
              width: 40,
              componentState: {
                content: `<div id="lyphType" #lyphTypeWidget></div>`
              }
            },
            {
              type: 'component',
              componentName: 'LyphTypePartonomy',
              title: "Lyph type partonomy",
              showPopoutIcon: false,
              width: 40,
              componentState: {
                content: `<div id="lyphTypePartonomy" #lyphTypePartonomyWidget></div>`
              }
            }
          ]
        }]
    }]
  };

  myLayout: any;

  constructor(public elementRef: ElementRef) {
    this.myLayout = new GoldenLayout(this.inputConfig || this.config, this.elementRef.nativeElement);

    //let main = d3.select(this.elementRef.nativeElement).select('#main');
    //this.myLayout = new GoldenLayout(this.inputConfig || this.config, main.nativeElement);

    this.myLayout.registerComponent('LyphTypeRepo', function(container:any, componentState:any) {
      let el = container.getElement().html(componentState.content);
      container.on('open', function () {
      })
    });

    this.myLayout.registerComponent('LyphType', function (container:any, componentState:any) {
      let el = container.getElement().html(componentState.content);
      container.on('open', function () {});
      container.on('resize', function () {
      });
    });

    this.myLayout.registerComponent('LyphTypePartonomy', function (container:any, componentState:any) {
      let el = container.getElement().html(componentState.content);
      container.on('open', function () {

      });
      container.on('resize', function () {
      });
    });
    this.myLayout.init();
  }

  ngOnInit(){

  }

  ngAfterViewInit() {
  }
}

@Component({
  selector: '[node]',
  inputs: ['x', 'y'],
  template: `
    <svg:circle [attr.r]="radius" [attr.cx]="x" [attr.cy]="y" stroke="white" fill="steelblue"></svg:circle>
  `
}) export class Node{}


@Component({
  selector: 'list',
  inputs: ['items'],
  template: `<template ngFor [ngForOf]="items" [ngForTemplate]="contentTemplate"></template>`
})
export class List {
  @ContentChild(TemplateRef) contentTemplate: TemplateRef<any>;
}

@Directive({
  selector: '[dcl-wrapper]'
})
export class DclWrapperComponent {
  @Input() target: any;
  @Input() type: any;
  @Input() input: any;
  cmpRef: ComponentRef<any>;
  private isViewInitialized: boolean = false;

  constructor(private resolver: ComponentResolver) { }

  updateComponent() {
    if (!this.isViewInitialized) {return;}
    if (this.cmpRef) {this.cmpRef.destroy();}
    this.resolver.resolveComponent(this.type).then((factory: ComponentFactory<any>) => {
      this.cmpRef = this.target.createComponent(factory);
      this.cmpRef.instance.input = this.input;
    });
  }
  ngOnChanges() {
    this.updateComponent();
  }
  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }
  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}

@Component({
  selector: 'dynamic-list',
  inputs: ['items', 'renderer'],
  template:`
      <g *ngFor="let item of items; let i = index" dcl-wrapper [target]="target" [type]="renderer[i]" [input]="item"></g>
 `,
  directives: [DclWrapperComponent]
})
export class DynamicList{
  target: any;
  constructor(vc: ViewContainerRef){
    this.target = vc;
  }
}


function getListData(item: any, property: string, depth: number){//Format: [{id: 1, name: "Parent"}, {id: 2, name: "Child"},...];
  let data: any = {};
  if (!item) return data;
  if (!depth) depth = -1;
  traverse(item, property, depth, data);
  return data;

  function traverse(root: any, property: string, depth: number, data: any) {
    if (!root) return;
    if (!root[property]) return;
    if (depth == 0) return root;
    var children = root[property];
    for (let child of children){
      if (data.indexOf(child) == -1)
        data.push(child);
      traverse(child, property, depth - 1, data);
    }
  }
}

