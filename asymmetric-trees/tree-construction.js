var treeEditor = function () {
    var width = 950, height = 600;
    var panelWidth = 300, panelHeight = 500;

    var svg = d3.select('#app-body .tree')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var treeRepoSvg = d3.select('#app-body .treeRepo').append("svg")
        .attr("width", panelWidth)
        .attr("height", panelHeight);

    var auRepoSvg = d3.select('#app-body .auRepo').append("svg")
        .attr("width", panelWidth)
        .attr("height", panelHeight);


    var treeRepoVP = new VisualParameters("horizontal", 5, 20, panelWidth, panelHeight, 0);
    var auRepoVP = new VisualParameters("horizontal", 30, 5, panelWidth, panelHeight, 0);

    var treeVP = new TreeVisualParameters(width - 2 * panelWidth, height,
            (width - 2 * panelWidth )/ 2, 30, 100, {x:0, y:0});

    var selectedTree = null;
    var selectedAU = null;
    var selectedTreeNode = null;
    var selectedAUNode = null;

    var onSelectAU = function(d){
        if (this != selectedAUNode){
            d3.select(this).style("stroke", "red");
            d3.select(selectedAUNode).style("stroke", "black");
            selectedAUNode = this;
            selectedAU = d;
            updateAUParameters(selectedAU);
        }
    }

    var onSelectTree = function(d){
        if (this != selectedTreeNode){
            d3.select(this).style("stroke", "red");
            d3.select(selectedTreeNode).style("stroke", "black");
            selectedTreeNode = this;
            selectedTree = d;
            syncSelectedTree();
        }
    }

    var onSelectNode = function(d){
        updateTreeLevelParameters(d);
    }

    auRepo.draw(auRepoSvg, auRepoVP, onSelectAU);

    treeRepo.draw(treeRepoSvg, treeRepoVP, onSelectTree);

    selectedTree = treeRepo.trees[0];
    syncSelectedTree();

    /////////////////////////////////////////////////////////////////

    function syncSelectedTree(){
        selectedTree.draw(svg, treeVP, onSelectNode);
        updateTreeParameters(selectedTree);
    }

    function updateAUParameters(au){
        if (au != null){
            d3.select("#auID").property("value", au.id);
            d3.select("#auName").property("value", au.name);
        } else {
            d3.select("#auID").property("value", "");
            d3.select("#auName").property("value", "");
        }
    }

    function updateTreeParameters(tree){
        if (tree != null){
            d3.select("#treeID").property("value", tree.id);
            d3.select("#treeName").property("value", tree.name);
            d3.select("#numLevels").property("value", tree.numLevels);
            if (tree.levels != null){
                d3.select("#selectedLevel").property("max", tree.levels.length);
                updateTreeLevelParameters(tree.levels[0]);
            }
             else{
                cleanTreeLevelParameters();
            }
        }
    }

    function updateTreeLevelParameters(level){
        if (level != null){
            d3.select("#numSelectedLevel").property("value", level.depth);
            d3.select("#branchingFactor").property("value", level.branchingFactor);
            if (Object.getPrototypeOf(level.lengthDistr) === NormalDistribution.prototype)
                d3.select("#lengthDistribution").property("value", 1)
            else
                d3.select("#lengthDistribution").property("value", 0);
            d3.select("#lengthMean-value").text(level.lengthDistr.mean);
            d3.select("#lengthMean").property("value", level.lengthDistr.mean);
            d3.select("#lengthStDev-value").text(level.lengthDistr.stDev);
            d3.select("#lengthStDev").property("value", level.lengthDistr.stDev);
            d3.select("#skipProbability-value").text(level.skipProbability);
            d3.select("#skipProbability").property("value", level.skipProbability);
        }
    }

    function cleanTreeLevelParameters(){
        d3.select("#numSelectedLevel").property("value", 1);
        d3.select("#numSelectedLevel").property("max", 1);
        d3.select("#branchingFactor").property("value", 1);
        d3.select("#lengthDistribution").property("value", 1);
        var lengthAvg = (lengthMean.min + lengthMean.max) / 2;
        d3.select("#lengthMean-value").text(lengthAvg);
        d3.select("#lengthMean").property("value", lengthAvg);
        var lengthStDevAvg = (lengthStDev.min + lengthStDev.max) / 2;
        d3.select("#lengthStDev-value").text(lengthStDevAvg);
        d3.select("#lengthStDev").property("value", lengthStDevAvg);
        d3.select("#skipProbability-value").text(0);
        d3.select("#skipProbability").property("value", 0);
    }

    function generateTree() {
        var newTree = null;
        var selectedTreeIndex = treeRepo.getIndexByID(treeID.value);
        if (selectedTreeIndex > -1)
            if (confirm("A tree with such ID already exists! Update?"))
                newTree = selectedTree;
            else return;

        var mean = eval(lengthMean.value);
        var stDev = eval(lengthStDev.value);
        var newDistribution = (lengthDistribution.value == 1) ? new NormalDistribution(mean, stDev) : new UniformDistribution(mean, stDev);
        var newBranchingFactor = eval(branchingFactor.value);
        var newSkipProbability = eval(skipProbability.value);

        var newNumLevels = eval(numLevels.value);
        var treeLevels = [];
        for (var i = 0; i < newNumLevels; i++){
            var defaultTreeLevel = new TreeLevel(i + 1, newBranchingFactor, newDistribution, newSkipProbability);
            treeLevels.push(defaultTreeLevel);
        }
        newTree = new AsymmetricTree(treeID.value, treeName.value, numLevels.value, treeLevels);
        if (selectedTreeIndex > -1)
            treeRepo.replaceAt(newTree, selectedTreeIndex);
        else{
            treeRepo.addAt(newTree, 0);
        }
        treeRepo.draw(treeRepoSvg, treeRepoVP, onSelectTree);
        selectedTree = newTree;
        syncSelectedTree();
    }

    d3.select("#treeGenerate").on("click", function() {
        generateTree();
    })

    d3.select("#treeRestore").on("click", function() {
        if (selectedTree != null){
            updateTreeParameters(selectedTree);
        }
    })

    d3.select("#treeDelete").on("click", function() {
        if (selectedTree != null) {
            var index = treeRepo.getIndexByID(selectedTree.id);
            if (index > -1) {
                if (confirm("Delete tree " + selectedTree.id + "?")) {
                    treeRepo.removeAt(index);
                    treeRepo.draw(treeRepoSvg, treeRepoVP, onSelectTree);
                    if (treeRepo.trees.length > 0) {
                        selectedTree = treeRepo.trees[0];
                        syncSelectedTree();
                    }
                }
            }
        }
    })

    d3.select("#lengthMean").on("input", function () {
        d3.select("#lengthMean-value").text(lengthMean.value);
    });

    d3.select("#lengthStDev").on("input", function () {
        d3.select("#lengthStDev-value").text(lengthStDev.value);
    });

    d3.select("#numSelectedLevel").on("input", function () {
        if (selectedTree != null && selectedTree.levels != null){
            if (selectedTree.levels.length > numSelectedLevel.value){
                updateTreeLevelParameters(selectedTree.levels[numSelectedLevel.value]);
            }
        }
    });

    d3.select("#levelUpdate").on("click", function() {
        if (selectedTree != null && selectedTree.levels != null){
            var selectedLevelDepth = eval(numSelectedLevel.value);
            if (selectedTree.levels.length > selectedLevelDepth){
                var mean = eval(lengthMean.value);
                var stDev = eval(lengthStDev.value);
                var newBranchingFactor = eval(branchingFactor.value);
                var newSkipProbability = eval(newSkipProbability.value);
                var newDistribution = (lengthDistribution.value == 1) ? new NormalDistribution(mean, stDev) : new UniformDistribution(mean, stDev);
                selectedTree.levels[selectedLevelDepth - 1].branchingFactor = newBranchingFactor;
                selectedTree.levels[selectedLevelDepth - 1].lengthDistr = newDistribution;
                selectedTree.levels[selectedLevelDepth - 1].skipProbability = newSkipProbability;
                selectedTree.root = selectedTree.generateTree();
                selectedTree.draw(svg, treeVP, onSelectNode);
            }
        }
    })

    d3.select("#levelRestore").on("click", function() {
        if (selectedTree != null && selectedTree.levels != null){
            if (selectedTree.levels.length > numSelectedLevel.value){
                updateTreeLevelParameters(selectedTree.levels[numSelectedLevel.value]);
            }
        }
    })
}();


