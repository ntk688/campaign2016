//Monthly offsets for month selection
var monthOffsets = ["Mar-15", "Apr-15", "May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15", "Oct-15", "Nov-15", "Dec-15", "Jan-16", "Feb-16", "Mar-16", "Apr-16", "May-16", "Jun-16", "Jul-16", "Aug-16", "Sep-16", "Oct-16", "Nov-16", "Dec-16"];

//initial variables
var height = 500;
var width = 1000;
var margin = 40;

var GenElectCand = ["Hillary Clinton", "Jill Stein", "Donald Trump", "Gary Johnson", "Evan McMullin"]
// Date range and parser
var startDate = new Date(2015,1,1);
var endDate = new Date(2016,12,1);
var parseTime = d3.timeParse("%d-%b-%y");

//initialize Y axis
var y = d3.scaleLinear()
	.domain([0,0])
	.range([margin,height-margin]);
		
// TIME SCALE - X AXIS
var timeScale = d3.scaleTime()
	.domain([startDate,endDate])
	.range([0,width-margin*2]);

// COLOR SCALE
var colors = d3.scaleOrdinal()
	.range(["#ff2b02", "#5ec2ff", "#af57fd", "#70cf35", "#239572", "#df08fd", "#d4a7f5", "#d25a8d", "#d85d46", "#f508b4", "#798c20", "#ff1964", "#19d380", "#0fccd6", "#b0bf8d", "#cfba0c", "#be5bcf", "#f9a1a2", "#2b85e3", "#fda60d", "#92807e", "#4b8da0", "#b07652", "#c46e10", "#6c75fc", "#b6b6d7", "#e8ae61"]);

// Axis units
var yAxisSelection = 'dollars';
var timeSelection = 'campaign';

//data
var expendData = expendDataMonthly;

var svg,
	g,
	labelg;

//SELECTIONS
var checkSelections = '';

function initVis() {
	
	//CANVAS
	svg = d3.select("#mainChart")
		.append("svg")
		.attr("width", width + width/5)
		.attr("height", height + 15);
		
	g = svg.append("g")
			.attr("transform", "translate("+margin*2+", 0)");
			
	labelg = svg.append("g")
			.attr("transform", "translate(0," +5+")");

	// X AXIS + LABEL
	g.append("g")
		.attr("class", "axis")
		.attr("class", "xaxis")
		.attr("transform", "translate(0,"+(height-margin)+")")
		.call(d3.axisBottom(timeScale)
			.ticks(d3.timeMonth.every(2)));

	svg.append("text")
		.attr("class", "axis-label")
		.attr("y", 495)
		.attr("x",0 + (width / 2))
		.style("text-anchor", "middle")
		.text("Time");

	// Y AXIS + LABEL
	g.append("g")
		.attr("class", "axis")
		.attr("class", "yaxis")
		.call(d3.axisLeft(y));

	svg.append("text")
		.attr("transform", "rotate(90)")
		.attr("class", "axis-label")
		.attr("id", "yaxisLabel")
		.attr("y", -5)
		.attr("x",0 + (500 / 2))
		.style("text-anchor", "middle")
		.text("Dollars");
	
	//clipPath
	g.append("clipPath")
		.attr("id", "clipper")
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width-margin)
		.attr("height", height-margin);
		
	//Y Axis Selectors
	svg.append("rect")
		.attr("x", 35)
		.attr("y", 8)
		.attr("width", 50)
		.attr("height", 18)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("fill", "black")
		.attr("class", "axisButtons")
		.on("mousedown", function(){changeAxis('dollars');});
		
	svg.append("text")
		.attr("x", 60)
		.attr("y", 21)
		.attr("text-anchor", "middle")
		.attr("class", "axisButtonText")
		.text("Dollars")
		.on("mousedown", function(){changeAxis('dollars');});
		
	svg.append("rect")
		.attr("x", 90)
		.attr("y", 8)
		.attr("width", 80)
		.attr("height", 18)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("fill", "black")
		.attr("class", "axisButtons")
		.on("mousedown", function(){changeAxis('percentages');});
		
	svg.append("text")
		.attr("x", 130)
		.attr("y", 21)
		.attr("text-anchor", "middle")
		.attr("class", "axisButtonText")
		.text("Percentages")
		.on("mousedown", function(){changeAxis('percentages');});

	//X Axis Selectors
	svg.append("rect")
		.attr("x", 197)
		.attr("y", 8)
		.attr("width", 97)
		.attr("height", 18)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("fill", "black")
		.attr("class", "axisButtons")
		.on("mousedown", function(){changeAxis('campaign');});
		
	svg.append("text")
		.attr("x", 245)
		.attr("y", 21)
		.attr("text-anchor", "middle")
		.attr("class", "axisButtonText")
		.text("Whole Campaign")
		.on("mousedown", function(){changeAxis('campaign');});
	
	//2016 button
	svg.append("rect")
		.attr("x", 300)
		.attr("y", 8)
		.attr("width", 40)
		.attr("height", 18)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("fill", "black")
		.attr("class", "axisButtons")
		.on("mousedown", function(){changeAxis('2016');});
		
	svg.append("text")
		.attr("x", 320)
		.attr("y", 21)
		.attr("text-anchor", "middle")
		.attr("class", "axisButtonText")
		.text("2016")
		.on("mousedown", function(){changeAxis('2016');});
		
	//General Election button
	svg.append("rect")
		.attr("x", 345)
		.attr("y", 8)
		.attr("width", 90)
		.attr("height", 18)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("fill", "black")
		.attr("class", "axisButtons")
		.on("mousedown", function(){changeAxis('general');});
		
	svg.append("text")
		.attr("x", 390)
		.attr("y", 21)
		.attr("text-anchor", "middle")
		.attr("class", "axisButtonText")
		.text("General Election")
		.on("mousedown", function(){changeAxis('general');});
		
	
}

