
var classData = d3.json("classData.json");

classData.then(function(data){

  //var quizes = createList(data, 1)
  var day = 1;
  drawChart(data, day)
  var list=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
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
        console.log(this.value, "checking button.value")
        console.log(d, "this is d")
        updateChart(data, this.value)})


      })



var createList=function(data, day){
  console.log("made it here")
  var quizes=[]
  console.log(data, 'THIS IS DATA LOOK HERE')

    data.quizes.forEach(function(d){
      if (d.day===day)
      {quizes.push(d.grade)}

    })

  return quizes
}
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
      height: 400
    }

    var margin = {
      left: 50,
      right: 50,
      top: 50,
      bottom: 100
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
console.log(bins, "these are bins, take note")
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



var xAxis = d3.axisBottom(xScale);
    svg.append('g')
    .attr('id', 'xAxis')
    .call(xAxis)
    .attr('transform', 'translate('+margin.left+','+(screen.height-margin.bottom-margin.top)+')')

var yAxis = d3.axisLeft(yScale);
    svg.append('g')
    .call(yAxis)
    .attr('transform', 'translate('+margin.left+','+(0)+')')
    .attr()
}

var updateChart = function(classData, day){
console.log(day)
  var quizes= []
  classData.forEach(function(d){
    d.quizes.forEach(function(d){
      if (day==d.day)
      {quizes.push(d.grade)}
    })

  })


    var screen = {
      width: 500,
      height: 400
    }

    var margin = {
      left: 50,
      right: 50,
      top: 50,
      bottom: 100
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
console.log(bins, "these are bins, take note")
var svg = d3.select("#chart")
.attr("width", screen.width)
.attr("height", screen.height)

svg.selectAll('rect')
  .data(bins)
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


}
