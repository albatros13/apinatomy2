/**
 * Created by Natallia on 3/17/2016.
 */
/*************************************/
/*Object editor*/
/*************************************/
function Editor() {
    this.jsonEntity = null;
    this.urlExtension = "";
    this.header = null;
    this.editor = null;
    this.status = "ok";   //{"ok", "tmp", "new", "updated", "deleted"}
    this.prevStatus = ""; //store previous status when deleting item to avoid transition "tmp"/"new"/"updated" -> "deleted" -> "ok";
    this.icon = $('<img src="images/object.png" class="icon">');
    this.repository = null; //link to the hosting repository

    this.isOrdered = function() {
        return (this.position != undefined || (this.jsonEntity && (this.jsonEntity.position != undefined)));
    };

    this.getHeaderTitle = function () {
        return "";
    };

    this.isModified = function () {
        return (this.status === "new" || this.status === "updated" || this.status === "deleted");
    };

    this.isValid = function () {
        return (this.status === "ok" || this.status === "updated" || this.status === "new");
    };

    this.isActive = function(){
        return (this.header && this.header.hasClass("active"));
    };

    this.markAsUpdated = function(){
        var d = this;
        if (d.status === "ok"){
            d.status = "updated";
            d.prevStatus = "ok";
        }
    };

    this.createHeader = function (onClick) {
        var d = this;
        var onclick = function() {
            if (d.repository && d.repository.editorEnabled){
                if (!d.editor)
                    d.createEditor(d.header);
                if (d.repository.selected && d.repository.selected != d) {
                    if (d.repository.selected.status != "deleted")
                        d.repository.selected.save();
                }
                d.repository.selected = d;
                if (!d.isActive()) d.updateContent();
            }
            if (onClick) onClick(d);
        };
        var hClass = "frame";
        this.header = Components.createHeader(this.icon, d.getHeaderTitle(), hClass).click(onclick);
        return this.header;
    };

    this.getJSON = function () {
        var obj = {};
        for (var prop in this.jsonEntity) {
            if (!this[prop]) continue;
            if (prop === "id") continue; //do not copy id to the JSON object that will be committed

            if (typeof this[prop] !== "object") {
                obj[prop] = this[prop];
            } else {
                if (this[prop].id)        //nested object with "id" - commit its identifier only
                    obj[prop] = this[prop].id;
                else {
                    if (isArray(this[prop])) {
                        if (this[prop][0] && this[prop][0].id)
                            obj[prop] = this[prop].map(function(d){ return d.id});
                        else
                            obj[prop] = this[prop];
                    } else {
                        //nested object with own editor - process recursively
                        if (this[prop].getJSON)
                            obj[prop] = this[prop].getJSON();
                        else {//inline JSON object - copy object properties
                            obj[prop] = {};
                            for (var prop1 in this[prop]){
                                obj[prop][prop1] = this[prop][prop1];
                            }
                        }
                    }
                }
            }
        }
        return obj;
    };

    this.setJSON = function (obj) {
        var d = this;
        for (var prop in obj) {
            if (prop in d.jsonEntity) {
                if (!d[prop]) {
                    //If inline nested object is null in defaultObject, create it here
                    if (Distribution.isDistribution(obj[prop])) {
                        if (typeof d[prop] != Distribution.class) {
                            d[prop] = Distribution.defaultObject();
                            d[prop].status = "ok";
                        }
                        d[prop].setJSON(obj[prop]);
                        continue;
                    }
                }
                else {
                    if (typeof d[prop] === "object" && d[prop].setJSON) {
                        d[prop].setJSON(obj[prop]);
                        continue;
                    }
                }
                d[prop] = obj[prop];
            }
        }
    };

    this.preservesJSON = function (obj) {
        var self = this.getJSON();
        return Object.preserves(self, obj);
    };

    //override to commit nested objects
    this.commitContent = function (url) {};

    this.commit = function (url) {
        var d = this;
        var requestURL = url + d.urlExtension + "/";

        function sendPostRequest() {
            var jsonObj = d.getJSON();

            console.dir("Committing object:");
            console.dir(jsonObj);

            var data = JSON.stringify(jsonObj);
            if ((d.status === "updated") && d.id) requestURL += d.id;
            console.dir(requestURL);
            console.dir(data);
            $.ajax({
                type: "POST",
                url: requestURL,
                contentType: "application/json",
                dataType: 'text',
                data: data,
                success: function (response) {
                    var data = JSON.parse(response);
                    //Update view
                    if ((!d.id) && data.length > 0 && data[0].id)
                        d.id = data[0].id;
                    d.status = "ok";
                    if (d.header) {
                        Components.setHeaderTitle(d.header, d.getHeaderTitle());
                        Components.updatePanelStatus(d.status, d.header);
                    }
                    if (d.editor)
                        Components.setInputValue(d.editor, "id", d.id);
                    //Process nested objects
                    d.commitContent(url);
                },
                beforeSend: function(){
                    Components.disableButtons(d.editor);
                },
                complete: function(){
                    Components.enableButtons(d.editor);
                }
            });
        }

        function sendDeleteRequest() {
            requestURL += d.id;
            console.dir(requestURL);
            $.ajax({
                type: "DELETE",
                url: requestURL,
                success: function () {
                    if (d.header) d.header.remove();
                },
                beforeSend: function(){
                    Components.disableButtons(d.editor);
                },
                complete: function(){
                    Components.enableButtons(d.editor);
                }
            });
        }

        if (d.status === "updated" || d.status === "new") {
            sendPostRequest();
        } else {
            if (d.status === "deleted")
                sendDeleteRequest();
        }
    };

    //override to find nested items in preloaded repositories
    this.prepareContent = function (url) {};

    this.updateContent = function () {};

    this.afterLoad = function(data, loadDependent){
        var d = this;
        if (data.length < 1) return;
        d.setJSON(data[0]);
        d.status = "ok";
        if (d.header) {
            Components.setHeaderTitle(d.header, d.getHeaderTitle());
            Components.updatePanelStatus(d.status, d.header);
        }
        if (loadDependent)
            d.loadDependent(d.url);
        else
            d.prepareContent(d.url);
    };

    //override to load nested items from server repositories
    this.loadDependent = function (url) {};

    this.load = function (url, loadDependent) {
        var d = this;
        d.url = url;
        return new RSVP.Promise(function(resolve, reject){
            if (!d.id){
                $.Notify({
                    caption: "Error",
                    content: "Cannot load data: ID is not specified",
                    type: 'alert',
                    keepOpen: true
                });
                reject("Cannot load data: ID is not specified");
            } else{
                var requestURL = d.url + d.urlExtension + "/" + d.id;
                console.dir(requestURL);
                $.ajax({
                    url: requestURL,
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (response) {
                        d.afterLoad(response, loadDependent);
                        resolve(response);
                    },
                    error: function(jqXhr, textStatus, errorThrown){
                        reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                    },
                    beforeSend: function(){
                        Components.disableButtons(d.editor);
                    },
                    complete: function(){
                        Components.enableButtons(d.editor);
                    }
                })
            }
        });
    };

    this.save = function () {
        var d = this;
        var newObj = d.getEditorObject();
        var res = newObj.validate();

        if (res.length == 0) {
            Object.removeFunctions(newObj);
            var isOk = d.preservesJSON(newObj);
            if (isOk) return;

            var updateHeader = function (d) {
                if (d.header) {
                    Components.setHeaderTitle(d.header, d.getHeaderTitle());
                    d.status = (!d.id) ? "new" : "updated";
                    Components.updatePanelStatus(d.status, d.header);
                    if (d.header.click) d.header.click();
                }
            };

            d.setJSON(newObj);
            updateHeader(d);

            if (d.isOrdered() && d.repository){
                d.repository.enumerateItems();
                d.repository.sort();
            }
        } else {
            $.Notify({
                caption: "Error",
                content: "Failed to save object: " + res,
                type: 'alert',
                keepOpen: true
            })
        }
    };

    this.restore = function () {
        var d = this;
        if (d.editor) {
            for (var prop in d.jsonEntity) {
                if (!d[prop]) continue;
                if (typeof d[prop] !== "object")
                    Components.setInputValue(d.editor, prop, d[prop]);
                else {
                    if (isArray(d[prop])) {//Note: for nested repositories the editor field wont be found
                        Components.setInputValue(d.editor, prop, d[prop]);
                        continue;
                    }
                    if (d[prop].editor)
                        d[prop].restore();
                    else {
                        //inline JSON object - copy its properties
                        for (var prop1 in d[prop]) {
                            Components.setInputValue(d.editor, prop1, d[prop][prop1]);
                        }
                    }
                }
            }
        }
    };

    this.remove = function () {
        var d = this;
        if (d.editor) {
            d.prevStatus = d.status;
            d.status = "deleted";
            if (d.header)
                Components.updatePanelStatus(d.status, d.header);
        }
    };

    this.createEditPanel = function (panel) {
        var d = this;
        var onSave = function () {
            d.save();
        };

        var onRestore = function () {
            d.restore();
        };

        var onRemove = function () {
            d.remove();
        };

        var onLoad = function(){
            if (d.url){
                d.load(d.url, true);
            }
            else {
                if (d.repository) {
                    d.load(d.repository.url, true);
                }
                else {
                    $.Notify({
                        caption: "Error",
                        content: "Cannot load data: Unknown URL",
                        type: 'alert',
                        keepOpen: true
                    });
                }
            }
            d.restore();
        };

        var onCommit = function(){
            var url = d.url;
            if (!url && d.repository) url = d.repository.url;
            if (url){
                d.save();
                d.commit(url);
            }
            else {
                $.Notify({
                    caption: "Error",
                    content: "Cannot commit data: Unknown URL",
                    type: 'alert',
                    keepOpen: true
                });
            }
        };

        var editPanel = Components.createContentPanel(panel);
        Components.createEditToolbar(onSave, onRestore, onRemove, onLoad, onCommit).appendTo(editPanel);

        return editPanel;
    };

    this.createOptionalObjectPanel = function (panel, property, createDefaultObject) {
        var d = this;

        function updateButtonState() {
            addButton.toggleClass('disabled');
            removeButton.toggleClass('disabled');
        }

        var onAdd = function () {
            if (!d[property]) {
                d[property] = createDefaultObject();
                d[property].createEditor(contentPanel);
                updateButtonState();
            }
        };

        var onRemove = function () {
            if (d[property]) {
                contentPanel.empty();
                d[property] = null;
                updateButtonState();
            }
        };

        var toolbar = Components.createToolbar();
        var addButton = Components.createAddButton(onAdd).appendTo(toolbar);
        var removeButton = Components.createClearButton(onRemove).appendTo(toolbar);
        toolbar.appendTo(panel);

        var contentPanel = Components.createContentPanel(panel);

        if (d[property]) {
            addButton.addClass('disabled');
            if (d[property].createEditor)
                d[property].createEditor(contentPanel);
        } else {
            removeButton.addClass('disabled');
        }
    }
}

