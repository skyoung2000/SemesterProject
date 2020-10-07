
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

/*var lines = d3.select("svg")
   .select("slopeLine")
   .selectAll("g")
   .data(CMDScores)
   .enter()
   .append("g")
   .classed("line",true)
   .on("mouseover",function(subject)
        {   
            if(! d3.select(this).classed("off"))
            {
            d3.selectAll(".line")
            .classed("fade",true);
            
            d3.select(this)
                .classed("fade",false)
                .raise(); //move to top
            }
        })
        .on("mouseout",function(subject)
           {
            if(! d3.select(this).classed("off"))
            {
            
            d3.selectAll(".line")
                .classed("fade",false);
            }
            
        })*/
//make slope graph
var drawSlopeGraph = function(CMDScores,screen)
{
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
        //.attr("id",id)
        .append("line")
        .style("stroke",color)
        .style("stroke-width",5)
        .attr("x1",graphLocX)
        .attr("y1",graphLocY+lengthOfLine-yScale(beginning))
        .attr("x2",graphLocX+xshift)
        .attr("y2",graphLocY+lengthOfLine-yScale(end))
        
        d3.select("svg")
        .append("g")
        .append("text")
        .text(beginning)
        .classed("numberLabel", true)
        .attr("text-anchor","middle")
        .attr("x",graphLocX -20)
        .attr("y",graphLocY+lengthOfLine-yScale(beginning))
        .style("font-size", "15px")
        
        d3.select("svg")
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
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "blue", boysShort1,boysShort2);
    
    //adequate duration boys
    var boysAdequate1 =Number(CMDScores[1].boysTime1)
    var boysAdequate2 =Number(CMDScores[1].boysTime2)
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "red", boysAdequate1,boysAdequate2)
    
    //long duration boys
    var boysLong1 =Number(CMDScores[2].boysTime1)
    var boysLong2 =Number(CMDScores[2].boysTime2)
    slopeLines(graphLocX,graphLocY, xshift, lengthOfLine, "green", boysLong1,boysLong2)
    
    var girlsShort1 = Number(CMDScores[0].girlsTime1)
    var girlsShort2 = Number(CMDScores[0].girlsTime2)
    slopeLines(graphLocX+xshift+gapBetween,graphLocY, xshift, lengthOfLine, "blue", girlsShort1,girlsShort2)
    
    var girlsAdequate1 = Number(CMDScores[1].girlsTime1)
    var girlsAdequate2 = Number(CMDScores[1].girlsTime2)
    slopeLines(graphLocX+xshift+gapBetween,graphLocY, xshift, lengthOfLine, "red", girlsAdequate1,girlsAdequate2)
    
    var girlsLong1 = Number(CMDScores[2].girlsTime1)
    var girlsLong2 = Number(CMDScores[2].girlsTime2)
    slopeLines(graphLocX+xshift+gapBetween,graphLocY, xshift, lengthOfLine, "green", girlsLong1,girlsLong2)
    
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

var legend = d3.select("svg")
    .append("g")
    .classed("legend",true)
   .attr("transform", makeTranslateString(graphLocX +xshift,graphLocY+lengthOfLine+50) )

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
   
var drawTitle = function(graphDim,graphLocX,graphLocY,lengthOfLine)
{
    var title = d3.select("svg")
   
    title.append("text")
    .text("The Impact of Duration of Sleep on Common Mental Disorders")
    .classed("title", true)
    .attr("text-anchor","middle")
    .attr("x",graphLocX +xshift+gapBetween/2)
    .attr("y",graphLocY-20)
    .style("font-weight", "bold")
    .style("font-size", "20px")
    
    
}
drawTitle(screen,graphLocX,graphLocY,lengthOfLine)
 
var drawXLabels = function(graphLocX,graphLocY,xshift,text,x,y)    
    {var label = d3.select("svg")
    
    label.append("text")
    .text(text)
    .classed("label", true)
    .attr("text-anchor","middle")
    .attr("x",x)
    .attr("y",y)
    }
drawXLabels(graphLocX,graphLocY,xshift,"Boys",graphLocX+.5*xshift,graphLocY+lengthOfLine +40)
    
drawXLabels(graphLocX,graphLocY,xshift,"Girls",graphLocX+1.5*xshift+gapBetween,graphLocY+lengthOfLine +40)
    
drawXLabels(graphLocX,graphLocY,xshift,"Time 1",graphLocX,graphLocY+lengthOfLine +20)
    
drawXLabels(graphLocX,graphLocY,xshift,"Time 2",graphLocX+xshift,graphLocY+lengthOfLine +20)
    
drawXLabels(graphLocX,graphLocY,xshift,"Time 1",graphLocX+xshift+gapBetween,graphLocY+lengthOfLine +20)
    
drawXLabels(graphLocX,graphLocY,xshift,"Time 2",graphLocX+2*xshift+gapBetween,graphLocY+lengthOfLine +20)


 var yLabel = d3.select("svg")
    yLabel.append("text")
    .attr("transform",makeTranslateString(graphLocX-50, graphLocY+.5*lengthOfLine ) + " rotate(-90)")
    .text("CMD Score")
    .classed("label","true")
    .attr("text-anchor","middle")
    
    
//need to fix
  /* d3.select("svg")
   .selectAll(".slopeLine")
   .on("mouseover",function(subject,CMDScores)
        {   
            console.log("subject",subject)
       
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;
      
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
    
            d3.select("#tooltip")
            .text("hi")
        })
        .on("mouseout",function(subject)
           {
            d3.select("#tooltip")
            .classed("hidden",true)
        
})*/

}


//get CMD score Data
var successFCN = function(CMDScores,screen)
{
    screen = {width:1000, height:1000}
    console.log("CMD Scores",CMDScores);
    drawSlopeGraph(CMDScores,screen)
    
    //need to fix
   d3.select("svg")
   .selectAll(".slopeLine")
   .on("mouseover",function(subject,CMDScores)
        {   
            console.log("subject",subject)
       
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;
      
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
    
            d3.select("#tooltip")
            .text("hi")
        })
        .on("mouseout",function(subject)
           {
            d3.select("#tooltip")
            .classed("hidden",true)
})
}

var failFCN = function(error)
{
    console.log("error",error);
}

var CMDPromise = d3.csv("CMDScores.csv")
CMDPromise.then(successFCN,failFCN);
