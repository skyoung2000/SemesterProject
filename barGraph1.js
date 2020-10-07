var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var svgw = 500
var svgh = 400
var drawBars = function(suffSleepByGender, target, graphDim, margins, yscale)
{
    
    
    barw = 40
    barh = 200

    var bars = function(target,num,shift)
    {
    
    target.selectAll("rect")
    .data([suffSleepByGender[num].Male,suffSleepByGender[num].Female])
    .enter()
    .append("rect")
    .attr("x",function(d,i){return i*(barw+2)+(2*num*(barw+10))+margins.left})
    .attr("y",function(d){return yscale(d)})
    .attr("width",barw)
    .attr("height",function(d){return graphDim.height-yscale(d)})
    .attr("fill",function(d,i)
         {
            if(i==0)
                {return "blue"}
            if(i==1)
                {return "magenta"}
        })
    .attr("class",function(d,i)
          {
            if(i==0)
                {return "Male"}
            if(i==1)
                {return "Female"}
            })
    //function(d){return yscale(d)
    //function(d){return graphDim.height-yscale(d)}
        
    }
    var g0 = target.append("g")
    bars(g0,0)
    var g1 = target.append("g")
    bars(g1,1)
    var g2 = target.append("g")
    bars(g2,2)
    var g3 = target.append("g")
    bars(g3,3)
}
var drawAxes = function(target, graphDim,margins,
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
var drawLabels = function(target,graphDim,margins)
{
    var title = target.append("text")
    .text("Share of U.S. adults getting a sufficient")
    .classed("title", true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",margins.top/2-20)
    .style("font-weight", "bold")
    .style("font-size", "20px")
    target.append("text")
    .text("amount of sleep 2017, by gender")
    .classed("title", true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",margins.top/2)
    .style("font-weight", "bold")
    .style("font-size", "20px")
    
    //x-label
    
    target.append("text")
    .text("Category")
    .classed("label", true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",graphDim.height+margins.top+10)
    
    //y-label
    target.append("text")
    .attr("transform",makeTranslateString(margins.left/2-20, margins.top+graphDim.height/2 ) + " rotate(-90)")
    .text("Percentage of Respondents")
    .classed("label","true")
    .attr("text-anchor","middle")
    //.attr("transform", "rotate(-90)")
    
}
var drawLegend = function(target,graphDim,margins)
{
    
 
   var categories = [
       {
           class:"Male",
           name:"Male"
       },
       {
           class:"Female",
           name:"Female"
       }
    ]

var legend = target
    .append("g")
    .classed("legend",true)
   .attr("transform", makeTranslateString(80,60))

var entries = legend.selectAll("g")
        .data(categories.map(function(category)
                            {
            return category.name
        }))
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("fill", function(category)
              { 
            if(category == "Male")
                {return "blue"}
            if(category == "Female")
                {return "magenta"}
        })
        .attr("transform",function(categories,index)
              {
                return "translate(0,"+index*20+")";
              })
              
        entries.append("rect")
                .attr("width",10)
                .attr("height",10)
    
        entries.append("text")
                .text(function(name){return name})
                .attr("x",15)
                .attr("y",10)
}

var successFCN = function(suffSleepByGender,screen)
{
    screen = {width:1000, height:1000}
    console.log("Sufficient sleep by gender",suffSleepByGender);
    
    graphDim = {height: 300, width:400}
    margins = {left: 40, top:30}
    
    var svg = d3.select("#graph1")
    .attr("width",svgw)
    .attr("height",svgh)
    
    var target = svg.append("g")
    .attr("id","bargraph1")
    .attr("transform", "translate("+margins.left+","+margins.top+")")
    
    var xscale = d3.scaleBand()
    .domain(["Far too little","Rather too little","Yes, about enough","Yes, more than enough"])
    .range([0,graphDim.width])
    
    var yscale = d3.scaleLinear()
    .domain([0,100])
    .range([graphDim.height,0])
    
    drawBars(suffSleepByGender, target, graphDim, margins, yscale)
    drawAxes(target,graphDim,margins,xscale,yscale)
    drawLabels(target,graphDim,margins)
    drawLegend(target,graphDim,margins)
}
var failFCN = function(error)
{
    console.log("error",error);
}

var CMDPromise = d3.csv("suffSleepByGender.csv")
CMDPromise.then(successFCN,failFCN);