/************************************/
/*Distributions */
/************************************/

function Distribution(obj) {
    Editor.call(this);
    this.jsonEntity = Object.create(Entities.distribution);
    this.icon = $('<img src="images/random.png" class="icon">');

    this.createContent = function(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];
    };

    this.createContent(obj);

    this.getHeaderTitle = function(){
        if (this.mean || this.stDev)
            return this.type.charAt(0) + "(" + this.mean + ", " + this.stDev + ")";
        return this.type.charAt(0) + "[" + this.min + ", " + this.max + "]";
    };

    this.validate = function(){
        var d = this;
        if (!(d.min && d.max) && !(d.mean && d.stDev))
            return "Incorrect parameters";
        if (d.min && d.max){
            if (d.min > d.max)
                return "Incorrect value range";
        }
        return "";
    };

    this.generate = function () {
        if (this.type === "Uniform"){
            if (this.min && this.max)
                return Math.random() * (this.max - this.min) + this.min;
            if (this.mean && this.stDev)
                return this.mean + (3 * Math.sqrt(this.stDev)) * (2 * Math.random() - 1);
        }

        if (this.type === "Normal"){
            var spareRandom = null;
            function normalRandom(){
                var val, u, v, s, mul;
                if(spareRandom !== null){
                    val = spareRandom;
                    spareRandom = null;
                } else {
                    do {
                        u = Math.random()*2-1;
                        v = Math.random()*2-1;
                        s = u * u + v * v;
                    } while(s === 0 || s >= 1);
                    mul = Math.sqrt(-2 * Math.log(s) / s);
                    val = u * mul;
                    spareRandom = v * mul;
                }
                return val / 14;	// 7 standard deviations on either side
            }

            function normalRandomInRange(min, max){
                var val;
                do{
                    val = normalRandom();
                } while(val < min || val > max);
                return val;
            }

            function normalRandomScaled(mean, stddev){
                var r = normalRandomInRange(-1, 1);
                r = r * stddev + mean;
                return Math.round(r);
            }

            if (this.min && this.max)
                return normalRandomInRange(this.min, this.max);

            if (this.mean && this.stDev)
                return normalRandomScaled(this.mean, this.stDev);
        }
    };

    this.createEditor = function(panel){
        var d = this;

        //Switch between parameter set
        var minMax = Components.createCheckButton("paramSet", "minMax", "Min/Max", (d.min || d.max)).appendTo(panel);

        //Min - max
        var min = Components.createRangeInput(d.min, "min", "Min").appendTo(panel);
        var max = Components.createRangeInput(d.max, "max", "Max").appendTo(panel);

        //Mean - Std Dev
        var mean = Components.createRangeInput(d.mean, "mean", "Mean").appendTo(panel);
        var stDev = Components.createRangeInput(d.stDev, "stDev", "Std Dev").appendTo(panel);

        var update = function(){
            if (minMax.find("> input").prop("checked")) {
                mean.detach(); stDev.detach();
                min.appendTo(panel); max.appendTo(panel);
            } else {
                min.detach(); max.detach();
                mean.appendTo(panel); stDev.appendTo(panel);
            }
        };
        minMax.on("change", function(){update();});

        var options = [{id: "Uniform", caption: "Uniform"}, {id: "Normal", caption: "Normal"}];
        Components.createSelectInput(this.type, "type", "Type", options).appendTo(panel);

        if (d.min || d.max) minMax.find("> input").prop("checked", true);
        update();

        this.editor = panel;
    };

    this.getEditorObject = function(){
        if (this.editor){
            var newObj = {validate: this.validate};
            newObj.type = Components.getInputValue(this.editor, "type");
            var minMax = this.editor.find("#paramSet").prop("checked");
            if (minMax){
                newObj.min = parseInt(Components.getInputValue(this.editor, "min"), 10);
                newObj.max = parseInt(Components.getInputValue(this.editor, "max"), 10);
            } else {
                newObj.mean = parseInt(Components.getInputValue(this.editor, "mean"), 10);
                newObj.stDev = parseInt(Components.getInputValue(this.editor, "stDev"), 10);
            }
            return newObj;
        }
        return null;
    }
}

Distribution.defaultObject = function(){
    var proto = Object.create(Entities.distribution);
    proto.tmp = "tmp";
    return new Distribution(proto);
};

Distribution.createContentPanel = function(panel, title){
    return Components.createFieldSet(panel, title);
};

Distribution.isDistribution = function(obj){
    if (obj.type && (obj.type === "Uniform" || obj.type === "Normal")) return true;
    return false;
};