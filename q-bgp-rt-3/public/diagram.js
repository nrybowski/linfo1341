var index = 0;
if (input["@random"][0] != 0){
    index = parseInt(input["@random"][0].toString().slice(2,4));
}

// Create the graph
var g = new dagreD3.graphlib.Graph().setGraph({multigraph: true, rankDir: 'LR'});

// Set node for each AS

g.setNode("ASc", {label:data[index]["ASc"], shape:"circle"});
g.setNode("ASd", {label:data[index]["ASd"], shape:"circle"});
g.setNode("ASb", {label:data[index]["ASb"], shape:"circle"});
g.setNode("ASa", {label:data[index]["ASa"], shape:"circle"});
g.setNode("ASf", {label:data[index]["ASf"], shape:"circle"});
g.setNode("ASe", {label:data[index]["ASe"], shape:"circle"});

// Set relations between AS
g.setEdge("ASd", "ASb", {label:"$", labelStyle: "fill:#f00;", curve: d3.curveBasis, style:"stroke: #f00; fill: #fff;stroke-width: 1.5px;", arrowheadClass:"pro-cust"})
g.setEdge("ASa", "ASb", {label:"$", labelStyle: "fill:#f00;", curve: d3.curveBasis, style:"stroke: #f00; fill: #fff;stroke-width: 1.5px;", arrowheadClass:"pro-cust"})
g.setEdge("ASb", "ASf", {label:"$", labelStyle: "fill:#f00;", curve: d3.curveBasis, style:"stroke: #f00; fill: #fff;stroke-width: 1.5px;", arrowheadClass:"pro-cust"})
g.setEdge("ASa", "ASc", {label:"$", labelStyle: "fill:#f00;", curve: d3.curveBasis, style:"stroke: #f00; fill: #fff;stroke-width: 1.5px;", arrowheadClass:"pro-cust"})
g.setEdge("ASc", "ASe", {label:"$", labelStyle: "fill:#f00;", curve: d3.curveBasis, style:"stroke: #f00; fill: #fff;stroke-width: 1.5px;", arrowheadClass:"pro-cust"})
g.setEdge("ASc", "ASf", {label:"=", labelStyle: "fill:#00f;", curve: d3.curveBasis, style:"stroke: #00f; fill: #fff;stroke-width: 1.5px;", arrowhead:"undirected"})
g.setEdge("ASd", "ASe", {label:"=", labelStyle: "fill:#00f;", curve: d3.curveBasis, style:"stroke: #00f; fill: #fff;stroke-width: 1.5px;", arrowhead:"undirected"})
g.setEdge("ASe", "ASf", {label:"=", labelStyle: "fill:#00f;", curve: d3.curveBasis, style:"stroke: #00f; fill: #fff;stroke-width: 1.5px;", arrowhead:"undirected"})


// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"), inner = svg.append("g");
render(inner, g);

// Set up zoom support
var zoom = d3.zoom()
    .on("zoom", function() {
	    inner.attr("transform", d3.event.transform);
	});
svg.call(zoom);

// Center the graph
var initialScale = 1;
svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(initialScale));
svg.attr('height', g.graph().height * initialScale + 40);

// function used to get the randomized name of AS
function getAS(tag){
    return data[index][tag];
}