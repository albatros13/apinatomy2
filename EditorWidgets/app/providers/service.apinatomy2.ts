/**
 * Created by Natallia on 6/8/2016.
 */
import {Injectable, Inject} from '@angular/core';

/*INTERFACES*/

//Components

interface IDistribution{}

interface IUniformDistribution extends IDistribution{
  min: number;
  max: number;
}

interface IBoundedNormalDistribution extends IUniformDistribution{
  mean: number;
  std: number;
}

interface IValueDistribution{
  quality?: IQuality;
  type?: DistributionType;
  distribution?: IDistribution;
}

interface IQuality{}

//Entities

interface IResource{
  id?: number;
  name?: string;
  href?: string;
  class?: ResourceName | TemplateName;
  externals?: Array<IExternalResource>;
}

interface IExternalResource extends IResource{
  uri?: string;
  type?: string;
}

interface IType extends IResource{
  supertypes?: Array<IType>;
  subtypes?: Array<IType>;
}

interface IPublication extends IResource{}

interface IClinicalIndex extends IResource{}

interface ICorrelation extends IResource{
  publication?: IPublication;
  measurables?: Array<IMeasurableTemplate>;
  clinicalIndices?: Array<IClinicalIndex>;
}

interface IMaterialType extends IType{
  materialProviders?: Array<IMaterialType>;
  materials?: Array<IMaterialType>;
  measurableProviders?: Array<IMaterialType>;
  measurables?: Array<IMeasurableTemplate>;
}

interface ILyphType extends IMaterialType{
  species?: string;
  layerProviders?: Array<ILyphType>;
  patchProviders?: Array<ILyphType>;
  partProviders?: Array<ILyphType>;

  layers?: Array<ILyphTemplate>;
  patches?: Array<ILyphTemplate>;
  parts?: Array<ILyphTemplate>;

  processes?: Array<IProcessTemplate>;
  nodes?: Array<INodeTemplate>;
  innerBorder?: IBorderTemplate;
  outerBorder?: IBorderTemplate;
}

interface ICylindricalLyphType extends ILyphType{
  plusSide?: Array<SideType>;
  minusSide?: Array<SideType>;

  segmentProviders?: Array<ICylindricalLyphType>;
  segments?: Array<ICylindricalLyphTemplate>;
  minusBorder?: IBorderTemplate;
  plusBorder?: IBorderTemplate;
}

interface INodeType extends IType{}

interface IBorderType extends IType{
  position?: any;
  nodes?: Array<INodeTemplate>;
}

interface IProcessType extends IType{
  transportPhenomenon?: TransportPhenomenon;
  species?: string;
  materials?: Array<IMaterialType>;
  measurables?: Array<IMeasurableTemplate>;
  source?: INodeTemplate;
  target?: INodeTemplate;
}

interface IMeasurableType extends IType{
  quality?: IQuality;
  materials?: Array<IMaterialType>;
}

interface ICausalityType extends IType{
  cause?: IMeasurableTemplate;
  effect?: IMeasurableTemplate;
}

interface IGroupType extends IType{
  elements?: Array<ITemplate>;
}

interface IOmegaTreeType extends IGroupType{
  root?: ITemplate;
}

//Templates

interface ITemplate extends IResource{
  type?: IType;
  cardinalityBase?: number|IValueDistribution;
  cardinalityMultipliers?: Array<ITemplate>;
}

interface ILyphTemplate extends ITemplate{
  type?: ILyphType;
  length?: number|IValueDistribution;
  width?: number|IValueDistribution;
}

interface ICylindricalLyphTemplate extends ILyphTemplate{
  type?: ICylindricalLyphType;
  plusSide?: SideType;
  minusSide?: SideType;
}

interface INodeTemplate extends ITemplate{
  type?: INodeType;
}

interface IBorderTemplate extends ITemplate{
  type?: IBorderType;
}

interface IProcessTemplate extends ITemplate{
  type?: IProcessType;
}

interface IMeasurableTemplate extends ITemplate{
  type?: IMeasurableType;
}

interface ICausalityTemplate extends ITemplate{
  type?: ICausalityType;
}

