import "./style.css";
import * as d3 from "d3";

fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(response => {
  return response.json().then(makeABarChart);
});

function makeABarChart(json) {
  const data = json.data;

  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .rangeRound([0, width], 0.1)
    .paddingInner(0.1);

  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3.axisBottom().scale(x);

  const yAxis = d3
    .axisLeft()
    .scale(y)
    .ticks(2000);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(d => d[0])); // e.g. d[0] === "1947-01-01"
  y.domain([0, d3.max(data, d => d[1])]); // e.g. d[1] === 243.1

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,", +height + ")")
    .call(xAxis);

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

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d[0]))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d[1]))
    .attr("height", d => height - y(d[1]));
}
