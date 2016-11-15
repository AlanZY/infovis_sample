
queue()
    .defer(d3.csv, "dataset/nodes.csv")
    .defer(d3.csv, "dataset/edges.csv")
    .await(function(error, file1, file2) { create(file1, file2); });

function create(nodes,edges){
    var margin = {top: 130, right: 70, bottom: 30, left: 130},
    width = 960 + margin.left + margin.right,
    height = 960 + margin.top + margin.bottom;

    var x = d3.scale.ordinal().rangeBands([0, width]),
    z = d3.scale.linear().domain([0, 4]).clamp(true),
    c = d3.scale.category10().domain(d3.range(10));

      var gr = [
    {
      text:"n group",
      code:c("n".charCodeAt(0))
    },{
      text:"c group",
      code:c("c".charCodeAt(0))
    },{
      text:"l group",
      code:c("l".charCodeAt(0))
    },{
      text:"different",
      code:"grey"
    }
  ];


    var svg = d3.select("#q2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var matrix = [],
    n = nodes.length;

    nodes.forEach(function(node, i) {
        matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
        node.group = node.Class.charCodeAt(0);
    });

    console.log(nodes);

    edges.forEach(function(edge) {
        matrix[parseInt(edge.Source)][parseInt(edge.Target)].z =1;
        matrix[parseInt(edge.Target)][parseInt(edge.Source)].z =1;
        matrix[parseInt(edge.Target)][parseInt(edge.Target)].z =1;
        matrix[parseInt(edge.Source)][parseInt(edge.Source)].z =1;
    });

    var orders = {
        name: d3.range(n).sort(function(a, b) { return nodes[a].Id - nodes[b].Id; }),
        degree: d3.range(n).sort(function(a, b) { return nodes[b].Degree - nodes[a].Degree; }),
        class: d3.range(n).sort(function(a, b) { return nodes[a].group - nodes[b].group; })
    };


    x.domain(orders.name);

    var row = svg.selectAll(".row")
      .data(matrix)
    .enter().append("g")
      .attr("class", "row")
      .attr("transform", function(d, i) {  return "translate(0," + x(i) + ")"; })
      .each(makerow);


    row.append("line")
      .attr("x2", width)
      .attr("stroke", "black");

    row.append("text")
      .attr("x", -6)
      .attr("y", x.rangeBand() / 5)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .style("font-size",".6em")
      .text(function(d, i) { return nodes[i].Label; });

    var column = svg.selectAll(".column")
      .data(matrix)
    .enter().append("g")
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

    column.append("line")
      .attr("x1", -width)
      .attr("stroke", "black");

    column.append("text")
      .attr("x", 6)
      .attr("y", x.rangeBand() / 5)
      .attr("dy", ".32em")
      .style("font-size",".6em")
      .attr("text-anchor", "start")
      .text(function(d, i) { return nodes[i].Label; });

     d3.select("#order").on("change", function() {
        arrage(this.value);
    });

      var legend = svg.selectAll(".legend")
        .data(gr)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width)
        .attr("y", -5)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d,i){
            return d.code;
        });

    legend.append("text")
        .attr("x", width + 57)
        .attr("y", 13)
        .attr("dy", "-.5em")
        .style("text-anchor", "end")
        .style("font-size","12px")
        .text(function(d) { return d.text; });


    function makerow(row) {
    var cell = d3.select(this).selectAll(".cell")
        .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand())
        .attr("height", x.rangeBand())
        .style("fill-opacity", function(d) { return d.z; })
        .style("fill", function(d) {
            return (nodes[d.x].group === nodes[d.y].group) ? c(nodes[d.x].group) : "gray";
        })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);
  }

  function arrage(value) {
    x.domain(orders[value]);
    console.log("re-aggrange");
    var t = svg.transition().duration(1000);

    t.selectAll(".row")
        .delay(function(d, i) { return x(i) * 4; })
        .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
      .selectAll(".cell")
        .delay(function(d) { return x(d.x) * 4; })
        .attr("x", function(d) { return x(d.x); });

    t.selectAll(".column")
        .delay(function(d, i) { return x(i) * 4; })
        .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
  }

  function mouseover(p) {
    d3.selectAll(".row text").classed("active", function(d, i) { return i == p.y; });
    d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
  }

  function mouseout() {
    d3.selectAll("text").classed("active", false);
  }

}