interface IGroupTemplate extends ITemplate{
  type?: IGroupType;
}

interface IOmegaTreeTemplate extends IGroupTemplate {
  type?: IOmegaTreeType;
}

/*ENUMERATIONS*/

export enum ResourceName {
  Resource            = <any>"Resource",
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
  ClinicalIndex       = <any>"ClinicalIndex"
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

export enum SideType {
  open       = <any>"open",
  closed     = <any>"closed"
}

/*CLASSES*/

//Components

export class Distribution{
  constructor(obj: IDistribution = {}){}
}

export class UniformDistribution extends Distribution implements IUniformDistribution{
  public min: number;
  public max: number;

  constructor(obj: IUniformDistribution = {min:0, max: 0}){
    super();
    this.min = obj.min;
    this.max = obj.max;
  }
}

export class BoundedNormalDistribution extends UniformDistribution implements IBoundedNormalDistribution{
  public mean: number = 0;
  public std: number = 0;

  constructor(obj: IBoundedNormalDistribution = {mean: 0, std: 0, min:0, max: 0}){
    super(obj);
    this.max = obj.max;
    this.std = obj.std;
  }
}

export class ValueDistribution implements IValueDistribution{
  public quality: IQuality;
  public type: DistributionType;
  public distribution: IDistribution;

  constructor(obj: IValueDistribution = {type: DistributionType.Uniform, distribution: new UniformDistribution()}){
    this.quality = obj.quality;
    this.type = obj.type;
    this.distribution = obj.distribution;
  }
}

//Entities

export class Resource implements IResource{
  public id: number = 0;
  public name: string = "";
  public href: string = "";
  public class: ResourceName | TemplateName = ResourceName.Resource;
  public externals: Array<IExternalResource>;

  constructor(obj: IResource = {}){
    this.id = (obj.id)? obj.id: 0;
    this.name = (obj.name)? obj.name: "New item";
    this.href = obj.href;
    this.externals = obj.externals;
    this.class = obj.class;
  }
}

export class ExternalResource extends Resource implements IExternalResource{
  public uri: string = "";
  public type: string = "";

  constructor(obj: IExternalResource = {}){
    super(obj);
    this.type = obj.type;
    this.uri = obj.uri;
  }
}

export class Type extends Resource implements IType{
  public supertypes: Array<IResource> = [];
  public subtypes: Array<IResource> = [];

  constructor(obj: IType){
    super(obj);
    this.class = ResourceName.Type;
    this.supertypes = obj.supertypes;
    this.subtypes = obj.subtypes;
  }
}

export class MaterialType extends Type implements IMaterialType{
  public materialProviders: Array<IMaterialType> = [];
  public materials: Array<IMaterialType> = [];
  public measurableProviders: Array<ILyphType> = [];
  public measurables: Array<IMeasurableTemplate> = [];

  constructor(obj: IMaterialType){
    super(obj);
    this.class = ResourceName.MaterialType;
    this.materialProviders = obj.materialProviders;
    this.materials = obj.materials;
    this.measurableProviders = obj.measurableProviders;
    this.measurables = obj.measurables;
  }
}

export class LyphType extends MaterialType implements ILyphType{
  public species: string;
  public layerProviders: Array<ILyphType> = [];
  public patchProviders: Array<ILyphType> = [];
  public partProviders: Array<ILyphType> = [];

  public layers: Array<ILyphTemplate> = [];
  public patches: Array<ILyphTemplate> = [];
  public parts: Array<ILyphTemplate> = [];

  public processes: Array<IProcessTemplate> = [];
  public nodes: Array<INodeTemplate> = [];
  public innerBorder: IBorderTemplate = null;
  public outerBorder: IBorderTemplate = null;

  constructor(obj: ILyphType){
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
  }
}

export class CylindricalLyphType extends LyphType implements ICylindricalLyphType{
  public plusSide: Array<SideType> = [SideType.closed];
  public minusSide: Array<SideType> = [SideType.closed];
  public segmentProviders: Array<ICylindricalLyphType> = [];
  public segments: Array<ICylindricalLyphTemplate> = [];
  public minusBorder: IBorderTemplate = null;
  public plusBorder: IBorderTemplate = null;