//RENDER
function renderVis(plotData) {
	
	//find the max value in the whole nested array
	maxValue = d3.max(plotData, function(d){
		//function(g) returns the values of nested array (total expend on a day)
		return d3.max(d.values, function(g){ return +g.value; });
		});
	
	//New Y Scale
	var newY = d3.scaleLinear()
		.domain([(maxValue *1.1),0])
		.range([margin,height-margin]);	
	
	//rescale Y Axis and check features
	featuresRender();
	
	//function to construct each line in the path
	//d.key and d.value are time and expenditure values from the .nest() structure
	var line = d3.line()
		.curve(d3.curveMonotoneX)
		.x(function(d) {return timeScale(parseTime(d.key));})
		.y(function(d) {return newY(+d.value);});
	
	//data join with key from nest() as key
	var spendLines = g.selectAll('.spendLine').data(plotData, function(d) { return d.key;});
		
	spendLines.exit()
		.transition()
		.duration(500)
		.style("opacity", 0)
		.remove();
		
	//generate the paths;
	//use line(d.values) to drill down to values of nested data
	spendLines.enter()
		.append("path")
		.attr("class", "spendLine")
		.attr("stroke", function(d) { return colors(d.key)})
		.attr("stroke-width", 3)
		.attr("clip-path", "url(#clipper)")
		.attr("id", function(d){ return d.key.split(",", 1)[0] + "SpendLine";})
		.attr("d", function(d) {return line(d.values);})
		.on("mouseover", function(d){ 
			var targetLabel = document.getElementById(d.key.split(",", 1)[0]+"SpendBackground").setAttribute("opacity", 1);
			})
		.on("mouseout", function(d){ 
			var targetLabel = document.getElementById(d.key.split(",", 1)[0]+"SpendBackground").setAttribute("opacity", 0);
			})
		.style("opacity", 0)
		.transition()
		.duration(500)
		.style("opacity", 1);
				
	spendLines
		.transition()
		.duration(1000)
		.attr("d", function(d){ return line(d.values);});
		
	rescaleAxes(newY);
		
	//LABELS DATA JOIN
	var spendLabelBackground = labelg.selectAll('.spendLabelBackground').data(plotData, function(d) { return d.key;});
	
	spendLabelBackground.exit().remove();
	
	spendLabelBackground.enter()
		.append("rect")
		.attr("x", width + 7)
		.attr("y", function(d,i){return 22*i - 3;})
		.attr("width", 190)
		.attr("height", 21)
		.attr("class", "spendLabelBackground")
		.attr("fill", "none")
		.attr("stroke", "#222")
		.attr("stroke-width", 2)
		.attr("id", function(d){ return d.key.split(",", 1)[0] + "SpendBackground";})
		.on("mouseover", function(d){ 
			document.getElementById(d.key.split(",", 1)[0]+"SpendLine").setAttribute("stroke-width", 5);
			})
		.on("mouseout", function(d){ 
			document.getElementById(d.key.split(",", 1)[0]+"SpendLine").setAttribute("stroke-width", 3);
			})
		.attr("opacity", 0);
		
	spendLabelBackground
		.transition()
		.duration(500)
		.attr("x", width + 7)
		.attr("y", function(d,i){return 22*i - 3;});
	
	var spendLabelRectangles = labelg.selectAll('.spendLabelRectangles').data(plotData, function(d) { return d.key;});
	
	spendLabelRectangles.exit().remove();
	
	spendLabelRectangles.enter()
		.append("rect")
		.attr("x", width + 10)
		.attr("y", function(d,i){return 22*i;})
		.attr("width", 15)
		.attr("height", 15)
		.attr("class", "spendLabelRectangles")
		.attr("id", function(d){ return d.key.split(",", 1)[0] + "SpendRectangle";})
		.attr("fill", function(d) { return colors(d.key);})
		.on("mouseover", function(d){ 
			document.getElementById(d.key.split(",", 1)[0]+"SpendLine").setAttribute("stroke-width", 5);
			})
		.on("mouseout", function(d){ 
			document.getElementById(d.key.split(",", 1)[0]+"SpendLine").setAttribute("stroke-width", 3);
			})
		.attr("opacity", 0)
		.transition()
		.duration(500)
		.attr("opacity", 1);
		
	spendLabelRectangles
		.transition()
		.duration(500)
		.attr("x", width + 10)
		.attr("y", function(d,i){return 22*i;});
		
	
	var spendLabels = labelg.selectAll('.spendLabels').data(plotData, function(d) { return d.key;});

	spendLabels.exit().remove();
	
	spendLabels.enter()
		.append("text")
		.attr("x", width + 35)
		.attr("y", function(d,i){return 22*i + 13;})
		.attr("class", "spendLabels")
		.attr("id", function(d){ return d.key.split(",", 1)[0] + "SpendLabel";})
		.on("mouseover", function(d){ 
			document.getElementById(d.key.split(",", 1)[0]+"SpendLine").setAttribute("stroke-width", 5);
			})
		.on("mouseout", function(d){ 
			document.getElementById(d.key.split(",", 1)[0]+"SpendLine").setAttribute("stroke-width", 3);
			})
		.text(function(d){return d.key;})
		.attr("opacity", 0)
		.transition()
		.duration(500)
		.attr("opacity", 1);
		
	spendLabels
		.transition()
		.duration(500)
		.attr("x", width + 35)
		.attr("y", function(d,i){return 22*i + 13;});
		
	//monthly data selection rectangles
	monthOffsets.forEach(function(d, i){
		
		var thisMonth = parseTime("01-" + d);
		var nextMonth = parseTime("01-" + monthOffsets[i+1]);
		
		g.append("rect")
			.attr("x", timeScale(thisMonth))
			.attr("width", timeScale(nextMonth) - timeScale(thisMonth))
			.attr("y", 40)
			.attr("height", height)
			.attr("opacity", 0)
			.attr("fill", "#FF0080")
			.attr("id", d)
			.attr("class", "monthRect")
			.attr("clip-path", "url(#clipper)")
			.on("click", function(){
				
				d3.select(".selected").classed("selected", false);
				d3.select(this).classed("selected", true);
				
				renderTable(this, checkSelections);
			});
	});
    
    if($('.selected').length > 0){
        renderTable($('.selected')[0], checkSelections);
    }
		
}

