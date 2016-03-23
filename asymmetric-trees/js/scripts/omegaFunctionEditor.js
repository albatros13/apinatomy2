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
                                                content: '<div class="treeDefinition">' +
                                                '<div class="table" style="margin: 15px;"></div>' +
                                                '<svg class="tree" style="min-width: 500px; min-height: 500px;"></svg>' +
                                                '</div>'

                                            }
                                        },
                                        {
                                            type: 'component',
                                            componentName: 'Parameters',
                                            height: 50,
                                            componentState: {
                                                label: 'Tree statistics',
                                                content: '<div class="treePlots">' +
                                                '<div class="table" style="margin: 15px;"></div>' +
                                                '<svg class="tree" style="min-width: 500px; min-height: 500px;"></svg>' +
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
                                            componentState: {
                                                label: 'Tree sample',
                                                content: '<svg class="treeSample" ' +
                                                'style="min-width: 500px; min-height: 500px;"></svg>'
                                            }
                                        },
                                        {
                                            type: 'component',
                                            componentName: 'LyphTemplate',
                                            showPopoutIcon: false,
                                            width: 25,
                                            componentState: {
                                                content:
                                                '<div id="lyphTreemap" class="lyphTreemap"></div>' +
                                                '<svg class="lyph" style="width: 300px; height: 300px;"></svg>',
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

    myLayout.registerComponent( 'Tree', function( container, componentState ){
        container.getElement().html(componentState.content);
    });

    myLayout.registerComponent( 'Parameters', function( container, componentState ){
        container.getElement().html(componentState.content);
    });

    myLayout.registerComponent( 'CanonicalTreeRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
    });

    myLayout.registerComponent( 'TreeSample', function( container, componentState ){
        container.getElement().html(componentState.content);
    });

    myLayout.registerComponent( 'LyphTemplate', function( container, componentState ){
        container.getElement().html(componentState.content);
    });

    myLayout.init();
    myLayout.on("initialised", function(){
        var windowSize = {width: myLayout.width * 0.4 - 20, height: myLayout.height / 2 - 20};
        initEditor(windowSize);
    });

    function initEditor (windowSize) {

        var lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
        var treeRepo = new ApiNATOMY2.CanonicalTreeRepo([], lyphRepo);

        //TreeViewer
        var svgTree = d3.select('.treeDefinition');
        var treeVP = new ApiNATOMY2.VisualParameters({
            scale: {width: 20, height: 20},
            size: windowSize,
            margin: {x: 20, y: 50}});

        //PlotViewer
        var svgTreePlots = d3.select('.treePlots');
        var treePlotsVP = new ApiNATOMY2.VisualParameters({
            scale: {width: 20, height: 20},
            size: windowSize,
            margin: {x: 20, y: 50}});

        //LyphViewer
        var divLyphTemplate  = d3.select('.lyphTreemap');
        var svgLyphTemplateVP = new ApiNATOMY2.VisualParameters({
            scale: {width: 200, height: 30},
            size: windowSize,
            margin: {x: 20, y: 20}});

        //TreeSampleViewer
        var svgTreeSampleVP = new ApiNATOMY2.VisualParameters({
            scale: {width: 20, height: 30},
            size: windowSize,
            margin: {x: 20, y: 20}});
        var svgSampleTree  = d3.select('.treeSample');


        var selectedTree = null;
        var selectedLyph = null;
        var selectedLevelSample = null;

        var onSelectTree = function(d){
            selectedTree = d;
            syncSelectedTree(true);
        };

        var onSelectTreeSampleNode = function(d){
            if (selectedLevelSample != d){
                selectedLevelSample = d;
            }
        };

        var onSelectLyph = function(d){
            if (d && (selectedLyph != d)){
                selectedLyph = d;
                syncSelectedLyph();
            }
        };

        (function(){
            lyphRepo.load("http://open-physiology.org:8889")
                .then(function(){
                    return treeRepo.load("http://open-physiology.org:8889");
                });

            treeRepo.createEditors($('#treeRepo'), onSelectTree);
            if (treeRepo.items){
                selectedTree = treeRepo.items[0];
                syncSelectedTree(true);
            }
        })();

        function syncSelectedLyph(){
            if (selectedLyph){
                selectedLyph.drawAsTreemap(divLyphTemplate, svgLyphTemplateVP, null);
            }
        }

        function syncSelectedTree(isGenerateSample){
            if (selectedTree){
                selectedTree.draw(svgTree, treeVP, onSelectLyph);
                selectedTree.drawPlots(svgTreePlots, treePlotsVP, null);
                var treeSample = null;
                if (isGenerateSample)
                    treeSample = selectedTree.generate();
                else
                    treeSample = selectedTree.getSample();
                if (treeSample)
                    treeSample.draw(svgSampleTree, svgTreeSampleVP, onSelectTreeSampleNode);
            }
        }
    }
})();




