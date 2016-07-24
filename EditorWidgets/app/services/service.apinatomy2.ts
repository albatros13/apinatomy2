"use strict";
import {Injectable, Inject} from '@angular/core';
import * as model from "open-physiology-model";

//var waterP = model.MaterialType.new({name: "Water"});

// (async function(){
//   let water = await waterP;
//
//   console.log("1", water.name);
//   water.name = "WATER";
//   console.log("2", water.name);
//   await water.rollback();
//   console.log("3", water.name);
//   water.name = "WATER";
//   await water.commit();
//   await water.rollback();
//   console.log("4", water.name);
//
// })();

/*ENUMERATIONS*/

export enum ResourceName {
  Resource            = <any>"Resource",
  ExternalResource    = <any>"ExternalResource",
  Type                = <any>"Type",

  MaterialType        = <any>"MaterialType",
  LyphType            = <any>"LyphType",
  CylindricalLyphType = <any>"CylindricalLyphType",

  ProcessType         = <any>"ProcessType",
  MeasurableType      = <any>"MeasurableType",
  CausalityType       = <any>"CausalityType",
  NodeType            = <any>"NodeType",
  BorderType          = <any>"BorderType",

  GroupType           = <any>"GroupType",
  OmegaTreeType       = <any>"OmegaTreeType",

  Publication         = <any>"Publication",
  Correlation         = <any>"Correlation",
  ClinicalIndex       = <any>"ClinicalIndex",

  Coalescence         = <any>"Coalescence"
}

export enum TemplateName {
  Template                = <any>"Template",

  LyphTemplate            = <any>"LyphTemplate",
  CylindricalLyphTemplate = <any>"CylindricalLyphTemplate",

  ProcessTemplate         = <any>"ProcessTemplate",
  MeasurableTemplate      = <any>"MeasurableTemplate",
  CausalityTemplate       = <any>"CausalityTemplate",
  NodeTemplate            = <any>"NodeTemplate",
  BorderTemplate          = <any>"BorderTemplate",

  GroupTemplate           = <any>"GroupTemplate",
  OmegaTreeTemplate       = <any>"OmegaTreeTemplate"
}

export enum TransportPhenomenon {
  diffusion = <any>"diffusion",
  advection = <any>"advection"
}

export enum DistributionType {
  Uniform       = <any>"Uniform",
  BoundedNormal = <any>"BoundedNormal"
}

export enum FormType {
  open       = <any>"open",
  closed     = <any>"closed"
}

/*CLASSES*/

//Components

export class Distribution {
  constructor(obj:any ){}
}

export class UniformDistribution extends Distribution {
  public min: number;
  public max: number;

  constructor(obj:any){
    super(obj);
    this.min = obj.min;
    this.max = obj.max;
  }
}

export class BoundedNormalDistribution extends UniformDistribution {
  public mean: number = 0;
  public std: number = 0;

  constructor(obj:any ){
    super(obj);
    this.max = obj.max;
    this.std = obj.std;
  }
}

export class ValueDistribution {
  //public unit: string;
  public type: DistributionType;
  public distribution: Distribution;

  constructor(obj:any){
    //this.unit = obj.unit;
    this.type = obj.type;
    this.distribution = obj.distribution;
  }
}

//Entities

export class Resource {
  public id: number = 0;
  public name: string = "";
  public href: string = "";
  public class: ResourceName | TemplateName = ResourceName.Resource;
  public externals: Array<ExternalResource>;

  constructor(obj:any ){
    this.id = (obj.id)? obj.id: 0;
    this.name = (obj.name)? obj.name: "New item";
    this.href = obj.href;
    this.externals = obj.externals;
    this.class = obj.class;
  }
}

export class ExternalResource extends Resource {
  public uri: string = "";
  public type: string = "";
  public locals: Array<any> = [];

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.ExternalResource;
    this.type = obj.type;
    this.uri = obj.uri;
    this.locals = obj.locals;
  }
}

export class Type extends Resource {
  public supertypes: Array<Type> = [];
  public subtypes: Array<Type> = [];

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.Type;
    this.supertypes = obj.supertypes;
    this.subtypes = obj.subtypes;
  }
}

