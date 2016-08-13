"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Natallia on 6/17/2016.
 */
var core_1 = require('@angular/core');
var panel_material_1 = require("./panel.material");
var component_select_1 = require('../components/component.select');
var repo_nested_1 = require('../repos/repo.nested');
var pipe_general_1 = require("../transformations/pipe.general");
var panel_border_1 = require("./panel.border");
var component_templateValue_1 = require('../components/component.templateValue');
var LyphPanel = (function (_super) {
    __extends(LyphPanel, _super);
    function LyphPanel() {
        _super.apply(this, arguments);
        this.borderPanelOptions = { 'hideRemove': true, 'hideSave': true, 'hideRestore': true };
        this.layersIgnore = new Set();
        this.patchesIgnore = new Set();
        this.partsIgnore = new Set();
    }
    LyphPanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.layersIgnore = new Set(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
        this.patchesIgnore = new Set(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
        this.partsIgnore = new Set(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
        if (this.item) {
            this.item.p('layers').subscribe(function (x) {
                console.log("Layers updated", x);
            });
            this.item.p('parts').subscribe(function (x) {
                console.log("Parts updated", x);
            });
        }
    };
    LyphPanel = __decorate([
        core_1.Component({
            selector: 'lyph-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <material-panel [item]=\"item\" \n        [ignore]  = \"ignore\"\n        [options] = \"options\"\n        (saved)   = \"saved.emit($event)\"\n        (canceled)= \"canceled.emit($event)\"\n        (removed) = \"removed.emit($event)\"\n        (propertyUpdated) = \"propertyUpdated.emit($event)\">\n        \n        <!--Species-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"item.species\">\n        </div>\n         \n        <!--Thickness-->\n        <template-value *ngIf=\"includeProperty('thickness')\" \n          [caption]=\"getPropertyLabel('thickness')\" \n          [item]=\"item.thickness\"\n          (updated)=\"updateProperty('thickness', $event)\"\n        ></template-value>\n        <ng-content select=\"dimensionGroup\"></ng-content>  \n       \n        <ng-content></ng-content>   \n        \n        <!--Auxilliary field: measurables to generate-->\n        <!--TODO: replace with modal-->\n        <!--<generateFromSupertype>-->\n          <!--<div class=\"generate-control\">-->\n            <!--<label for=\"measurablesToReplicate\"><img class=\"icon\" src=\"images/measurable.png\"/> Measurables to generate </label>-->\n            <!--<select-input [items]=\"measurablesToReplicate\" -->\n              <!--(updated)=\"measurablesToReplicate = $event\"-->\n              <!--[options]=\"supertypeMeasurables\">-->\n            <!--</select-input>-->\n          <!--</div>-->\n        <!--</generateFromSupertype>-->\n        \n        <relationGroup>   \n           <!--Measurables-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n            <repo-nested [caption]=\"getPropertyLabel('measurables')\" \n            [items]  = \"item.p('measurables') | async | setToArray\" \n            (updated)= \"updateProperty('measurables', $event)\" \n            [types]  = \"[ResourceName.Measurable]\"></repo-nested>\n          </div> \n           \n          <!--Layers-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('layers')\">\n            <repo-nested [caption]=\"getPropertyLabel('layers')\" \n            [items]  = \"item.p('layers') | async | setToArray\" \n            [ignore] = \"layersIgnore\"\n            (updated)= \"updateProperty('layers', $event)\" \n            [types]  = \"[item.class]\"></repo-nested>\n          </div>          \n  \n          <!--Patches-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('patches')\">\n            <repo-nested [caption]=\"getPropertyLabel('patches')\" \n            [items]  = \"item.p('patches') | async | setToArray\" \n            [ignore] = \"patchesIgnore\"\n            [types]  = \"[item.class]\"\n            (updated)= \"updateProperty('patches', $event)\" \n            ></repo-nested>\n          </div>\n                  \n          <!--Parts-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('parts')\">\n            <repo-nested [caption]=\"getPropertyLabel('parts')\" \n            [items]  = \"item.p('parts') | async | setToArray\" \n            [ignore] = \"partsIgnore\"\n            [types]  = \"[item.class]\"\n            (updated)= \"updateProperty('parts', $event)\" \n            ></repo-nested>\n          </div>\n          \n          <!--Processes-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('processes')\">\n            <repo-nested [caption]=\"getPropertyLabel('processes')\" \n             [items]  = \"item.p('processes') | async | setToArray\" \n             [types]  = \"[ResourceName.Process]\" \n             (updated)= \"updateProperty('processes', $event)\"           \n             ></repo-nested>\n          </div>\n          \n           <!--Coalescences-->\n           <div class=\"input-control\" *ngIf=\"includeProperty('coalescences')\">\n            <repo-nested [caption]=\"getPropertyLabel('coalescences')\" \n             [items]  = \"item.p('coalescences') | async | setToArray\" \n             [types]  = \"[ResourceName.Coalescence]\" \n             (updated)= \"updateProperty('coalescences', $event)\"           \n             ></repo-nested>\n          </div>\n            \n          <!--Incoming processes-->\n           <div class=\"input-control\" *ngIf=\"includeProperty('incomingProcesses')\">\n            <repo-nested [caption]=\"getPropertyLabel('incomingProcesses')\" \n             [items]  = \"item.p('incomingProcesses') | async | setToArray\" \n             [types]  = \"[ResourceName.Process]\" \n             (updated)= \"updateProperty('incomingProcesses', $event)\"           \n             ></repo-nested>\n          </div>\n          \n          <!--Outgoing processes-->\n           <div class=\"input-control\" *ngIf=\"includeProperty('outgoingProcesses')\">\n            <repo-nested [caption]=\"getPropertyLabel('outgoingProcesses')\" \n             [items]  = \"item.p('outgoingProcesses') | async | setToArray\" \n             [types]  = \"[ResourceName.Process]\" \n             (updated)= \"updateProperty('outgoingProcesses', $event)\"           \n             ></repo-nested>\n          </div>\n          \n          <ng-content select=\"relationGroup\"></ng-content>\n        </relationGroup>     \n        \n        <fieldset *ngIf=\"includeProperty('borders')\" >  \n          <legend>Borders</legend>\n          \n          <!--InnerBorder-->\n          <div class=\"input-control\">      \n            <label for=\"innerBorder\">{{getPropertyLabel('innerBorder')}}: </label>\n            <border-panel [item]=\"item.p('innerBorder') | async\" \n              [options]=\"borderPanelOptions\"\n              (propertyUpdated) = \"propertyUpdated.emit($event)\"\n              (saved)  =\"updateProperty('innerBorder', $event)\"    \n              (removed)=\"removeTemplate('innerBorder', $event)\">\n            </border-panel>\n          </div>              \n        \n          <!--OuterBorder-->        \n          <div class=\"input-control\">      \n            <label for=\"outerBorder\">{{getPropertyLabel('outerBorder')}}: </label>\n            <border-panel [item]=\"item.p('outerBorder') | async\" \n              [options]= \"borderPanelOptions\"\n              (propertyUpdated) = \"propertyUpdated.emit($event)\"\n              (saved)  = \"updateProperty('outerBorder', $event)\"  \n              (removed)= \"removeTemplate('outerBorder', $event)\">\n            </border-panel>\n          </div>\n          \n          <ng-content select=\"borderGroup\"></ng-content>\n        </fieldset>\n        \n    </material-panel>\n  ",
            directives: [panel_material_1.MaterialPanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput,
                repo_nested_1.RepoNested, panel_border_1.BorderPanel, component_templateValue_1.TemplateValue],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [])
    ], LyphPanel);
    return LyphPanel;
}(panel_material_1.MaterialPanel));
exports.LyphPanel = LyphPanel;
//# sourceMappingURL=panel.lyph.js.map