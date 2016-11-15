var n = 120, // total number of nodes
    m = 11; // number of distincts clusters

var color = d3.scale.category10()
    .domain(d3.range(m));

var legend_labels = ["USA", "CHN", "ISR","IND","CAN","GBR","AUS","PAK","FRA","BGD"]
  // var color = d3.scale.threshold()
  // .domain(color_domain)
  // .range(["#fa9fb5", "#41b6c4", "#fd8d3c"]);


  var legend_color = d3.scale.ordinal()
  .domain(["USA", "CHN", "ISR","IND","CAN","GBR","AUS","PAK","FRA","BGD"])
  .range([color("USA"), color("CHN"),
  color("ISR"),color("IND"),
  color("CAN"),color("GBR"),
  color("AUS"),color("PAK"),
  color("FRA"),color("BGD")]);


  var svgContainer_legend = d3.select("#legend").append("svg")
                                               .attr("width",250)
                                              .attr("height",500);
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
        .attr("cy", function(d, i){ return 500 - (i*ls_h) - ls_h - 4;})
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill",  function(d)
        {

                            if(d == "CHN")
                            {
                              return color("CHN");
                            }
                            if(d == "USA")
                            {
                              return color("USA");
                            }
                            if(d == "ISR")
                            {
                              return color("ISR");
                            }
                            if(d == "GBR")
                            {
                              return color("GBR");
                            }
                            if(d == "CAN")
                            {
                              return color("CAN");
                            }
                            if(d == "PAK")
                            {
                              return color("PAK");
                            }
                            if(d == "BGD")
                            {
                              return color("BGD");
                            }
                            if(d == "FRA")
                            {
                              return color("FRA");
                            }
                            if(d == "AUS")
                            {
                              return color("AUS");
                            }
                            else {
                              return color("IND");
                            }
                          })
                          .style("opacity", 1);

                    legend.append("text")
                          .attr("font-family",'Comic Sans MS')
                          .attr("font-size", '16px')
                          .attr("x", 60)
                          .attr("y", function(d, i){ return 505 - (i*ls_h) - ls_h - 4;})
                          .text(function(d, i){ return legend_labels[i]; });

                     // add circle size legend
                     var circleData = [
                      { "cx": 70, "cy": 40, "radius": 30, "inner_radius": 15.6},
                      { "cx": 70, "cy": 40, "radius": 2.4, "inner_radius": 0}];

                      // svgContainer_legend .append("text")
                      //                            .attr("font-size", '18px')
                      //                            .attr("x", 2)
                      //                            .attr("y", 30)
                      //                            .attr("font-family",'Comic Sans MS')
                      //                            .attr("font-weight", 'bold')
                      //                            .text("Label Filtering: ");

var width = 960,
    height = 500,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 100;



// The largest node for each cluster.
var clusters = new Array(m);


// var nodes = d3.range(n).map(function() {
//   var i = Math.floor(Math.random() * m),
//       r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
//       d = {cluster: i, radius: r};
//   if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
//   return d;
// });
//
// var annee = [{"pays":"A", "count":20,"cluster":"d"},
// {"pays":"A", "count":15,"cluster":"d"},
// {"pays":"b", "count":50,"cluster":"d"},
// {"pays":"b", "count":30,"cluster":"d"},
// {"pays":"c", "count":5,"cluster":"s"},
// {"pays":"c", "count":12,"cluster":"s"},
// {"pays":"d", "count":37,"cluster":"g"},
// {"pays":"d", "count":52,"cluster":"g"},
// {"pays":"e", "count":15,"cluster":"e"},
// {"pays":"e", "count":20,"cluster":"e"},
// ];