export class MaterialType extends Type {
  public materialProviders: Array<MaterialType> = [];
  public materials: Array<MaterialType> = [];
  public measurableProviders: Array<LyphType> = [];
  public measurables: Array<MeasurableTemplate> = [];

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.MaterialType;
    this.materialProviders = obj.materialProviders;
    this.materials = obj.materials;
    this.measurableProviders = obj.measurableProviders;
    this.measurables = obj.measurables;
  }
}

export class LyphType extends MaterialType {
  public species: string;
  public layerProviders: Array<LyphType> = [];
  public patchProviders: Array<LyphType> = [];
  public partProviders: Array<LyphType> = [];

  public layers: Array<LyphTemplate> = [];
  public patches: Array<LyphTemplate> = [];
  public parts: Array<LyphTemplate> = [];

  public processes: Array<ProcessTemplate> = [];
  public nodes: Array<NodeTemplate> = [];
  public innerBorder: BorderTemplate = null;
  public outerBorder: BorderTemplate = null;

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.LyphType;
    this.species = obj.species;
    this.layerProviders = obj.layerProviders;
    this.patchProviders = obj.patchProviders;
    this.partProviders = obj.partProviders;

    this.layers = obj.layers;
    this.patches = obj.patches;
    this.parts = obj.parts;

    this.processes = obj.processes;
    this.nodes = obj.nodes;
    this.innerBorder = obj.innerBorder;
    this.outerBorder = obj.outerBorder;

    if (!this.innerBorder){
      this.innerBorder = new BorderTemplate({name: "T inner: " + testBorders[0].name, type:  testBorders[0]});
    }
    if (!this.outerBorder){
      this.outerBorder = new BorderTemplate({name: "T outer: " + testBorders[0].name, type:  testBorders[0]});
    }
  }
}

export class CylindricalLyphType extends LyphType {
  public segmentProviders: Array<CylindricalLyphType> = [];
  public segments: Array<CylindricalLyphTemplate> = [];
  public minusBorder: BorderTemplate = null;
  public plusBorder: BorderTemplate = null;

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.CylindricalLyphType;
    this.segmentProviders = obj.segmentProviders;
    this.segments = obj.segments;
    this.minusBorder = obj.minusBorder;
    this.plusBorder = obj.plusBorder;

    if (!this.minusBorder){
      this.minusBorder = new BorderTemplate({name: "T minus: " + testBorders[0].name, type:  testBorders[0]});
    }
    if (!this.plusBorder){
      this.plusBorder = new BorderTemplate({name: "T plus: " + testBorders[0].name, type:  testBorders[0]});
    }
  }
}

export class ProcessType extends Type {
  public transportPhenomenon: Array<TransportPhenomenon>;
  public species: string;
  public materials: Array<MaterialType>;
  public measurables: Array<MeasurableTemplate>;
  public source: NodeTemplate;
  public target: NodeTemplate;

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.ProcessType;
    this.transportPhenomenon = (obj.transportPhenomenon)? obj.transportPhenomenon:
      [TransportPhenomenon.advection, TransportPhenomenon.diffusion];
    this.species = obj.species;
    this.materials = obj.materials;
    this.measurables = obj.measurables;
    this.source = obj.source;
    this.target = obj.target;
  }
}

export class MeasurableType extends Type {
  public quality: string;
  public materials: Array<MaterialType>;

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.MeasurableType;
    this.quality = obj.quality;
    this.materials = obj.materials;
  }
}

export class CausalityType extends Type {
  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.CausalityType;
  }
}

export class NodeType extends Type {
  public channels: Array<NodeTemplate>;

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.NodeType;
    this.channels = obj.channels;
  }
}

export class BorderType extends Type {
  public position: Template;
  public form: Array<FormType> = [FormType.open, FormType.closed];

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.BorderType;
    this.position = obj.position;
    this.form = obj.form;
  }
}

export class GroupType extends Type {
  public elements: Array<Template>;

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.GroupType;
    this.elements = obj.elements;
  }
}

export class OmegaTreeType extends GroupType {
  //public root: INodeTemplate;
  public levels: Array<CylindricalLyphTemplate>; //|OmegaTreeTemplate

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.OmegaTreeType;
    this.levels = obj.levels;

