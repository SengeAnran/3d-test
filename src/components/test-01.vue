<template>
<div class="main">
  <div class="test" style="width: 300px; height: 400px; background-color: pink"></div>
 <svg></svg>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'index',
  mounted() {
    const test = d3.select('.test');
    test.on('click', function (e) {
      console.log(e.path[e.path.length - 1].location.href);
    });
    const naiveKeys = ['香蕉', '苹果', '葡萄', '桃子']
    const color = d3.scaleOrdinal().domain(naiveKeys).range(d3.schemeSet3);
    console.log(color('苹果'));
    const svg = d3.select('svg');
    const margin = {
      top: 50,
      left: 50,
      bottom: 50,
      right: 50,
    };
    const width = 600;
    const height = 1000;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    svg.attr('width', width).attr('height', height);
    // 初始化画布
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`).attr('id', 'maingroup').attr('width', innerWidth).attr('height', innerHeight);
    d3.csv('/pgy2022.csv').then((data) => {
      // 数据处理
      let resData = [];
      data.forEach(i => {
        const index =  resData.findIndex(item => item.platform === i.platform);
        if (index === -1 ) {
          resData.push({
            platform: i.platform,
            globalsale: +(i.globalsale),
          });
        } else {
          resData[index].globalsale += +(i.globalsale);
        }
      });
      // 排序
      resData.sort((p, n) => n.globalsale - p.globalsale);
      // 1.线性比例尺
      const yScale = d3.scaleBand().domain(resData.map(i => i.platform)).range([0, innerHeight]).padding(0.1);
      // 条带比例尺
      const xScale = d3.scaleLinear().domain(d3.extent(resData, d => d.globalsale)).range([0, innerWidth]);
      const x_axis = d3.axisBottom(xScale); // X 坐标轴函数
      const y_axis = d3.axisLeft(yScale);// y 坐标轴函数
      g.append('g').call(y_axis);
      g.append('g').call(x_axis).attr('transform', `translate(0, ${innerHeight})`);
      console.log( (innerHeight / resData.length), resData.length);
      g.selectAll('rect')
        .data(resData)
        .join('rect')
        .attr('height', yScale.bandwidth())
        .attr('width', d => {
          return xScale(d.globalsale);
        })
        // .attr('y', (d, i) => i * (innerHeight / resData.length) + (innerHeight / resData.length - barWitdth) / 2)
        .attr('y', d => yScale(d.platform))
        .attr('fill', 'pink');
    });
  }
}
</script>

<style scoped>
*{
  /*margin-bottom: ;*/
  /*transform: rotate(-90);*/
}

</style>