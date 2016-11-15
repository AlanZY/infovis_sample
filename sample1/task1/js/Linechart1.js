
function lineChart1(){
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 150;

var formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.High_school); });

var svg = d3.select("div#lineChart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("dataset/data.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.Year; }));
  //y.domain(d3.extent(data, function(d) { return d.High_school; }));
  y.domain([d3.min(data, function(d) { return d.High_school; })-0.1, d3.max(data, function(d) { return d.High_school; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("High-school Attainment (%)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

	svg.append('g').selectAll('circle').data(data).enter()
		.append('circle')
		.on('mouseover', function(d) {
		d3.select(this).transition().duration(500).attr('r', 5);
		d3.select('.tips').style('display', 'block');
		var tx = parseFloat(d3.select(this).attr("cx"));
		var ty = parseFloat(d3.select(this).attr("cy"));
		var tipRectx = tx+60+180>width?tx+10-180:tx+60,
			tipRecty= ty+20+60>height?ty+10-60:ty+20;
		var theYear = d3.time.format('%Y')(d.Year);
		var theEducation= d.High_school;
		var tips = svg.append("g")
		.attr("id","tips");
		var tipRect = tips.append("rect")
		.attr("x",tipRectx)
		.attr("y",tipRecty)
		.attr("width",200)
		.attr("height",60)
		.attr("fill","#FFF")
		.attr("stroke","#CCC")
		var tipText = tips.append("text")
		.attr("class","tiptools")
		.text("Year:"+theYear)
		.attr("x",tipRectx+20)
		.attr("y",tipRecty+20);
		var tipText = tips.append("text")
		.attr("class","tiptools")
		.text("Educational Attainment: "+theEducation+"%")
		.attr("x",tipRectx+20)
		.attr("y",tipRecty+50);
	})
		.on('mouseout', function() {
		d3.select(this).transition().duration(500).attr('r', 3.5);
		d3.select('.tips').style('display', 'none');
		d3.select("#tips").remove();
	})
		.attr('cx', line.x())
		.attr('cy', line.y())
		.attr('r', 5)
		.attr('fill', '#31a354');
});

function type(d) {
  d.Year = formatDate.parse(d.Year);
  d.High_school = +d.High_school;
  return d;
}
}


function lineChart2(){
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 150;

var formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Bachelor); });

var svg = d3.select("div#lineChart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("dataset/data.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.Year; }));
  //y.domain(d3.extent(data, function(d) { return d.Bachelor; }));
  y.domain([d3.min(data, function(d) { return d.Bachelor; })-0.1, d3.max(data, function(d) { return d.Bachelor; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Bachelor Attainment (%)");

  svg.append("path")
      .datum(data)
      .attr("class", "line2")
      .attr("d", line);


   	svg.append('g').selectAll('circle').data(data).enter()
		.append('circle')
		.on('mouseover', function(d) {
		d3.select(this).transition().duration(500).attr('r', 5);
		d3.select('.tips').style('display', 'block');
		var tx = parseFloat(d3.select(this).attr("cx"));
		var ty = parseFloat(d3.select(this).attr("cy"));
		var tipRectx = tx+60+180>width?tx+10-180:tx+60,
			tipRecty= ty+20+60>height?ty+10-60:ty+20;
		var theYear = d3.time.format('%Y')(d.Year);
		var theEducation= d.Bachelor;
		var tips = svg.append("g")
		.attr("id","tips");
		var tipRect = tips.append("rect")
		.attr("x",tipRectx)
		.attr("y",tipRecty)
		.attr("width",200)
		.attr("height",60)
		.attr("fill","#FFF")
		.attr("stroke","#CCC")
		var tipText = tips.append("text")
		.attr("class","tiptools")
		.text("Year:"+theYear)
		.attr("x",tipRectx+20)
		.attr("y",tipRecty+20);
		var tipText = tips.append("text")
		.attr("class","tiptools")
		.text("Educational Attainment: "+theEducation+"%")
		.attr("x",tipRectx+20)
		.attr("y",tipRecty+50);
})
		.on('mouseout', function() {
		d3.select(this).transition().duration(500).attr('r', 3.5);
		d3.select('.tips').style('display', 'none');
		d3.select("#tips").remove();
	})
		.attr('cx', line.x())
		.attr('cy', line.y())
		.attr('r', 5)
		.attr('fill', '#756bb1');

});

function type(d) {
  d.Year = formatDate.parse(d.Year);
  d.Bachelor = +d.Bachelor;
  return d;
}
}


function lineChart3(){
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 150;

var formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Advanced); });

var svg = d3.select("div#lineChart3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("dataset/data.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.Year; }));
  //y.domain(d3.extent(data, function(d) { return d.Advanced; }));
  y.domain([d3.min(data, function(d) { return d.Advanced; })-0.2, d3.max(data, function(d) { return d.Advanced; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Advanced Attainment (%)");

  svg.append("path")
      .datum(data)
      .attr("class", "line3")
      .attr("d", line);

  	svg.append('g').selectAll('circle').data(data).enter()
		.append('circle')
		.on('mouseover', function(d) {
		d3.select(this).transition().duration(500).attr('r', 5);
		d3.select('.tips').style('display', 'block');
		var tx = parseFloat(d3.select(this).attr("cx"));
		var ty = parseFloat(d3.select(this).attr("cy"));
		var tipRectx = tx+60+180>width?tx+10-180:tx+60,
			tipRecty= ty+20+60>height?ty+10-60:ty+20;
		var theYear = d3.time.format('%Y')(d.Year);
		var theEducation= d.Advanced;
		var tips = svg.append("g")
		.attr("id","tips");
		var tipRect = tips.append("rect")
		.attr("x",tipRectx)
		.attr("y",tipRecty)
		.attr("width",200)
		.attr("height",60)
		.attr("fill","#FFF")
		.attr("stroke","#CCC")
		var tipText = tips.append("text")
		.attr("class","tiptools")
		.text("Year:"+theYear)
		.attr("x",tipRectx+20)
		.attr("y",tipRecty+20);
		var tipText = tips.append("text")
		.attr("class","tiptools")
		.text("Educational Attainment: "+theEducation+"%")
		.attr("x",tipRectx+20)
		.attr("y",tipRecty+50);
})
		.on('mouseout', function() {
		d3.select(this).transition().duration(500).attr('r', 3.5);
		d3.select('.tips').style('display', 'none');
		d3.select("#tips").remove();
	})
		.attr('cx', line.x())
		.attr('cy', line.y())
		.attr('r', 5)
		.attr('fill', '#de2d26');

});

function type(d) {
  d.Year = formatDate.parse(d.Year);
  d.Advanced = +d.Advanced;
  return d;
}
}
