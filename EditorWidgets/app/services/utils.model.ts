declare var d3:any;
export const getColor = d3.scale.category20();

export enum ResourceName {
  Resource            = <any>"Resource",
  ExternalResource    = <any>"ExternalResource",
  Type                = <any>"Type",

  //OmegaTreePartType   = <any>"OmegaTreePartType",
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

  OmegaTreePartTemplate   = <any>"OmegaTreePartTemplate",

  CylindricalLyphTemplate = <any>"CylindricalLyphTemplate",

  ProcessTemplate         = <any>"ProcessTemplate",
  MeasurableTemplate      = <any>"MeasurableTemplate",
  CausalityTemplate       = <any>"CausalityTemplate",
  NodeTemplate            = <any>"NodeTemplate",
  BorderTemplate          = <any>"BorderTemplate",

  GroupTemplate           = <any>"GroupTemplate",
  OmegaTreeTemplate       = <any>"OmegaTreeTemplate"
}

export function getPropertyLabel(option: string): string{
  let label = option;
  label = label.replace(/([a-z])([A-Z])/g, '$1 $2');
  label = label[0].toUpperCase() + label.substring(1).toLowerCase();
  return label;
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

export function getTreeData(item: any, relations: Set<string>, depth: number) {//Format: {id: 1, name: "Parent", children: [{id: 2, name: "Child"},...]};
  let data:any = {};
  if (!item) return data;
  data = {id: item.id, name: item.name, resource: item, children: []};
  if (!depth) depth = -1;
  let i = 0;
  traverse(item, 0, data);
  return data;

  function traverse(root:any, level:number, data:any) {
    if (!root) return;
    for (let fieldName of Array.from(relations)){
      if (!root[fieldName]) continue;
      if ((depth - level) == 0) return;
      if (!data.children) data.children = [];

      for (let obj of Array.from(root[fieldName])) {
        var child = {id: "#" + ++i, name: obj.name, resource: obj, depth: level, relation: fieldName};
        data.children.push(child);
        traverse(obj, level + 1, child);
      }
    }
  }
}

export function getGraphData(item: any, relations: Set<string>, depth: number) {
  let data:any = {nodes: [], links  : []};
  if (!item) return data;
  data.nodes.push(item);
  if (!depth) depth = -1;
  traverse(item, depth, data);
  return data;

  function traverse(root: any, depth: number, data: any) {
    if (!root) return;
    if (depth == 0) return;
    for (let fieldName of Array.from(relations)) {
      if (!root[fieldName]) continue;
      let children = Array.from(root[fieldName]);

      for (let child of children) {
        data.links.push({source: root, target: child, relation: fieldName});
        if (data.nodes.indexOf(child) == -1) {
          data.nodes.push(child);
          traverse(child, depth - 1, data);
        }
      }
    }
  }
}

export function setsEqual(S, T){
  for (let x of S) if (!T.has(x)) return false;
  for (let x of T) if (!T.has(x)) return false;
  return true;
}

export function compareLinkedElements(a, b){
  let res = 0;
  if (!a.cardinalityMultipliers) {
    if (!b.cardinalityMultipliers) res = 0;
    else res = -1;
  }
  if (!b.cardinalityMultipliers) res = 1;
  if (b.cardinalityMultipliers && b.cardinalityMultipliers.has(a)) res = -1;
  if (a.cardinalityMultipliers && a.cardinalityMultipliers.has(b)) res = 1;
  //let s = (res == -1)? " < ": ((res == 1)? " > ": " == ");
  //console.log(a.name + s + b.name);
  return res;
}
