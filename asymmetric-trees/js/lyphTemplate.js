/**
 * Created by Natallia on 3/7/2016.
 */
/************************************/
/* LyphTemplate (template) */
/************************************/
function LyphTemplate(obj){
    Editor.call(this);
    this.jsonEntity = Object.create(Entities.lyphTemplate);
    this.urlExtension = "/lyphTemplates";
    this.icon = $('<img src="images/lyph.png" class="icon">');

    this.createContent = function(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];

        //for nested objects, create classes from JSON objects or identifiers
        if (obj) {
            if (obj.length){
                if (typeof obj.length !== Distribution.class)
                    this.length = new Distribution(obj.length);
            }
            if (obj.radius){
                if (typeof obj.radius != Distribution.class)
                    this.radius = new Distribution(obj.radius);
            }

            var newItem;
            if (obj.layers) {
                for (var i = 0; i < obj.layers.length; i++) {
                    newItem = obj.layers[i];
                    if (typeof newItem === "object") {
                        //JSON prototypes
                        if (typeof newItem !== LayerTemplate.class)
                            newItem = new LayerTemplate(newItem)
                    } else {
                        //Identifiers (when pre-loaded from server)
                        if (typeof newItem === "number")
                            newItem = new LayerTemplate({id: newItem});
                    }
                    this.layers[i] = newItem;
                }
            }
            if (obj.locatedMeasures) {
                for (i = 0; i < obj.locatedMeasures.length; i++) {
                    newItem = obj.locatedMeasures[i];
                    if (typeof newItem === "object") {
                        //JSON prototypes
                        if (typeof newItem !== LocatedMeasure.class)
                            newItem = new LocatedMeasure(newItem)
                    } else {
                        //Identifiers (when pre-loaded from server)
                        if (typeof newItem === "number")
                            newItem = new LocatedMeasure({id: newItem});
                    }
                    this.locatedMeasures[i] = newItem;
                }
            }
        }
    };
    this.createContent(obj);

    this.layerRepo = new LayerTemplateRepo(this.layers, this);
    this.locatedMeasureRepo = new LocatedMeasureRepo(this.locatedMeasures, this);

    this.getHeaderTitle = function() {return this.id + " - " + this.name};

    this.commitContent = function(url){
        this.layerRepo.url = url;
        this.layerRepo.setParent(this);
        this.layerRepo.commit();

        this.locatedMeasureRepo.url = url;
        this.locatedMeasureRepo.setParent(this);
        this.locatedMeasureRepo.commit();
    };

    this.updateContent = function(){
        this.layerRepo.updateContent();
        this.locatedMeasureRepo.updateContent();
    };

    this.loadDependent= function(url){
        var d = this;
        if (!d.repository) return;

        d.layerRepo.url = url;
        d.layerRepo.setParent(d);
        d.layerRepo.loadDependent(d.repository.url + d.repository.urlExtension + "/" + d.id + "/layers");

        d.locatedMeasureRepo.url = url;
        d.locatedMeasureRepo.setParent(d);
        d.locatedMeasureRepo.loadDependent(d.repository.url + d.repository.urlExtension + "/" + d.id + "/locatedMeasures");
    };

    this.prepareContent = function(url) {
        var d = this;
        if (!d.repository) return;

        d.layerRepo.url = url;
        d.layerRepo.setParent(d);
        d.layerRepo.clean();
        if (d.layers && d.repository.layerRepoFull) {
            d.layers = d.repository.layerRepoFull.items.filter(function (e) {
                return e.lyphTemplate == d.id
            });
            d.layerRepo.items = d.layers;
            d.layerRepo.items.forEach(function(e){e.repository = d.layerRepo;});
            d.layerRepo.sort();
        }

        d.locatedMeasureRepo.url = url;
        d.locatedMeasureRepo.setParent(d);
        d.locatedMeasureRepo.clean();
        if (d.locatedMeasures && d.repository.locatedMeasureRepoFull) {
            d.locatedMeasures = d.repository.locatedMeasureRepoFull.items.filter(function (e) {
                return e.lyphTemplate == d.id
            });
            d.locatedMeasureRepo.items = d.locatedMeasures;
            d.locatedMeasureRepo.items.forEach(function(e){e.repository = d.locatedMeasureRepo;});
            d.locatedMeasureRepo.sort();
        }

        if (d.isActive())
            d.updateContent();
    };

    this.validate = function(){
        var d = this;
        if (!d.name)
            return "LyphTemplate name is not defined";
        var res = "";
        if (d.length) {
            res = d.length.validate();
            if (res.length > 0) return res;
        }
        if (d.radius) {
            res = d.radius.validate();
            if (res.length > 0 ) return res;
        }
        return "";
    };

    this.generate = function(){
        //TODO: generate a LyphTemplate sample
        return this;
    };

    this.createEditor = function(panel) {
        var d = this;
        var editPanel = d.createEditPanel(panel);

        //id
        Components.createDisabledInput(d.id, "id", "ID").appendTo(editPanel);

        //fmaID
        var ontologyIDPanel = Components.createTextInput(d.fmaID, "fmaID", "Ontology ID").appendTo(editPanel);
        var ontologyIDInput = ontologyIDPanel.find("> input");

        //name
        var namePanel = Components.createTextInput(d.name, "name", "Name").appendTo(editPanel);
        namePanel.attr("style", "width: 100%;");
        var nameInput = namePanel.find("> input");

        function extractID(url){
            var delimeterPos;
            if (url.indexOf("fma#") > 0)
                delimeterPos = url.indexOf("fma#") + 4;
            else if (url.indexOf("gene_ontology#") > 0)
                delimeterPos = url.indexOf("gene_ontology") + "gene_ontology#".length;
            else
                delimeterPos = url.lastIndexOf("/") + 1 ;
            return url.substring(delimeterPos).trim();
        }

        $(function() {
            var result = null;
            nameInput.autocomplete({
                source: function( request, response ) {
                    $.ajax({
                        url: "http://open-physiology.org:5052/autocomplete-case-insensitive/" + request.term,
                        dataType: "jsonp",
                        data: {
                            q: request.term
                        },
                        success: function( data ) {
                            result = data;
                            response( data.Results);
                        }
                    });
                },
                minLength: 1,
                select: function( event, ui ) {
                    var index = result.Results.indexOf(ui.item.value);
                    if (index >= 0){
                        var value = result.IRIs[index][0].iri;
                        ontologyIDInput.val(extractID(value));
                    }
                }
            });
        });

        //Length distribution
        var lengthHeader = Distribution.createContentPanel(editPanel, "Length");
        d.createOptionalObjectPanel(Components.createContentPanel(lengthHeader), "length",
            Distribution.defaultObject);

        //Width distribution
        var widthHeader = Distribution.createContentPanel(editPanel, "Radius");
        d.createOptionalObjectPanel(Components.createContentPanel(widthHeader), "radius",
            Distribution.defaultObject);

        //layers
        this.layerRepo.createContentPanel(editPanel);
        this.layerRepo.createEditors(this.layerRepo.contentPanel, null);

        //located measures
        this.locatedMeasureRepo.createContentPanel(editPanel);
        this.locatedMeasureRepo.createEditors(this.locatedMeasureRepo.contentPanel, null);

        this.editor = editPanel;
    };


    this.getEditorObject = function(){
        if (this.editor){
            var newObj = {validate: this.validate};
            newObj.name = Components.getInputValue(this.editor, "name");
            var newFmaID = Components.getInputValue(this.editor, "fmaID");
            if (newFmaID) {
                newObj.fmaID = parseInt(newFmaID, 10);
                if (!newObj.fmaID) { //TODO: remove substring
                    var index = newFmaID.indexOf("_");
                    if (index > -1)
                        newObj.fmaID = parseInt(newFmaID.substring(index + 1), 10);
                }
            }
            //newObj.materialIn = parseInt(Components.getInputValue(this.editor, "materialIn"), 10);
             if (this.radius)
                 newObj.radius = this.radius.getEditorObject();
             if (this.length)
                 newObj.length = this.length.getEditorObject();

            return newObj;
        }
        return null;
    };

    //Draw LyphTemplate as treemap
    this.drawAsTreemap = function(canvas, vp, onClick) {
        var lyph = this;
        if (!lyph.layerRepo) return;

        var prepareTreemapData = function(root, data){
            if (!root) return;
            if (!data.children) data.children = [];
            var goodLayers = [];
            if (root.layerRepo) goodLayers = root.layerRepo.getValidItems();
            if (goodLayers){
                var base = data.children.length * 10;
                for (var i = 0 ; i < goodLayers.length; i++){
                    var layer = goodLayers[i];
                    var child = {
                        name: layer.getHeaderTitle(), size: layer.getThickness(), color: layer.color,
                        position: base + layer.position
                    };
                    if (layer.materials){
                        for (var j = 0 ; j< layer.materials.length; j++){
                            var material = layer.materials[j];
                            var materialObj = lyphRepo.getItemByID(material);
                            if (materialObj)
                                prepareTreemapData(materialObj, child);
                        }
                    }
                    data.children.push(child);
                }
            }
        };

        var tree = {};
        prepareTreemapData(lyph, tree);
        canvas.selectAll('div').remove();
        canvas.append("div")
            .style("height", "10px")
            .style("margin", "2px")
            .style("background-color", "black");
        Plots.treemap(tree, canvas, vp, onClick);
    };

    //Draw LyphTemplate layers only
    this.drawIcon = function(svg, vp, onClick) {
        var lyph = this;
        if (!lyph.layerRepo) return;
        var goodLayers = lyph.layerRepo.getValidItems();

        function onLyphClick(){
            var group = d3.select(this);
            var groups = svg.selectAll(".lyph");
            groups.filter(function(d){return d != group}).classed("selected", false).style("outline", "");
            group.classed("selected", !group.classed("selected"));
            group.style("outline", "thin solid red");
            if (onClick) onClick(lyph);
        }

        var lyphSvg = svg.append("g").attr("class", "lyph").on("click", onLyphClick);

        function formatData(){
            var str = JSON.stringify(lyph.getJSON());
            return str.split(',').join(",\n");
        }
        Plots.assignHint(lyphSvg, formatData);

        if (!goodLayers || (goodLayers.length == 0)) {
            //Draw empty box
            var rect = lyphSvg.append("rect")
                .attr("x", vp.margin.x)
                .attr("y", vp.margin.y);
            if (vp.orientation === "vertical"){
                rect.attr("height", vp.scale.width)
                    .attr("width", vp.scale.height);
            } else {
                rect.attr("width", vp.scale.width)
                    .attr("height", vp.scale.height);
            }

        } else {
            var rect = lyphSvg.selectAll("rect")
                .data(goodLayers)
                .enter().append("rect")
                .style("fill", function (d) {return d.color;});
            if (vp.orientation === "vertical"){
                var prev = vp.margin.x;
                rect.attr("height", function () {return vp.scale.width;})
                    .attr("width", function (d) {return d.getThickness() * vp.scale.height;})
                    .attr("x", function (d) {
                        prev += d.getThickness() * vp.scale.height;
                        return prev - d.getThickness() * vp.scale.height;})
                    .attr("y", vp.margin.y)

            } else {
                var prev = vp.margin.y;
                rect.attr("width", function () {return vp.scale.width;})
                    .attr("height", function (d) {return d.getThickness() * vp.scale.height;})
                    .attr("x", vp.margin.x)
                    .attr("y", function (d) {
                        prev += d.getThickness() * vp.scale.height;
                        return prev - d.getThickness() * vp.scale.height;})
            }
        }

        return lyphSvg;
    };

    //Draw lyph base, layers and layer names
    this.draw = function(svg, vp, onClick) {
        var lyph = this;
        svg.selectAll('rect').remove();
        svg.selectAll('text').remove();
        var baseLineThickness = 5;
        var drawBaseLine = function(){
            svg.append("rect")
                .style("fill", "black")
                .attr("x", vp.margin.x)
                .attr("y", vp.margin.y)
                .attr("width", vp.margin.x + vp.scale.width)
                .attr("height", baseLineThickness);
        };

        //Base axis
        drawBaseLine();
        //Layers
        var goodLayers = lyph.layerRepo.getValidItems();
        if (!goodLayers) return;
        vp.margin.y += baseLineThickness;
        this.drawIcon(svg, vp, onClick);

        var prev = vp.margin.y;
        //LayerTemplate titles
        svg.selectAll("chart")
            .data(goodLayers)
            .enter().append("text")
            .attr("x", function () {return vp.margin.x + vp.scale.width / 2;})
            .attr("y", function (d) {
                prev += d.getThickness() * vp.scale.height;
                return prev - d.getThickness() * vp.scale.height / 2;})
            .text(function(d) {
                return d.id ? d.id + " - " + d.name : d.name;});
        vp.margin.y -= baseLineThickness;
    }
}