    if (!obj.elements){
      //If elements are not assigned, this is not a copy constructor, elements have to be generated from levels
      this.elements = [];

      let genericNodeType = new NodeType({name: "Generic node"}); //TODO: how to get node types?

      if (this.levels[0]){
        let l1 = this.levels[0];
        let nodeX = new NodeTemplate({type: genericNodeType});
        if (l1.type)
          addNodes(l1.type.minusBorder, [nodeX]);
          //let nodeA = new NodeTemplate({type: genericNodeType});
          //let nodeB = new NodeTemplate({type: genericNodeType});
          //addNodes(l1.type.minusBorder, [nodeA, nodeB]);
          //addNodes(l1.type.outerBorder, [nodeA]);
          //addNodes(l1.type.innerBorder, [nodeB]);
      }

      //Create group structure
      for (let i = 0; i < this.levels.length - 1; i++){
        let l1 = this.levels[i];     //TODO: extend for the case of a nested omega tree, get leaf
        let l2 = this.levels[i + 1]; //TODO: extend for the case of a nested omega tree, get root

        let nodeX = new NodeTemplate({type: genericNodeType});
        //let nodeA = new NodeTemplate({type: genericNodeType});
        //let nodeB = new NodeTemplate({type: genericNodeType});

        if (l1.type) {
          addNodes(l1.type.plusBorder, [nodeX]);
          //addNodes(l1.type.plusBorder, [nodeA, nodeB]);
          //addNodes(l1.type.outerBorder, [nodeA]);
          //addNodes(l1.type.innerBorder, [nodeB]);
        }
        if (l2.type) {
          addNodes(l1.type.minusBorder, [nodeX]);
          //addNodes(l2.type.minusBorder, [nodeA, nodeB]);
          //addNodes(l2.type.outerBorder, [nodeA]);
          //addNodes(l2.type.innerBorder, [nodeB]);
        }
        this.elements.push(nodeX);
        //this.elements.push(nodeA);
        //this.elements.push(nodeB);
        this.elements.push(l2);
      }
    }

    function addNodes(border: BorderTemplate, nodeSet: Array<NodeTemplate>){
      if (!border) return;
      if (!border.nodes) border.nodes = [];
      for (let node of nodeSet){
        //? how to identify elements?
        if (border.nodes.find(item => (item == node))){
          border.nodes.push(node);
        }
      }
    }
  }
}

export class Publication extends Resource {
  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.Publication;
  }
}

export class ClinicalIndex extends Resource {
  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.ClinicalIndex;
  }
}

export class Correlation extends Resource {
  public publication: Publication;
  public measurables: Array<MeasurableTemplate>;
  public clinicalIndices: Array<ClinicalIndex>;

  constructor(obj:any ){
    super(obj);
    this.class = ResourceName.Correlation;
    this.publication = obj.publication;
    this.measurables = obj.measurables;
    this.clinicalIndices = obj.clinicalIndices;

  }
}

export class Coalescence extends Resource {
  public lyphs: Array<LyphTemplate>;
  public interfaceLayers: Array<LyphType>;

  constructor(obj:any ) {
    super(obj);
    this.class = ResourceName.Coalescence;
    this.lyphs = obj.lyphs;
    this.interfaceLayers = obj.interfaceLayers;
  }
}

//Templates

export class Template extends Resource {
  public type:Type;
  public cardinalityBase: number|ValueDistribution;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.Template;
    this.type = obj.type;
    this.cardinalityBase = (obj.cardinalityBase)? obj.cardinalityBase: 1;
  }
}

export class MeasurableTemplate extends Template {
  public type:MeasurableType;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.MeasurableTemplate;
  }
}

export class ProcessTemplate extends Template {
  public type:ProcessType;
  public transportPhenomenon: TransportPhenomenon;
  public conveyingLyph: LyphType;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.ProcessTemplate;
    this.transportPhenomenon = (obj.transportPhenomenon)? obj.transportPhenomenon: TransportPhenomenon.advection;
    this.conveyingLyph = obj.conveyingLyph;
  }
}

export class CausalityTemplate extends Template {
  public type: CausalityType;
  public cause: MeasurableTemplate;
  public effect: MeasurableTemplate;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.CausalityTemplate;
    this.cause = obj.cause;
    this.effect = obj.effect;
  }
}

