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
                //if (repo.editorEnabled && !d.editor) d.createEditor(d.header);
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
            var newObj = repo.defaultObject();
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
                if (!newObj.editor) newObj.createEditor(newObj.header);
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

        Components.createSearchInput(toolbar, function(val){return repo.search(val);});
        //repo.updateContent();
    };
}




















