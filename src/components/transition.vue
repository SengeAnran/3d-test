<template>
<div class="transition">
  <svg width="500" height="400">
    <rect></rect>
  </svg>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: "transition",
  mounted() {
    const rect = d3.select('rect');
    rect.attr('width', 200)
      .attr('height', 100)
      .attr('y', 50)
      .attr('fill', 'pink')
      .transition().duration(2000)
      .delay(500)
      .attr('fill', '#4bd710')
      .attr('x', 50)
      .transition().duration(2000)
      .delay(500)
      .attr('x', 300)
      .ease(d3.easeBounce);

  }
}
</script>

<style scoped>

</style>