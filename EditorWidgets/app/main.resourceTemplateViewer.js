"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var viewer_resourcesAndTemplates_1 = require('./editors/viewer.resourcesAndTemplates');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
platform_browser_dynamic_1.bootstrap(viewer_resourcesAndTemplates_1.ResourceAndTemplateViewer, [ng2_dnd_1.DND_PROVIDERS]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.resourceTemplateViewer.js.map