  constructor(obj: ICylindricalLyphType){
    super(obj);
    this.class = ResourceName.CylindricalLyphType;
    this.plusSide = (obj.plusSide)? obj.plusSide: [SideType.closed];
    this.minusSide = (obj.minusSide)? obj.minusSide: [SideType.closed];
    this.segmentProviders = obj.segmentProviders;
    this.segments = obj.segments;
    this.minusBorder = obj.minusBorder;
    this.plusBorder = obj.plusBorder;
  }
}

export class ProcessType extends Type implements IProcessType{
  public transportPhenomenon: TransportPhenomenon;
  public species: string;
  public materials: Array<IMaterialType>;
  public measurables: Array<IMeasurableTemplate>;
  public source: INodeTemplate;
  public target: INodeTemplate;

  constructor(obj: IProcessType){
    super(obj);
    this.class = ResourceName.ProcessType;
    this.transportPhenomenon = (obj.transportPhenomenon)? obj.transportPhenomenon: TransportPhenomenon.advection;
    this.species = obj.species;
    this.materials = obj.materials;
    this.measurables = obj.measurables;
    this.source = obj.source;
    this.target = obj.target;
  }
}

export class MeasurableType extends Type implements IMeasurableType{
  public quality: IQuality;
  public materials: Array<IMaterialType>;

  constructor(obj: IMeasurableType){
    super(obj);
    this.class = ResourceName.MeasurableType;
    this.quality = obj.quality;
    this.materials = obj.materials;
  }
}

export class CausalityType extends Type implements ICausalityType{
  public cause: IMeasurableTemplate;
  public effect: IMeasurableTemplate;

  constructor(obj: ICausalityType){
    super(obj);
    this.class = ResourceName.CausalityType;
    this.cause = obj.cause;
    this.effect = obj.effect;
  }
}

export class NodeType extends Type implements INodeType{
  constructor(obj: INodeType){
    super(obj);
    this.class = ResourceName.NodeType;
  }
}

export class BorderType extends Type implements IBorderType{
  public position: any;
  public nodes: Array<INodeTemplate>;

  constructor(obj: IBorderType){
    super(obj);
    this.class = ResourceName.BorderType;
    this.position = obj.position;
    this.nodes = obj.nodes;
  }
}

export class GroupType extends Type implements IGroupType{
  public elements: Array<ITemplate>;

  constructor(obj: IGroupType){
    super(obj);
    this.class = ResourceName.GroupType;
    this.elements = obj.elements;
  }
}

export class OmegaTreeType extends GroupType implements IOmegaTreeType{
  public root: ITemplate;

  constructor(obj: IOmegaTreeType){
    super(obj);
    this.class = ResourceName.OmegaTreeType;
    this.root = obj.root;
  }
}

export class Publication extends Resource implements IPublication{
  constructor(obj: IPublication){
    super(obj);
    this.class = ResourceName.Publication;
  }
}

export class ClinicalIndex extends Resource implements IClinicalIndex{
  constructor(obj: IClinicalIndex){
    super(obj);
    this.class = ResourceName.ClinicalIndex;
  }
}

export class Correlation extends Resource implements ICorrelation{
  public publication: IPublication;
  public measurables: Array<IMeasurableTemplate>;
  public clinicalIndices: Array<IClinicalIndex>;

  constructor(obj: ICorrelation){
    super(obj);
    this.class = ResourceName.Correlation;
    this.publication = obj.publication;
    this.measurables = obj.measurables;
    this.clinicalIndices = obj.clinicalIndices;

  }
}

//Templates

export class Template extends Resource implements ITemplate{
  public type: IType;
  public cardinalityBase: number|IValueDistribution;

  constructor(obj: ITemplate){
    super(obj);
    this.class = TemplateName.Template;
    this.type = obj.type;
    this.cardinalityBase = (obj.cardinalityBase)? obj.cardinalityBase: 1;
  }
}

export class MeasurableTemplate extends Template implements IMeasurableTemplate{
  public type: IMeasurableType;