export class NodeTemplate extends Template {
  public type:NodeType;
  incomingProcesses: Array<ProcessType>;
  outgoingProcesses: Array<ProcessType>;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.NodeTemplate;
    this.incomingProcesses = obj.incomingProcesses;
    this.outgoingProcesses = obj.outgoingProcesses;
  }
}

export class BorderTemplate extends Template {
  public type:BorderType;
  public form: FormType;
  public nodes: Array<NodeTemplate>;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.BorderTemplate;
    this.form = (obj.form)? obj.form: FormType.open;
    this.nodes = obj.nodes;
  }
}

export class GroupTemplate extends Template {
  public type:GroupType;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.GroupTemplate;
  }
}

export class OmegaTreeTemplate extends GroupTemplate {
  public type:OmegaTreeType;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.OmegaTreeTemplate;
  }
}

export class LyphTemplate extends Template {
  public length: number | ValueDistribution = 0;
  public width: number | ValueDistribution = 0;
  public type:  LyphType;
  public coalescences: Array<Coalescence>;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.LyphTemplate;
    this.length = obj.length;
    this.width = obj.width;
    this.coalescences = obj.coalescences;
  }
}

export class CylindricalLyphTemplate extends LyphTemplate {
  public type:  CylindricalLyphType;

  constructor(obj:any ){
    super(obj);
    this.class = TemplateName.CylindricalLyphTemplate;
  }
}

/*TEST PROVIDERS*/

var basicMaterials = [
  new MaterialType({id: 10, name: "Water"}),
  new MaterialType({id: 11, name: "Sodium ion"}),
  new MaterialType({id: 12, name: "Pottasium ion"}),
  new MaterialType({id: 13, name: "Hydrogen ion"}),
  new MaterialType({id: 14, name: "Chloride ion"}),
  new MaterialType({id: 15, name: "Bicarbonate ion"}),
  new MaterialType({id: 16, name: "Calcium ion"}),
  new MaterialType({id: 17, name: "Phosphate ion"}),
  new MaterialType({id: 18, name: "Glucose"})
];

var basicMeasurables = [
  new MeasurableType({id: 100, name: "Concentration of " + basicMaterials[0].name, quality: "concentration", materials: [basicMaterials[0]]}),
  new MeasurableType({id: 101, name: "Concentration of " + basicMaterials[1].name, quality: "concentration", materials: [basicMaterials[1]]}),
  new MeasurableType({id: 102, name: "Concentration of " + basicMaterials[2].name, quality: "concentration", materials: [basicMaterials[2]]}),
  new MeasurableType({id: 103, name: "Concentration of " + basicMaterials[3].name, quality: "concentration", materials: [basicMaterials[3]]}),
  new MeasurableType({id: 104, name: "Concentration of " + basicMaterials[4].name, quality: "concentration", materials: [basicMaterials[4]]}),
  new MeasurableType({id: 105, name: "Concentration of " + basicMaterials[5].name, quality: "concentration", materials: [basicMaterials[5]]}),
  new MeasurableType({id: 106, name: "Concentration of " + basicMaterials[6].name, quality: "concentration", materials: [basicMaterials[6]]}),
  new MeasurableType({id: 107, name: "Concentration of " + basicMaterials[7].name, quality: "concentration", materials: [basicMaterials[7]]}),
  new MeasurableType({id: 108, name: "Concentration of " + basicMaterials[8].name, quality: "concentration", materials: [basicMaterials[8]]})
];

var testProcesses = [
  new ProcessType({id: 50, name: "Sample process"})
];

var testBorders = [
  new BorderType({id: 80, name: "General border", form: [FormType.open, FormType.closed]}),
  new BorderType({id: 81, name: "Open border", form: [FormType.open]}),
  new BorderType({id: 82, name: "Closed border", form: [FormType.closed]})
];

@Injectable()
export class ExternalResourceProvider {
  public items: Array<ExternalResource> = [
    new ExternalResource({id: 3000, name: "FMA_44539: Third plantar metatarsal vein", type:  "fma"}),
    new ExternalResource({id: 4000, name: "cocomac:98: Accessor basal nucleus (amygdala), ventromedial division", type:  "cocomac"})
  ];
}

