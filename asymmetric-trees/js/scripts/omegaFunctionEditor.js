/**
 * Created by Natallia on 04/10/2015.
 */

(function (){

    var config = {
        settings:{
            hasHeaders: true,
            constrainDragToContainer: true,
            reorderEnabled: true,
            selectionEnabled: false,
            popoutWholeStack: false,
            blockedPopoutsThrowError: true,
            closePopoutsOnUnload: true,
            showPopoutIcon: false,
            showMaximiseIcon: true,
            showCloseIcon: true
        },
        content: [{
            type: 'row', //'column',
            content:[
                {
                    type: 'component',
                    componentName: 'CanonicalTreeRepo',
                    title: "Canonical trees",
                    width: 60,
                    showPopoutIcon: false,
                    componentState: {
                        label: 'Trees',
                        content:
                            '<div id="treeRepo" class="treeRepo"></div>'
                    }
                },
                {
                    type: 'row',
                    content: [
                        {
                            type: 'column',
                            content: [
                                {
                                    type: 'stack',
                                    content: [
                                        {
                                            type: 'component',
                                            componentName: 'Tree',
                                            height: 50,
                                            componentState: {
                                                label: 'Tree definition',
                                                content: '<div id="treeDefinition">' +
                                                    '<svg id = "tree"></svg>' +
                                                '</div>'
                                            }
                                        },
                                        {
                                            type: 'component',
                                            componentName: 'Parameters',
                                            height: 50,
                                            componentState: {
                                                label: 'Tree statistics',
                                                content: '<div id="treePlots">' +
                                                    '<svg id = "plots"></svg>' +
                                                '</div>'
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'stack',
                                    content: [
                                        {
                                            type: 'component',
                                            componentName: 'TreeSample',
                                            title: "Tree sample",
                                            componentState: {
                                                label: 'Tree sample',
                                                content: '<svg id="treeSample"></svg>'
                                            }
                                        },
                                        {
                                            type: 'component',
                                            componentName: 'LyphTemplate',
                                            title: "Lyph template",
                                            showPopoutIcon: false,
                                            width: 25,
                                            componentState: {
                                                content:
                                                '<div id="lyphTreemap"></div>',
                                                label: 'LyphTemplate viewer'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
    };

    var myLayout = new GoldenLayout( config );

    var lyphRepo, treeRepo;
    var selectedLyph, selectedTree;
    var svgTree, svgTreePlots, divLyphTemplate, svgSampleTree;

    var treeVP = new ApiNATOMY2.VisualParameters({
        scale: {width: 20, height: 20},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 40}});

    var treePlotsVP = new ApiNATOMY2.VisualParameters({
        scale: {width: 20, height: 20},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 60}});

    var svgLyphTemplateVP = new ApiNATOMY2.VisualParameters({
        scale: {width: 200, height: 30},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 20}});

    var svgTreeSampleVP = new ApiNATOMY2.VisualParameters({
        scale: {width: 20, height: 30},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 20}});

    var dx = 20, dy = 20, minWidth = 300, minHeight = 300;

    myLayout.registerComponent( 'CanonicalTreeRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
            treeRepo = new ApiNATOMY2.CanonicalTreeRepo([], lyphRepo);
            lyphRepo.load("http://open-physiology.org:8889")
                .then(function(){
                    return treeRepo.load("http://open-physiology.org:8889");
                });
            treeRepo.createEditors($('#treeRepo'), onSelectTree);
            if (treeRepo.items){
                selectedTree = treeRepo.items[0];
                syncSelectedTree(true);
            }
        })
    });

    myLayout.registerComponent( 'Tree', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            treeVP.size = {width: container.width - dx, height: container.height - dy};
            svgTree = d3.select('#treeDefinition');
            if (selectedTree)
                selectedTree.draw(svgTree, treeVP, onSelectLyph);
        });
        container.on( 'resize', function(){
            if (container.width < minWidth || container.height < minHeight) return;
            treeVP.size = {width: container.width - dx, height: container.height - dy};
            if (selectedTree)
                selectedTree.draw(svgTree, treeVP, onSelectLyph);
        });
    });

    myLayout.registerComponent( 'Parameters', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            treePlotsVP.size = {width: container.width - dx, height: container.height - dy};
            svgTreePlots = d3.select('#treePlots');
            if (selectedTree){
                selectedTree.drawPlots(svgTreePlots, treePlotsVP, null);
            }
        });
    });

    myLayout.registerComponent( 'TreeSample', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            svgTreeSampleVP.size = {width: container.width - dx, height: container.height - dy};
            svgSampleTree = d3.select('#treeSample');
            if (selectedTree) {
                var treeSample = selectedTree.getSample();
                if (treeSample)
                    treeSample.draw(svgSampleTree, svgTreeSampleVP, null);
            }
        });
        container.on( 'resize', function(){
            if (container.width < minWidth || container.height < minHeight) return;
            svgTreeSampleVP.size = {width: container.width - dx, height: container.height - dy};
            svgSampleTree = d3.select('#treeSample');
            if (selectedTree) {
                var treeSample = selectedTree.getSample();
                if (treeSample)
                    treeSample.draw(svgSampleTree, svgTreeSampleVP, null);
            }
        });
    });

    myLayout.registerComponent( 'LyphTemplate', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            divLyphTemplate = d3.select('#lyphTreemap');
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
        });
        container.on( 'resize', function(){
            if (container.width < minWidth || container.height < minHeight) return;
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
            syncSelectedLyph();
        });
    });

    myLayout.init();

    function onSelectTree(d){
        selectedTree = d;
        syncSelectedTree(true);
    }

    function onSelectLyph(d){
        if (d && (selectedLyph != d)){
            selectedLyph = d;
            syncSelectedLyph();
        }
    }

    function syncSelectedLyph(){
        if (selectedLyph){
            selectedLyph.drawAsTreemap(divLyphTemplate, svgLyphTemplateVP, null);
        }
    }

    function syncSelectedTree(isGenerateSample){
        if (selectedTree){
            selectedTree.draw(svgTree, treeVP, onSelectLyph);
            selectedTree.drawPlots(svgTreePlots, treePlotsVP, null);
            var treeSample;
            if (isGenerateSample)
                treeSample = selectedTree.generate();
            else
                treeSample = selectedTree.getSample();
            if (treeSample)
                treeSample.draw(svgSampleTree, svgTreeSampleVP, null);
        }
    }
})();