function TotalCatExpend(subcat_data){

	var totalspent = 0; //total spent by a candidate in 
	for (i=0; i<subcat_data.length; i++){
		totalspent += subcat_data[i].value;
	}
	return totalspent;
	//return {key: selections, value: totalspent};
}

function gettotalchecked(){
	var count = document.querySelectorAll('input[type="checkbox"]:checked').length;
	var featureid = document.getElementById("features");
	if (featureid.checked == true){
		count = count - 1;
	}
	return count;
}

function getChecked(){

	//get candidate selections
	var candBoxes = document.getElementsByClassName("renderBox");
	var selections = [];
	for (i=0; i<candBoxes.length; i++) {
		if (candBoxes[i].checked){
			selections.push(candBoxes[i].value);
		}
	}
	
	//get party selections
	var partyBoxes = document.getElementsByClassName("partyBox");
	partySelections = [];
	for (i=0; i<partyBoxes.length; i++) {
		if (partyBoxes[i].checked){
			partySelections.push(partyBoxes[i].value);
		}
	}
	
	//get category selection
	var filterOption = document.getElementById("filterSelect").value;
	
	checkSelections = {selections: selections, partySelections: partySelections, filterOption: filterOption};
	
	return checkSelections;

}

function candidateProcessor(){

	var checked = getChecked();
	var selections = checked.selections;
	var partySelections = checked.partySelections;
	var filterOption = checked.filterOption;
	var GenElect = document.getElementsByClassName("renderBox")
	//console.log(selections);
	
	/*//weekly or monthly data
	if(xAxisSelection == '2016'){
		expendData = expendDataBiweekly;
	}
	else{
		expendData = expendDataMonthly;
	}*/

	//filterForPie(selections, partySelections, filterOption);
	if(timeSelection == "general"){
		expendData = expendDataMonthly.filter(function(d){return parseTime(d.date) > parseTime("25-Jul-16")});
	}
	else if(timeSelection == "2016"){
		expendData = expendDataMonthly.filter(function(d){return parseTime(d.date) > parseTime("01-Dec-15")});
	}
	else{
		expendData = expendDataMonthly;
	}
	
	//Sort by date - otherwise lines double back on eachother
	//because dates are plotted out of order
	var filteredData = expendData.sort(function(a,b){ return parseTime(a.date) - parseTime(b.date);});
	
	// filter on the selected category, unless total
	if(filterOption != 'Total'){
		filteredData = filteredData.filter(function(d){ return d.category == filterOption; });
	}
	
	//filter - keep if d.cand_name has an index in array of selected candidates
	//filter is like nested for loop -- returns true/false
	filteredData = filteredData.filter(function(d){ return d.expend != 0;});
	
	//filter - keep if d.cand_name has an index in array of selected candidates
	var plotData = filteredData.filter(function(d){ 
			return selections.indexOf(d.cand_name) > -1;
	});
	
	//Nest the data 
	//returns [{'key': 'candidateName', 'values': [ {'key': date, 'value': 'expenditure'}, {etc.}]}]
	plotData = d3.nest()
		.key(function(d){return d.cand_name;})
		.sortKeys(d3.ascending)
		.key(function(d){return d.date;})
		.rollup(function(leaves){ 
			var spendSum = d3.sum(leaves, function(g){ 
			if(yAxisSelection == 'dollars'){
				return g.expend; 
			}
			else {
				return ((g.expend / candidateSums[g.cand_name]) * 100);
			}
			});
			return spendSum;
		})
		.entries(plotData);
	
	//if select Dem/Repub party --get party level aggregate data
	if(partySelections != []){
		//filter for parties
		var partyFilter = filteredData.filter(function(d){ 
				return partySelections.indexOf(d.party) > -1;
		});
		
		//nest party data--creating party total expend data for sep party total line --allows us to select total
		partyData = d3.nest()
			.key(function(d){ return d.party;})
			.sortKeys(d3.ascending)
			.key(function(d){return d.date;})
			.rollup(function(leaves){ 
				var spendSum = d3.sum(leaves, function(g){ 
			if(yAxisSelection == 'dollars'){
				return g.expend; 
			}
			else {
				return ((g.expend / candidateSums[g.party]) * 100);
			}
			});
				return spendSum;
			})
			.entries(partyFilter);		
			
	}

	plotData = plotData.concat(partyData);
	
	renderVis(plotData);

}