function LyphTemplateRepo(items){
    RepoEditor.call(this, items);
    this.urlExtension = "/lyphTemplates";

    this.layerRepoFull = new LayerTemplateRepoFull([]);
    this.locatedMeasureRepoFull = new LocatedMeasureRepoFull([]);

    this.beforeLoad = function(){
        var repo = this;
        return RSVP.all([repo.layerRepoFull.load(repo.url), repo.locatedMeasureRepoFull.load(repo.url)]);
    };

    this.defaultObject = function(){
        var proto = Object.create(Entities.lyphTemplate);
        proto.status = "tmp";
        proto.repository = this;
        return new LyphTemplate(proto);
    }
}

/************************************/
/*LayerTemplate*/
/************************************/
function LayerTemplate(obj) {
    Editor.call(this);
    this.jsonEntity = Object.create(Entities.layerTemplate);
    this.urlExtension = "/layerTemplates";
    this.color = "#"+((1<<24)*Math.random()|0).toString(16);
    this.icon = $('<img src="images/layer.png" class="icon">');

    this.createContent = function(obj){
        for (var prop in obj)
            this[prop] = obj[prop];
        if (obj){
            if (obj.materials){
                for (var i = 0; i < obj.materials.length; i++){
                    var newItem = obj.materials[i];
                    if (typeof newItem === "object"){
                        //JSON prototypes
                        if (typeof newItem !== LyphTemplate.class)
                            newItem = new LyphTemplate(newItem)
                    } else {
                        //Identifiers (when pre-loaded from server)
                        if (typeof newItem === "number")
                            newItem = new LyphTemplate({id: newItem});
                    }
                    this.materials[i] = newItem;
                }
            }
        }
    };
    this.createContent(obj);

    this.getThickness = function(){
        if (this.thickness){
            return (this.thickness.min + this.thickness.max) / 2;
        }
        return 1;
    };

    this.getHeaderTitle = function(){
        return (this.id + " - " + this.name);
    };

    this.validate = function(){
        var d = this;

        if (!d.name)
            return "Layer template name is not defined";
        if (d.thickness.min > d.thickness.max)
            return "Layer template thickness range is not properly defined - min value (" + d.thickness.min +
                ") is larger than max value (" + d.thickness.max + ")";
        if (d.materials){
            var data = [];
            var getDescendants = function(root){//root = layer
                if (!root) return;
                if (!root.materials) return;
                root.materials.forEach(function(material){
                    data.push(material);
                    var materialObj = lyphRepo.getItemByID(material);
                    if (materialObj && materialObj.layerRepo){
                        materialObj.layerRepo.getValidItems().forEach(function(layer){
                            getDescendants(layer);
                        });
                    }
                });
            };
            getDescendants(d);
            if (data.indexOf(d.lyphTemplate) > -1)
                return "Materials or their descendants cannot include the parent lyph template";
        }
        return "";
    };

    this.createEditor = function(panel){
        var d = this;
        var editPanel = d.createEditPanel(panel);
        //id
        Components.createDisabledInput(d.id, "id", "ID").appendTo(editPanel);
        //name
        Components.createTextInput(d.name, "name", "Name").appendTo(editPanel);
        //thickness range (= uniform distribution)
        var grid = Components.createGrid(editPanel);
        var row1  = Components.createRow(grid, "");
        var cell1 = Components.createCell(row1, "<h5>Thickness: </h5>");
        var minValue = 1, maxValue = 1;
        if (d.thickness) {
            minValue = d.thickness.min;
            maxValue = d.thickness.max;
        }
        Components.createNumberInput(minValue, "min", "Min", 1, 10, 1).appendTo(cell1);
        Components.createNumberInput (maxValue, "max", "Max", 1, 10, 1).appendTo(cell1);

        //materials
        var getOptions = function(){return lyphRepo.getItemList();};
        var materials = [];
        if (d.materials){
            materials = d.materials.map(function(id){
                var obj = {id: id};
                var lyph = lyphRepo.getItemByID(id);
                if (lyph) obj.caption = lyph.getHeaderTitle();
                return obj;
            })
        }

        Components.createSelect2InputMulti(materials, "materials", "Materials", getOptions).appendTo(editPanel);
        this.editor = editPanel;
    };

    this.getEditorObject = function(){
        if (this.editor){
            var newObj = {validate: this.validate};
            newObj.name = Components.getInputValue(this.editor, "name");
            newObj.lyphTemplate = this.lyphTemplate;
            newObj.thickness = {min: 1, max: 1};
            newObj.thickness.min = parseInt(Components.getInputValue(this.editor, "min"), 10);
            newObj.thickness.max = parseInt(Components.getInputValue(this.editor, "max"), 10);
            var materials = Components.getInputValue(this.editor, "materials");
            if (!materials)
                newObj.materials = [];
            else {
                newObj.materials = materials.map(function(d){
                    return parseInt(d, 10);
                });
            }
            return newObj;
        }
        return null;
    }
}

