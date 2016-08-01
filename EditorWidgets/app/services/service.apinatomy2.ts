/*ENUMERATIONS*/
export enum ResourceName {
  Resource            = <any>"Resource",
  ExternalResource    = <any>"ExternalResource",
  Type                = <any>"Type",
  MeasurableLocationType  = <any>"MeasurableLocationType",
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

// @Injectable()
// export class ExternalResourceProvider {
//   public items: Array<ExternalResource> = [
//     new ExternalResource({id: 3000, name: "FMA_44539: Third plantar metatarsal vein", type:  "fma"}),
//     new ExternalResource({id: 4000, name: "cocomac:98: Accessor basal nucleus (amygdala), ventromedial division", type:  "cocomac"})
//   ];
// }






