/**
 * Created by Natallia on 6/8/2016.
 */
import {Injectable, Inject} from '@angular/core';

export interface IDistribution{}

export interface IUniformDistribution extends IDistribution{
  min: number;
  max: number;
}

export interface IBoundedNormalDistribution extends IUniformDistribution{
  mean: number;
  std: number;
}

export interface IValueDistribution{
  quality?: IQuality;
  type?: DistributionType;
  distribution?: IDistribution;
}

export interface IExternalResource{
  id: string;
  name?: string;
}

export interface IQuality{}

export interface IResource{
  id: number;
  name?: string;
  class?: ResourceName | TemplateName;
  equivalence?: Array<IExternalResource>;
  weakEquivalence?: Array<IExternalResource>;
}

export interface IType extends IResource{
  supertypes?: Array<IResource>;
}

export interface IPublication extends IResource{}
export interface IClinicalIndex extends IResource{}

export interface ICorrelation extends IResource{
  publication: IPublication;
  locatedMeasurables?: Array<IMeasurableTemplate>;
  clinicalIndices?: Array<IClinicalIndex>;
}

export interface IMaterialType extends IType{
  inheritsMaterials?: Array<IMaterialType>;
  materials?: Array<IMaterialType>;
  inheritsMeasurables?: Array<IMaterialType>;
  measurables?: Array<IMeasurableTemplate>;
}

export interface ILyphType extends IMaterialType{
  inheritsLayers?: Array<ILyphType>;
  inheritsPatches?: Array<ILyphType>;
  inheritsParts?: Array<ILyphType>;

  layers?: Array<ILyphTemplate>;
  patches?: Array<ILyphTemplate>;
  parts?: Array<ILyphTemplate>;

  processes?: Array<IProcessTemplate>;
  nodes?: Array<INodeTemplate>;
  innerBorder?: IBorderTemplate;
  outerBorder?: IBorderTemplate;
}

export interface ICylindricalLyphType extends ILyphType{
  plusSide: SideType;
  minusSide: SideType;

  inheritsSegments?: Array<ICylindricalLyphType>;
  segments?: Array<ICylindricalLyphTemplate>;
  minusBorder?: IBorderTemplate;
  plusBorder?: IBorderTemplate;
}

//--

export interface IGroupType extends IType{
  elements: Array<ITemplate>;
}

export interface IOmegaTreeType extends IGroupType{
  root: Array<IBorderTemplate>;
}

//---

export interface INodeType extends IType{}

export interface IBorderType extends IType{
  position: any;
  nodes?: Array<INodeType>;
}

export interface IProcessType extends IType{
  transportPhenomenon: TransportPhenomenon;
  materials?: Array<IMaterialType>;
  measurables?: Array<IMeasurableTemplate>;
  source: INodeTemplate;
  target: INodeTemplate;
}

export interface IMeasurableType extends IType{
  quality: IQuality;
  references?: Array<IMaterialType>;
}

export interface ICausalityType extends IType{
  cause: IMeasurableTemplate;
  effect: IMeasurableTemplate;
}

///////////////////////////////////////////////////////
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

export enum Status {
  New     = <any>"New",
  Updated = <any>"Updated",
  Deleted = <any>"Deleted",
  Valid   = <any>"Valid"
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

///////////////////////////////////////////////////////

export interface ITemplate extends IResource{
  type: IType;
}

export interface INodeTemplate extends ITemplate{
  type: INodeType;
}

export interface IBorderTemplate extends ITemplate{
  type: IBorderType;
}

export interface IGroupTemplate extends ITemplate{
  type: IGroupType;
}

export interface IOmegaTreeType extends IGroupType {
  type: IOmegaTreeType;
}

export interface IProcessTemplate extends ITemplate{
  type: IProcessType;
}

export interface IMeasurableTemplate extends ITemplate{
  type: IMeasurableType;
}

export interface ICausalityType extends ITemplate{
  type: ICausalityType;
}

export interface ILyphTemplate extends ITemplate{
  type: ILyphType;
  length?: number|IValueDistribution;
  width?: number|IValueDistribution;
}

export interface ICylindricalLyphTemplate extends ILyphTemplate{
  type: ICylindricalLyphType;
}

///////////////////////////////////////////////////////

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

export class Resource implements IResource{
  public id: number = 0;
  public name: string = "";
  public class: ResourceName | TemplateName = ResourceName.Resource;
  public equivalence: Array<IExternalResource>;
  public weakEquivalence: Array<IExternalResource>;

  public status: Status;

  constructor(obj: IResource){
    this.id = (obj.id)? obj.id: 0;
    this.name = (obj.name)? obj.name: "New item";
    this.equivalence = obj.equivalence;
    this.weakEquivalence = obj.weakEquivalence;
    this.class = obj.class;
    this.status = Status.New;
  }
}

export class Type extends Resource implements IType{
  public supertypes: Array<IResource> = [];

  constructor(obj: IType){
    super(obj);
    this.class = ResourceName.Type;
    this.supertypes = obj.supertypes;
  }
}

export class MaterialType extends Type implements IMaterialType{
  public inheritsMaterials: Array<IMaterialType> = [];
  public materials: Array<IMaterialType> = [];
  public inheritsMeasurables: Array<ILyphType> = [];
  public measurables: Array<IMeasurableTemplate> = [];