function LayerTemplateRepo(items, parent){
    RepoEditor.call(this, items);
    this.parent = parent; //integer (id)
    this.urlExtension = "/layerTemplates";

    this.setParent = function(parent){
        var repo = this;
        repo.parent = parent;
        repo.items.forEach(function(d){
            d.lyphTemplate = parent.id;
        })
    };

    this.setParent(parent);

    this.defaultObject = function(){
        var proto = Object.create(Entities.layerTemplate);
        proto.lyphTemplate = this.parent.id;
        proto.position = this.items.length;
        proto.status = "tmp";
        proto.repository = this;
        return new LayerTemplate(proto);
    };

    this.beforeCommit = function(){
        var repo = this;
        if (!repo.parent || !repo.parent.id){
            $.Notify({
                caption: "Error",
                content: "Cannot commit data: Parent ID is not specified!",
                type: 'alert',
                keepOpen: true
            });
            return false;
        }
        repo.enumerateItems(true);
        return true;
    };

    this.add = function(item){
        this.addAt(item, this.items.length);
    };

    this.load = function(url){
        this.url = url;
        this.loadDependent(this.url + "/lyphTemplates/" + this.parent.id + "/layers");
    };

    this.createContentPanel = function(panel){
        this.contentPanel = Components.createFieldSet(panel, "Layers");
    }
}

