<template>
<svg width="300" height="200">
</svg>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: "pie",
  data() {
    return {
      data: [2, 4, 8, 10],
    }
  },
  mounted() {
    const svg = d3.select('svg');
    const width = svg.attr('width');
    const height = svg.attr('height');
    const radius = Math.min(width, height) / 2;
    // const pie = d3.pie();
    // 添加组元素
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)
    // 对颜色使用序数比例尺
    const colors = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
    // 生成pie
    const pie = d3.pie();
    // 生成弧
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    // 生成组
    const arcs = g.selectAll('arc')
    .data(pie(this.data))
    .enter()
    .append('g')
    .attr('class', 'arc');

    arcs.append('path')
    .attr('fill', function (d, i) {
      return colors(i);
    })
    .attr('d', arc)
    //  绘制路径，枚举序数填充颜色
    // arcs.append('path')
    // .attr(fill)

  }
}
</script>

<style scoped>

</style>