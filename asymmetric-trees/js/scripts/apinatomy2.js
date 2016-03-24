/************************************/
/************************************/
         /*Repository editor*/
/************************************/
var ApiNATOMY2 = (function(){

    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    Array.prototype.equals = function (array) {
        if (!array) return false;

        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            if (this[i] instanceof Array && array[i] instanceof Array) {
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                return false;
            }
        }
        return true;
    };

    //Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});

    //Checks if obj2 preserves properties of obj1 (unassigned properties in obj2 are allowed)
    Object.preserves = function( obj1, obj2 ) {
        if ( obj1 === obj2 ) return true;
        if ( ! ( obj1 instanceof Object ) || ! ( obj2 instanceof Object ) ) return false;
        if (isArray(obj1) || isArray(obj2)) return obj1.equals(obj2);

        if ( obj1.constructor !== obj2.constructor ) return false;

        for ( var p in obj2 ) {
            if (!obj2.hasOwnProperty( p )) continue;
            if (!obj1.hasOwnProperty( p )) return false; //new property set
            if ( obj1[ p ] === obj2[ p ] ) continue;
            if ( ! Object.preserves( obj1[ p ],  obj2[ p ] ) ) return false;
        }
        return true;
    };

    Object.removeProp = function(obj, prop){
        delete obj[prop];
        for ( var p in obj ) {
            if ( typeof( obj[ p ] ) == "object" ) Object.removeProp(obj[p], prop);
        }
    };

    Object.removeFunctions = function(obj){
        for ( var p in obj ) {
            if (typeof obj[p] === "function")
                delete obj[p];
            if ( typeof( obj[ p ] ) == "object" ) Object.removeFunctions(obj[p]);
        }
    };

    function isArray(obj) {
        return (typeof obj !== 'undefined' && obj && obj.constructor === Array);
    }

    function logError(obj){
        console.dir(obj);
    }

    var rowColor = function(i){
        var CSS_COLORS = [
            "#1f77b4", "#ff7f0e","#2ca02c","#d62728","#9467bd",
            "#8c564b","#e377c2","#7f7f7f", "#bcbd22", "#17becf",
            "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099",
            "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395",
            "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300",
            "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
        return CSS_COLORS [i % CSS_COLORS.length];
    };

    var Entities = (function(){
        var my = {};

        my.distribution = {
            min  : 0,
            max  : 0,
            mean : 0,
            stDev: 0,
            type : "Uniform"
        };

        my.layerTemplate = {
            id           : 0,
            name         : "",
            thickness    : {min: 1, max: 1},
            materials    : null,
            lyphTemplate : 0,   //parent id
            position     : 0
            //lyphIdentity (Array[integer], optional),
            //instantiations (Array[integer], optional)
        };

        my.locatedMeasure = {
            id     : 0,
            quality: "", //string,
            lyphTemplate: 0, //integer
            correlations: null, //Array[integer], optional
            bagsOfPathologies: null //Array[integer], optional
        };

        my.lyphTemplate = {
            id              : 0,
            name            : "",
            fmaID           : "",
            layers          : null,
            //materialInLyphs : null,
            //children        : null,
            //instantiations  : null,
            //layerIdentity   : null, //Pointer to a layer
            //materials       : null, //Any lyph template
            //parents         : null, //Any lyph template
            //materialIn      : null, //Array
            locatedMeasures : null,
            length: null,
            radius : null,

        };

        my.canonicalTreeLevel = {
            id                : 0,
            name              : "",
            branchingFactor   : 1,
            skipProbability   : 0,
            template          : 0, //lyph template ID
            tree              : 0, //parent tree id
            connectedTrees    : null,
            position          : 0
        };

        my.canonicalTree = {
            id : 0,
            name : "",
            levels : null
        };

        return my;
    }());

    var Plots = (function() {
        var my = {};

        /*Visualization settings:
         scale: {width, height} - dimensions for one unit
         size: {width, height} - total size of a displayed item
         margin: {x, y}          - offset to place the item on a given canvas
         */
        var vpPrototype = {
            scale: {width: 0, height: 0},
            size : {width: 0, height: 0},
            margin: {x: 0, y: 0},
            padding: {x: 0, y: 0}
        };

        my.vp = function(obj){
            this.jsonEntity = Object.create(vpPrototype);
            for (var prop in obj)
                if (obj.hasOwnProperty(prop)) this[prop] = obj[prop];
        };

        my.treemap = function(tree, canvas, vp, onClick){
            var width = vp.size.width,
                height = vp.size.height;
            var div = canvas.append("div").style("position", "relative");

            var treemap = d3.layout.treemap()
                .size([width, height])
                .sticky(true)
                .padding(function(d) {
                    if (!d.parent) return 0;
                    return [30,10,10,10];
                })
                .sort(function(a,b) {
                    if (a.position && b.position)
                        return b.position - a.position;
                    return 0;
                })
                .value(function(d) {
                    return d.size;
                });

            treemap.mode("dice");

            div.datum(tree).selectAll(".treemapNode")
                .data(treemap.nodes)
                .enter().append("div")
                .attr("class", "treemapNode")
                .call(position)
                .style("background-color", function(d) {return d.color;})
                .append('div')
                .on('click', onClick)
                .text(function(d) { return d.name; });

            function position() {
                this.style("left", function(d) { return d.x + "px"; })
                    .style("top", function(d) { return d.y + "px"; })
                    .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
                    .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
            }
        };

        my.verticalDistrChart = function(svg, vp, dataset, caption, onClick){
            var barChart = my.verticalBarChart(svg, vp, dataset, caption, onClick);

            return barChart.selectAll('.high-low-lines').data(dataset)
                .enter()
                .append('path')
                .attr("class", ".high-low-line")
                .attr('d', function (d, i) {
                    var xCenter = i * (vp.size.width / dataset.length) + (vp.size.width / dataset.length - vp.padding.x) / 2;
                    var yBottom = vp.size.height - (d.value - d.variation) * vp.scale.height;
                    var yTop = vp.size.height - (d.value + d.variation) * vp.scale.height;
                    var dx = 3;
                    if (yBottom == yTop) return ""; // do not draw if there is no difference;
                    return [
                        ' M ', xCenter - dx , ' ', yBottom,
                        ' L ', xCenter + dx , ' ', yBottom,
                        ' M ', xCenter, ' ', yBottom,
                        ' L ', xCenter, ' ', yTop,
                        ' M ', xCenter - dx , ' ', yTop,
                        ' L ', xCenter + dx , ' ', yTop
                    ]
                        .join("");
                })
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", "none");
        };

        my.horizontalDistrChart = function(svg, vp, dataset, caption, onClick){
            var barChart = my.horizontalBarChart(svg, vp, dataset, caption, onClick);

            return barChart.selectAll('.high-low-lines').data(dataset)
                .enter()
                .append('path')
                .attr("class", ".high-low-line")
                .attr('d', function (d, i) {
                    var yMiddle = i * (vp.size.height / dataset.length) + (vp.size.height / dataset.length - vp.padding.y) / 2;
                    var xLeft = (d.value - d.variation) * vp.scale.width;
                    var xRight = (d.value + d.variation) * vp.scale.width;
                    var dy = 3;
                    if (xLeft == xRight) return ""; // do not drawSampleTree if there is no difference;
                    return [
                        ' M ', xLeft, ' ', yMiddle - dy,
                        ' L ', xLeft, ' ', yMiddle + dy,
                        ' M ', xLeft, ' ', yMiddle,
                        ' L ', xRight, ' ', yMiddle,
                        ' M ', xRight , ' ', yMiddle - dy,
                        ' L ', xRight , ' ', yMiddle + dy
                    ]
                        .join("");
                })
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", "none");
        };

        my.verticalBarChart = function(svg, vp, dataset, caption, onClick){
            var barChart = svg.append("g").attr("class", "barChart")
                .attr("transform", function() {
                    return "translate(" + vp.margin.x + "," + vp.margin.y + ")";
                });

            barChart.append("text")
                .attr("x", vp.size.width / 2)
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("text-decoration", "underline")
                .text(caption);

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, vp.size.width], 1).domain(dataset.map(function(d) { return d.domain; }));
            var y = d3.scale.linear().range([vp.size.height, 0]).domain([0, vp.size.height / vp.scale.height]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom").ticks(10);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(5);

            barChart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + vp.size.height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "middle");

            barChart.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Value");

            barChart.selectAll("rect").data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return i * (vp.size.width / dataset.length);
                })
                .attr("y", function(d) {
                    return vp.size.height - d.value * vp.scale.height;  //Height minus data value
                })
                .attr("width", vp.size.width / dataset.length - vp.padding.x)
                .attr("height", function(d) {
                    return d.value * vp.scale.height;  //Just the data value
                })
                .attr("fill", function(d) {
                    return d.color;  //Just the data value
                })
                .on("click", onClick);
            return barChart;
        };

        my.horizontalBarChart = function(svg, vp, dataset, caption, onClick){
            var barChart = svg.append("g").attr('class', 'barChart')
                .attr("transform", function() {
                    return "translate(" + vp.margin.x + "," + vp.margin.y + ")";
                });

            barChart.append("text")
                .attr("x", vp.size.width / 2)
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("text-decoration", "underline")
                .text(caption);

            //var y = d3.scale.ordinal().rangeRoundBands([0, vp.size.height], 1).domain(dataset.map(function(d) { return d.domain; }));

            var x = d3.scale.linear().range([0, vp.size.width]).domain([0, vp.size.width / vp.scale.width]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom").ticks(2);

            /*var yAxis = d3.svg.axis()
             .scale(y)
             .orient("left");
             */
            barChart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + vp.size.height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "middle");

            /*barChart.append("g")
             .attr("class", "y axis")
             .call(yAxis);*/

            var rect = barChart.selectAll("rect").data(dataset)
                .enter()
                .append("rect")
                .attr("y", function(d, i) {
                    return i * (vp.size.height / dataset.length);
                })
                .attr("x", function(d) {
                    return d.x0;
                })
                .attr("height", vp.size.height / dataset.length - vp.padding.y)
                .attr("width", function(d) {
                    return d.value * vp.scale.width;  //Just the data value
                })
                .attr("fill", function(d) {
                    return d.color;
                })
                .on("click", onClick);

            function formatData(d){
                return d.value;
            }
            Plots.assignHint(rect, formatData);

            return barChart;
        };

        my.assignHint = function(element, formatData){
            var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            element.on("mouseover", function(d) {
                    tooltip.transition().duration(200).style("opacity", .9);
                    tooltip.html(formatData(d))
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition().duration(500).style("opacity", 0);
                });
        };
        return my;
    }());

    var Components = (function() {
        var my = {};

        my.getInputValue = function(panel, id){
            var input = panel.find("#" + id);
            if (input.length > 0) return input.val();
            return null;
        };

        my.setInputValue = function(panel, id, value){
            var input = panel.find("#" + id);
            if (input.length > 0)
                input.val(value).trigger("change");
        };

        /*Progress bar*/
        my.createProgressBar = function(update){
            return $('<div class="progress" data-role="progress"></div>');
        };

        my.assignHint = function(element, title, content){
            element.attr("data-role", "hint");
            element.attr("data-hint-background", "#a0a0a0");
            var text = content;
            if (typeof content === "function")
                text = content();
            element.attr("data-hint", title + "|" + text);
        };

        /*Inputs*/
        my.createTextInput = function(value, id, caption){
            var input = $('<input type="text">');
            input.val(value);
            input.attr("id", id);
            var inputPanel = $('<div class="input-control text">');
            input.appendTo(inputPanel);
            var label = $('<label class="block">');
            label.html(caption).appendTo(inputPanel);
            return inputPanel;
        };

        my.createNumberInput = function(value, id, caption, min, max, step){
            var input = $('<input type="number">');
            input.val(value);
            input.attr("id", id);
            if (min || max) input.attr('min', min);
            if (max) input.attr('max', max);
            if (step) input.attr('step', step);
            var inputPanel = $('<div class="input-control number">');
            var label = $('<label class="block">');
            label.html(caption).appendTo(inputPanel);
            input.appendTo(inputPanel);
            return inputPanel;
        };

        my.createRangeInput = function(value, id, caption, min, max, step){
            var inputValue = $('<span id="range-value"></span>');
            var input = $('<input type="range">');
            input.attr("id", id);
            input.val(value);
            inputValue.text(value);
            input.on("input", function () {inputValue.text(this.value);});

            if (min) input.attr('min', min);
            if (max) input.attr('max', max);
            if (step) input.attr('step', step);
            var inputPanel = $('<div class="input-control range">');
            var label = $('<label class="block">');
            label.html(caption+ ": ").appendTo(inputPanel);
            inputValue.appendTo(label);
            input.appendTo(inputPanel);
            return inputPanel;
        };

        my.createElementGroup = function(elements, id){
            var groupPanel = $('<div>').attr("id", id);
            for (var i = 0; i < elements.length; i++){
                elements[i].appendTo(groupPanel);
            }
            return groupPanel;
        };

        my.createRadioButton = function(id, value, caption, checked){
            var inputPanel = $('<label class="input-control radio">');
            var input = $('<input type="radio">');
            input.attr("id", id);
            input.attr("value", value);
            input.appendTo(inputPanel);
            $('<span class="check">').appendTo(inputPanel);
            $('<span class="caption">').text(caption).appendTo(inputPanel);
            return inputPanel;
        };

        my.createCheckButton = function (id, value, caption, checked) {
            var inputPanel = $('<label class="input-control checkbox small-check">');
            var input = $('<input type="checkbox">');
            input.attr("id", id);
            input.attr("value", value);
            if (checked) input.prop("checked", true);
            input.appendTo(inputPanel);
            $('<span class="check">').appendTo(inputPanel);
            $('<span class="caption">').text(caption).appendTo(inputPanel);
            return inputPanel;
        };

        my.createPreloader = function(){
            return $('<div data-role="preloader" data-type="metro"></div>');
        };

        /*Select*/
        my.createSelectInput = function(value, id, caption, options){
            var selectPanel = $('<div class="input-control select">');
            var select = $('<select>');
            for (var i = 0; i < options.length; i++){
                var option = $('<option>').val(options[i].id);
                option.html(options[i].caption);
                option.appendTo(select);
            }
            var label = $('<label class="block">');
            label.html(caption).appendTo(selectPanel);
            select.attr("id", id);
            select.val(value).appendTo(selectPanel);
            return selectPanel;
        };

        var appendOptions = function(select, getOptions){
            select.empty();
            var options = getOptions();
            for (var i = 0; i < options.length; i++){
                var option = $('<option>').val(options[i].id);
                option.html(options[i].caption);
                option.appendTo(select);
            }
        };

        my.createSelect2Input = function(defaultValue, id, caption, getOptions){
            var selectPanel = $('<div class="input-control select" style="width: 100%">');
            var select = $('<select style="width: 100%">');
            select.attr("id", id);
            select.appendTo(selectPanel);
            var option = $('<option>').val(defaultValue.id);
            option.html(defaultValue.caption);
            option.appendTo(select);
            select.select2({placeholder: "Select " + id, allowClear: true, val: defaultValue.id});
            var filled = false;
            select.on("select2:open", function(){
                if (!filled){
                    appendOptions(select, getOptions);
                    filled = true;
                }
            });
            var label = $('<label class="block">');
            label.html(caption).appendTo(selectPanel);
            return selectPanel;
        };

        my.createSelect2InputMulti = function(defaultValues, id, caption, getOptions){
            var selectPanel = $('<div class="input-control select" style="width: 100%">');
            var select = $('<select multiple="multiple" style="width: 100%">');
            select.attr("id", id);
            select.appendTo(selectPanel);
            select.select2({placeholder: "Select " + id, allowClear: true});
            var filled = false;
            select.on("select2:open", function(){
                if (!filled){
                    appendOptions(select, getOptions);
                    filled = true;
                }
            });
            var label = $('<label class="block">');
            label.html(caption).appendTo(selectPanel);

            if (defaultValues){
                var selected = defaultValues.map(function(d){ return d.id;});
                for (var i = 0; i < defaultValues.length; i++){
                    var option = $('<option>').val(defaultValues[i].id);
                    if (defaultValues[i].caption)
                        option.html(defaultValues[i].caption);
                    else option.html(defaultValues[i].id);
                    option.appendTo(select);
                }
                my.setInputValue(selectPanel, id, selected);
            }

            return selectPanel;
        };

        /*Special inputs*/
        my.createSearchInput = function(toolbar, search){
            $('<div class="v-divider">').appendTo(toolbar);
            var searchPanel = $('<div style="display: inline-block;">');
            var input = $('<input type="text" id="search" placeholder="search" style="padding:4px;" dir="rtl"/>');
            input.appendTo(searchPanel);
            var btn = $('<button id="btnSearch" class="button small-button">');
            btn.html('<span class="mif-search"></span>');
            btn.appendTo(searchPanel);
            searchPanel.appendTo(toolbar);

            btn.on('click', function() {
                var val = $.trim(input.val());
                search(val);
            });

            input.on('change', function() {
                var val = $.trim(input.val());
                search(val);
            });
            return input;
        };

        my.createDisabledInput = function(value, id, caption){
            var inputPanel = my.createTextInput(value, id, caption);
            inputPanel.find("input").attr("disabled", true).addClass("disabled");
            return inputPanel;
        };

        /*Buttons*/
        my.enableButtons = function(panel){
            if (!panel) return;
            var toolbar = panel.find("#toolbar");
            toolbar.children(".image-button").removeAttr("disabled");
        };

        my.disableButtons = function(panel){
            if (!panel) return;
            var toolbar = panel.find("#toolbar");
            toolbar.children(".image-button").attr("disabled", true);
        };

        my.createRemoveButton = function(onClick){
            return $('<button id="btnRemove" class="image-button small-button icon-right">')
                .html('Remove <img src="images/remove.png" class="icon"/>').click(onClick);
        };

        my.createSaveButton = function(onClick){
            return $('<button id="btnSave" class="image-button small-button icon-right">')
                .html('Save <img src="images/save.png" class="icon"/>').click(onClick);
        };

        my.createRestoreButton = function(onClick){
            return $('<button id="btnRestore" class="image-button small-button icon-right">')
                .html('Restore <img src="images/restore.png" class="icon"/>').click(onClick);
        };

        my.createRedoButton = function(onClick){
            return $('<button id="btnRedo" class="button small-button">')
                .html('<span class="mif-redo"></span>')
                .click(onClick);
        };

        my.createAddButton = function(onClick){
            return $('<button id="btnAdd" class="image-button small-button icon-right">')
                .html('Add <img src="images/add.png" class="icon"/>').click(onClick);
        };

        my.createClearButton = function(onClick){
            return $('<button id="btnRemoveAll" class="image-button small-button icon-right">')
                .html('Clear <img src="images/removeAll.png" class="icon"/>').click(onClick);
        };

        my.createReloadButton = function(onClick){
            return $('<button id="btnReload" class="image-button small-button icon-right">')
                .html('Reload <img src="images/import.png" class="icon"/>').click(onClick);
        };

        my.createCommitButton = function(onClick){
            return $('<button id="btnCommit" class="image-button small-button icon-right">')
                .html('Commit <img src="images/commit.png" class="icon"/>').click(onClick);
        };

        my.createUpButton = function(onClick){
            return $('<button id="btnMoveUp" class="button small-button">')
                .html('<span class="mif-move-up"></span>')
                .click(onClick);
        };

        my.createDownButton = function(onClick){
            return $('<button id="btnMoveDown" class="button small-button">')
                .html('<span class="mif-move-down"></span>')
                .click(onClick);
        };

        /* Button groups */
        my.createToolbar = function(){
            return $('<div id="toolbar" class="button-group">');
        };

        my.createEditToolbar = function(save, restore, remove, load, commit){
            var toolbar = my.createToolbar();
            my.createEditToolbarGroup(toolbar, save, restore, remove);
            if (load || commit)
                $('<div class="v-divider">').appendTo(toolbar);
            if (load)
                my.createReloadButton(load).appendTo(toolbar);
            if (commit)
                my.createCommitButton(commit).appendTo(toolbar);
            return toolbar;
        };

        my.createEditToolbarGroup = function(tbSection, save, restore, remove){
            my.createSaveButton(save).appendTo(tbSection);
            my.createRestoreButton(restore).appendTo(tbSection);
            my.createRemoveButton(remove).appendTo(tbSection);
        };

        my.createRepoEditToolbarGroup = function(tbSection, add, restore, removeAll){
            my.createAddButton(add).appendTo(tbSection);
            my.createRestoreButton(restore).appendTo(tbSection);
            my.createClearButton(removeAll).appendTo(tbSection);
        };

        my.createRepoEditToolbar = function(add, restore, removeAll, load, commit){
            var toolbar = my.createToolbar();
            my.createRepoEditToolbarGroup(toolbar, add, restore, removeAll);
            $('<div class="v-divider">').appendTo(toolbar);
            if (load)
                my.createReloadButton(load).appendTo(toolbar);
            if (commit)
                my.createCommitButton(commit).appendTo(toolbar);
            return toolbar;
        };

        /*Collapsible panels*/
        my.setHeaderTitle = function(panel, title){
            var label = panel.find('> .heading .title');
            if (label.length > 0) label.html(title);
        };

        my.updatePanelStatus = function(status, panel){
            //ok, tmp, new, updated, deleted
            //Temporal entity
            if (status !== "tmp" || status !== "deleted")
                panel.removeClass("alert");
            if ((status === "tmp" || status === "deleted") && !panel.hasClass("alert"))
                panel.addClass("alert");

            //Modified entity
            if (status !== "new" && status !== "updated")
                panel.removeClass("success");
            if ((status === "new" || status === "updated") && !panel.hasClass("success"))
                panel.addClass("success");

            //Disable editing of deleted element
            if (status === "deleted"){
                panel.attr("opacity", 0.8);
                panel.find('input').not(".disabled").attr('disabled', true);
                panel.find('select').not(".disabled").attr("disabled", true);
                panel.find('button').attr('disabled', true);
            } else {
                panel.removeAttr("opacity");
                panel.find('input').not(".disabled").attr('disabled', false);
                panel.find('select').not(".disabled").attr("disabled", false);
                panel.find('button').attr('disabled', false);
            }
        };

        my.createHeader = function(icon, title, headerClass){
            var hClass= "panel";
            if (headerClass) hClass = headerClass;
            var headerPanel = $('<div>');
            headerPanel.attr("class", hClass);
            var labelContainer = $('<div class="heading">');
            icon.appendTo(labelContainer);
            $('<label class="title">').html(title).appendTo(labelContainer);
            labelContainer.appendTo(headerPanel);
            return headerPanel;
        };

        my.createFieldSet = function(panel, title){
            var subPanel = $('<fieldset>');
            var legend = $('<legend>').html(title);
            legend.appendTo(subPanel);
            subPanel.appendTo(panel);
            return subPanel;
        };

        my.createContentPanel = function(panel){
            var contentPanel = $('<div class="content">');
            //contentPanel.attr("data-role", "panel");
            contentPanel.appendTo(panel);
            return contentPanel;
        };

        /*Grid*/
        my.createGrid = function(panel){
            var grid = $('<div class="grid">');
            grid.appendTo(panel);
            return grid;
        };

        my.createRow = function(grid, rowClass){
            var row = $('<div class="row "> ' + rowClass + '"');
            row.appendTo(grid);
            return row;
        };

        my.createCell = function(row, content){
            var cell = $('<div class="cell">').appendTo(row);
            cell.html(content);
            return cell;
        };

        /*Accordion*/
        my.createAccordion = function(panel, isSortable, updateHandler){
            function initSortable(){
                panel.find(".accordion" ).sortable({
                    connectWith: ".accordion",
                    handle: ".heading",
                    cancel: ".frame-toggle",
                    placeholder: "frame-placeholder ui-corner-all",
                    update: function( event, ui ) {if (updateHandler) updateHandler(event, ui);}
                });

                panel.find(".frame" )
                    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                    .find( ".heading" )
                    .addClass( "ui-widget-header ui-corner-all" )
                    .prepend( "<span class='ui-icon ui-icon-minusthick toggle'></span>");

                panel.find(".frame-toggle" ).click(function() {
                    var icon = $( this );
                    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
                    icon.closest( ".frame" ).find( ".content" ).toggle();
                });

                // panel.find(".frame").on( "sortupdate", function( event, ui ) {if (updateHandler) updateHandler(event, ui);} );
            }

            var accordion = $('<div class="accordion" data-role="accordion" data-close-any="true">');
            accordion.appendTo(panel);
            if (isSortable) initSortable();
            return accordion;
        };

        /*Tabs*/
        my.createTabControl = function(panel, tabs, frames){
            var tabControl = $('<div class="tabcontrol" data-role="tabcontrol">');
            tabs.appendTo(tabControl);
            frames.appendTo(tabControl);
            tabControl.appendTo(panel);
            return tabControl;
        };

        my.createTabs = function(){
            return $('<ul class="tabs">');
        };

        my.createFrames = function(){
            return $('<div class="frames">');
        };

        my.createTab = function(id, caption){
            return $('<li>').html('<a href="#' + id + '">' + caption + '</a>');
        };

        my.createFrame = function(id){
            return $('<div class="frame" id ="#' + id + '">');
        };

        //TODO: fix
        my.createDialog = function(question, okText, cancelText, okCallback, cancelCallback) {
            $('<div id = "dialog-confirm">').appendTo('body')
                .html('<div><h5>' + question + '</h5></div>');
            $( "#dialog-confirm" ).dialog({
                resizable: false,
                height:140,
                modal: true,
                buttons: [{
                    text: okText,
                    click : function() {
                        $( this ).dialog( "close" );
                        okCallback();
                    }
                }, {
                    text: cancelText,
                    click: function() {
                        $( this ).dialog( "close" );
                        cancelCallback();
                    }}]
            })
        };

        return my;
    }());

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
            //console.dir("Updating panels for " + repo.urlExtension);

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
                    if (!d.editor)
                        d.createEditor(d.header);
                    if (d.repository.selected && d.repository.selected != d) {
                        if (d.repository.selected.status != "deleted")
                            d.repository.selected.save();
                    }
                    d.repository.selected = d;
                    if (!d.isActive()) d.updateContent();
                }
                if (onClick) onClick(d);
            };
            var hClass = "frame";
            this.header = Components.createHeader(this.icon, d.getHeaderTitle(), hClass).click(onclick);
            return this.header;
        };

        this.getJSON = function () {
            var obj = {};
            for (var prop in this.jsonEntity) {
                if (this[prop] == undefined) continue;
                if (prop === "id") continue; //do not copy id to the JSON object that will be committed

                if (typeof this[prop] !== "object") {
                    obj[prop] = this[prop];
                } else {
                    if (this[prop].id)        //nested object with "id" - commit its identifier only
                        obj[prop] = this[prop].id;
                    else {
                        if (isArray(this[prop])) {
                            if (this[prop][0] && this[prop][0].id)
                                obj[prop] = this[prop].map(function(d){ return d.id});
                            else
                                obj[prop] = this[prop];
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
                        if (Distribution.isDistribution(obj[prop])) {
                            if (typeof d[prop] != Distribution.class) {
                                d[prop] = Distribution.defaultObject();
                                d[prop].status = "ok";
                            }
                            d[prop].setJSON(obj[prop]);
                            continue;
                        }
                    }
                    else {
                        if (typeof d[prop] === "object" && d[prop].setJSON) {
                            d[prop].setJSON(obj[prop]);
                            continue;
                        }
                    }
                    d[prop] = obj[prop];
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

                console.dir("Committing object:");
                console.dir(jsonObj);

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

        //override to find nested items in preloaded repositories
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

        //override to load nested items from server repositories
        this.loadDependent = function (url) {};

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
                if (isOk) {
                    return;
                } else {
                    console.dir(d.getJSON());
                    console.dir(newObj);
                }

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
                d.restore();
            };

            var onCommit = function(){
                var url = d.url;
                if (!url && d.repository) url = d.repository.url;
                if (url){
                    d.save();
                    d.commit(url);
                }
                else {
                    $.Notify({
                        caption: "Error",
                        content: "Cannot commit data: Unknown URL",
                        type: 'alert',
                        keepOpen: true
                    });
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

    function Distribution(obj) {
        Editor.call(this);
        this.jsonEntity = Object.create(Entities.distribution);
        this.icon = $('<img src="images/random.png" class="icon">');

        if (obj) {
            for (var prop in obj)
                this[prop] = obj[prop];
        }

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

    /************************************/
    /*LyphTemplate*/
    /************************************/
    function LyphTemplate(obj){
        Editor.call(this);
        this.jsonEntity = Object.create(Entities.lyphTemplate);
        this.urlExtension = "/lyphTemplates";
        this.icon = $('<img src="images/lyph.png" class="icon">');

        //for nested objects, create classes from JSON objects or identifiers
        if (obj) {
            for (var prop in obj)
                this[prop] = obj[prop];

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
                newObj.fmaID = Components.getInputValue(this.editor, "fmaID");
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
            var lyphRepo = lyph.repository;

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
                        if (layer.materials && lyphRepo){
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

            var rect;
            if (!goodLayers || (goodLayers.length == 0)) {
                //Draw empty box
                rect = lyphSvg.append("rect")
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
                rect = lyphSvg.selectAll("rect")
                    .data(goodLayers)
                    .enter().append("rect")
                    .style("fill", function (d) {return d.color;});
                var prev;
                if (vp.orientation === "vertical"){
                    prev = vp.margin.x;
                    rect.attr("height", function () {return vp.scale.width;})
                        .attr("width", function (d) {return d.getThickness() * vp.scale.height;})
                        .attr("x", function (d) {
                            prev += d.getThickness() * vp.scale.height;
                            return prev - d.getThickness() * vp.scale.height;})
                        .attr("y", vp.margin.y)

                } else {
                    prev = vp.margin.y;
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

        if (obj){
            for (var prop in obj)
                this[prop] = obj[prop];
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
            var lyphRepo = null;
            if (d.repository && s.repository.parent)
                lyphRepo = d.repository.parent.repository;

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
                        if (lyphRepo){
                            var materialObj = lyphRepo.getItemByID(material);
                            if (materialObj && materialObj.layerRepo){
                                materialObj.layerRepo.getValidItems().forEach(function(layer){
                                    getDescendants(layer);
                                });
                            }
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

            var materials = [];
            var getOptions = function(){return []};
            if (d.repository && d.repository.parent){
                var lyphRepo = d.repository.parent.repository;
                if (lyphRepo) {
                    getOptions = function(){return lyphRepo.getItemList();};
                    if (d.materials){
                        materials = d.materials.map(function(id){
                            var obj = {id: id};
                            var lyph = lyphRepo.getItemByID(id);
                            if (lyph) obj.caption = lyph.getHeaderTitle();
                            return obj;
                        })
                    }
                }
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

        if (obj){
            for (var prop in obj)
                this[prop] = obj[prop];
        }

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

    /**********************************/
    /*Omega-function (tree)*/
    /**********************************/
    function CanonicalTree(obj) {
        Editor.call(this);
        this.jsonEntity = Object.create(Entities.canonicalTree);
        this.icon = $('<img src="images/tree.png" class="icon">');
        this.urlExtension = "/canonicalTrees";
        this.color = "#"+((1<<24)*Math.random()|0).toString(16);

        if (obj) { //for nested objects, create classes from JSON objects or identifiers
            for (var prop in obj)
                this[prop] = obj[prop];
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
        }

        this.levelRepo = new CanonicalTreeLevelRepo(this.levels, this);

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
            if (d.levels && d.repository.levelRepoFull) {
                d.levels = d.repository.levelRepoFull.items.filter(function (e) {
                    return e.tree == d.id
                });
                d.levelRepo.items = d.levels;
                d.levelRepo.items.forEach(function(e){e.repository = d.levelRepo;});
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
        function displayHeader(svg, caption){
            svg.append("text")
                .attr("class", "treeTitle")
                .attr("x", 10)
                .attr("y", 20)
                .attr("text-anchor", "left")
                .style("font-size", "14px")
                .text(caption);
        }

        this.drawCanonicalModel = function(svg, vp, onClick){
            var canonicalTree = this;
            var treeRepo, lyphRepo;
            if (canonicalTree.repository) {
                treeRepo = canonicalTree.repository;
                lyphRepo = canonicalTree.repository.lyphRepo;
            }

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

                        if (level.connectedTrees){
                            for (var j = 0 ; j< level.connectedTrees.length; j++){
                                var material = level.connectedTrees[j];
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
                    if (onClick) onClick(node.level);
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
                    size  : {width: 20, height: 20}});

                function onLyphClickHandler(lyph){
                    if (onClick) onClick(lyph);
                }

                tree.links(nodes).forEach(function(d){
                    vpIcon.margin = {
                        x: (d.source.x + d.target.x) / 2 + 5,
                        y: (d.source.y + d.target.y) / 2 - 10};

                    if (Math.abs(d.source.x - d.target.x) > Math.abs(d.source.y - d.target.y))
                        vpIcon.orientation="horizontal";
                    else
                        vpIcon.orientation="vertical";

                    if (d.source && d.source.level){
                        var lyphTemplateID = d.source.level.template;
                        if (lyphTemplateID){
                            var lyph = lyphRepo.getItemByID(lyphTemplateID);
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

                function elbow(d) {
                    return "M" + d.source.x + "," + d.source.y
                        + "H" + d.target.x + "V" + d.target.y
                        + (d.target.children ? "" : ("v" + vp.scale.height));
                }
            }

            var tree = d3.layout.tree()
                .separation(function(a, b) { return a.parent === b.parent ? 1 : .5; })
                .size([vp.size.width - vp.margin.x, vp.size.height - vp.margin.y]);

            drawTree(treeData);
        };

        this.draw = function(svg, vp, onClick){
            svg.selectAll(".treeTitle").remove();
            var svgTree = svg.select("#tree").attr("width", vp.size.width).attr("height", vp.size.height);
            displayHeader(svgTree, this.id + " - " + this.name);
            //Canonical tree*******************************************************************
            this.drawCanonicalModel(svgTree, vp, onClick);
        };

        this.drawPlots = function(svg, vp, onClick){
            var canonicalTree = this;
            svg.selectAll(".treeTitle").remove();
            var svgPlots = svg.select("#plots")
                .attr("width", vp.size.width)
                .attr("height", vp.size.height + 2 * vp.margin.y);
            displayHeader(svgPlots, this.id + " - " + this.name);

            //Tree statistics: accumulate size to shift subsequent plots
            var size = {width:0, height: 0}, offset = {x: vp.margin.x, y: vp.margin.y};

            //Branching factor ***************************************************************
            function drawBranchingFactor(svg, vp, onClick){
                svg.selectAll('.branchingFactor').remove();
                var barSvg = svg.append("g").attr("class", "branchingFactor");

                var goodLevels = canonicalTree.levelRepo.getValidItems();
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
                    padding: {y: 20}
                });

                Plots.horizontalBarChart(barSvg, branchingFactorVP, branchingFactors, caption, onClick);
                return size;
            }

            size = drawBranchingFactor(svgPlots, vp, onClick);

            //Distributions *****************************************************************
            function drawDistrChart(svg, offset, property, onClick){
                var scale = {width: 1, height: vp.scale.height}; //width = #px per value
                var title = property + ((scale.width != 1)? " (x" + scale.width+ ")" : "");
                svg.selectAll('.' + property).remove();
                var barSvg = svg.append("g").attr("class", property);
                var lyphRepo = (canonicalTree.repository)? canonicalTree.repository.lyphRepo: null;

                var goodLevels = canonicalTree.levelRepo.getValidItems();
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
                Plots.horizontalDistrChart(barSvg, chartBarVP, displayData, title, onClick);
                return size;
            }

            //Length *******************************************************************
            offset.x += Math.max(100, size.width) + vp.margin.x;
            size = drawDistrChart(svgPlots, offset, "length", onClick);

            //Width *******************************************************************
            offset.x += Math.max(100, size.width) + vp.margin.x;
            drawDistrChart(svgPlots, offset, "radius", onClick);
        }
    }

    function CanonicalTreeRepo(items, lyphRepo) {
        RepoEditor.call(this, items);
        this.urlExtension = "/canonicalTrees";
        this.lyphRepo = lyphRepo;
        this.levelRepoFull = new CanonicalTreeLevelRepoFull([]);

        this.beforeLoad = function(){
            return this.levelRepoFull.load(this.url);
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

        if (obj){
            for (var prop in obj)
                this[prop] = obj[prop];
            if (obj.connectedTrees){
                for (var i = 0; i < obj.connectedTrees.length; i++){
                    var newItem = obj.connectedTrees[i];
                    if (typeof newItem === "object"){
                        //JSON prototypes
                        if (typeof newItem !== CanonicalTree.class)
                            newItem = new CanonicalTree(newItem)
                    } else {
                        //Identifiers (when pre-loaded from server)
                        if (typeof newItem === "number")
                            newItem = new CanonicalTree({id: newItem});
                    }
                    this.connectedTrees[i] = newItem;
                }
            }
        }

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

            if (d.connectedTrees){
                var data = [];
                var getDescendants = function(root){//root = level
                    if (!root) return;
                    if (!root.connectedTrees) return;
                    root.connectedTrees.forEach(function(ct){
                        data.push(ct);
                        if (d.repository && d.repository.parent){
                            var treeRepo = d.repository.parent.repository;
                            if (treeRepo){
                                var materialObj = treeRepo.getItemByID(ct);
                                if (materialObj && materialObj.levelRepo){
                                    materialObj.levelRepo.getValidItems().forEach(function(level){
                                        getDescendants(level);
                                    });
                                }
                            }
                        }
                    });
                };
                getDescendants(d);
                if (data.indexOf(d.tree) > -1){
                    return "Connected trees or their descendants cannot include the parent canonical tree";
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

                var connectedTrees = Components.getInputValue(this.editor, "connectedTrees");
                if (!connectedTrees)
                    newObj.connectedTrees = [];
                else {
                    newObj.connectedTrees = connectedTrees.map(function(d){
                        return parseInt(d, 10);
                    });
                }
                return newObj;
            }
            return null;
        };

        this.createEditor = function(panel){
            var d = this;
            var treeRepo, lyphRepo;
            if (d.repository && d.repository.parent && d.repository.parent.repository) {
                treeRepo = d.repository.parent.repository;
                lyphRepo = d.repository.parent.repository.lyphRepo;
            }

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
            var getOptions = function(){
                if (lyphRepo) return lyphRepo.getItemList();
                return [];
            };

            var template = {id: ""};
            if (d.template && lyphRepo) {
                template.id = d.template;
                var lyph = lyphRepo.getItemByID(d.template);
                if (lyph) template.caption = lyph.getHeaderTitle();
            }
            Components.createSelect2Input(template, "template", "LyphTemplate", getOptions).appendTo(editPanel);

            //materials
            var getOptions = function(){
                if (treeRepo)
                    return treeRepo.getItemList();
                return [];
            };
            var connectedTrees = [];
            if (d.connectedTrees && treeRepo) {
                connectedTrees = d.connectedTrees.map(function (id) {
                    var obj = {id: id};
                    var tree = treeRepo.getItemByID(id);
                    if (tree) obj.caption = tree.getHeaderTitle();
                    return obj;
                });
            }
            Components.createSelect2InputMulti(connectedTrees, "connectedTrees", "Connected trees", getOptions).appendTo(editPanel);

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
        this.color = color;

        if (lyphTemplate) {
            if (lyphTemplate.length && lyphTemplate.length.generate)
                this.length = lyphTemplate.length.generate();
            if (lyphTemplate.radius && lyphTemplate.radius.generate)
                this.width = lyphTemplate.radius.generate() * 2;
        }
    }

    function TreeSample(canonicalModel) {
        this.canonicalModel = canonicalModel;

        var treeRepo, lyphRepo;
        if (canonicalModel.repository){
            treeRepo = canonicalModel.repository;
            lyphRepo = canonicalModel.repository.lyphRepo;
        }

        this.generate = function(){
            var cm = this.canonicalModel;

            var goodLevels = this.canonicalModel.levelRepo.getValidItems();
            if (!goodLevels) return null;
            //Fake leaf node!
            goodLevels.push(new CanonicalTreeLevel());

            var nodeIndex = 1;
            return generate(null, 0);

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
                if (level.connectedTrees){
                    for (var j = 0 ; j < level.connectedTrees.length; j++){
                        var subtreeID = level.connectedTrees[j];
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
            svg.attr("width", vp.size.width).attr("height", vp.size.height);
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
                    .style("fill", function (d) {return rowColor(d.depth);});

                node.exit().transition()
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

    return {
        LyphTemplate: LyphTemplate,
        LyphTemplateRepo: LyphTemplateRepo,
        CanonicalTree: CanonicalTree,
        CanonicalTreeRepo: CanonicalTreeRepo,
        TreeSample: TreeSample,
        VisualParameters: Plots.vp
    }
}());


















