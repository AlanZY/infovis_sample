d3.csv("nodes.csv",function(error,nodes){
    d3.csv("edges.csv",function(error,edges){

        function tick() {
            edge.attr("d", function(d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
                return "M" + 
                    d.source.x + "," + 
                    d.source.y + "A" + 
                    dr + "," + dr + " 0 0,1 " + 
                    d.target.x + "," + 
                    d.target.y;
            });
            node
                .attr("transform", function(d) { 
                    return "translate(" + d.x + "," + d.y + ")"; });
        }


       edges.forEach(function(e){
           e.source = nodes.find(function(node){
               return node.Id === e.Source;
           });

           e.target = nodes.find(function(node){
               return node.Id === e.Target;
           });
       })

        console.log(nodes[0]);
        console.log(edges[0]);

        var width = 1080,
        height = 720;

        var force = d3.layout.force()
            .nodes(nodes)
            .links(edges)
            .size([width, height])
            .linkDistance(60)
            .charge(-30)
            .on("tick",tick)
            .start();

        var svg = d3.select("#q1").append("svg")
            .attr("width",width)
            .attr("height",height);

        var edge = svg.append("svg:g").selectAll("edge")
            .data(force.links())
            .enter().append("svg:path")
            .attr("class", "edge");

        var node = svg.selectAll(".node")
            .data(force.nodes())
            .enter().append("g")
            .attr("class","node");

        node.append("circle")
            .attr("r",5);

    });
});