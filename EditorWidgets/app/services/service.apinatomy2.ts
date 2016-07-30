"use strict";
import {Injectable} from '@angular/core';

/*ENUMERATIONS*/

export enum ResourceName {
  Resource            = <any>"Resource",
  ExternalResource    = <any>"ExternalResource",
  Type                = <any>"Type",
  MeasurableLocation  = <any>"MeasurableLocation",

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
  constructor(obj:any = {} ){}
}

export class UniformDistribution extends Distribution {
  public min: number;
  public max: number;

  constructor(obj:any = {}){
    super(obj);
    this.min = obj.min;
    this.max = obj.max;
  }
}

export class BoundedNormalDistribution extends UniformDistribution {
  public mean: number = 0;
  public std: number = 0;

  constructor(obj:any = {} ){
    super(obj);
    this.max = obj.max;
    this.std = obj.std;
  }
}

export class ValueDistribution {
  //public unit: string;
  public type: DistributionType;
  public distribution: Distribution;

  constructor(obj:any = {}){
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

  constructor(obj:any = {} ){
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

  constructor(obj:any = {} ){
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

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.Type;
    this.supertypes = obj.supertypes;
    this.subtypes = obj.subtypes;
  }
}

export class MeasurableLocation extends Type {
  public measurables:Array<MeasurableTemplate>;

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.MeasurableLocation;
    this.measurables = obj.measurables;
  }
}

export class MaterialType extends MeasurableLocation {
  public materialProviders: Array<MaterialType> = [];
  public materials: Array<MaterialType> = [];
  public measurableProviders: Array<LyphType> = [];

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.MaterialType;
    this.materialProviders = obj.materialProviders;
    this.materials = obj.materials;
    this.measurableProviders = obj.measurableProviders;
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

  constructor(obj:any = {} ){
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

  constructor(obj:any = {} ){
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

export class ProcessType extends MeasurableLocation {
  public transportPhenomenon: Array<TransportPhenomenon>;
  public species: string;
  public materials: Array<MaterialType>;
  public source: NodeTemplate;
  public target: NodeTemplate;

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.ProcessType;
    this.transportPhenomenon = (obj.transportPhenomenon)? obj.transportPhenomenon:
      [TransportPhenomenon.advection, TransportPhenomenon.diffusion];
    this.species = obj.species;
    this.materials = obj.materials;
    this.source = obj.source;
    this.target = obj.target;
  }
}

export class MeasurableType extends Type {
  public quality: string;
  public materials: Array<MaterialType>;

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.MeasurableType;
    this.quality = obj.quality;
    this.materials = obj.materials;
  }
}

export class CausalityType extends Type {
  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.CausalityType;
  }
}

export class NodeType extends MeasurableLocation {
  public channels: Array<NodeTemplate>;

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.NodeType;
    this.channels = obj.channels;
  }
}

export class BorderType extends MeasurableLocation {
  public position: Template;
  _form: Array<FormType> = [FormType.open, FormType.closed];

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.BorderType;
    this.position = obj.position;
    this.form = obj.form;
  }

  public set form (item: any) {
    this._form = item;
  }

  public get form () {
    return this._form;
  }

}

export class GroupType extends Type {
  public elements: Array<Template>;

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.GroupType;
    this.elements = obj.elements;
  }
}

export class OmegaTreeType extends GroupType {
  public parts: Array<Template>;

  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.OmegaTreeType;
    this.parts = obj.parts;

    if (!obj.elements){
      //If elements are not assigned, this is not a copy constructor, elements have to be generated from parts
      this.elements = [];
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
  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.Publication;
  }
}

export class ClinicalIndex extends Resource {
  constructor(obj:any = {} ){
    super(obj);
    this.class = ResourceName.ClinicalIndex;
  }
}

export class Correlation extends Resource {
  public publication: Publication;
  public measurables: Array<MeasurableTemplate>;
  public clinicalIndices: Array<ClinicalIndex>;

  constructor(obj:any = {} ){
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

  constructor(obj:any = {} ) {
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

  constructor(obj:any = {} ){
    super(obj);
    this.class = TemplateName.Template;
    this.type = obj.type;
    this.cardinalityBase = (obj.cardinalityBase)? obj.cardinalityBase: 1;
  }
}

export class MeasurableTemplate extends Template {
  public type: MeasurableType;
  public location: MeasurableLocation;

  constructor(obj:any = {} ){
    super(obj);
    this.class = TemplateName.MeasurableTemplate;
    this.location = obj.location;
  }
}

export class ProcessTemplate extends Template {
  public type:ProcessType;
  public transportPhenomenon: TransportPhenomenon;
  public conveyingLyph: LyphType;

  constructor(obj:any = {} ){
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

  constructor(obj:any = {} ){
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

  constructor(obj:any = {} ){
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

  constructor(obj:any = {} ){
    super(obj);
    this.class = TemplateName.BorderTemplate;
    this.form = (obj.form)? obj.form: FormType.open;
    this.nodes = obj.nodes;
  }
}

export class GroupTemplate extends Template {
  public type:GroupType;

  constructor(obj:any = {} ){
    super(obj);
    this.class = TemplateName.GroupTemplate;
  }
}

export class OmegaTreeTemplate extends GroupTemplate {
  public type:OmegaTreeType;

  constructor(obj:any = {} ){
    super(obj);
    this.class = TemplateName.OmegaTreeTemplate;
  }
}

export class LyphTemplate extends Template {
  public length: number | ValueDistribution = 0;
  public width: number | ValueDistribution = 0;
  public type:  LyphType;
  public coalescences: Array<Coalescence>;
  public innerBorder: BorderTemplate = null;
  public outerBorder: BorderTemplate = null;

  constructor(obj:any = {} ){
    super(obj);
    this.class = TemplateName.LyphTemplate;
    this.length = obj.length;
    this.width = obj.width;
    this.coalescences = obj.coalescences;
    this.innerBorder = obj.innerBorder;
    this.outerBorder = obj.outerBorder;
  }
}

export class CylindricalLyphTemplate extends LyphTemplate {
  public type:  CylindricalLyphType;
  public minusBorder: BorderTemplate = null;
  public plusBorder: BorderTemplate = null;

  constructor(obj:any = {} ){
    super(obj);
    this.class = TemplateName.CylindricalLyphTemplate;
    this.minusBorder = obj.minusBorder;
    this.plusBorder = obj.plusBorder;
  }
}

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

// Cylindrical lyph types
// Omega tree types





