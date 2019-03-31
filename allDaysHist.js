
var classData = d3.json("classData.json");

classData.then(function(data){

  var day = 0;
  drawChart(data, day)
  var list=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22,
23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
  var body=d3.select("body")
  body.selectAll("button")
      .data(list)
      .enter()
      .append("button")
      .attr("value", function(d){
        return d})
      .text(function(d){
        return d})
      .on("click", function(d,i){
        updateChart(data, this.value)})
      })


var drawChart = function(classData, day){

  var quizes= []
  classData.forEach(function(d){
    d.quizes.forEach(function(d){
      if (day==d.day)
      {quizes.push(d.grade)}
    })

  })
    var screen = {
      width: 500,
      height: 300
    }
    var margin = {
      left: 50,
      right: 50,
      top: 50,
      bottom: 0
    }

var width = screen.width - margin.left - margin.right
var height = screen.height - margin.top - margin.bottom

var bucketNum = 11
var barWidth = width/bucketNum

var yScale=d3.scaleLinear()
    .domain([0,23])
    .range([height, 0]);

var xScale=d3.scaleLinear()
    .domain([0,11])
    .nice()
    .range([0, width]);

var binMaker=d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(10))

var bins=binMaker(quizes);
var svg = d3.select("#chart")
.attr("width", screen.width)
.attr("height", screen.height)

svg.selectAll('rect')
  .data(bins)
  .enter()
  .append("rect")
  .attr('x', function(d, i){
    return (margin.left-barWidth/2) + xScale(d.x0)
  })
  .attr('y', function(d){
    return yScale(d.length)
  })
  .attr('width', barWidth)
  .attr('height', function(d){
    return height - yScale(d.length)
  })
  .attr("fill", "blue")
  .on('mouseover',function(d)
      {
        d3.select(this)
          .attr('fill','gray')
          .text(function(d){return d})


                var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 2;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 5;

                svg.append("text")
                  .attr("id", "tooltip")
                  .attr("x", xPosition)
                  .attr("y", yPosition)
                  .attr("text-anchor", "middle")
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "11px")
                  .attr("fill", "black")
                  .text(d.length);

      })
      .on('mouseout',function(d)
      {
        d3.select(this)
          .attr('fill',"blue")
          d3.select("#tooltip").remove()})


var newsvg = d3.select("#dayCounter")
.attr("width", 500)
.attr("height", 30)
index=[1]
newsvg.selectAll("text")
  .data(index)
  .enter()
  .append("text")
  .attr("x", 10)
  .attr("y", 15)
  .text("Day: ")

var xAxis = d3.axisBottom(xScale);
    svg.append('g')
    .attr('id', 'xAxis')
    .call(xAxis)
    .attr('transform', 'translate('+(margin.left)+','+(screen.height-margin.bottom-margin.top)+')')

var yAxis = d3.axisLeft(yScale);
    svg.append('g')
    .call(yAxis)
    .attr('transform', 'translate('+(margin.left-barWidth+5)+','+(0)+')')
    .attr()

}

var updateChart = function(classData, day){
  var quizes= []
  classData.forEach(function(d){
    d.quizes.forEach(function(d){
      if (day==d.day)
      {quizes.push(d.grade)}
    })
  })

    var screen = {
      width: 500,
      height: 300
    }

    var margin = {
      left: 50,
      right: 50,
      top: 50,
      bottom: 0
    }

var width = screen.width - margin.left - margin.right
var height = screen.height - margin.top - margin.bottom

var bucketNum = 11
var barWidth = width/bucketNum

var yScale=d3.scaleLinear()
    .domain([0,23])
    .range([height, 0]);

var xScale=d3.scaleLinear()
    .domain([0,11])
    .nice()
    .range([0, width]);

var binMaker=d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(10))

var bins=binMaker(quizes);
var svg = d3.select("#chart")
.attr("width", screen.width)
.attr("height", screen.height)

var newsvg = d3.select("#dayCounter")
.attr("width", 500)
.attr("height", 30)
  newsvg.selectAll("text")
    .attr("x", 10)
    .attr("y", 15)
    .text("Day: "+day)

svg.selectAll('rect')
  .data(bins)
  .transition()
  .duration(1000)
  .ease(d3.easeLinear)
  .attr('x', function(d, i){
    return (margin.left-barWidth/2) + xScale(d.x0)
  })
  .attr('y', function(d){
    return yScale(d.length)
  })
  .attr('width', barWidth)
  .attr('height', function(d){
    return height - yScale(d.length)
  })
  .attr("fill", "blue")
  .on('mouseover',function(d)
      {
        d3.select(this)
          .attr('fill','gray')

      var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 2;
      var yPosition = parseFloat(d3.select(this).attr("y"))-5

      svg.append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .text(d.length);

      })
      .on('mouseout',function(d)
      {
        d3.select(this)
          .attr('fill',"blue")
        d3.select("#tooltip").remove()})







}
