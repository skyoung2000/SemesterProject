
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//make slope graph
var drawSlopeGraph = function(CMDScores,screen)
{
    var screen = {width:600, height:600}
    var graph = d3.select("#slopeGraph")
    .append("g")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    
    //upper left corner placement of slope graph
    // chenge this to change location of whole graph
    var graphLocX = 100
    var graphLocY = 100
    
    //make vertical lines
    
    var xshift = 150
    var lengthOfLine=300
    var gapBetween=100
   
    var yScale = d3.scaleLinear()
    .domain([10,14])
    .range([0,400]);

    
    //make slope lines
    var slopeLines = function(graphLocX, graphLocY, xshift, lengthOfLine, color, beginning, end)
    {
        var yScale = d3.scaleLinear()
        .domain([10,13.5])
        .range([0,lengthOfLine]);
        
        d3.select("svg")
        .append("g")
        .attr("class","slopeLine")
        .append("line")
        .style("stroke",color)
        .style("stroke-width",5)
        .attr("x1",graphLocX)
        .attr("y1",graphLocY+lengthOfLine-yScale(beginning))
        .attr("x2",graphLocX+xshift)
        .attr("y2",graphLocY+lengthOfLine-yScale(end))
        .on("mouseover",function()
        {   
            console.log(end-beginning)
            var difference = (end-beginning).toFixed(1)
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;
      
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
    
            d3.select("#tooltip")
            .text(function(){return "Difference: "+difference})
        })
        .on("mouseout",function(subject)
           {
            d3.select("#tooltip")
            .classed("hidden",true)
    })
        
        d3.select("#slopeGraph")
        .append("g")
        .append("text")
        .text(beginning)
        .classed("numberLabel", true)
        .attr("text-anchor","middle")
        .attr("x",graphLocX -20)
        .attr("y",graphLocY+lengthOfLine-yScale(beginning))
        .style("font-size", "15px")
        
        d3.select("#slopeGraph")
        .append("g")
        .append("text")
        .text(end)
        .classed("numberLabel", true)
        .attr("text-anchor","middle")
        .attr("x",graphLocX +xshift+20)
        .attr("y",graphLocY+lengthOfLine-yScale(end))
        .style("font-size", "15px")
    
   
    };
    
    
    //short duration boys
    var boysShort1 = Number(CMDScores[0].boysTime1)
    var boysShort2 = Number(CMDScores[0].boysTime2)
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "#10559A", boysShort1,boysShort2);
    
    //adequate duration boys
    var boysAdequate1 =Number(CMDScores[1].boysTime1)
    var boysAdequate2 =Number(CMDScores[1].boysTime2)
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "#DB4C77", boysAdequate1,boysAdequate2)
    
    //long duration boys
    var boysLong1 =Number(CMDScores[2].boysTime1)
    var boysLong2 =Number(CMDScores[2].boysTime2)
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "#A155B9", boysLong1,boysLong2)
    
    var girlsShort1 = Number(CMDScores[0].girlsTime1)
    var girlsShort2 = Number(CMDScores[0].girlsTime2)
    slopeLines(graphLocX+xshift+gapBetween,graphLocY, xshift, lengthOfLine, "#10559A", girlsShort1,girlsShort2)
    
    var girlsAdequate1 = Number(CMDScores[1].girlsTime1)
    var girlsAdequate2 = Number(CMDScores[1].girlsTime2)
    slopeLines(graphLocX+xshift+gapBetween,graphLocY, xshift, lengthOfLine, "#DB4C77", girlsAdequate1,girlsAdequate2)
    
    var girlsLong1 = Number(CMDScores[2].girlsTime1)
    var girlsLong2 = Number(CMDScores[2].girlsTime2)
    slopeLines(graphLocX+xshift+gapBetween,graphLocY, xshift, lengthOfLine, "#A155B9", girlsLong1,girlsLong2)
    
    //make vertical lines
    var vertLine = function(graphLocX,graphLocY,lengthOfLine, xshift)
    {
    d3.select("#slopeGraph")
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
    var xshift = 150
    var lengthOfLine=300
    var gapBetween=100
    vertLine(graphLocX,graphLocY,lengthOfLine, 0)
    vertLine(graphLocX,graphLocY, lengthOfLine, xshift)
    vertLine(graphLocX,graphLocY,lengthOfLine, xshift+gapBetween)
    vertLine(graphLocX,graphLocY,lengthOfLine, xshift*2+gapBetween)
    
    
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

var legend = d3.select("#slopeGraph")
    .append("g")
    .classed("legend",true)
   .attr("transform", makeTranslateString(graphLocX +1.1*xshift+gapBetween,graphLocY+50) )

    legend
    .append("text")
    .text("Amount of Sleep:")

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
                {return "#10559A"}
            if(category == "adequate")
                {return "#DB4C77"}
            if(category == "long")
                {return "#A155B9"}
        })
        .attr("transform",function(categories,index)
              {
                var y = index*20+5
                return "translate(0,"+ y+")";
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
   
var drawTitle = function(graphDim,graphLocX,graphLocY,lengthOfLine)
{
    var title = d3.select("#slopeGraph")
   
    title.append("text")
    .text("The Impact of Duration of Sleep on Common Mental Disorders")
    .classed("title", true)
    .attr("text-anchor","middle")
    .attr("x",graphLocX +xshift+gapBetween/2)
    .attr("y",graphLocY-40)
    .style("font-weight", "bold")
    .style("font-size", "20px")
    title.append("text")
    .text("(CMDs) in Children Over a 9 month Period, by Gender")
    .classed("title", true)
    .attr("text-anchor","middle")
    .attr("x",graphLocX +xshift+gapBetween/2)
    .attr("y",graphLocY-20)
    .style("font-weight", "bold")
    .style("font-size", "20px")
    
    
}
drawTitle(screen,graphLocX,graphLocY,lengthOfLine)
 
var drawXLabels = function(graphLocX,graphLocY,xshift,text,x,y)    
    {var label = d3.select("#slopeGraph")
    
    label.append("text")
    .text(text)
    .classed("label", true)
    .attr("text-anchor","middle")
    .attr("x",x)
    .attr("y",y)
    }
drawXLabels(graphLocX,graphLocY,xshift,"Boys",graphLocX+.5*xshift,graphLocY+lengthOfLine +40)
    
drawXLabels(graphLocX,graphLocY,xshift,"Girls",graphLocX+1.5*xshift+gapBetween,graphLocY+lengthOfLine +40)
    
drawXLabels(graphLocX,graphLocY,xshift,"Month 0",graphLocX,graphLocY+lengthOfLine +20)
    
drawXLabels(graphLocX,graphLocY,xshift,"Month 9",graphLocX+xshift,graphLocY+lengthOfLine +20)
    
drawXLabels(graphLocX,graphLocY,xshift,"Month 0",graphLocX+xshift+gapBetween,graphLocY+lengthOfLine +20)
    
drawXLabels(graphLocX,graphLocY,xshift,"Month 9",graphLocX+2*xshift+gapBetween,graphLocY+lengthOfLine +20)


 var yLabel = d3.select("#slopeGraph")
    yLabel.append("text")
    .attr("transform",makeTranslateString(graphLocX-50, graphLocY+.5*lengthOfLine ) + " rotate(-90)")
    .text("CMD Score")
    .classed("label","true")
    .attr("text-anchor","middle")
    
}


//get CMD score Data
var successFCN = function(CMDScores,screen)
{
    screen = {width:1000, height:1000}
    console.log("CMD Scores",CMDScores);
    drawSlopeGraph(CMDScores,screen)
    
   
}

var failFCN = function(error)
{
    console.log("error",error);
}

var CMDPromise = d3.csv("CMDScores.csv")
CMDPromise.then(successFCN,failFCN);