function featuresRender() {
	var featureSelection = document.getElementById("features");
	
	
	//initialize tooltips
	var tip = d3.tip()
		.attr("class", "d3-tip")
		.offset([-10, 0])
		.html(function(d) { return d['feature']; });
		
	svg.call(tip);
	
	//grab features
	if(featureSelection.checked == true){
		var featureLineData = features;
	}
	else {
		var featureLineData = [];
	}
	
	//plot feature lines
	var featureLines = g.selectAll(".featureLine").data(featureLineData, function(d){return d['feature'];});
	
	featureLines.enter().append('line')
			.attr("x1", function(d){ 
			return timeScale(parseTime(d.date));
			})
			.attr("y1", height-margin)
			.attr("x2", function(d){ return timeScale(parseTime(d.date));})
			.attr("y2", margin)
			.attr("stroke-dasharray", "7, 3")
			.attr("stroke-width", 1)
			.attr("stroke", "black")
			.attr("class", "featureLine")
			.attr("clip-path", "url(#clipper)")
			.style("opacity", 0)
			.transition()
			.duration(500)
			.style("opacity", 1);
			
	featureLines.exit()
		.style("opacity", 1)
		.transition()
		.duration(500)
		.style("opacity", 0)
		.remove();
	
	featureLines.transition()
		.duration(1000)
		.attr("x1", function(d){ return timeScale(parseTime(d.date));})
		.attr("y1", height-margin)
		.attr("x2", function(d){ return timeScale(parseTime(d.date));})
		.attr("y2", margin);
	
	//plot feature rectangles
	var featureRects = g.selectAll(".featureRect").data(featureLineData, function(d){ return d['feature'];});
	
	featureRects.enter().append('rect')
		.attr("x", function(d){ return (timeScale(parseTime(d.date))) - 5;})
		.attr("y", margin - 10)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", "black")
		.attr("class", "featureRect")
		.attr("clip-path", "url(#clipper)")
		.on("mouseover", function(d){tip.show(d);})
		.on("mouseout", function(d){tip.hide(d);})
		.style("opacity", 0)
		.transition()
		.duration(500)
		.style("opacity", 1);
	
	featureRects.exit()
		.style("opacity", 1)
		.transition()
		.duration(500)
		.style("opacity", 0)
		.remove();
	
	featureRects.transition()
		.duration(1000)
		.attr("x", function(d){ return (timeScale(parseTime(d.date))) - 5;});
}
	