@Injectable()
export class BorderTypeProvider {
  public items: Array<BorderType> = [];
  public templates: Array<BorderTemplate> = [];

  constructor(){
    this.items = testBorders;
    this.templates = this.items.map((item) =>
      new BorderTemplate({id: item.id + 300, name: "T: " + item.name, type:  item}));
  }
}

@Injectable()
export class TypeProvider {
  public items: Array<Type> = [];
  constructor(){}
}

@Injectable()
export class MaterialTypeProvider {
  public items: Array<MaterialType> = [];
  public templates: Array<MeasurableTemplate> = [];

  constructor(){
    this.items = basicMaterials;
    let blMaterials = this.items.slice(0,9);
    for (let i = 0; i < this.items.length; i++) {
      let material = this.items[i];
      this.templates.push(new MeasurableTemplate({id: material.id + 200, name: "T: concentration of " + material.name, type: basicMeasurables[i]}));
    }

    let blMeasurables = this.templates.slice(0,9);

    let ef = new MaterialType({id: 20, name: "Extracellular fluid"});
    let bl = new MaterialType({id: 21, name: "Biological liquid", materials: blMaterials, measurables: blMeasurables});
    this.items.push(ef);
    this.items.push(bl);

    let el = new MaterialType({id: 22, name: "Extracellular liquid", supertypes: [ef, bl], materialProviders: [ef, bl], measurableProviders: [ef, bl]});
    this.items.push(el);

    let ifl = new MaterialType({id: 23, name: "Intracellular fluid", supertypes: [el], materialProviders: [el], measurableProviders: [el]});
    this.items.push(ifl);

    let plasma = new MaterialType({id: 24, name: "Plasma", supertypes: [ifl], materialProviders: [ifl], measurableProviders: [ifl]});
    this.items.push(plasma);
    let urine = new MaterialType({id: 25, name: "Urine", supertypes: [ifl], materialProviders: [ifl], measurableProviders: [ifl]});
    this.items.push(urine);
    let tfl = new MaterialType({id: 26, name: "Tissue fluid", supertypes: [ifl], materialProviders: [ifl], measurableProviders: [ifl]});
    this.items.push(tfl);
  }
}

@Injectable()
export class LyphTypeProvider{
  public items: Array<LyphType> = [];
  public templates: Array<LyphTemplate> = [];

  constructor(){}
}

@Injectable()
export class CylindricalLyphTypeProvider {
  public items: Array<CylindricalLyphType> = [];
  public templates: Array<CylindricalLyphTemplate> = [];

