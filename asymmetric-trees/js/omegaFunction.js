/**
 * Created by Natallia on 3/7/2016.
 */
/**********************************/
/*Omega-function (tree)*/
/**********************************/
function CanonicalTree(obj) {
    Editor.call(this);
    this.jsonEntity = Object.create(Entities.canonicalTree);
    this.icon = $('<img src="images/tree.png" class="icon">');
    this.urlExtension = "/canonicalTrees";
    this.color = "#"+((1<<24)*Math.random()|0).toString(16);

    this.createContent = function(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];
        if (obj) //for nested objects, create classes from JSON objects or identifiers
            if (obj.levels) {
                for (var i = 0; i < obj.levels.length; i++) {
                    var newItem = obj.levels[i];
                    if (typeof newItem === "object") {
                        //JSON prototypes
                        if (typeof newItem !== CanonicalTreeLevel.class)
                            newItem = new CanonicalTreeLevel(newItem)
                    } else {
                        //identifiers (when pre-loaded from server)
                        if (typeof newItem === "number")
                            newItem = new CanonicalTreeLevel({id: newItem});
                    }
                    this.levels[i] = newItem;
                }
            }
    };

    this.levelRepo = new CanonicalTreeLevelRepo(this.levels, this);

    this.createContent(obj);

    this.commitContent = function(url){
        this.levelRepo.url = url;
        this.levelRepo.setParent(this);
        this.levelRepo.commit();
    };

    this.updateContent = function(){
        this.levelRepo.updateContent();
    };

    this.loadDependent= function(url){
        var d = this;
        if (!d.repository) return;

        d.levelRepo.url = url;
        d.levelRepo.setParent(d);
        d.levelRepo.loadDependent(d.repository.url + d.repository.urlExtension + "/" + d.id + "/levels");
    };

    this.prepareContent = function(url){
        var d = this;
        if (!d.repository) return;

        d.levelRepo.url = url;
        d.levelRepo.setParent(d);
        d.levelRepo.clean();
        if (d.levels && d.repository.levelRepo) {
            d.levels = d.repository.levelRepo.items.filter(function (e) {
                return e.tree == d.id
            });
            d.levelRepo.items = d.levels;
            d.levelRepo.sort();
        }
        if (d.isActive())
            d.updateContent();
    };

    this.getHeaderTitle = function() {return this.id + " - " + this.name};

    this.validate = function(){
        var d = this;
        if (!d.name)
            return "Tree name is not defined";
        return "";
    };

    this.createEditor = function(panel) {
        var d = this;
        var editPanel = d.createEditPanel(panel);

        Components.createDisabledInput(d.id, "id", "ID").appendTo(editPanel);
        Components.createTextInput(d.name, "name", "Name").appendTo(editPanel);

        //Levels
        d.levelRepo.createContentPanel(editPanel);
        d.levelRepo.createEditors(d.levelRepo.contentPanel, null);

        d.editor = editPanel;
    };

    this.getEditorObject = function(){
        if (this.editor){
            var newObj = {validate: this.validate};
            newObj.name = Components.getInputValue(this.editor, "name");
            return newObj;
        }
        return null;
    };

    //Sample tree generation

    var sampleTree = null;

    this.generate = function(){
        sampleTree = new TreeSample(this);
        return sampleTree;
    };

    this.getSample = function(){
        if (sampleTree) return sampleTree;
        return this.generate();
    };

    //////////////////////////////////////////////////////////////////////////////////
    //Visualization
    //////////////////////////////////////////////////////////////////////////////////

    this.drawCanonicalModel_Branching = function(svg, vp, onClick){
        var canonicalTree = this;
        var treeData = {};

        function prepareTreeData(root, data){
            if (!root) return;
            var goodLevels = [];
            if (root.levelRepo) goodLevels = root.levelRepo.getValidItems();

            if (goodLevels){
                for (var i = 0 ; i < goodLevels.length; i++){
                    var level = goodLevels[i];
                    data.name = "#" + (i + 1) + " (" + root.id +")";
                    data.color = root.color;
                    data.level = level;
                    data.children = [{}];

                    if (level.materials){
                        for (var j = 0 ; j< level.materials.length; j++){
                            var material = level.materials[j];
                            var materialObj = treeRepo.getItemByID(material);
                            if (materialObj){
                                data.children[j + 1] = {};
                                prepareTreeData(materialObj, data.children[j + 1]);
                            }
                        }
                    }
                    data = data.children[0];
                }
            }
        }

        prepareTreeData(canonicalTree, treeData);

        svg.selectAll('.canonicalTree').remove();
        var svgCanonicalModel = svg.append("g").attr("class", "canonicalTree")
            .attr("transform", function () {
                return "translate(" + vp.margin.x + "," + vp.margin.y + ")";
            });

        function drawTree(treeData) {
            var nodes = tree.nodes(treeData);

            var link = svgCanonicalModel.selectAll("g")
                .data(tree.links(nodes))
                .enter();

            link.append("path")
                .attr("class", "link")
                .attr("d", elbow)
                .style("stroke", function(d){
                    return d.source.color;
                });

            var radius = vp.scale.height / 4;

            function onNodeClickHandler(node){
                var circle = d3.select(this);
                var circles = svgCanonicalModel.selectAll("circle");
                circles.filter(function(d){return d != circle}).classed("selected", false).style("stroke", "steelblue");
                circle.classed("selected", !circle.classed("selected"));
                circle.style("stroke", "red");
                if (onClick) onClick(lyphRepo.getItemByID(node.template));
            }

            var node = svgCanonicalModel.selectAll("g").data(nodes).enter();

            var circle = node.append("circle")
                .attr("r", function(d) { return (d.children)? radius: 0;})
                .style("fill", function(d, i) {return rowColor(i);})
                .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })
                .on("click", onNodeClickHandler);

            node.append("text").text(function (d) {return d.name;})
                .attr("dx", 10)
                .attr("dy", radius / 4)
                .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });

            var vpIcon = new Plots.vp({
                scale : {width: 20, height: 4},
                size  : {width: 20, height: 20},
                orientation: "vertical"});

            function onLyphClickHandler(lyph){
                if (onClick) onClick(lyph);
            }

            tree.links(nodes).forEach(function(d){
                vpIcon.margin = {
                    x: (d.source.x + d.target.x) / 2 + 5,
                    y: (d.source.y + d.target.y) / 2 - 10};

                if (d.source && d.source.level){
                    var lyphTemplateID = d.source.level.template;
                    if (lyphTemplateID){
                        lyph = lyphRepo.getItemByID(lyphTemplateID);
                        if (lyph)
                            lyph.drawIcon(svgCanonicalModel, vpIcon, onLyphClickHandler);
                    }
                }
            });



            function formatData(d){
                var str = JSON.stringify(d.level.getJSON());
                return str.split(',').join(",\n");
            }

            Plots.assignHint(circle, formatData);

            function elbow(d, i) {
                return "M" + d.source.x + "," + d.source.y
                    + "H" + d.target.x + "V" + d.target.y
                    + (d.target.children ? "" : ("v" + vp.scale.height));
            }
        }

        var tree = d3.layout.tree()
            .separation(function(a, b) { return a.parent === b.parent ? 1 : .5; })
            .size([vp.size.width, vp.size.height]);
        drawTree(treeData);
    };

    this.drawCanonicalModel_Linear = function(svg, vp, onClick){
        var tree = this;
        svg.selectAll('.canonicalTree').remove();
        var svgCanonicalModel = svg.append("g").attr("class", "canonicalTree")
            .attr("transform", function () {
                return "translate(" + vp.margin.x + "," + vp.margin.y + ")";
            });

        var goodLevels = tree.levelRepo.getValidItems();
        svgCanonicalModel.selectAll("g").data(goodLevels)
            .enter()
            .append("line")
            .attr("x1", vp.scale.width)
            .attr("y1", function(d, i){ return 2 * i * vp.scale.height;})
            .attr("x2", vp.scale.width)
            .attr("y2", function(d, i){
                return 2 * (1 + i) * vp.scale.height;
            });

        function onNodeClickHandler(node){
            var circle = d3.select(this);
            var circles = svgCanonicalModel.selectAll("circle");
            circles.filter(function(d){return d != circle}).classed("selected", false).style("stroke", "steelblue");
            circle.classed("selected", !circle.classed("selected"));
            circle.style("stroke", "red");
            if (onClick) onClick(lyphRepo.getItemByID(node.template));
        }

        var radius = vp.scale.height / 4;
        //Fake level to display last node:
        goodLevels.push(new CanonicalTreeLevel());

        //Draw nodes
        var circle = svgCanonicalModel.selectAll("g")
            .data(goodLevels)
            .enter()
            .append("circle")
            .attr("cx", vp.scale.width)
            .attr("cy", function(d, i){ return 2 * i * vp.scale.height;})
            .attr("r", function(d, i) {
                    if (i == goodLevels.length - 1) return 0;
                    return radius;})
            .style("fill", function(d, i) {return rowColor(i);})
            .on("click", onNodeClickHandler);

        function formatData(d){
            var str = JSON.stringify(d.getJSON());
            return str.split(',').join(",\n");
        }
        Plots.assignHint(circle, formatData);

        svgCanonicalModel.selectAll("g")
            .data(goodLevels).enter()
            .append("text")
            .attr("dx", vp.scale.width + 10)
            .attr("dy", function(d, i){ return 2 * i * vp.scale.height + radius / 2;})
            .text(function (d, i) {
                return (i != goodLevels.length - 1)? "#" + (i+1): "";
            });

        //Draw lyph icons

        var vpIcon = new Plots.vp({
            scale : {width: 20, height: 4},
            size  : {width: 20, height: 20},
            margin: {x: vp.scale.width + 5, y: vp.scale.height},
            orientation: "vertical"});

        function onLyphClickHandler(lyph){
            if (onClick) onClick(lyph);
        }

        for (var i = 0; i < goodLevels.length; i++){
            var lyph = lyphRepo.getItemByID(goodLevels[i].template);
            if (lyph){
                vpIcon.margin.y = 2 * (i + 0.25) * vp.scale.height;
                lyph.drawIcon(svgCanonicalModel, vpIcon, onLyphClickHandler);
            }
        }

        return {width: vp.scale.width + vpIcon.margin.x + vpIcon.size.width,
            height: 2 * goodLevels.length * vp.scale.height}
    };

    this.drawBranchingFactor = function(svg, vp, onClick){
        var tree = this;
        svg.selectAll('.branchingFactor').remove();
        var barSvg = svg.append("g").attr("class", "branchingFactor");

        var goodLevels = tree.levelRepo.getValidItems();
        if (goodLevels.length < 1) return {width: 0, height: 0};
        var branchingFactors = [];
        var prev = 1;

        for (var i = 0; i < goodLevels.length; i++){
            var d = goodLevels[i];
            branchingFactors.push({domain: i + 1,
                value: prev,
                color: rowColor(i)});
            prev = prev * d.branchingFactor;
        }
        var caption = "Est. edges";
        var maxValue = branchingFactors[branchingFactors.length - 1].value;
        if (maxValue > 16){
            branchingFactors.map(function(d){d.value = Math.log(d.value);});
            maxValue = Math.log(maxValue);
            caption += " (log)";
        }
        var size  = {
            width: Math.max(100, maxValue * vp.scale.width),
            height: (vp.scale.height + 20) * branchingFactors.length
        };
        var branchingFactorVP = new Plots.vp({
            scale  : vp.scale,
            size   : size,
            margin : vp.margin,
            padding: {y:20}
        });
        Plots.horizontalBarChart(barSvg, branchingFactorVP, branchingFactors, caption, onClick);
        return size;
    };

    this.drawLengthDistribution = function(svg, vp, onClick){
        svg.selectAll('.length').remove();
        var barSvg = svg.append("g").attr("class", "length");
        var scale = {width: 1, height: vp.scale.height}; //width = #px per value
        var caption = "Length" + ((scale.width != 1)? " (x" + scale.width+ ")" : "");
        return this.drawDistrChart(barSvg, vp.margin, scale, "length", caption, onClick);
    };

    this.drawRadiusDistribution = function(svg, vp, onClick){
        svg.selectAll('.radius').remove();
        var barSvg = svg.append("g").attr("class", "radius");
        var scale = {width: 1, height: vp.scale.height}; //width = #px per value
        var caption = "Radius" + ((scale.width != 1)? " (x" + scale.width+ ")" : "");
        return this.drawDistrChart(barSvg, vp.margin, scale, "radius", caption, onClick);
    };

    this.drawDistrChart = function(svg, offset, scale, property, title, onClick){
        var goodLevels = this.levelRepo.getValidItems();
        if (goodLevels.length < 1) return {width: 0, height: 0};
        var displayData = [goodLevels.length];
        for (var i = 0; i < goodLevels.length; i++){
            var lyph = lyphRepo.getItemByID(goodLevels[i].template);
            if (lyph){
                var mean = 0;
                if (lyph[property]) mean = lyph[property].mean;
                var stDev = 0;
                if (lyph[property]) stDev = lyph[property].stDev;
                if (!(mean && stDev)) {
                    //TODO derive from min/max
                }
                displayData[i] = {
                    domain: i + 1,
                    value: mean,
                    variation: stDev,
                    color: rowColor(i)};
            }
        }
        var size = {
            width: d3.max(displayData, function (d) {return d.value + d.variation;}) * scale.width,
            height: (scale.height + 20) * displayData.length
        };
        var chartBarVP = new Plots.vp({
            scale: scale,
            size: size,
            margin: offset,
            padding: {y: 20}
        });
        Plots.horizontalDistrChart(svg, chartBarVP, displayData, title, onClick);
        return size;
    };

    function displayHeader(svgTree, caption){
        svgTree.append("text")
            .attr("class", "treeTitle")
            .attr("x", 10)
            .attr("y", 10)
            .attr("text-anchor", "left")
            .style("font-size", "14px")
            .text(caption);
    }

    this.draw = function(svg, vp, onClick){
        svg.selectAll(".treeTitle").remove();
        var svgTree = svg.select(".tree");
        displayHeader(svgTree, this.id + " - " + this.name);
        //Canonical tree*******************************************************************
        this.drawCanonicalModel_Branching(svgTree, vp, onClick);
    };

    this.drawPlots = function(svg, vp, onClick){
        svg.selectAll(".treeTitle").remove();
        var svgTree = svg.select(".tree");
        displayHeader(svgTree, this.id + " - " + this.name);

        //Tree statistics: accumulate size to shift subsequent plots
        var size = {width:0, height: 0}, offset = {x: 0, y: vp.margin.y};

        //Branching factor ***************************************************************
         offset.x += size.width + vp.margin.x;
         var branchingFactorVP = new Plots.vp({
         scale: vp.scale,
         size: vp.size,
         margin: offset});
         size = this.drawBranchingFactor(svgTree, branchingFactorVP, onClick);

        //Length *******************************************************************
        offset.x += Math.max(100, size.width) + vp.margin.x;
        var lengthDistributionVP = new Plots.vp({
            scale: vp.scale,
            size: vp.size,
            margin: offset});
        size = this.drawLengthDistribution(svgTree, lengthDistributionVP, onClick);

        //Width *******************************************************************
        offset.x += Math.max(100, size.width) + vp.margin.x;
        var radiusDistributionVP = new Plots.vp({
            scale: vp.scale,
            size: vp.size,
            margin: offset});
        this.drawRadiusDistribution(svgTree, radiusDistributionVP, onClick);
    }
}

