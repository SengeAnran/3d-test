<template>
<div class="show-box">
  <svg></svg>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: "tree",
  data() {
    return {
      svg: undefined,
      innerWidth: undefined,
      innerHeight: undefined,
      root: undefined,
      color: undefined,
      g: null,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const width = 2200;
      const height = 1200;
      const margin = {
        top: 100,
        bottom: 350,
        left: 0,
        right: 0,
      }
      this.svg = d3.select('svg').attr('width',width).attr('height', height);
      this.innerWidth = width - margin.left - margin.right;
      this.innerHeight = height - margin.top - margin.bottom;
      this.g = this.svg.append('g').attr('transform',`translate(${margin.left}, ${margin.top})`);
      d3.json('./xinjiang.json').then((data) => {
        console.log(data);
        this.root = d3.hierarchy(data);
        console.log(this.innerWidth, this.innerHeight)
        this.root = d3.tree().size([this.innerWidth, this.innerHeight])(this.root);
        console.log(this.root);
        this.render(this.root);
      });

    },
    render(root) {
      this.color = d3.scaleOrdinal().domain(root.descendants()).range(d3.schemeCategory10);
      const node = root.descendants();
      const path = root.links();
      console.log(node, path);
      this.g.selectAll("path")
        .data(path)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y));
      this.g.selectAll("circle")
        .data(node)
        .join("circle")
        .attr("fill", this.fill)
        .attr("stroke-width", 3)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 6);
      this.g.selectAll('text').data(root.descendants()).join('text')
        .attr("text-anchor", d => d.children ? "end" : "start") // 位置
        // .attr("text-anchor", 'end') // 位置
        // note that if d is a child, d.children is undefined which is actually false!
        .attr('x', d => d.x)
        .attr('y', d => d.y + (d.children ? -10 : 10))
        .text(d => d.data.name)
        .attr('writing-mode', 'vertical-rl') // 文本竖过来
        .attr('text-orientation', 'upright')
    },
    fill(d) {
      if (d.depth === 0) {
        return this.color(d.data.name);
      }
      while (d.depth > 1) {
        d = d.parent;
      }
      return this.color(d.data.name);
    }
  }
}
</script>

<style scoped>

</style>