  constructor(obj: IMeasurableTemplate){
    super(obj);
    this.class = TemplateName.MeasurableTemplate;
  }
}

export class ProcessTemplate extends Template implements IProcessTemplate{
  public type: IProcessType;

  constructor(obj: IProcessTemplate){
    super(obj);
    this.class = TemplateName.ProcessTemplate;
  }
}

export class CausalityTemplate extends Template implements ICausalityTemplate{
  public type: ICausalityType;

  constructor(obj: ICausalityTemplate){
    super(obj);
    this.class = TemplateName.CausalityTemplate;
  }
}

export class NodeTemplate extends Template implements INodeTemplate{
  public type: INodeType;

  constructor(obj: INodeTemplate){
    super(obj);
    this.class = TemplateName.NodeTemplate;
  }
}

export class BorderTemplate extends Template implements IBorderTemplate{
  public type: IBorderType;

  constructor(obj: IBorderTemplate){
    super(obj);
    this.class = TemplateName.BorderTemplate;
  }
}

export class GroupTemplate extends Template implements IGroupTemplate{
  public type: IGroupType;

  constructor(obj: IGroupTemplate){
    super(obj);
    this.class = TemplateName.GroupTemplate;
  }
}

export class OmegaTreeTemplate extends GroupTemplate implements IOmegaTreeTemplate{
  public type: IOmegaTreeType;

  constructor(obj: IOmegaTreeTemplate){
    super(obj);
    this.class = TemplateName.OmegaTreeTemplate;
  }
}

export class LyphTemplate extends Template implements ILyphTemplate{
  public length: number | IValueDistribution = 0;
  public width: number | IValueDistribution = 0;
  public type: ILyphType;

  constructor(obj: ILyphTemplate){
    super(obj);
    this.class = TemplateName.LyphTemplate;
    this.length = obj.length;
    this.width = obj.width;
  }
}

export class CylindricalLyphTemplate extends LyphTemplate implements ICylindricalLyphTemplate{
  public type: IProcessType;
  public plusSide: SideType = SideType.closed;
  public minusSide: SideType = SideType.closed;

  constructor(obj: ICylindricalLyphTemplate){
    super(obj);
    this.class = TemplateName.CylindricalLyphTemplate;
    this.plusSide = (obj.plusSide)? obj.plusSide: SideType.closed;
    this.minusSide = (obj.minusSide)? obj.minusSide: SideType.closed;
  }
}

/*TEST PROVIDERS*/

@Injectable()
export class ExternalResourceProvider {
  public items: Array<IExternalResource> = [];
  constructor(){}
}

@Injectable()
export class TypeProvider {
  public items: Array<IType> = [];
  constructor(){}
}

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

@Injectable()
export class MaterialTypeProvider {
  public items: Array<IMaterialType> = [];
  public templates: Array<IMeasurableTemplate> = [];

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
  public items: Array<ILyphType> = [];
  public templates: Array<ILyphTemplate> = [];

  constructor(mtp: MaterialTypeProvider){}
}

@Injectable()
export class CylindricalLyphTypeProvider {
  public items: Array<ICylindricalLyphType> = [];
  public templates: Array<ICylindricalLyphTemplate> = [];

  constructor(mtp: MaterialTypeProvider){
    let ifl = mtp.items.find(x => x.name=="Intracellular fluid");

    //let border = new BorderType();
    let cytosol =  new CylindricalLyphType({id: 1000, name: "Cytosol", materials: [ifl], plusSide: [SideType.closed], minusSide: [SideType.closed]});
    let pm =  new CylindricalLyphType({id: 1001, name: "Plasma membrain", plusSide: [SideType.closed], minusSide: [SideType.closed]});

    this.items = [cytosol, pm];

    this.items.forEach(x =>
      this.templates.push(new CylindricalLyphTemplate({id: x.id + 100, name: "T: " + x.name, type: x}))
    )
  }
}

@Injectable()
export class MeasurableTypeProvider {
  public items: Array<IMeasurableType> = [];
  constructor(){
    this.items = basicMeasurables;
  }
}
