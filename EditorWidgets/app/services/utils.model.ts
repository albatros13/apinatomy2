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

export enum FormType {
  open       = <any>"open",
  closed     = <any>"closed"
}

export function getLabel(field: string): string{
  //let index = field.indexOf("Provider");
  //if (index > -1) return "Inherits " + field.substring(0, index) + " from";
  if (field == "externals") return "Annotations";
  if (field == "locals") return "Local resources";
  if (field == "id") return "ID";
  return field[0].toUpperCase() + field.substring(1);
}

export function getIcon(Class: any): string{
  switch (Class){
    case ResourceName.ExternalResource : return "images/external.png";
    case ResourceName.MaterialType  : return "images/materialType.png";
    case ResourceName.LyphType      : return "images/lyphType.png";
    case ResourceName.CylindricalLyphType: return "images/cylindricalLyphType.png";

    case ResourceName.ProcessType   : return "images/processType.png";
    case ResourceName.MeasurableType: return "images/measurableType.png";
    case ResourceName.CausalityType : return "images/causalityType.png";
    case ResourceName.NodeType      : return "images/nodeType.png";
    case ResourceName.BorderType    : return "images/borderType.png";
    case ResourceName.Coalescence   : return "images/coalescence.png";

    case ResourceName.GroupType     : return "images/groupType.png";
    case ResourceName.OmegaTreeType : return "images/omegaTreeType.png";

    case ResourceName.Publication   : return "images/publication.png";
    case ResourceName.Correlation   : return "images/correlation.png";
    case ResourceName.ClinicalIndex : return "images/clinicalIndex.png";

    case TemplateName.LyphTemplate      : return "images/lyphType.png";
    case TemplateName.CylindricalLyphTemplate: return "images/cylindricalLyphType.png";

    case TemplateName.ProcessTemplate   : return "images/processType.png";
    case TemplateName.MeasurableTemplate: return "images/measurableType.png";
    case TemplateName.CausalityTemplate : return "images/causalityType.png";
    case TemplateName.NodeTemplate      : return "images/nodeType.png";
    case TemplateName.BorderTemplate    : return "images/borderType.png";
    case TemplateName.CausalityTemplate : return "images/causality.png";

    case TemplateName.GroupTemplate     : return "images/groupType.png";
    case TemplateName.OmegaTreeTemplate : return "images/omegaTreeType.png";

  }
  return "images/resource.png";
}

declare var d3:any;
export const getColor = d3.scale.category20();

