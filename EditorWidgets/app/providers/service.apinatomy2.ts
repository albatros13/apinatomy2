/**
 * Created by Natallia on 6/8/2016.
 */
import {Injectable} from '@angular/core';

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
  name: string;
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
  materials?: Array<IMaterialType>;
}

export interface INodeType extends IType{}

export interface IBorderType extends IType{
  position: any;
  nodes?: Array<INodeType>;
}

export interface IGroupType extends IType{
  elements: Array<ITemplate>;
}

export interface IOmegaTreeType extends IGroupType{
  root: Array<IBorderTemplate>;
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

export interface ILyphType extends IMaterialType{
  inheritsLayers?: Array<ILyphType>;
  inheritsPatches?: Array<ILyphType>;
  inheritsParts?: Array<ILyphType>;
  inheritsMeasurables?: Array<ILyphType>;

  layers?: Array<ILyphTemplate>;
  patches?: Array<ILyphTemplate>;
  parts?: Array<ILyphTemplate>;

  measurables?: Array<IMeasurableTemplate>;
  processes?: Array<IProcessTemplate>;
  nodes?: Array<INodeTemplate>;
  innerBorder?: IBorderTemplate;
  outerBorder?: IBorderTemplate;
}

export interface ICylindricalLyphType extends ILyphType{
  inheritsSegments?: Array<ICylindricalLyphType>;
  segments?: Array<ICylindricalLyphTemplate>;
  minusBorder?: IBorderTemplate;
  plusBorder?: IBorderTemplate;
}

///////////////////////////////////////////////////////

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
  length: number|IValueDistribution;
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
  public equivalence: Array<IExternalResource>;
  public weakEquivalence: Array<IExternalResource>;

  public status: Status;

  constructor(obj: IResource = {id: 0, name: "New resource"}){
    this.id = obj.id;
    this.name = obj.name;
    this.equivalence = obj.equivalence;
    this.weakEquivalence = obj.weakEquivalence;
    this.status = Status.New;
  }
}

export class LyphTemplate extends Resource implements ILyphTemplate{
  public length: number | IValueDistribution = 0;
  public type: IType;

  constructor(obj: ILyphTemplate = {id: 0, name: "New template", type: null, length: 0}){
    super(obj);
    this.type = obj.type;
    this.length = obj.length;
  }
}

export class Type extends Resource implements IType{
  public supertypes: Array<IResource> = [];

  constructor(obj: IType = {id: 0, name: "New type", supertypes: []}){
    super(obj);
    this.supertypes = obj.supertypes;
  }
}

export class MaterialType extends Type implements IMaterialType{
  public materials: Array<IMaterialType> = [];

  constructor(obj: IMaterialType = {id: 0, name: "New material", materials: []}){
    super(obj);
    this.materials = obj.materials;
  }
}

export class MeasurableType extends Type implements IMeasurableType{
  public quality: IQuality;
  public references: Array<IMaterialType>;

  constructor(obj: IMeasurableType = {id: 0, name: "New measurement", quality: ""}){
    super(obj);
    this.quality = obj.quality;
  }
}

export class LyphType extends MaterialType implements ILyphType{
  public inheritsLayers: Array<ILyphType> = [];
  public inheritsPatches: Array<ILyphType> = [];
  public inheritsParts: Array<ILyphType> = [];
  public inheritsMeasurables: Array<ILyphType> = [];

  public layers: Array<ILyphTemplate> = [];
  public patches: Array<ILyphTemplate> = [];
  public parts: Array<ILyphTemplate> = [];

  public measurables: Array<IMeasurableTemplate> = [];
  public processes: Array<IProcessTemplate> = [];
  public nodes: Array<INodeTemplate> = [];
  public innerBorder: IBorderTemplate = null;
  public outerBorder: IBorderTemplate = null;

  constructor(obj: ILyphType = {id: 0, name: "New lyph type"}){
    super(obj);
    this.inheritsLayers = obj.inheritsLayers;
    this.inheritsPatches = obj.inheritsPatches;
    this.inheritsParts = obj.inheritsParts;
    this.inheritsMeasurables = obj.inheritsMeasurables;

    this.layers = obj.layers;
    this.patches = obj.patches;
    this.parts = obj.parts;

    this.measurables = obj.measurables;
    this.processes = obj.processes;
    this.nodes = obj.nodes;
    this.innerBorder = obj.innerBorder;
    this.outerBorder = obj.outerBorder;
  }
}

export class CylindricalLyphType extends LyphType implements ICylindricalLyphType{
  public inheritsSegments: Array<ICylindricalLyphType> = [];
  public segments: Array<ICylindricalLyphTemplate> = [];
  public minusBorder: IBorderTemplate = null;
  public plusBorder: IBorderTemplate = null;

  constructor(obj: ICylindricalLyphType = {id: 0, name: "New cylindrical lyph type"}){
    super(obj);
    this.inheritsSegments = obj.inheritsSegments;
    this.segments = obj.segments;
    this.minusBorder = obj.minusBorder;
    this.plusBorder = obj.plusBorder;
  }
}

///////////////////////////////////////////////////////

//TODO: Replace data for testing with user story

@Injectable()
export class LyphTypeProvider {
  private head = new LyphType({id: 1, name: "Head", equivalence: [{id: "cocomac1"}, {id: "cocomac2"}]});
  private testLayer: ILyphTemplate =
    new LyphTemplate({id: 10, name: "Head", type: this.head, length: 5});

  public items: Array<ILyphType> = [this.head,
    {id: 2, name: "Heart", supertypes: [{id: 1, name: "Head"}], layers: [this.testLayer]},
    {id: 3, name: "Arm"}];

  constructor(){}
}

@Injectable()
export class MaterialTypeProvider {
  public items: Array<IType> = new LyphTypeProvider().items;
  private glucose = new MaterialType({id: 4, name: "Glucose"});

  constructor(){
    this.items.push(this.glucose);
  }
}

@Injectable()
export class TypeProvider {
  public items: Array<IType> = new MaterialTypeProvider().items;

  constructor(){}
}


@Injectable()
export class PublicationProvider {
  public items: Array<IPublication> = [
    {id: 1, name: "Paper 1"},
    {id: 2, name: "Paper 2"},
    {id: 3, name: "Paper 3"}];

  constructor(){}
}

