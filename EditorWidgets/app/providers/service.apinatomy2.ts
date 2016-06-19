/**
 * Created by Natallia on 6/8/2016.
 */
import {Injectable} from '@angular/core';

export interface IUniformDistribution{
  min: number;
  max: number;
}

export interface IBoundedNormalDistribution{
  mean: number;
  std: number;
  min: number;
  max: number;
}

export interface IValueDistribution{
  quality: IQuality;
  type?: IUniformDistribution | IBoundedNormalDistribution;
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

export interface ITemplate<T> extends IResource{
  valueDistribution: IValueDistribution;
  cardinalityBase: number;
  type: T;
}

export interface IPublication extends IResource{
}

export interface ICorrelation extends IResource{
  publication: IPublication;
  locatedMeasurables?: Array<ITemplate<IMeasurableType>>;
  clinicalIndices?: Array<IClinicalIndex>;
}

export interface IClinicalIndex extends IResource{}

export interface IMaterialType extends IType{
  materials?: Array<IMaterialType>;
}

export interface INodeType extends IType{}

export interface IBorderType extends IType{
  position: any;
  nodes?: Array<INodeType>;
}

export interface IGroupType extends IType{
  elements: Array<ITemplate<IType>>;
}

export interface IOmegaTreeType extends IGroupType{
  root: Array<ITemplate<IBorderType>>;
}

export interface IProcessType extends IType{
  transportPhenomenon: TransportPhenomenon;
  materials?: Array<IMaterialType>;
  measurables?: Array<ITemplate<IMeasurableType>>;
  source: ITemplate<INodeType>;
  target: ITemplate<INodeType>;
}

export interface IMeasurableType extends IType{
  quality: IQuality;
  references?: Array<IMaterialType>;
}

export interface ICausalityType extends IType{
  cause: ITemplate<IMeasurableType>;
  effect: ITemplate<IMeasurableType>;
}

export interface ILyphType extends IMaterialType{
  inheritsLayers?: Array<ILyphType>;
  inheritsPatches?: Array<ILyphType>;
  inheritsParts?: Array<ILyphType>;
  inheritsMeasurables?: Array<ILyphType>;

  layers?: Array<ITemplate<ILyphType>>;
  patches?: Array<ITemplate<ILyphType>>;
  parts?: Array<ITemplate<ILyphType>>;

  measurables?: Array<ITemplate<IMeasurableType>>;
  processes?: Array<ITemplate<IProcessType>>;
  nodes?: Array<ITemplate<INodeType>>;
  innerBorder?: ITemplate<IBorderType>;
  outerBorder?: ITemplate<IBorderType>;
}

export interface ICylindricalLyphType extends ILyphType{
  inheritsSegments?: Array<ICylindricalLyphType>;
  segments?: Array<ITemplate<ICylindricalLyphType>>;
  minusBorder?: ITemplate<IBorderType>;
  plusBorder?: ITemplate<IBorderType>;
}

///////////////////////////////////////////////////////

enum Status{
  New, Updated, Deleted, Valid
}

enum TransportPhenomenon{
  diffusion, advection
}

///////////////////////////////////////////////////////

export class UniformDistribution implements IUniformDistribution{
  public min: number;
  public max: number;

  constructor(obj: IUniformDistribution = {min:0, max: 0}){
    this.min = obj.min;
    this.max = obj.max;
  }
}

export class BoundedNormalDistribution implements IBoundedNormalDistribution{
  public mean: number = 0;
  public std: number = 0;
  public min: number = 0;
  public max: number = 0;

  constructor(obj: IBoundedNormalDistribution = {mean: 0, std: 0, min:0, max: 0}){
    this.min = obj.min;
    this.max = obj.max;
    this.std = obj.std;
    this.mean = obj.mean;
  }
}

export class ValueDistribution implements IValueDistribution{
  public quality: IQuality;
  public type: UniformDistribution | BoundedNormalDistribution;

  constructor(obj: IValueDistribution = {quality: ""}){
    this.quality = obj.quality;
    this.type = obj.type;
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

export class Template<T> extends Resource implements ITemplate<T>{
  public valueDistribution: IValueDistribution;
  public cardinalityBase: any;
  public type: T;

  constructor(
    obj: ITemplate<T> = {id: 0, name: "New template", valueDistribution: {quality: ""},
      cardinalityBase: 1, type: null}){
    super(obj);
    this.valueDistribution = obj.valueDistribution;
    this.cardinalityBase = obj.cardinalityBase;
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

  public layers: Array<ITemplate<ILyphType>> = [];
  public patches: Array<ITemplate<ILyphType>> = [];
  public parts: Array<ITemplate<ILyphType>> = [];

  public measurables: Array<ITemplate<IMeasurableType>> = [];
  public processes: Array<ITemplate<IProcessType>> = [];
  public nodes: Array<ITemplate<INodeType>> = [];
  public innerBorder: ITemplate<IBorderType> = null;
  public outerBorder: ITemplate<IBorderType> = null;

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
  public segments: Array<ITemplate<ICylindricalLyphType>> = [];
  public minusBorder: ITemplate<IBorderType> = null;
  public plusBorder: ITemplate<IBorderType> = null;

  constructor(obj: ICylindricalLyphType = {id: 0, name: "New cylindrical lyph type"}){
    super(obj);
    this.inheritsSegments = obj.inheritsSegments;
    this.segments = obj.segments;
    this.minusBorder = obj.minusBorder;
    this.plusBorder = obj.plusBorder;
  }
}

///////////////////////////////////////////////////////

@Injectable()
export class LyphTypeProvider {
  public items: Array<ILyphType> = [
    {id: 1, name: "Head", equivalence: [{id: "cocomac1"}, {id: "cocomac2"}]},
    {id: 2, name: "Heart", supertypes: [{id: 1, name: "Head"}]},
    {id: 3, name: "Arm"}];

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
