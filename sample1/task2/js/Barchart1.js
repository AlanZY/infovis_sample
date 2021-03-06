function barChart() {
var margin = {top: 40, right: 20, bottom: 20, left: 40},
  width = 1060,
  height = 100;

  //https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeRoundBands
  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .6);
  //https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
  var y = d3.scale.linear()
    .range([height, 0]);

  //https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  //https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  var svg = d3.select("div#barChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("dataset/Workbook1.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.State; }));
    y.domain([0, d3.max(data, function(d) { return d.High_school; })]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 15)
        .attr("x", -5)
        .attr("dx", "0em")
        .attr("dy", ".10em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("High school attainment");

    svg.selectAll(".bar").data(data).enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.State); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.High_school); })
      .attr("height", function(d) { return height - y(d.High_school); });

  var   legend = svg.append("g")
  .attr("class","legend")
  .attr("transform","translate(50,30)")
  .style("font-size","12px")
  .call(d3.legend)

      legend.append("rect")
        .attr("x", width)
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", color);

      legend.append("text")
        .attr("x", 10)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
  });



  function type(d) {
    d.High_school = +d.High_school;
    return d;
  }
  }



  function barChart1() {
var margin = {top: 40, right: 20, bottom: 20, left: 40},
  width = 1060,
  height = 100;

  //https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeRoundBands
  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .6);
  //https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
  var y = d3.scale.linear()
    .range([height, 0]);

  //https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  //https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  var svg = d3.select("div#barChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("dataset/Workbook1.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.State; }));
    y.domain([0, d3.max(data, function(d) { return d.Bachelor; })]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 15)
        .attr("x", -5)
        .attr("dx", "0em")
        .attr("dy", ".10em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Bachelor's Degree attainment");

    svg.selectAll(".bar1").data(data).enter()
      .append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.State); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Bachelor); })
      .attr("height", function(d) { return height - y(d.Bachelor); });

  });
  function type(d) {
    d.Bachelor = +d.Bachelor;
    return d;
  }
  }


  function barChart2() {
var margin = {top: 40, right: 20, bottom: 100, left: 40},
  width = 1060,
  height = 100;

  //https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeRoundBands
  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.6);
  //https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
  var y = d3.scale.linear()
    .range([height, 0]);

  //https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  //https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  var svg = d3.select("div#barChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("dataset/Workbook1.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.State; }));
    y.domain([0, d3.max(data, function(d) { return d.Advanced; })]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 15)
        .attr("x", -5)
        .attr("dx", "0em")
        .attr("dy", ".10em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Advanced Degree attainment");

    svg.selectAll(".bar2").data(data).enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.State); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Advanced); })
      .attr("height", function(d) { return height - y(d.Advanced); });






  });


  function type(d) {
    d.Advanced = +d.Advanced;
    return d;
  }

  }
