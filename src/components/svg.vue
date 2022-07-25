<template>
  <div class="svgShow">
    <svg>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: "svg",
  data() {
    return {
      width: 700,
      height: 700,
      arr: [21, 17, 16, 11, 10],
    }
  },
  mounted() {
    const rectHeight = 25;
    const svg = d3.select('svg');
    console.log(d3);
    svg.attr('width', this.width).attr('height', this.height);
    // const max = Math.max(...this.arr);
    // const num = this.width / max;
    // 比例尺
    const max = d3.max(this.arr);
    const scale = d3.scaleLinear()
      .domain([d3.min(this.arr), d3.max(this.arr)])
      .range([0, this.width -100]);
    console.log(max)
    // 创建横向底部的 x 轴，并向 x 轴添加比例尺
    const x_axis = d3.axisBottom().scale(scale);


    svg.selectAll('rect')
      .data(this.arr)
      // .enter().append('rect')
      .join('rect')
      .attr('height', rectHeight)
      .attr('width', (d) => {
        return scale(d);
      })
      .attr('fill','pink')
      .attr('y', (d, i) => i * (rectHeight + 10));
    // 创建“组”并向其中插入 x 轴坐标
    svg.append('g').call(x_axis).attr('transform', `translate(0, 200)`);
  },
}
</script>

<style lang="scss" scoped>
.svgShow {
  /*width: /;*/
  rect {
    //width: 200px;
    //height: 200px;
    //background-color: pink;
    //color: gold;
  }
}
</style>