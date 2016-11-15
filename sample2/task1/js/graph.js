
var width = 1000;
var height = 900;

var color = d3.scale.category10();

// var color =
var force = d3.layout.force()
                     .charge(-300)  // +: attractive; -: exclusive
                     .linkDistance(100)
                     .size([width, height]);

var svg = d3.select("#network").append("svg")
                           .attr("width", width)
                           .attr("height", height);


d3.csv("dataset/polbooks_nodes.csv", function (error, nodes)
{
  d3.csv("dataset/polbooks_edges.csv", function (error, link)
{
  graph = { "nodes": [], "links": [] };

  nodes.forEach(function (d)
  {
    graph.nodes.push( { "id": d.id, "label": d.label, "class": d.class, "degree": d.degree });
  });

  link.forEach(function(d)
 {
    graph.links.push( { "source": d.source, "target": d.target });
 })

  var nodesmap = d3.nest()
                   .key( function(d) {return d.id; })
                   .rollup( function (d) { return { "id": d[0].id, "label": d[0].label, "class": d[0].class, "degree": d[0].degree}; })
                   .map(graph.nodes);
  // alert(JSON.stringify(nodesmap));
  // nodesmap: < {"0":{"id":"0","label":"1000 Years for Revenge","class":"n","degree":"6"},
  //              "1":{"id":"1","label":"Bush vs. the Beltway","class":"c","degree":"4"},   >

  graph.nodes = d3.keys(d3.nest()
                          .key( function(d) { return d.id; })
                          .map(graph.nodes));
  // alert(JSON.stringify(graph.nodes));
  // graph nodes: < "0","1","2","3","4","5","6","7","8","9","10","11","12"... >

  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });


  graph.nodes.forEach( function (d, i)
                    {
                      graph.nodes[i] = { "id": nodesmap[d].id,
                                         "label": nodesmap[d].label,
                                         "class": nodesmap[d].class,
                                         "degree": nodesmap[d].degree
                    };
                    })
  // alert(JSON.stringify(graph.nodes));
  // graph.nodes: < [{"id":"0","label":"1000 Years for Revenge","class":"n","degree":"6"},
  //                 {"id":"1","label":"Bush vs. the Beltway","class":"c","degree":"4"}]

  // alert(JSON.stringify(graph.links));
  // graph.links: < [{"source":1,"target":0},
  //                 {"source":2,"target":0},
  //                 {"source":3,"target":0}] >


  force.nodes(graph.nodes)
       .links(graph.links)
       .start();

  var link = svg.selectAll(".link")
                .data(graph.links)
                .enter()
                .append("line")
                .attr("class", "link")


  var node_drag = d3.behavior.drag()
                             .on("dragstart", dragstart)
                             .on("drag", dragmove)
                             .on("dragend", dragend);
  function dragstart(d, i)
  {
        force.stop() // stops the force auto positioning before you start dragging
  }

  function dragmove(d, i) {
                      d.px += d3.event.dx;
                      d.py += d3.event.dy;
                      d.x += d3.event.dx;
                      d.y += d3.event.dy;
                      tick(); // this is the key to make it work together with updating both px,py,x,y on d !
  }

  function dragend(d, i) {
                      d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
                      tick();
                      force.resume();
  }

  var node = svg.selectAll(".node")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("r", function(d) { return (d.degree)*1.2;})
                .style("fill", function(d)
                 {
                   if(d.class == 'n')
                       return "#41b6c4";
                   if(d.class == 'l')
                       return "#fd8d3c";
                   if(d.class == 'c')
                       return "#fa9fb5";

                 })
                .call(node_drag);





  var text = svg.selectAll("text")
                .data(force.nodes())
                .enter()
                .append("text")
                .attr("x", function(d) {return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("font-size", function(d,i) { return ".60em" ;})
                .text(function(d) {return d.label});
  //
  // force.on("tick", function()
  // {
  //   link.attr("x1", function (d) {return d.source.x; })
  //       .attr("y1", function (d) {return d.source.y; })
  //       .attr("x2", function (d) {return d.target.x; })
  //       .attr("y2", function(d) {return d.target.y; });
  //
  //   node.attr("cx", function(d) { return d.x; })
  //       .attr("cy", function(d) {return d.y; });
  //
  //   text.attr("x", function(d) {return d.x; })
  //       .attr("y", function(d) {return d.y; });
  //
  //   text.style("font", "12px Helvetica")
  // });


  force.on("tick", tick);

  function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


  text.attr("x", function(d) {return d.x; })
       .attr("y", function(d) {return d.y; });

  text.style("font", "10px Inconsolata, Monaco, Consolas, 'Courier New', Courier")
      .style("fill", "black");
};

})
})

