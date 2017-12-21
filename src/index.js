import "./style.css";
import * as d3 from "d3";

fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(response => {
  return response.json().then(makeABarChart);
});

function makeABarChart(json) {
  const data = json.data;
  console.log(data.length);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 1024 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const parseTime = d3.timeParse("%Y-%m-%d");

  data.forEach(d => {
    d.date = parseTime(d[0]);
    d.GDP = d[1];
  });

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  x.domain(d3.extent(data, d => d.date));
  y.domain([0, d3.max(data, d => d.GDP)]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the X Axis
  const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y"));
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  const yAxis = d3
    .axisLeft()
    .scale(y)
    .ticks(2000);
  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Gross Domestic Product, USA");

  // Add the value line path
  var valueLine = d3
    .line()
    .x(d => x(d.date))
    .y(d => y(d.GDP));
  svg
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueLine);

  //   svg
  //     .selectAll(".bar")
  //     .data(data)
  //     .enter()
  //     .append("rect")
  //     .attr("class", "bar")
  //     .attr("x", d => x(d[0]))
  //     .attr("width", x.bandwidth())
  //     .attr("y", d => y(d[1]))
  //     .attr("height", d => height - y(d[1]));
}