  constructor(mtp: MaterialTypeProvider,  btp: BorderTypeProvider){

    let ifl = mtp.items.find(x => (x.name=="Intracellular fluid"));

    let border = btp.templates.find(x => x.name.indexOf("General") > -1);

    let cytosol =  new CylindricalLyphType(
      {id: 1000, name: "Cytosol", materials: [ifl], innerBorder: border});
    let pm =  new CylindricalLyphType(
      {id: 1001, name: "Plasma membrain", outerBorder: border});

    this.items = [cytosol, pm];
    this.items.forEach(x =>
      this.templates.push(new CylindricalLyphTemplate({id: x.id + 100, name: "T: " + x.name, type: x}))
    );
    let cellLayers = this.templates.slice(0,2);

    let cell = new CylindricalLyphType(
      {id: 1002, name: "Cell", layers: cellLayers});

    this.items.push(cell);

    let openBorder = btp.templates.find(x => (x.name.indexOf("Open") > -1));

    let sec_a = new CylindricalLyphType(
      {id: 1006, name: "Apical region of the surface epithelial cell", plusBorder: openBorder});
    let sec_b = new CylindricalLyphType(
      {id: 1007, name: "Basolateral region of the epithelial cell", minusBorder: openBorder});

    this.items.concat([sec_a, sec_b]);

    let sec_at = new CylindricalLyphTemplate({id: sec_a.id + 100, name: "T: " + sec_a.name, type: sec_a});
    let sec_bt = new CylindricalLyphTemplate({id: sec_b.id + 100, name: "T: " + sec_b.name, type: sec_b});
    this.templates.concat([sec_at, sec_bt]);

    let sec = new CylindricalLyphType(
      {id: 1004, name: "Surface epithelial cell", supertypes: [cell], layerProviders: [cell], measurableProviders: [cell], segments: [sec_at, sec_bt]});

    let rbc = new CylindricalLyphType(
      {id: 1003, name: "Red blood cell", supertypes: [cell], layerProviders: [cell], measurableProviders: [cell]});

    let rsec = new CylindricalLyphType(
      {id: 1005, name: "Renal surface epithelial cell", supertypes: [sec], layerProviders: [sec], measurableProviders: [sec], segmentProviders: [sec]});

    this.items.concat([rbc, sec, rsec]);

    let closedBorder = btp.templates.find(x => x.name.indexOf("Closed") > -1);

    let sec_lum = new CylindricalLyphType({id: 1008, name: "Luminal region of the Surface Endothelial Cell", plusBorder: closedBorder});
    let sec_ablum = new CylindricalLyphType({id: 1009, name: "Abluminal region of the Surface Endothelial Cell", minusBorder: closedBorder});

    this.items.concat([sec_lum, sec_ablum]);

    let sec_lumt = new CylindricalLyphTemplate({id: sec_lum.id + 100, name: "T: " + sec_lum.name, type: sec_lum});
    let sec_ablumt = new CylindricalLyphTemplate({id: sec_ablum.id + 100, name: "T: " + sec_ablum.name, type: sec_ablum});
    this.templates.concat([sec_lumt, sec_ablumt]);

    let ec = new CylindricalLyphType(
      {id: 1010, name: "Endothelial Cell", supertypes: [cell], layerProviders: [cell], measurableProviders: [cell], segments: [sec_lumt, sec_ablumt]});

    let smc = new CylindricalLyphType(
      {id: 1011, name: "Smooth Muscle Cell",
        supertypes: [cell], layerProviders: [cell], measurableProviders: [cell]});

    let cmc = new CylindricalLyphType(
      {id: 1012, name: "Cardiac Muscle Cell", supertypes: [sec], layerProviders: [sec], measurableProviders: [sec], segmentProviders: [sec]});

    this.items.concat([ec, smc, cmc]);

    //Lyphs for omega trees
    let cnt = new CylindricalLyphType(
      {id: 1050, name: "CNT", minusBorder: openBorder, plusBorder: openBorder});

    let dnt = new CylindricalLyphType(
      {id: 1051, name: "DNT", minusBorder: openBorder, plusBorder: openBorder});

    let ctkal = new CylindricalLyphType(
      {id: 1052, name: "CTkAL", minusBorder: openBorder, plusBorder: openBorder});

    this.items.concat([cnt, dnt, ctkal]);
  }
}

@Injectable()
export class MeasurableTypeProvider {
  public items: Array<MeasurableType> = [];
  public templates: Array<MeasurableTemplate> = [];

  constructor(){
    this.items = basicMeasurables;
  }
}

@Injectable()
export class ProcessTypeProvider {
  public items: Array<ProcessType> = [];
  public templates: Array<ProcessTemplate> = [];
  constructor(){
    this.items = testProcesses;
    this.templates = this.items.map((item) =>
      new ProcessTemplate({id: item.id + 300, name: "T: " + item.name, type: item}));
  }
}

@Injectable()
export class GroupTypeProvider {
  public items: Array<GroupType> = [];
  public templates: Array<GroupTemplate> = [];

  constructor(){}
}

@Injectable()
export class OmegaTreeTypeProvider {
  public items: Array<OmegaTreeType> = [];
  public templates: Array<OmegaTreeTemplate> = [];

  constructor(cltp: CylindricalLyphTypeProvider){

    function getLyph(id: number){
      return cltp.items.find(x => (x.id == id));
    }

    let levels: Array<Template> = [
      new CylindricalLyphTemplate({id: 2050, name: "T: CNT",   type: getLyph(1050)}),
      new CylindricalLyphTemplate({id: 2051, name: "T: DNT",   type: getLyph(1051)}),
      new CylindricalLyphTemplate({id: 2052, name: "T: CTkAL", type: getLyph(1052)})
    ];

    let sln = new OmegaTreeType({id: 10000, name: "Short Looped Nephron", levels: levels});
    this.items.push(sln);
  }
}





