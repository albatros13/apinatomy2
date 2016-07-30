"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var editor_resourcesAndTemplates_1 = require('./editors/editor.resourcesAndTemplates');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
platform_browser_dynamic_1.bootstrap(editor_resourcesAndTemplates_1.ResourceAndTemplateEditor, [ng2_dnd_1.DND_PROVIDERS]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.resourceTemplateEditor.js.map