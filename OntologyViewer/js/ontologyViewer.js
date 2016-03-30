var ontologyViewer = function () {

    var links = [];
    var nodeAnnotations = [];
    var resources = {
        fma: {relations: "resources/fmaParts.txt", annotations: "resources/fmaNames.txt", prefix: "FMA"},
        cl: {relations: "resources/cl-basicRelations.txt", annotations: "resources/cl-basicNames.txt", prefix: "CL"}
    };

    var graph = new Graph(links, nodeAnnotations);
    var nodeInfo = $( "#nodeInfo");
    var linkInfo = $( "#linkInfo");
    var graphInfo = $( "#graphInfo");

    graph.nodeClickHandler = function(d){
        nodeInfo.html(getHTMLNodeAnnotation(d));
    };
    graph.linkClickHandler = function (d){
        linkInfo.html(getHTMLLinkAnnotation(d));
    };

    $( "#btnUpdate" ).on('click', function() {
        updateView(true);
    });

    $( "#btnExtend" ).on('click', function() {
        updateView(false);
    });

    $( "#btnClean" ).on('click', function() {
        graph.reset();
        graph.update();
    });

    $( "#btnLoad" ).on('click', function() {
        selectOntologies();
    });

    function updateView(reset){
        var root =  $('#ontid').val();
        if (root.length == 0) return;
        var radius = $("#radius").val();
        if (!radius) radius = 2;
        var step = $("#step").val();
        if (!step) step = 1;
        graph.incrementStep = step;
        if (reset){
            graph.createSubGraph(root, radius);
        } else {
            graph.expandSubGraph(root, radius);
        }
        nodeInfo.html("");
        linkInfo.html("");
    }

    function loadOntologyData(ontology){
        var file = resources[ontology].relations;
        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                //var count = 0;
                for(var i = 0; i < lines.length; i++){
                    var line = lines[i];
                    var terms = line.split(' ');
                    if (terms.length >= 3){
                        var link = {source: extractID(terms[1]), target: extractID(terms[2]),
                            type: terms[0], ontology: ontology};
                        links.push(link);
                        //if (link.source == "CL_0002371" || link.target == "CL_0002371")
                        //count++;
                    }
                }
                //console.dir(count);
                resources[ontology].included = true;
                graphInfo.html("Loaded relations: " + graph.links.length);
                if (!resources[ontology].annotated)
                    loadNodeAnnotations(ontology);
            }
        });
    }

    function loadNodeAnnotations(ontology){
        var file = resources[ontology].annotations;
        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                for(var i = 0; i < lines.length; i++){
                    var line = lines[i];
                    var endOfURI = line.indexOf(' ');
                    if (endOfURI > -1){
                        var URI = line.substring(0, endOfURI);
                        var id = extractID(line.substring(0, endOfURI));
                        nodeAnnotations[id] = {label: line.substring(endOfURI + 1), URI: URI}
                    }
                }
                resources[ontology].annotated = true;
            },
            complete: function(){
                updateView(true);
            }
        });
    }

    function selectOntologies(){
        var toRemove = [];
        $("input:checkbox[name=ontology]").each(function(){
            var ontology = $(this).val();
            if (this.checked){
                if (!resources[ontology].included){
                    loadOntologyData(ontology);
                }
            }
            else {
                if (resources[ontology].included){
                    toRemove.push(ontology);
                    resources[ontology].included = false;
                }
            }
        });
        if (toRemove.length > 0) {
            links = links.filter(function(d){
                return toRemove.indexOf(d.ontology) < 0;
            });
            graph.links = links;
            graphInfo.html("Loaded relations: " + graph.links.length);
        }
        $( "#btnLoad").prop("disabled", true);
    }

    $("input:checkbox[name=ontology]").change(function() {
        $( "#btnLoad").prop("disabled", false);
    });

    selectOntologies();

    $(function() {
        var result = null;
        $( "#name" ).autocomplete({
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
                    $('#ontid').val(extractID(value));
                }
            }
        });
    });
}();
