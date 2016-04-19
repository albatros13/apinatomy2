    function createBrainGraph(){
        var file = "resources/AE_Brain_FMA_unique.txt";
        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                var fmaNodes = {};

                var notFound = [];

                //Create list of all nodes
                graph.nodes = {};
                graph.links.forEach(function(link) {
                    ["source", "target"].forEach(function(prop){
                        var id = link[prop];
                        if (link[prop].id) id = link[prop] = link[prop].id;
                        graph.nodes[id] = {id: id};
                    });
                });
               // console.dir("All FMA graph nodes:");
               // console.dir(graph.nodes);

                for(var i = 0; i < lines.length; i++){
                    var fmaID = lines[i].trim();
                    if (graph.nodes[fmaID]) {
                        if (!fmaNodes[fmaID])
                            fmaNodes[fmaID] = graph.nodes[fmaID];
                    }
                    else
                        notFound.push(fmaID);
                }

               // console.dir("Extracted FMA nodes:");
               // console.dir(fmaNodes);

               // console.dir("Not found FMA nodes:");
               // console.dir(notFound);

                var fmaLinks = graph.links.filter(function(link){
                    return (fmaNodes[link.source] && fmaNodes[link.target]);
                });

                console.dir("Extracted direct links:");
                console.dir(fmaLinks);

                var fromSet = {};
                var toSet = {};
                graph.links.forEach(function(link){
                    if (fmaNodes[link.source] && !fmaNodes[link.target]) fromSet[link.source] = {id: link.source};
                    if (!fmaNodes[link.source] && fmaNodes[link.target]) toSet[link.target] = {id: link.target};
                });

               // console.dir("Remaining source nodes:");
               // console.dir(d3.keys(fromSet));

               // console.dir("Remaining target nodes:");
               // console.dir(d3.keys(toSet));

                //var count = 0;
                //var prev = fmaLinks.length;
                /*
                for (var start in fromSet){
                    findPaths(start, toSet, fmaLinks);
                    /*
                    count++;
                    if (count % 10 == 0) {
                        console.dir("Processed " + count + " start nodes");
                        console.dir("Added " + fmaLinks.length - prev + " links");
                        prev = fmaLinks.length;
                    }*/
                //}

                //console.dir("Extracted path links:");
                //console.dir(fmaLinks.filter(function(d){return d.type == "Path";}));

                fmaLinks.forEach(function(d){
                    console.log(d.type + " " + d.source + " " + d.target);
                });

                graph.links = fmaLinks;
                graphInfo.html("Loaded relations: " + graph.links.length);
            }
        });

        function findPaths(start, toSet, fmaLinks){
            function traverse(rootID){
                var queue = graph.links.filter(function(d){
                    return d.source == rootID;
                });
                if (!queue) return;
                queue.forEach(function(d){
                    if (toSet[d.target]) {
                        var exists = fmaLinks.find(function(link){
                            return (link.source == start && link.target == d.target);
                        });
                        if (!exists)
                            fmaLinks.push({source: start, target: d.target, ontology: "fma", type: "Path"});
                    } else {
                        if (d.target != start)
                            traverse(d.target);
                    }
                });
            }
            return traverse(start);
        }
    }

    /*
    (function(console){

        console.save = function(data, filename){

            if(!data) {
                console.error('Console.save: No data');
                return;
            }

            if(!filename) filename = 'console.json';

            if(typeof data === "object"){
                data = JSON.stringify(data, undefined, 4)
            }

            var blob = new Blob([data], {type: 'text/json'}),
                e    = document.createEvent('MouseEvents'),
                a    = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
    })(console);*/
