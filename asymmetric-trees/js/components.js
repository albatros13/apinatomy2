

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
    }

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

    my.createSelect2Input = function(defaultValue, defaultOption, id, caption, getOptions){
        var selectPanel = $('<div class="input-control select" style="width: 100%">');
        var select = $('<select style="width: 100%">');
        select.attr("id", id);
        select.appendTo(selectPanel);
        var option = $('<option>').val(defaultValue);
        option.html(defaultOption);
        option.appendTo(select);
        select.select2({placeholder: "Select " + id, allowClear: true, val: defaultValue});
        var filled = false;
        select.on("select2:open", function(){
            if (!filled){
                appendOptions(select, getOptions)
                filled = true;
            }
        });
        var label = $('<label class="block">');
        label.html(caption).appendTo(selectPanel);
        return selectPanel;
    };

    my.createSelect2InputMulti = function(defaultValues, defaultOptions, id, caption, getOptions){
        var selectPanel = $('<div class="input-control select" style="width: 100%">');
        var select = $('<select multiple="multiple" style="width: 100%">');
        select.attr("id", id);
        select.appendTo(selectPanel);
        var selected = defaultValues;
        if (!selected) selected = [];
        else
            for (var i = 0; i < defaultValues.length; i++){
                var option = $('<option>').val(defaultValues[i].id);
                if (defaultOptions.length > i)
                    option.html(defaultOptions[i].caption);
                else option.html(defaultValues[i].caption);
                option.appendTo(select);
            }
        select.select2({placeholder: "Select " + id, allowClear: true, val: selected});
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
    }

    my.disableButtons = function(panel){
        if (!panel) return;
        var toolbar = panel.find("#toolbar");
        toolbar.children(".image-button").attr("disabled", true);
    }

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
    }

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
    }

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
    }

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
    }

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
    }

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





