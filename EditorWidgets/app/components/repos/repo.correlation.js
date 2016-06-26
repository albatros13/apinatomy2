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
 * Created by Natallia on 6/18/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var repo_wrapper_1 = require('./repo.wrapper');
var component_general_1 = require('../component.general');
var panel_correlation_1 = require('../panels/panel.correlation');
var RepoCorrelation = (function (_super) {
    __extends(RepoCorrelation, _super);
    function RepoCorrelation() {
        _super.apply(this, arguments);
    }
    RepoCorrelation = __decorate([
        core_1.Component({
            selector: 'repo-correlation',
            inputs: ['items', "dependency"],
            template: "\n      <repo-wrapper [model]=\"{items: items, caption: 'Correlations'}\">\n        <accordion class=\"list-group\" [closeOthers]=\"true\" dnd-sortable-container [dropZones]=\"['correlation-zone']\" [sortableData]=\"items\">\n            <accordion-group *ngFor=\"let item of items; let i = index\" class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\">\n                <div accordion-heading><item-header [item]=\"item\" [icon]=\"'images/correlation.png'\"></item-header></div>\n                <correlation-panel [item]=\"item\" \n                [dependency]=\"dependency\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></correlation-panel>\n            </accordion-group>        \n        </accordion>       \n      </repo-wrapper>\n  ",
            directives: [repo_wrapper_1.RepoWrapper, component_general_1.ItemHeader, panel_correlation_1.CorrelationPanel, accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoCorrelation);
    return RepoCorrelation;
}(repo_wrapper_1.RepoWrapper));
exports.RepoCorrelation = RepoCorrelation;
//# sourceMappingURL=repo.correlation.js.map