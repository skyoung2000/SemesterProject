var svg2w = 600
var svg2h = 600

var drawBars2 = function(mentalillnessgender, target, graphDim, margins, yscale)
{
    barw = 100
    barh = 200

    var bars = function(target,num,mentalillnessgender)
    {
    target.selectAll("rect")
    .data([num])
    .enter()
    .append("rect")
    .attr("x",function(d,i){return 50+num*(barw+90)+margins.left})
    .attr("y",function(d){return yscale(mentalillnessgender[d].percentMentalIllness)})
    .attr("width",barw)
    .attr("height",function(d){return graphDim.height-yscale(mentalillnessgender[d].percentMentalIllness)})
    .attr("fill","teal")
    .attr("class", function(d)
          {
            if(d==0)
                {return "Male"}
            if(d==1)
                {return "Female"}
            })
    
}
    var g0 = target.append("g")
    bars(g0,0, mentalillnessgender)
    var g1 = target.append("g")
    bars(g1,1,mentalillnessgender)
    }

var drawAxes2 = function(target, graphDim,margins,
                         xScale,yScale)
{
    var yAxis = d3.axisLeft(yScale)
    target
    .append("g")
    .attr("transform", makeTranslateString(margins.left, 0))
    .call(yAxis)
    
    var xAxis=d3.axisBottom(xScale)
    target
    .append("g")
    .attr("transform", makeTranslateString(margins.left-5, graphDim.height))//+margins.top))
    .call(xAxis)
}

var drawLabels2 = function(target,graphDim,margins)
{
    var title = target.append("text")
    .text(function(d,i)
          {
            if(i==1)
        {return "Share of U.S. adults getting a sufficient"}
           else(i==2)
        {return "Percentage of U.S. adults with any"}
          })
    .classed("title", true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",margins.top/2-20)
    .style("font-weight", "bold")
    .style("font-size", "20px")
    target.append("text")
    .text("mental illness in the past year by gender")
    .classed("title", true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",margins.top/2)
    .style("font-weight", "bold")
    .style("font-size", "20px")
    
    //x-label
    
    target.append("text")
    .text("Gender")
    .classed("label", true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",graphDim.height+margins.top+10)
    
    //y-label
    target.append("text")
    .attr("transform",makeTranslateString(margins.left/2-20, margins.top+graphDim.height/2 ) + " rotate(-90)")
    .text("Percentage with Mental Illness")
    .classed("label","true")
    .attr("text-anchor","middle")
    //.attr("transform", "rotate(-90)")
    
}



var successFCN2 = function(mentalillnessgender,screen)
{
    console.log("data",mentalillnessgender)
    screen = {width:1000, height:1000}
    
    graphDim2 = {height: 300, width:400}
    margins2 = {left: 40, top:30}
    
   // var svg = d3.select("body")
    //.append("svg")
    //.attr("width",svg2w)
    //.attr("height",svg2h)
    
    var target2 = d3.select("#graph2")
    .attr("width",svg2w)
    .attr("height",svg2h)
    .append("g")
    .attr("id","bargraph2")
    .attr("transform", "translate("+margins2.left+","+margins2.top+")")
    
    var xscale2 = d3.scaleBand()
    .domain(["Male","Female"])
    .range([0,graphDim.width])
    
    var yscale2 = d3.scaleLinear()
    .domain([0,40])
    .range([graphDim.height,0])
    
    drawBars2(mentalillnessgender, target2, graphDim2, margins2, yscale2)
    drawAxes2(target2, graphDim2,margins2,xscale2,yscale2)
    drawLabels2(target2,graphDim2,margins2)
    
    //when hover over female, make the males fade
d3.selectAll(".Female")
   .on("mouseover",function(subject)
        {   
            d3.selectAll(".Male")
            .classed("fade",true);
            
            d3.select(this)
                .classed("selected bar",true)
        })
        .on("mouseout",function(subject)
           {
            d3.selectAll(".Male")
            .classed("fade",false)
        })

d3.selectAll(".Male")
   .on("mouseover",function(subject)
        {   
            d3.selectAll(".Female")
            .classed("fade",true);
            
            d3.select(this)
                .classed("selected bar",true)
        })
        .on("mouseout",function(subject)
           {
            d3.selectAll(".Female")
            .classed("fade",false)
        })

    
}

var failFCN = function(error)
{
    console.log("error",error);
}

var mentalillnessgenderPromise = d3.csv("mentalillnessgender.csv")
mentalillnessgenderPromise.then(successFCN2,failFCN);