//empty the checkboxes	
function resetBoxes() {
	var boxes = document.getElementsByClassName("renderBox");

	//reset category filter
	document.getElementById("filterSelect").value = "Total";
	document.getElementById("features").checked = false;
	
	inputChange('grow');
	candidateProcessor();
}

//switch from percentage to dollars
function changeAxis(input){
	var checked = getChecked();
	var selections = checked.selections;
	var partySelections = checked.partySelections;
	var filterOption = checked.filterOption;	
	var allchecked = selections.concat(partySelections);
	//var GenElect = document.getElementsByClassName("renderBox")

	if(input == 'dollars'){
		svg.selectAll("#yaxisLabel").text("Dollars");
		yAxisSelection = input;
	}
	else if(input == 'percentages'){
		svg.selectAll("#yaxisLabel").text("% of Total");
		yAxisSelection = input;
	}
	else if(input == 'campaign'){
		startDate = new Date(2015,1,1);
		endDate = new Date(2016,12,1);
		timeScale = d3.scaleTime()
			.domain([startDate,endDate])
			.range([0,width-margin*2]);
		timeSelection = input;
		inputChange('grow');
	}
	else if(input == '2016'){
		startDate = new Date(2015,12,1);
		endDate = new Date(2016,12,1);
		timeScale = d3.scaleTime()
			.domain([startDate,endDate])
			.range([0,width-margin*2]);
		timeSelection = input;
		inputChange('grow');
	}
	else if(input == 'general'){
		startDate = new Date(2016,7,1);
		endDate = new Date(2016,11,15);
        if(d3.select(".selected")){
            d3.select(".selected").classed("selected", false);
        }
		timeScale = d3.scaleTime()
			.domain([startDate,endDate])
			.range([0,width-margin*2]);
		timeSelection = input;
		inputChange('shrink');
	}
	
	//rerender the visualization
	candidateProcessor();
}

