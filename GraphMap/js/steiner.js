var steiner = function(edges, required){
    //edge = {from, to, weight}

    var nodes = {};
    edges.forEach(function(edge){
        ["to", "from"].forEach(function(prop){
            if (!nodes[edge[prop].id]) nodes[edge[prop].id] = edge[prop];
        });
    });

    //Dijkstra
    function shortestPath(start, end){
        var infinity = 1000000;

        for (var key in nodes){
            nodes[key].distance = infinity;
            nodes[key].visited = false;
        }
        if (nodes[start.id])
            nodes[start.id].distance = 0;
        else return []; //start is disconnected

        function traverse(current){
            var neighbourLinks = edges.filter(function(edge){
                return ((edge.from.id == current.id) && !edge.to.visited);
            });

            var finished = false;
            neighbourLinks.forEach(function(edge){
                edge.to.tmpDistance = current.distance + edge.weight;
                if (edge.to.distance > edge.to.tmpDistance) {
                    edge.to.distance = edge.to.tmpDistance;
                    edge.to.predecessor = current;
                }
                if (edge.to.id == end.id) finished = true;
            });

            current.visited = true;

            if (!finished){
                var unvisited = [];
                for (var key in nodes)
                    if (!nodes[key].visited) unvisited.push(nodes[key]);
                if (unvisited.length > 0) {
                    var nextCenter = unvisited[0];
                    unvisited.forEach(function (node) {
                        if (nextCenter.distance > node.distance) nextCenter = node;
                    });
                    if (nextCenter.distance != infinity)
                        traverse(nextCenter);
                }
            }
        }

        traverse(start);

        var solution = [];
        var last = end;
        while (last.predecessor && (last.id != start.id)
            //&& !(last.predecessor.predecessor && (last.predecessor.predecessor.id == last.id))
            ){
            var link = edges.find(function(edge){
                return (edge.from.id == last.predecessor.id) && (edge.to.id == last.id);});
            solution.push(link);
            last = last.predecessor;
        }

        for (var key in nodes){
            delete nodes[key]["tmpDistance"];
            delete nodes[key]["predecessor"];
        }

        return solution;
    }

    var solution = [];
    for (var i = 0; i < required.length; i++){
        for (var j = 0; j < required.length; j++){
            if (i != j){
                var path = shortestPath(required[i], required[j]);
                path.forEach(function(edge){
                    var inSolution = solution.find(function(d){
                        return (d == edge);
                    });
                    if (!inSolution) solution.push(edge);
                })
            }
        }
    }
    return solution;
};