//Full layer set
function LayerTemplateRepoFull(items){
    RepoEditor.call(this, items);
    this.urlExtension = "/layerTemplates";

    this.defaultObject = function(){
        var proto = Object.create(Entities.layerTemplate);
        proto.position = this.items.length;
        proto.status = "tmp";
        proto.repository = this;
        return new LayerTemplate(proto);
    };
}

/************************************/
/* Located measures */
/************************************/

function LocatedMeasure(obj){
    Editor.call(this);
    this.jsonEntity = Object.create(Entities.locatedMeasure);
    this.urlExtension = "/locatedMeasures";
    this.icon = $('<img src="images/locatedMeasure.png" class="icon">');

    this.createContent = function(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];
    };
    this.createContent(obj);

    this.getHeaderTitle = function(){
        if (this.quality) return this.quality;
        return "undefined";
    };

    this.validate = function(){
        var d = this;
        if (!d.quality)
            return "Located measure quality is not defined";
        return "";
    };

    this.createEditor = function(panel) {
        var d = this;
        var editPanel = d.createEditPanel(panel);
        //quality
        Components.createTextInput(d.quality, "quality", "Quality").appendTo(editPanel);

        this.editor = editPanel;
    };

    this.getEditorObject = function(){
        if (this.editor){
            var newObj = {validate: this.validate};
            newObj.quality = Components.getInputValue(this.editor, "quality");
            newObj.lyphTemplate = this.lyphTemplate;
            return newObj;
        }
        return null;
    }
}

