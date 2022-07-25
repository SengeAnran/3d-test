<template>
<div class="main">
 <svg></svg>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'index',
  mounted() {
    const svg = d3.select('svg');
    const margin = {
      top: 50,
      left: 50,
      bottom: 50,
      right: 50,
    };
    const width = 600;
    const height = 400;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    console.log(innerHeight, innerWidth)
    svg.attr('width', width).attr('height', height);
    // 初始化画布
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`).attr('id', 'maingroup').attr('width', innerWidth).attr('height', innerHeight);
    d3.csv('./data/pgy2022.csv').then((data) => {
      console.log(data);
      // 1.线性比例尺
      const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.globalsale)).range([0, innerHeight]);
      // 条带比例尺
      const xScale = d3.scaleBand().domain(data.map(i => i.platform)).range([0, innerWidth]);
      const x_axis = d3.axisBottom(xScale);
      console.log(x_axis);
      const y_axis = d3.axisLeft(yScale);
      g.append('g').call(y_axis);
      g.append('g').call(x_axis).attr('transform', `translate(0, ${innerHeight})`);
    })
  }
}
</script>

<style scoped>
*{
  /*margin-bottom: ;*/
}

</style>