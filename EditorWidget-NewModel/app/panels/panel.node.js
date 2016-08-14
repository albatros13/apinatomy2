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
 * Created by Natallia on 6/19/2016.
 */
var core_1 = require('@angular/core');
var panel_template_1 = require("./panel.template");
var component_select_1 = require('../components/component.select');
var repo_nested_1 = require('../repos/repo.nested');
var pipe_general_1 = require("../transformations/pipe.general");
var utils_model_1 = require("../services/utils.model");
var Node = utils_model_1.model.Node, Process = utils_model_1.model.Process;
var NodePanel = (function (_super) {
    __extends(NodePanel, _super);
    function NodePanel() {
        _super.apply(this, arguments);
        this.Node = Node;
        this.Process = Process;
    }
    NodePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers');
    };
    NodePanel = __decorate([
        core_1.Component({
            selector: 'node-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <template-panel [item]=\"item\" \n      [ignore]   = \"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <relationGroup>\n        <!--Channels-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('channels')\"> \n        <repo-nested [caption]=\"getPropertyLabel('channels')\" \n          [items] = \"item.p('channels') | async | setToArray\" \n          (updated)=\"updateProperty('channels', $event)\"     \n          [types]=\"[ResourceName.Node]\"></repo-nested>\n        </div>\n        \n        <!--Measurables-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n          <repo-nested [caption]=\"getPropertyLabel('measurables')\" \n          [items]=\"item.p('measurables') | async | setToArray\" \n          (updated)=\"updateProperty('measurables', $event)\" \n          [types]=\"[ResourceName.Measurable]\"></repo-nested>\n        </div>\n        \n       <!--Incoming processes-->\n         <div class=\"input-control\" *ngIf=\"includeProperty('incomingProcesses')\">\n          <repo-nested [caption]=\"getPropertyLabel('incomingProcesses')\" \n           [items]  = \"item.p('incomingProcesses') | async | setToArray\" \n           [types]  = \"[ResourceName.Process]\" \n           (updated)= \"updateProperty('incomingProcesses', $event)\"           \n           ></repo-nested>\n        </div>\n        \n        <!--Outgoing processes-->\n         <div class=\"input-control\" *ngIf=\"includeProperty('outgoingProcesses')\">\n          <repo-nested [caption]=\"getPropertyLabel('outgoingProcesses')\" \n           [items]  = \"item.p('outgoingProcesses') | async | setToArray\" \n           [types]  = \"[ResourceName.Process]\" \n           (updated)= \"updateProperty('outgoingProcesses', $event)\"           \n           ></repo-nested>\n        </div>\n        \n        <ng-content select=\"relationGroup\"></ng-content>\n      </relationGroup>   \n         \n      <ng-content></ng-content>   \n    \n    </template-panel>\n  ",
            directives: [component_select_1.MultiSelectInput, panel_template_1.TemplatePanel, repo_nested_1.RepoNested],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [])
    ], NodePanel);
    return NodePanel;
}(panel_template_1.TemplatePanel));
exports.NodePanel = NodePanel;
//# sourceMappingURL=panel.node.js.map