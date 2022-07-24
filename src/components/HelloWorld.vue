<template>
  <div>
    <h1>Knowledge Graph</h1>
    <svg width="960" height="600"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
    }
  },
  mounted () {
    //3.设置一个力导向图的基本骨架，添加了控制节点和线条的 css
    //
    // 注意： .link line .node circle 节点和线条的样式不能写在 <style scoped></style> 中，因为 d3 数据是动态渲染的，scoped 中的样式无法控制动态生成的 dom
    let svg = d3.select('svg');
    let width = +svg.attr('width');
    let height = +svg.attr('height');
    // 添加节点数据
    let nodesData = [
      { 'name': 'Lillian', 'sex': 'F' },
      { 'name': 'Gordon', 'sex': 'M' },
      { 'name': 'Sylvester', 'sex': 'M' },
      { 'name': 'Mary', 'sex': 'F' },
      { 'name': 'Helen', 'sex': 'F' },
      { 'name': 'Jamie', 'sex': 'M' },
      { 'name': 'Jessie', 'sex': 'F' },
      { 'name': 'Ashton', 'sex': 'M' },
      { 'name': 'Duncan', 'sex': 'M' },
      { 'name': 'Evette', 'sex': 'F' },
      { 'name': 'Mauer', 'sex': 'M' },
      { 'name': 'Fray', 'sex': 'F' },
      { 'name': 'Duke', 'sex': 'M' },
      { 'name': 'Baron', 'sex': 'M' },
      { 'name': 'Infante', 'sex': 'M' },
      { 'name': 'Percy', 'sex': 'M' },
      { 'name': 'Cynthia', 'sex': 'F' }
    ]
    // 线数据 添加连线，指定链接数据
    // { 'source': 线的起点, 'target': 线的终点, 'type': 线的类型 },
    let linksData = [
      { 'source': 'Sylvester', 'target': 'Gordon', 'type': 'A' },
      { 'source': 'Sylvester', 'target': 'Lillian', 'type': 'A' },
      { 'source': 'Sylvester', 'target': 'Mary', 'type': 'A' },
      { 'source': 'Sylvester', 'target': 'Jamie', 'type': 'A' },
      { 'source': 'Sylvester', 'target': 'Jessie', 'type': 'A' },
      { 'source': 'Sylvester', 'target': 'Helen', 'type': 'A' },
      { 'source': 'Helen', 'target': 'Gordon', 'type': 'A' },
      { 'source': 'Mary', 'target': 'Lillian', 'type': 'A' },
      { 'source': 'Ashton', 'target': 'Mary', 'type': 'A' },
      { 'source': 'Duncan', 'target': 'Jamie', 'type': 'A' },
      { 'source': 'Gordon', 'target': 'Jessie', 'type': 'A' },
      { 'source': 'Sylvester', 'target': 'Fray', 'type': 'E' },
      { 'source': 'Fray', 'target': 'Mauer', 'type': 'A' },
      { 'source': 'Fray', 'target': 'Cynthia', 'type': 'A' },
      { 'source': 'Fray', 'target': 'Percy', 'type': 'A' },
      { 'source': 'Percy', 'target': 'Cynthia', 'type': 'A' },
      { 'source': 'Infante', 'target': 'Duke', 'type': 'A' },
      { 'source': 'Duke', 'target': 'Gordon', 'type': 'A' },
      { 'source': 'Duke', 'target': 'Sylvester', 'type': 'A' },
      { 'source': 'Baron', 'target': 'Duke', 'type': 'A' },
      { 'source': 'Baron', 'target': 'Sylvester', 'type': 'E' },
      { 'source': 'Evette', 'target': 'Sylvester', 'type': 'E' },
      { 'source': 'Cynthia', 'target': 'Sylvester', 'type': 'E' },
      { 'source': 'Cynthia', 'target': 'Jamie', 'type': 'E' },
      { 'source': 'Mauer', 'target': 'Jessie', 'type': 'E' }
    ]

    // 使用节点数据设置模拟器
    let simulation = d3.forceSimulation()
      .nodes(nodesData)
    // 添加定心力和充电力
    simulation
      .force('charge_force', d3.forceManyBody()) // 充电力
      .force('center_force', d3.forceCenter(width / 2, height / 2)) // 定心力
    // 在svg元素中绘制圆圈
      let node = svg.append('g')
      .attr('class', 'nodes') // 样式类属性
      .selectAll('circle')
      .data(nodesData) // 数据
      .enter()
      .append('circle') // 插入圆形图
      .attr('r', 10)// 半径
      .attr('fill', this.circleColor)// 圆形填充颜色

    // 每次作出举动时需要更新节点位置
    simulation.on('tick', tickAction); // 监听tick举动事件

    function tickAction () {
      node
        .attr('cx', (d) => { return d.x }) // x坐标
        .attr('cy', (d) => { return d.y }) // y坐标

      link
        .attr('x1', (d) => { return d.source.x })
        .attr('y1', (d) => { return d.source.y })
        .attr('x2', (d) => { return d.target.x })
        .attr('y2', (d) => { return d.target.y })
    }
    // 创建链接力
    let linkForce = d3.forceLink(linksData)
      .id((d) => { return d.name }) //使用起点圆的name为id

    simulation.force('links', linkForce)

    let link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .style('stroke', this.linkColor)
  },
  methods: {
    circleColor (d) {
      if (d.sex === 'M') {
        return 'blue'
      } else {
        return 'pink'
      }
    },
    linkColor (d) {
      if (d.type === 'A') {
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>
<style scoped>
svg {
  border: 1px solid #ccc;
}
</style>
<style>
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}
.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
