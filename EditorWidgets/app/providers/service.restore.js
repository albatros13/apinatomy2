/**
 * Created by Natallia on 6/15/2016.
 */
"use strict";
var EditItem = (function () {
    function EditItem(item) {
        this.item = item;
    }
    return EditItem;
}());
exports.EditItem = EditItem;
var RestoreService = (function () {
    function RestoreService() {
    }
    RestoreService.prototype.setItem = function (item) {
        this.originalItem = item;
        this.currentItem = this.clone(item);
    };
    RestoreService.prototype.getItem = function () {
        return this.currentItem;
    };
    RestoreService.prototype.restoreItem = function () {
        this.currentItem = this.originalItem;
        return this.getItem();
    };
    RestoreService.prototype.clone = function (obj) {
        //let objCopy = (JSON.parse(JSON.stringify(obj)));
        var objCopy = {};
        for (var key in obj)
            if (obj.hasOwnProperty(key))
                objCopy[key] = obj[key];
        return objCopy;
    };
    return RestoreService;
}());
exports.RestoreService = RestoreService;
//# sourceMappingURL=service.restore.js.map