function CanonicalTreeRepo(items) {
    RepoEditor.call(this, items);
    this.urlExtension = "/canonicalTrees";

    this.levelRepo = new CanonicalTreeLevelRepoFull([]);

    this.beforeLoad = function(){
        return this.levelRepo.load(this.url);
    };

    this.defaultObject = function(){
        var proto = Object.create(Entities.canonicalTree);
        proto.status = "tmp";
        proto.repository = this;
        return new CanonicalTree(proto);
    }
}

/**********************************/
/*Tree level*/
/**********************************/
function CanonicalTreeLevel(obj) {
    Editor.call(this);
    this.jsonEntity = Object.create(Entities.canonicalTreeLevel);
    this.urlExtension = "/canonicalTreeLevel";

    this.createContent = function(obj){
        for (var prop in obj)
            this[prop] = obj[prop];

        if (obj){
            if (obj.materials){
                for (var i = 0; i < obj.materials.length; i++){
                    var newItem = obj.materials[i];
                    if (typeof newItem === "object"){
                        //JSON prototypes
                        if (typeof newItem !== CanonicalTree.class)
                            newItem = new CanonicalTree(newItem)
                    } else {
                        //Identifiers (when pre-loaded from server)
                        if (typeof newItem === "number")
                            newItem = new CanonicalTree({id: newItem});
                    }
                    this.materials[i] = newItem;
                }
            }
        }
    };

    this.createContent(obj);

    this.getHeaderTitle = function(){
        return this.id + " - " + this.name;
    };

    this.icon = $('<img src="images/level.png" class="icon">');

    this.validate = function(){
        var d = this;
        if ((d.branchingFactor < 1) || (d.branchingFactor > 2))
            return "Level branching factor is out of range";
        if ((d.skipProbability < 0) || (d.skipProbability > 1))
            return "Level skip probability is incorrectly defined";
        if (!d.template) return "LyphTemplate is not defined";

        if (d.materials){
            var data = [];
            var getDescendants = function(root){//root = level
                if (!root) return;
                if (!root.materials) return;
                root.materials.forEach(function(material){
                    data.push(material);
                    var materialObj = treeRepo.getItemByID(material);
                    if (materialObj && materialObj.levelRepo){
                        materialObj.levelRepo.getValidItems().forEach(function(level){
                            getDescendants(level);
                        });
                    }
                });
            };
            getDescendants(d);
            if (data.indexOf(d.tree) > -1){
                return "Materials or their descendants cannot include the parent canonical tree";
            }
        }
        return "";
    };

    this.getEditorObject = function(){
        if (this.editor){
            var newObj = {validate: this.validate, tree: this.tree};
            newObj.name = Components.getInputValue(this.editor, "name");
            newObj.branchingFactor = parseFloat(Components.getInputValue(this.editor, "branchingFactor"));
            if (isNaN(newObj.branchingFactor)) newObj.branchingFactor = this.jsonEntity.branchingFactor;
            newObj.skipProbability = parseFloat(Components.getInputValue(this.editor, "skipProbability"));
            if (isNaN(newObj.skipProbability)) newObj.skipProbability = this.jsonEntity.skipProbability;
            newObj.template = parseInt(Components.getInputValue(this.editor, "template"), 10);

            var materials = Components.getInputValue(this.editor, "materials");
            if (materials)
                newObj.materials = materials.map(function(d){return parseInt(d, 10);});
            else
                newObj.materials = [];

            return newObj;
        }
        return null;
    };

    this.createEditor = function(panel){
        var d = this;
        var editPanel = d.createEditPanel(panel);

        //id
        Components.createDisabledInput(d.id, "id", "ID").appendTo(editPanel);
        //name
        Components.createTextInput(d.name, "name", "Name").appendTo(editPanel);
        //branchingFactor
        Components.createNumberInput(d.branchingFactor, "branchingFactor", "Branching factor", 1, 2, 0.1).appendTo(editPanel);
        //skipProbability
        Components.createNumberInput(d.skipProbability, "skipProbability", "Skip probability", 0, 1, 0.1).appendTo(editPanel);
        //LyphTemplate
        var getOptions = function(){return lyphRepo.getItemList();};
        Components.createSelect2Input(d.template, d.template, "template", "LyphTemplate", getOptions).appendTo(editPanel);

        //materials
        var getOptions = function(){return treeRepo.getItemList();};
        Components.createSelect2InputMulti(d.materials, d.materials, "materials", "Subtrees", getOptions).appendTo(editPanel);

        this.editor = editPanel;
    };
}

