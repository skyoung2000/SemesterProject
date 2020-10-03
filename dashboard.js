
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}
//make slope graph
var drawSlopeGraph = function(CMDScores,screen)
{
   // var graph = {width:100,height:200}
   // console.log(graph)
    var screen = {width:600, height:600}
    var graph = d3.select("svg")
    .append("g")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    
    //upper left corner placement of slope graph
    // chenge this to change location of whole graph
    var graphLocX = 100
    var graphLocY = 100
    
    //make vertical lines
    
    var xshift = 200
    var lengthOfLine=400
   
    var xScale = d3.scaleLinear()
    .domain([10,14])
    .range([0,400]);

    
    //make slope lines
    var slopeLines = function(graphLocX, graphLocY, xshift, lengthOfLine, color, beginning, end)
    {
        xScale = d3.scaleLinear()
        .domain([10,14])
        .range(0,lengthOfLine)
        
        d3.select("svg")
        .append("g")
        .attr("class","slopeLine")
        .append("line")
        .style("stroke",color)
        .style("stroke-width",5)
        .attr("x1",graphLocX)
        .attr("y1",graphLocY+lengthOfLine-beginning)
        .attr("x2",graphLocX+xshift)
        .attr("y2",graphLocY+lengthOfLine-end) 
    };
    
    
    //why do I have to keep repeating this
    var xScale = d3.scaleLinear()
    .domain([10,13.5])
    .range([0,lengthOfLine]);
    console.log(xScale(Number(CMDScores[1].boysTime2)))
    
    //short duration boys
    var boysShort1 = xScale(Number(CMDScores[0].boysTime1))
    var boysShort2 = xScale(Number(CMDScores[0].boysTime2))
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "blue", boysShort1,boysShort2);
    
    //adequate duration boys
    var xScale = d3.scaleLinear()
    .domain([10,13.5])
    .range([0,lengthOfLine]);
    var boysAdequate1 =xScale(Number(CMDScores[1].boysTime1))
    var boysAdequate2 =xScale(Number(CMDScores[1].boysTime2))
    console.log(boysAdequate1)
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "red", boysAdequate1,boysAdequate2)
    
    //long duration boys
     var xScale = d3.scaleLinear()
    .domain([10,13.5])
    .range([0,lengthOfLine]);
    var boysLong1 =xScale(Number(CMDScores[2].boysTime1))
    var boysLong2 =xScale(Number(CMDScores[2].boysTime2))
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "green", boysLong1,boysLong2)
    
    var xScale = d3.scaleLinear()
    .domain([10,13.5])
    .range([0,lengthOfLine]);
    var girlsShort1 = xScale(Number(CMDScores[0].girlsTime1))
    var girlsShort2 = xScale(Number(CMDScores[0].girlsTime2))
    slopeLines(graphLocX+xshift+50,graphLocY, xshift, lengthOfLine, "blue", girlsShort1,girlsShort2)
    
    var xScale = d3.scaleLinear()
    .domain([10,13.5])
    .range([0,lengthOfLine]);
    var girlsAdequate1 = xScale(Number(CMDScores[1].girlsTime1))
    var girlsAdequate2 = xScale(Number(CMDScores[1].girlsTime2))
    slopeLines(graphLocX+xshift+50,graphLocY, xshift, lengthOfLine, "red", girlsAdequate1,girlsAdequate2)
    
    var xScale = d3.scaleLinear()
    .domain([10,13.5])
    .range([0,lengthOfLine]);
    var girlsLong1 = xScale(Number(CMDScores[2].girlsTime1))
    var girlsLong2 = xScale(Number(CMDScores[2].girlsTime2))
    slopeLines(graphLocX+xshift+50,graphLocY, xshift, lengthOfLine, "green", girlsLong1,girlsLong2)
    
    //make vertical lines
    var vertLine = function(graphLocX,graphLocY,lengthOfLine, xshift)
    {
    d3.select("svg")
    .append("g")
    .attr("class", "vertLine")
    .append("line")
    .style("stroke","black")
    .style("stroke-width",5)
    .attr("x1",graphLocX+xshift)
    .attr("y1",graphLocY)
    .attr("x2",graphLocX+xshift)
    .attr("y2",graphLocY+lengthOfLine)
    }
    var xshift = 200
    var lengthOfLine=400
    vertLine(graphLocX,graphLocY,lengthOfLine, 0)
    vertLine(graphLocX,graphLocY, lengthOfLine, xshift)
    vertLine(graphLocX,graphLocY,lengthOfLine, xshift+50)
    vertLine(graphLocX,graphLocY,lengthOfLine, xshift*2+50)
    
    
    //make legend
    var drawLegend = function(graphDim,margins)
{
    
 
   var categories = [
       {
           class:"short",
           name:"short"
       },
       {
           class:"adequate",
           name:"adequate"
       },
       {
           class:"long",
           name:"long"
       }
    ]

var legend = d3.select("svg")
    .append("g")
    .classed("legend",true)
   .attr("transform", makeTranslateString(190,70) )

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
            if(category == "short")
                {return "blue"}
            if(category == "adequate")
                {return "red"}
            if(category == "long")
                {return "green"}
        })
        .attr("transform",function(categories,index)
              {
            console.log(categories.length)
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
drawLegend(screen)
}

//get CMD score Data
var successFCN = function(CMDScores,screen)
{
    screen = {width:600, height:600}
    console.log("CMD Scores",CMDScores);
    drawSlopeGraph(CMDScores,screen)
}

var failFCN = function(error)
{
    console.log("error",error);
}

var CMDPromise = d3.csv("CMDScores.csv")
CMDPromise.then(successFCN,failFCN);