  constructor(obj: IMaterialType){
    super(obj);
    this.class = ResourceName.MaterialType;
    this.inheritsMaterials = obj.inheritsMaterials;
    this.materials = obj.materials;
    this.inheritsMeasurables = obj.inheritsMeasurables;
    this.measurables = obj.measurables;
  }
}

export class LyphType extends MaterialType implements ILyphType{
  public inheritsLayers: Array<ILyphType> = [];
  public inheritsPatches: Array<ILyphType> = [];
  public inheritsParts: Array<ILyphType> = [];

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
    this.inheritsLayers = obj.inheritsLayers;
    this.inheritsPatches = obj.inheritsPatches;
    this.inheritsParts = obj.inheritsParts;

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
  public plusSide: SideType = SideType.open;
  public minusSide: SideType = SideType.open;
  public inheritsSegments: Array<ICylindricalLyphType> = [];
  public segments: Array<ICylindricalLyphTemplate> = [];
  public minusBorder: IBorderTemplate = null;
  public plusBorder: IBorderTemplate = null;

  constructor(obj: ICylindricalLyphType){
    super(obj);
    this.class = ResourceName.CylindricalLyphType;
    this.plusSide = obj.plusSide;
    this.minusSide = obj.minusSide;
    this.inheritsSegments = obj.inheritsSegments;
    this.segments = obj.segments;
    this.minusBorder = obj.minusBorder;
    this.plusBorder = obj.plusBorder;
  }
}

export class MeasurableType extends Type implements IMeasurableType{
  public quality: IQuality;
  public references: Array<IMaterialType>;

  constructor(obj: IMeasurableType){
    super(obj);
    this.class = ResourceName.MeasurableType;
    this.quality = obj.quality;
    this.references = obj.references;
  }
}
///////////////////////////////////////////////////////
export class LyphTemplate extends Resource implements ILyphTemplate{
  public length: number | IValueDistribution = 0;
  public width: number | IValueDistribution = 0;
  public type: IType;

  constructor(obj: ILyphTemplate){
    super(obj);
    this.class = TemplateName.LyphTemplate;
    this.type = obj.type;
    this.length = obj.length;
    this.width = obj.width;

  }
}

export class MeasurableTemplate extends Resource implements IMeasurableTemplate{
  public type: IMeasurableType;

  constructor(obj: IMeasurableTemplate){
    super(obj);
    this.class = TemplateName.MeasurableTemplate;
    this.type = obj.type;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class PublicationProvider {
  public items: Array<IPublication> = [];
  constructor(){}
}

////

@Injectable()
export class MeasurableTypeProvider {
  public items: Array<IMeasurableType> = [];
  constructor(){
    this.items.push(new MeasurableType({id: 100, name: "Concentration", quality: "concentration", references: []}));
  }
}

////

@Injectable()
export class TypeProvider {
  public items: Array<IType> = [];
  constructor(){}
}

@Injectable()
export class MaterialTypeProvider {
  public items: Array<IMaterialType> = [];
  public templates: Array<IMeasurableTemplate> = [];

  constructor(){
    let mtp = new MeasurableTypeProvider();

    this.items = [
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

    let blMaterials = this.items.slice(0,9);

    var concentration = mtp.items.find(x => x.name == "concentration");
    if (concentration) concentration.references = blMaterials;

    for (let i = 0; i < this.items.length; i++) {
      let material = this.items[i];
      this.templates.push(new MeasurableTemplate({id: material.id + 100, name: material.name, type: concentration}));
    }

    let blMeasurables = this.templates.slice(0,9);

    let ef = new MaterialType({id: 20, name: "Extracellular fluid"});
    let bl = new MaterialType({id: 21, name: "Biological liquid", materials: blMaterials, measurables: blMeasurables});
    this.items.push(ef);
    this.items.push(bl);

    let el = new MaterialType({id: 22, name: "Extracellular liquid", supertypes: [ef, bl], inheritsMaterials: [ef, bl], inheritsMeasurables: [ef, bl]});
    this.items.push(el);

    let ifl = new MaterialType({id: 23, name: "Intracellular fluid", supertypes: [el], inheritsMaterials: [el], inheritsMeasurables: [el]});
    this.items.push(ifl);

    let plasma = new MaterialType({id: 24, name: "Plasma", supertypes: [ifl], inheritsMaterials: [ifl], inheritsMeasurables: [ifl]});
    this.items.push(plasma);
    let urine = new MaterialType({id: 25, name: "Urine", supertypes: [ifl], inheritsMaterials: [ifl], inheritsMeasurables: [ifl]});
    this.items.push(urine);
    let tfl = new MaterialType({id: 26, name: "Tissue fluid", supertypes: [ifl], inheritsMaterials: [ifl], inheritsMeasurables: [ifl]});
    this.items.push(tfl);

    let cLyphs = new CylindricalLyphTypeProvider(this);
    cLyphs.items.forEach(x => this.items.push(x));
 }
}

@Injectable()
export class LyphTypeProvider {
  public items: Array<ILyphType> = [];
  constructor(){}
}

@Injectable()
export class CylindricalLyphTypeProvider {
  public items: Array<ILyphType> = [];

  constructor(mtp: MaterialTypeProvider){
    let ifl = mtp.items.find(x => x.name=="Intracellular fluid");

    this.items = [
      new CylindricalLyphType({id: 1000,  name: "Cytosol", materials: [ifl],
        plusSide: SideType.closed, minusSide: SideType.closed})
    ];
  }
}