var change = function()
{
  var metric = document.getElementById('metric').selectedOptions[0].text;
  if(metric == "Hide all labels")
  {
    svg.selectAll("text")
      .attr("opacity", 1)
      .text(null);
  }
  if(metric == "Show all labels")
  {
    svg.selectAll("text")
      .attr("opacity", 1)
      .text(function(d) { return d.degree > 0?  d.label:null});
  }
  if(metric == "Degree > 5")
  {
    svg.selectAll("text")
      .attr("opacity", 1)
      .text(function(d) { return d.degree > 5? d.label : null });
  }
  if(metric == "Degree > 10")
  {
    svg.selectAll("text")
      .attr("opacity", 1)
      .text(function(d) { return d.degree > 10? d.label : null });
  }
  if(metric == "Degree > 15")
  {
    svg.selectAll("text")
      .attr("opacity", 1)
      .text(function(d) { return d.degree > 15? d.label : null });
  }
  if(metric == "Degree > 20")
  {
    svg.selectAll("text")
      .attr("opacity", 1)
      .text(function(d) { return d.degree > 20? d.label : null });
  }
}



// legend


// var color_domain = [50, 150, 350]

var legend_labels = ["Conservative", "Neutral", "Liberal"]
// var color = d3.scale.threshold()
// .domain(color_domain)
// .range(["#fa9fb5", "#41b6c4", "#fd8d3c"]);
var color = d3.scale.ordinal()
.domain(["Conservative","Neutral","Liberal"])
.range(["#fa9fb5", "#41b6c4", "#fd8d3c"]);
var svgContainer_legend = d3.select("#legend").append("svg")
                                           .attr("width",250)
                                          .attr("height",300);
var svgContainer = d3.select("#legend").append("svg")
                                    .attr("width",250)
                                    .attr("height",250);



var legend = svgContainer_legend.selectAll("g.legend")
               .data(legend_labels)
               .enter().append("g")
               .attr("class", "legend");

var ls_w = 40, ls_h = 40;
legend.append("circle")
      .attr('r', 15)
      .attr("cx", 30)
      .attr("cy", function(d, i){ return 300 - (i*ls_h) - ls_h - 4;})
      .attr("width", ls_w)
      .attr("height", ls_h)
      .style("fill",  function(d)
      {
        if(d == "Conservative")
        {
          return "#fa9fb5";
        }
        if(d == "Neutral")
        {
          return "#41b6c4";
        }
        else {
          return "#fd8d3c";
        }
      })
      .style("opacity", 1);

legend.append("text")
      .attr("font-family",'Inconsolata, Monaco, Consolas, \'Courier New\', Courier')
      .attr("font-size", '16px')
      .attr("x", 60)
      .attr("y", function(d, i){ return 305 - (i*ls_h) - ls_h - 4;})
      .text(function(d, i){ return legend_labels[i]; });

 // add circle size legend
 var circleData = [
  { "cx": 70, "cy": 40, "radius": 30, "inner_radius": 15.6},
  { "cx": 70, "cy": 40, "radius": 2.4, "inner_radius": 0}];

 var circles = svgContainer.selectAll("g")
                            .data(circleData)
                            .enter()
                            .append("g");

  // Add outer circle.
 circles.append("circle")
        .attr("cx", function (d) { return d.cx; })
        .attr("cy", function (d) { return d.cy; })
        .attr("r", function (d) { return d.radius; })
        .style("stroke", "black")    // set the line colour
        .style("fill", "none");

// Add inner circle.
  circles.append("circle")
         .attr("cx", function (d) { return d.cx; })
         .attr("cy", function (d) { return d.cy; })
         .attr("r", function (d) { return d.inner_radius; })
         .style("stroke", "black")    // set the line colour
         .style("fill", "none");


  svgContainer .append("text")
               .attr("font-size", '10px')
               .attr("x", 67)
               .attr("y", 35)
                .attr("font-family",'Inconsolata, Monaco, Consolas, \'Courier New\', Courier')
               .text("2");
  svgContainer .append("text")
               .attr("font-size", '10px')
               .attr("x", 64)
               .attr("y", 22)
                .attr("font-family",'Inconsolata, Monaco, Consolas, \'Courier New\', Courier')
               .text("13");
  svgContainer .append("text")
               .attr("font-size", '10px')
               .attr("x", 64)
               .attr("y", 8)
                .attr("font-family",'Inconsolata, Monaco, Consolas, \'Courier New\', Courier')
               .text("25");
  svgContainer .append("text")
               .attr("font-size", '16px')
               .attr("x", 45)
               .attr("y", 89)
               .attr("font-family",'Inconsolata, Monaco, Consolas, \'Courier New\', Courier')
               .text("degree");

               svgContainer_legend .append("text")
                            .attr("font-size", '18px')
                            .attr("x", 2)
                            .attr("y", 30)
                            .attr("font-family",'Inconsolata, Monaco, Consolas, \'Courier New\', Courier')
                            .attr("font-weight", 'bold')
                            .text("Label Filtering: ");