var annee = [{
  "name": "A US",
  "cluster": "USA",
  "count": 2.44948974278318
},
{
  "name": "AHMEDABAD",
  "cluster": "IND",
  "count": 1
},
{
  "name": "ALASKA",
  "cluster": "USA",
  "count": 1
},
{
  "name": "ALBERTA",
  "cluster": "CAN",
  "count": 1
},
{
  "name": "AMERICAN",
  "cluster": "USA",
  "count": 5.09901951359278
},
{
  "name": "AMERICARES",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "AMIT",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "ASSAM",
  "cluster": "IND",
  "count": 2.23606797749979
},
{
  "name": "ASSOCIATED PRESS",
  "cluster": "USA",
  "count": 7.21110255092798
},
{
  "name": "AUSSIE",
  "cluster": "AUS",
  "count": 1.73205080756888
},
{
  "name": "AUSTRALIA",
  "cluster": "AUS",
  "count": 7.14142842854285
},
{
  "name": "AUSTRALIAN",
  "cluster": "AUS",
  "count": 6.2449979983984
},
{
  "name": "BANGLADESH",
  "cluster": "BGD",
  "count": 5.3851648071345
},
{
  "name": "BEIJING",
  "cluster": "CHN",
  "count": 3.3166247903554
},
{
  "name": "BHARAT",
  "cluster": "IND",
  "count": 1
},
{
  "name": "BIHAR",
  "cluster": "IND",
  "count": 2.64575131106459
},
{
  "name": "BINYAMIN NETANYAHU",
  "cluster": "ISR",
  "count": 1.73205080756888
},
{
  "name": "BRAC",
  "cluster": "BGD",
  "count": 1.4142135623731
},
{
  "name": "BRITAIN",
  "cluster": "GBR",
  "count": 3.60555127546399
},
{
  "name": "BRITISH",
  "cluster": "GBR",
  "count": 3.16227766016838
},
{
  "name": "BRITISH COLUMBIA",
  "cluster": "CAN",
  "count": 1.73205080756888
},
{
  "name": "BRITON",
  "cluster": "GBR",
  "count": 2.23606797749979
},
{
  "name": "CALGARY",
  "cluster": "CAN",
  "count": 1
},
{
  "name": "CALIFORNIA",
  "cluster": "USA",
  "count": 3
},
{
  "name": "CANADA",
  "cluster": "CAN",
  "count": 9.9498743710662
},
{
  "name": "CANADIAN",
  "cluster": "CAN",
  "count": 6.48074069840786
},
{
  "name": "CANBERRA",
  "cluster": "AUS",
  "count": 1.4142135623731
},
{
  "name": "CHANDIGARH",
  "cluster": "IND",
  "count": 2.23606797749979
},
{
  "name": "CHENNAI",
  "cluster": "IND",
  "count": 1
},
{
  "name": "CHHATTISGARH",
  "cluster": "IND",
  "count": 1
},
{
  "name": "CHICAGO",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "CHINA",
  "cluster": "CHN",
  "count": 13.856406460551
},
{
  "name": "CHINESE",
  "cluster": "CHN",
  "count": 10.0498756211209
},
{
  "name": "COLORADO",
  "cluster": "USA",
  "count": 1.73205080756888
},
{
  "name": "CONNECTICUT",
  "cluster": "USA",
  "count": 1
},
{
  "name": "DELHI",
  "cluster": "IND",
  "count": 5.8309518948453
},
{
  "name": "DENVER",
  "cluster": "USA",
  "count": 2
},
{
  "name": "DETROIT",
  "cluster": "USA",
  "count": 1
},
{
  "name": "DHAKA",
  "cluster": "BGD",
  "count": 3.87298334620742
},
{
  "name": "EDINBURGH",
  "cluster": "GBR",
  "count": 1
},
{
  "name": "FRANCE",
  "cluster": "FRA",
  "count": 5.29150262212918
},
{
  "name": "FRENCH",
  "cluster": "FRA",
  "count": 5.19615242270663
},
{
  "name": "GOOGLE",
  "cluster": "USA",
  "count": 1.73205080756888
},
{
  "name": "GREENVILLE",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "GUJARAT",
  "cluster": "IND",
  "count": 2.44948974278318
},
{
  "name": "HARYANA",
  "cluster": "IND",
  "count": 2.44948974278318
},
{
  "name": "HINDUSTAN",
  "cluster": "IND",
  "count": 1.4142135623731
},
{
  "name": "HUDSON BAY",
  "cluster": "CAN",
  "count": 1
},
{
  "name": "INDIANA",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "INTERNATIONAL MEDICAL CORPS",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "IOWA",
  "cluster": "USA",
  "count": 2
},
{
  "name": "ISLAMABAD",
  "cluster": "PAK",
  "count": 1.4142135623731
},
{
  "name": "ISLE OF MAN",
  "cluster": "GBR",
  "count": 1
},
{
  "name": "ISRAEL",
  "cluster": "ISR",
  "count": 11
},
{
  "name": "ISRAELI",
  "cluster": "ISR",
  "count": 8.77496438739212
},
{
  "name": "JAIPUR",
  "cluster": "IND",
  "count": 1
},
{
  "name": "JERSEY",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "KARNATAKA",
  "cluster": "IND",
  "count": 2.23606797749979
},
{
  "name": "KENTUCKY",
  "cluster": "USA",
  "count": 1
},
{
  "name": "KERALA",
  "cluster": "IND",
  "count": 1.4142135623731
},
{
  "name": "KOLKATA",
  "cluster": "IND",
  "count": 1
},
{
  "name": "LAWRENCE",
  "cluster": "USA",
  "count": 1
},
{
  "name": "LONDON",
  "cluster": "GBR",
  "count": 2
},
{
  "name": "LORRAINE",
  "cluster": "FRA",
  "count": 1
},
{
  "name": "LOS ANGELES",
  "cluster": "USA",
  "count": 3
},
{
  "name": "LOUISIANA",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "MAHARASHTRA",
  "cluster": "IND",
  "count": 1.73205080756888
},
{
  "name": "MAMATA BANERJEE",
  "cluster": "IND",
  "count": 1
},
{
  "name": "MANX",
  "cluster": "GBR",
  "count": 1
},
{
  "name": "MEDICAL TEAMS INTERNATIONAL",
  "cluster": "USA",
  "count": 1
},
{
  "name": "METLIFE",
  "cluster": "USA",
  "count": 2
},
{
  "name": "MICROSOFT",
  "cluster": "USA",
  "count": 1.73205080756888
},
{
  "name": "MONTANA",
  "cluster": "USA",
  "count": 1
},
{
  "name": "MONTREAL",
  "cluster": "CAN",
  "count": 1
},
{
  "name": "MUMBAI",
  "cluster": "IND",
  "count": 2
},
{
  "name": "NAGPUR",
  "cluster": "IND",
  "count": 1.4142135623731
},
{
  "name": "NAWAZ SHARIF",
  "cluster": "PAK",
  "count": 2.64575131106459
},
{
  "name": "NEBRASKA",
  "cluster": "USA",
  "count": 2
},
{
  "name": "NEW DELHI",
  "cluster": "IND",
  "count": 5.74456264653803
},
{
  "name": "NEW YORK",
  "cluster": "USA",
  "count": 2.23606797749979
},
{
  "name": "NEW YORK CITY",
  "cluster": "USA",
  "count": 1
},
{
  "name": "NITISH KUMAR",
  "cluster": "IND",
  "count": 2.82842712474619
},
{
  "name": "NOVA SCOTIA",
  "cluster": "CAN",
  "count": 2
},
{
  "name": "OREGON",
  "cluster": "USA",
  "count": 1
},
{
  "name": "PAKISTAN",
  "cluster": "PAK",
  "count": 7.54983443527075
},
{
  "name": "PAKISTANI",
  "cluster": "PAK",
  "count": 2.44948974278318
},
{
  "name": "PATNA",
  "cluster": "IND",
  "count": 1.4142135623731
},
{
  "name": "PHILADELPHIA",
  "cluster": "USA",
  "count": 1
},
{
  "name": "PORTLAND",
  "cluster": "USA",
  "count": 2
},
{
  "name": "PUNE",
  "cluster": "IND",
  "count": 2.44948974278318
},
{
  "name": "RAJASTHAN",
  "cluster": "IND",
  "count": 2.23606797749979
},
{
  "name": "REUTERS",
  "cluster": "USA",
  "count": 2.44948974278318
},
{
  "name": "RHODE ISLAND",
  "cluster": "USA",
  "count": 2.64575131106459
},
{
  "name": "SACRAMENTO",
  "cluster": "USA",
  "count": 1.4142135623731
},
{
  "name": "SAN ANTONIO",
  "cluster": "USA",
  "count": 1
},
{
  "name": "SAN DIEGO",
  "cluster": "USA",
  "count": 1.73205080756888
},
{
  "name": "SYDNEY",
  "cluster": "AUS",
  "count": 1.4142135623731
},
{
  "name": "TAMIL NADU",
  "cluster": "IND",
  "count": 1
},
{
  "name": "TAMPA",
  "cluster": "USA",
  "count": 1
},
{
  "name": "TEXAS",
  "cluster": "USA",
  "count": 1
},
{
  "name": "THE ASSOCIATED PRESS",
  "cluster": "USA",
  "count": 3.74165738677394
},
{
  "name": "THE US",
  "cluster": "USA",
  "count": 4
},
{
  "name": "TIBET",
  "cluster": "CHN",
  "count": 1.73205080756888
},
{
  "name": "UNITED KINGDOM",
  "cluster": "GBR",
  "count": 10.1488915650922
},
{
  "name": "UNITED STATES",
  "cluster": "USA",
  "count": 11.8321595661992
},
{
  "name": "USAID",
  "cluster": "USA",
  "count": 2.82842712474619
},
{
  "name": "UTAH",
  "cluster": "USA",
  "count": 1
},
{
  "name": "UTTAR PRADESH",
  "cluster": "IND",
  "count": 2.64575131106459
},
{
  "name": "VANCOUVER",
  "cluster": "CAN",
  "count": 1.4142135623731
},
{
  "name": "VERMONT",
  "cluster": "USA",
  "count": 1.73205080756888
},
{
  "name": "VICTORIA",
  "cluster": "AUS",
  "count": 1
},
{
  "name": "VIJAYAWADA",
  "cluster": "IND",
  "count": 2
},
{
  "name": "VIRGINIA",
  "cluster": "USA",
  "count": 2
},
{
  "name": "VODAFONE",
  "cluster": "GBR",
  "count": 1.4142135623731
},
{
  "name": "WALES",
  "cluster": "GBR",
  "count": 1
},
{
  "name": "WASHINGTON",
  "cluster": "USA",
  "count": 2.23606797749979
},
{
  "name": "WEST BENGAL",
  "cluster": "IND",
  "count": 2.64575131106459
},
{
  "name": "XIAMEN",
  "cluster": "CHN",
  "count": 1
},
{
  "name": "YUKON",
  "cluster": "CAN",
  "count": 1
},
];

