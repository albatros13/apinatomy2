/************************************/
         /*Repository editor*/
/************************************/
function RepoEditor(items) {
    this.items = items;
    this.itemsPanel = null;
    if (!items) this.items = [];

    this.url = "";
    this.urlExtension = "";
    this.contentPanel = null;
    this.editorEnabled = false;
    this.parent = null;

    this.onClick = function(){};

    this.getItem = function(index){
        return this.items[index];
    };

    this.getItemByID = function(id){
        if (this.items)
            return this.items.find(function(d){ return d.id === id;});
        return null;
    };


    this.getIndexByID = function(id){
        var repo = this;
        for (var i = 0; i < repo.items.length; i++){
            if (repo.items[i].id == id) return i;
        }
        return -1;
    };

    this.getIDList = function(){
        return this.getValidItems().map(function(d) {return d.id;});
    };

    this.getItemList = function(){
        return this.getValidItems().map(function(d) {return {id: d.id, caption: d.getHeaderTitle()};});
    };

    this.isModified = function(){
        if (!this.items) return false;
        this.items.forEach(function(d){
            if (d.isModified) return true;
        });
        return false;
    };

    this.getValidItems = function(){
        if (!this.items) return [];
        return this.items.filter(function(d){ return d.isValid();});
    };

    this.addAt = function(item, index){
        this.items.splice(index, 0, item);
    };

    this.removeAt = function(index){
        return this.items.splice(index, 1);
    };

    /*this.replaceAt = function(item, index){
        this.items.splice(index, 1, item);
    };*/

    this.swapItems = function(index1, index2){
        var tmp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = tmp;
    };

    this.clean = function(){
        if (this.items)
            this.items.remove(0, this.items.length);
        if (this.itemsPanel) {
            this.itemsPanel.empty();
            this.itemsPanel.html();
        }
    };

    this.sort = function(){
        var repo = this;
        if (repo.items && repo.defaultObject().isOrdered())
            repo.items = repo.items.sort(function(a,b){
                if (a.position && b.position)
                    return a.position - b.position;
                return 0;
            });
    };

    this.enumerateItems = function(onlyValid){
        var repo = this;
        var i = 0;
        repo.items.forEach(function(d){
            var include = true;
            if (onlyValid) include = d.isValid();
            if (include)
                repo.items[i].position = ++i;
        });
    };

    this.beforeCommit = function(){
        return true;
    };

    this.afterCommit = function(){
        var repo = this;
        repo.items = repo.items.filter(function(d){ return d.status !== "deleted"});
        repo.enumerateItems(true);
        for (var i = 0; i < repo.items.length; i++){
            if (repo.items[i].header)
                Components.setHeaderTitle(repo.items[i].header, repo.items[i].getHeaderTitle());
        }
        repo.updateContent();
    };

    this.commit = function(){
        var repo = this;
        if (repo.beforeCommit()) {
            var repoChanged = false;
            repo.items.forEach(function (d) {
                if (d.commit && d.isModified()){
                    d.commit(repo.url);
                    repoChanged = true;
                }
            });
            if (repoChanged) repo.afterCommit();
        }
    };

    this.beforeLoad = function(){
        return new RSVP.resolve();
    };

    this.afterLoad = function(data){
        var repo = this;
        for (var i = 0; i < data.length; i++) {
            var newItem = repo.defaultObject();
            newItem.setJSON(data[i]);
            newItem.status = "ok";
            newItem.prepareContent(repo.url);
            repo.add(newItem);
        }
        repo.sort();
        repo.updateContent();
    };

    this.load = function(url){
        var repo = this;
        repo.url = url;
        var requestURL = repo.url + repo.urlExtension;
        var load = function(){
            return new RSVP.Promise(function(resolve, reject){
                console.dir(requestURL);
                $.ajax({
                    url: requestURL,
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (response) {
                        repo.afterLoad(response);
                        resolve(response);
                    },
                    error: function(jqXhr, textStatus, errorThrown){
                        reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                    },
                    beforeSend: function(){
                        repo.clean();
                        Components.disableButtons(repo.contentPanel);
                    },
                    complete: function(){
                        Components.enableButtons(repo.contentPanel);
                    }
                })
            })
        };

        return repo.beforeLoad()
            .then(load, logError);
    };

    this.loadDependent = function(requestURL){
        var repo = this;
        var load = function(){
            return new RSVP.Promise(function(resolve, reject) {
                if (!repo.parent || !repo.parent.id){
                    $.Notify({
                        caption: "Error",
                        content: "Cannot load data: Parent ID is not specified",
                        type: 'alert',
                        keepOpen: true
                    });
                    reject("Cannot load data: Parent ID is not specified");
                } else{
                    console.dir(requestURL);
                    $.ajax({
                        url: requestURL,
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function (response) {
                            repo.afterLoad(response);
                            resolve(response);
                        },
                        error: function(jqXhr, textStatus, errorThrown){
                            reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                        },
                        beforeSend: function(){
                            repo.clean();
                            Components.disableButtons(repo.contentPanel);
                        },
                        complete: function(){
                            Components.enableButtons(repo.contentPanel);
                        }
                    })
                }
            });
        };

        return repo.beforeLoad()
            .then(load, logError);
    };

    this.search = function(val){
        var repo = this;
        if (val.length == 0) {
            repo.items.forEach(function(d){
                if (d.header) d.header.show();
            })
        } else {
            repo.items.forEach(function(d){
                if (d.header) d.header.hide();
            });
            var selected = repo.items.filter(function(d) {
                return (d.id + d.name.toLowerCase()).search(val.toLowerCase()) >= 0
            });
            selected.forEach(function(d){
                if (d.header) d.header.show();
            })
        }
    };

    this.add = function(item){
        this.addAt(item, 0);
    };

    this.restore = function(){
        var repo = this;
        repo.items.forEach(function(d){
            if (d.status === "deleted")
                if (d.prevStatus){
                    d.status = d.prevStatus;
                    d.prevStatus = "";
                }
        });

        for (var i = repo.items.length - 1; i >= 0; i--) {
            if(repo.items[i].status === "tmp") {
                if (repo.items[i].header)
                    repo.items[i].header.remove();
                repo.removeAt(i);
            }
        }
    };

    this.printItems = function(label){
        var repo = this;
        var str = label;
        repo.items.forEach(function(d) {
            str += d.name + " ";
        });
        console.dir(str);
    };

    this.reorderItems = function(oldIndex, newIndex){
        var repo = this;
        var d = repo.items[oldIndex];
        if (!d) return;
        //repo.printItems("Old order: ");
        repo.removeAt(oldIndex);
        repo.addAt(d, newIndex);
        if (d.isOrdered()) {
            var min = newIndex, max = oldIndex;
            if (min > max) {
                min = oldIndex;
                max = newIndex;
            }
            for (var i = min; i <= max; i++){
                var e = repo.items[i];
                e.markAsUpdated();
                Components.updatePanelStatus(e.status, e.header);
            }
            if (d.repository){
                d.repository.enumerateItems();
                d.repository.sort();
            }
        }
        //repo.printItems("New order: ");
    };

    this.updateContent = function() {
        var repo = this;
        console.dir("Updating panels for " + repo.urlExtension);

        var updateHandler = function( event, ui ) {
            var oldIndex = ui.item.attr("index");
            var newIndex = -1;
            var panels =  repo.itemsPanel.find('.frame');
            panels.each(function(i) {
                if ($(this).attr("index") == oldIndex)
                    newIndex = i;
            });
            if (newIndex >= 0 && oldIndex >= 0){
                repo.reorderItems(oldIndex, newIndex);
                panels.each(function(index) {
                    $(this).attr("index", index);
                });
            }
        };

        if (!repo.itemsPanel){
            if (!repo.contentPanel) return;
            repo.itemsPanel = Components.createAccordion(repo.contentPanel, true, updateHandler);
        }

        repo.itemsPanel.html();
        var i = 0;
        repo.items.forEach(function(d) {
            if (!d.header) {
                d.createHeader(repo.onClick);
                if (repo.editorEnabled) {
                    if (!d.editor) {
                        d.createEditor(d.header);
                    }
                }
            }
            d.header.attr("index", i++);
            d.header.appendTo(repo.itemsPanel);
            Components.updatePanelStatus(d.status, d.header);
        });
    };

    this.createHeaders = function(panel, onClick) {
        var repo = this;
        repo.contentPanel = panel;
        repo.onClick = onClick;
        Components.createSearchInput(panel, function(val){return repo.search(val);});

        //repo.updateContent();
        return panel;
    };

    this.createEditors = function(panel, onClick){
        var repo = this;
        repo.contentPanel = panel;
        repo.onClick = onClick;
        repo.editorEnabled = true;

        var onAdd = function () {
            var newObj =repo.defaultObject();
            repo.add(newObj);
            repo.items.forEach(function(d){
                if (d.isActive()) {
                    d.header.removeClass("active");
                    if (d.editor) d.editor.hide();
                }
            });
            repo.updateContent();
            if (newObj.header) {
                newObj.header.addClass("active");
                if (newObj.header.onclick) newObj.header.onClick();
            }
        };

        var onClean = function () {
            repo.clean();
            repo.updateContent();
        };

        var onRestore = function () {
            repo.restore();
            repo.updateContent();
        };

        var onLoad = function(){
            repo.load(repo.url);
        };

        var onCommit = function(){repo.commit();};

        var toolbar = Components.createRepoEditToolbar(onAdd, onRestore, onClean, onLoad, onCommit).appendTo(repo.contentPanel);
        //toobar.find("#btnCommit)

        Components.createSearchInput(toolbar, function(val){return repo.search(val);});
        //repo.updateContent();
    };
}

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
                if (d.repository.selected && d.repository.selected != d) {
                    if (d.repository.selected.status != "deleted")
                        d.repository.selected.save();
                }
                d.repository.selected = d;
                if (!d.isActive()) d.updateContent();
            }
            if (onClick) onClick(d);
        };
        //var hClass = ""; //View with collapsible panels - no frame!
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
                if (this[prop].id) //nested object with "id" - commit its identifier only
                    obj[prop] = this[prop].id;
                else {
                    if (isArray(this[prop])) {
                        obj[prop] = this[prop].map(function(d){ return d.id});
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
                    if (Distribution.isDistribution(obj[prop])){
                        if (typeof d[prop] != Distribution.class) {
                            d[prop] = Distribution.defaultObject();
                            d[prop].status = "ok";
                        }
                        d[prop].setJSON(obj[prop]);
                    } else
                        d[prop] = obj[prop];
                }
                else {
                    if (typeof d[prop] !== "object") {
                        d[prop] = obj[prop];
                    }
                    else {
                        //it is ok to copy array even if we saved it in a custom way
                        if (isArray(d[prop]))
                            d[prop] = obj[prop];
                        else
                        if (d[prop].setJSON)
                            d[prop].setJSON(obj[prop]);
                    }
                }
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

    //override to find and load nested objects
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
        };

        var onCommit = function(){
            if (d.url){
                d.commit(d.url);
            }
            else {
                if (d.repository) {
                    d.commit(d.repository.url);
                }
                else {
                    $.Notify({
                        caption: "Error",
                        content: "Cannot commit data: Unknown URL",
                        type: 'alert',
                        keepOpen: true
                    });
                }
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


















