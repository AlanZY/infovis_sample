queue()
    .defer(d3.csv, "dataset/nodes.csv")
    .defer(d3.csv, "dataset/edges.csv")
    .await(function(error, file1, file2) { create(file1, file2); });

function create(nodes,edges){
    var margin = {top: 130, right: 30, bottom: 30, left: 200},
    width = 1080 + margin.left + margin.right,
    height = 1080 + margin.top + margin.bottom;

    var matrix = [];
    var edgesHash = [];
    for(x in edges){
        var id = edges[x].Source + '-' + edges[x].Target;
        edgesHash[id] = 1;
    }

    for(a in nodes){
        for(b in nodes){
            var grid = {id:nodes[a].Id+'-'+nodes[b].Id, revid:nodes[b].Id+'-'+nodes[a].Id, x:a, y:b, weight:0};
            if(edgesHash[grid.id] || edgesHash[grid.revid]){
                grid.weight = 1;
            }
            matrix.push(grid);
        }
    }

    console.log(matrix);

    var svg = d3.select("#q2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("id","adjacencyG")
        .selectAll("rect")
        .data(matrix)
        .enter()
        .append("rect")
        .attr("width",10)
        .attr("height", 10)
        .attr("x",function(d){ return d.x * 10 } )
        .attr("y",function(d){ return d.y * 10 } )
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("fill", "red")
        .style("fill-opacity", function (d) {return d.weight});


    var scaleSize = nodes.length * 10;
    var nameScale = d3.scale.ordinal().domain(nodes.map(function (el) {return el.Label})).rangePoints([0,scaleSize],1);

    xAxis = d3.svg.axis().scale(nameScale).orient("top").tickSize(4);
    yAxis = d3.svg.axis().scale(nameScale).orient("left").tickSize(4);

    d3.select("#adjacencyG").append("g").call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size",".6em")
    .attr("transform", "rotate(90)")
    .attr("dx",-5)
    .attr("dy",10);

    d3.select("#adjacencyG").append("g").call(yAxis)
    .selectAll("text")
    .style("font-size",".6em");

}