// var annee;
// d3.json("dataset1_name.json", function(data)
// {
//   annee = data;
// })
// console.log(annee);

var nodes = annee;
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
// console.log(JSON.stringify(clusters));
//console.log(JSON.stringify(nodes));
// Use the pack layout to initialize node positions.
d3.layout.pack()
    .sort(null)
    .size([width, height])
    .children(function(d) { return d.values; })
    .value(function(d) { return d.radius * d.radius; })
    .nodes({values: d3.nest()
      .key(function(d) { return d.cluster; })
      .entries(nodes)});

      function covertData(m){
      	var nodes = m;
      	nodes.forEach(function(d) {
      		clusters[d.cluster] = d;
      		d.radius = ((d.count *2));
      	});
      	return nodes;
      };



function drawBubbles(annee)
{


 nodes = covertData(annee);
 console.log((nodes));
var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(.02)
    .charge(0)
    .on("tick", tick)
    .start();

var svg = d3.select("#network").append("svg")
    .attr("width", width)
    .attr("height", height);


var node = svg.selectAll("circle")
    .data(nodes)
  .enter().append("circle")
    .style("fill", function(d) { return color(d.cluster); })
    .call(force.drag)
    .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("<div class=\"tooltip_kv\">"+

            "<span class=\"tooltip_value\">"  + "<br>" +
            d.name + "</span>" + "</div>" )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
      .on("mouseout", function(d) {
                       div.transition()
                           .duration(500)
                           .style("opacity", 0)});


node.transition()
    .duration(750)
    .delay(function(d, i) { return i * 5; })
    .attrTween("r", function(d) {
      var i = d3.interpolate(0, d.radius);
      return function(t) { return d.radius = i(t); };
    });

function tick(e) {
  node
      .each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.5))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Move d to be adjacent to the cluster node.
function cluster(alpha) {
  return function(d) {
    var cluster = clusters[d.cluster];
    if (cluster === d) return;
    var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
}

// Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}
}

drawBubbles(annee);