function LocatedMeasureRepo(items, parent){
    RepoEditor.call(this, items);
    this.parent = parent; //integer (id)
    this.urlExtension = "/locatedMeasures";

    this.setParent = function(parent){
        var repo = this;
        repo.parent = parent;
        repo.items.forEach(function(d){
            d.lyphTemplate = parent.id;
        })
    };

    this.setParent(parent);

    this.defaultObject = function(){
        var proto = Object.create(Entities.locatedMeasure);
        proto.lyphTemplate = this.parent.id;
        proto.status = "tmp";
        proto.repository = this;
        return new LocatedMeasure(proto);
    };

    this.beforeCommit = function(){
        var repo = this;
        if (!repo.parent || !repo.parent.id){
            $.Notify({
                caption: "Error",
                content: "Cannot commit data: Parent ID is not specified!",
                type: 'alert',
                keepOpen: true
            });
            return false;
        }
        return true;
    };

    this.load = function(url){
        this.url = url;
        this.loadDependent(this.url + "/lyphTemplates/" + this.parent.id + "/locatedMeasures");
    };

    this.createContentPanel = function(panel){
        this.contentPanel = Components.createFieldSet(panel, "Located measures");
    }
}

//Full located measures set
function LocatedMeasureRepoFull(items){
    RepoEditor.call(this, items);
    this.urlExtension = "/locatedMeasures";

    this.defaultObject = function(){
        var proto = Object.create(Entities.locatedMeasure);
        proto.status = "tmp";
        proto.repository = this;
        return new LocatedMeasure(proto);
    };
}