function rescaleAxes(newY){
	
	//rescale Y Axis
	g.selectAll('.yaxis')
		.transition()
		.duration(1000)
		.call(d3.axisLeft(newY));
	
	if(timeSelection == 'general'){
		g.selectAll('.xaxis')
			.transition()
			.duration(1000)
			.call(d3.axisBottom(timeScale)
			.ticks(d3.timeWeek.every(1)));
		
	}
	else if(timeSelection == '2016'){
		g.selectAll('.xaxis')
			.transition()
			.duration(1000)
			.call(d3.axisBottom(timeScale)
			.ticks(d3.timeMonth.every(1)));
				
	}
	else{
		g.selectAll('.xaxis')
			.transition()
			.duration(1000)
			.call(d3.axisBottom(timeScale)
			.ticks(d3.timeMonth.every(2)));
	}
	
}	

function inputChange(move){
	if(move == 'shrink'){
		var selectedInput = d3.selectAll(".prelimInput");
		var selectedLabels = d3.selectAll(".prelimLabel");
		
		selectedInput.property("checked", false);
		var filterOption = document.getElementById("filterSelect").value;
		selectedInput.style("display", "none");
		selectedLabels.style("display", "none");
	}
	else{
		var selectedInput = d3.selectAll(".prelimInput").style("display", "inline-block");
		var selectedLabes = d3.selectAll(".prelimLabel").style("display", "inline-block");
	}
}	

function renderTable(monthObject, checkSelections){
    var filtersHTML = "<h2>Selections: </h2><div id='tagBox'><p>" + checkSelections.filterOption + "</p>";
	
    $.each(checkSelections.selections, function(i, d){
		filtersHTML = filtersHTML + "<p>" + d + "</p>";
	});
	filtersHTML = filtersHTML + "</div>"
    $("#selBox").html(filtersHTML);
				
	$.ajax({
		method: "GET",
        url: "campaignRows.php",
        data: {
			month: monthObject.id,
			candSelections: JSON.stringify(checkSelections.selections),
			filterOption: checkSelections.filterOption
			},
			dataType: "html",
			success: function(data){
            $("#dataBox").html(data);
		}
	});
}

$(document).ready(function(){
    $(document).on('mouseleave', '.foldout-display', function(){
        $(this).removeClass('foldout-display');
        $(this).addClass('hidden-element');
    });
    $(document).on('click', '.payments-total', function(){
        $(this).next().toggleClass('hidden-element');
        $(this).next().toggleClass('foldout-display');
        
    });
});