function CanonicalTreeLevelRepo(items, parent){
    RepoEditor.call(this, items);
    this.parent = parent;
    this.urlExtension = "/canonicalTreeLevel";

    this.setParent = function(parent){
        var repo = this;
        repo.parent = parent;
        repo.items.forEach(function(d){
            d.tree = parent.id;
        })
    };

    this.setParent(parent);

    this.beforeCommit = function(){
        var repo = this;
        if (!repo.parent ||!repo.parent.id){
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

    this.defaultObject = function(){
        var proto = Object.create(Entities.canonicalTreeLevel);
        proto.tree = this.parent.id;
        proto.position = this.items.length + 1;
        proto.status = "tmp";
        proto.repository = this;
        return new CanonicalTreeLevel(proto);
    };

    this.add = function(item){
        this.addAt(item, this.items.length);
    };

    this.load = function(url){
        this.url = url;
        return this.loadDependent(this.url + "/canonicalTrees/" + this.parent.id + "/levels");
    };

    this.createContentPanel = function(panel){
        this.contentPanel = Components.createFieldSet(panel, "Levels");
    }
}

function CanonicalTreeLevelRepoFull(items){
    RepoEditor.call(this, items);
    this.parent = parent;
    this.urlExtension = "/canonicalTreeLevel";
    this.defaultObject = function(){
        var proto = Object.create(Entities.canonicalTreeLevel);
        proto.position = this.items.length + 1;
        proto.status = "tmp";
        proto.repository = this;
        return new CanonicalTreeLevel(proto);
    };
}

/************************************/
/*Generated tree sample*/
/************************************/
function TreeSampleNode(id, name, parent, children, depth, link){
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.children = children;
    this.depth = depth;
    this.link = link;
}

function TreeSampleLink(lyphTemplate, color){
    this.length = 30;
    this.width = 2;
    this.lyph = null;
    this.color = color;

    if (lyphTemplate) {
        if (lyphTemplate.generate)
            this.lyph = lyphTemplate.generate();
        if (lyphTemplate.length && lyphTemplate.length.generate)
            this.length = lyphTemplate.length.generate();
        if (lyphTemplate.radius && lyphTemplate.radius.generate)
            this.width = lyphTemplate.radius.generate() * 2;
    }
}

function TreeSample(canonicalModel) {
    this.canonicalModel = canonicalModel;

    this.generate = function(){
        var cm = this.canonicalModel;

        var goodLevels = this.canonicalModel.levelRepo.getValidItems();
        if (!goodLevels) return null;
        //Fake leaf node!
        goodLevels.push(new CanonicalTreeLevel());

        var nodeIndex = 1;
        var sample = generate(null, 0);
        return sample;

        function createLevel(parent, depth){
            var child1 = generate(parent, depth + 1);
            if (child1) parent.children.push(child1);
            var twoChildren = Math.random() < (goodLevels[depth + 1].branchingFactor - 1);
            if (twoChildren) {
                var child2 = generate(parent, depth + 1);
                if (child2 != null)
                    parent.children.push(child2);
            }
        }

        function processSubTrees(parent, level){
            if (level.materials){
                for (var j = 0 ; j < level.materials.length; j++){
                    var subtreeID = level.materials[j];
                    var subtreeObj = treeRepo.getItemByID(subtreeID);
                    if (subtreeObj){
                        var treeSample = subtreeObj.generate();
                        if (!parent.children) parent.children = [];
                        parent.children.push(treeSample.root);

                    }
                }
            }
        }

        function generate(parent, depth){
            var link = null;
            var level = goodLevels[depth];
            if (goodLevels[depth]) {
                var lyphTemplate = lyphRepo.getItemByID(level.template);
                if (lyphTemplate)
                    link = new TreeSampleLink(lyphTemplate, cm.color);
            }

            var label = "#" + (depth + 1) + " (" + level.tree + ")";
            if ((depth + 1) >= goodLevels.length) label = "";
            var node = new TreeSampleNode(level.tree + "_" + nodeIndex++, label, parent, [], depth, link);
            if (depth < goodLevels.length - 1) {
                if ((Math.random() < level.skipProbability) && (parent != null)){
                    if ((depth + 1) < goodLevels.length - 1){
                        parent.children = [];
                        for (var i = 0; i < 2; i++){
                            createLevel(parent, depth);
                            processSubTrees(parent, level);
                        }
                    }
                } else {
                    node.children = [];
                    createLevel(node, depth);
                    processSubTrees(node, level);
                }
            }
            return node;
        }
    };

    this.root = this.generate();

    this.draw = function(svg, vp, onClick) {
        var root = this.root, duration = 400;
        var tree = d3.layout.tree().size([vp.size.width, vp.size.height]);

        var diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });
        svg.selectAll('g.treeSample').remove();
        svg = svg.append("g")
            .attr('class', 'treeSample')
            .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")");

        update(root);

        function update(source) {
            var nodes = tree.nodes(root), links = tree.links(nodes);

            var node = svg.selectAll("g.node").data(nodes, function (d) {return d.id;});

            function clickHandler(node){
                var circle = d3.select(this);
                var circles = svg.selectAll("circle");
                circles.filter(function(d){return d != circle}).classed("selected", false).style("stroke", "steelblue");
                circle.classed("selected", !circle.classed("selected"));
                circle.style("stroke", "red");
                if (onClick) onClick(node);
            }

            var nodeEnter = node.enter().append("g").attr("class", "node");
            nodeEnter.append("circle").on("click", clickHandler);
            nodeEnter.append("text")
                .attr("dx", 10)
                .text(function (d) {return d.name;});

            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";});

            nodeUpdate.select("circle")
                .attr("r", function (d) {return !d.children? 0: 5;})
                .style("fill", function (d) {
                    return CSS_COLOR_NAMES [colorStep * d.depth % CSS_COLOR_NAMES.length];
                });

            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function () {return "translate(" + source.x + "," + source.y + ")";})
                .remove();

            var link = svg.selectAll("path.link").data(links);

            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function () {
                    if (!source.x0) source.x0 = 0;
                    if (!source.y0) source.y0 = 0;
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .style("stroke", function(d){return d.source.link.color;})
                .style("stroke-width", function(d){return d.source.link.width;});

            link.transition().duration(duration).attr("d", diagonal);

            link.exit().transition().duration(duration)
                .attr("d", function () {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
    }
}
