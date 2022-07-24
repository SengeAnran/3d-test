<template>
<div class="main">
  <p>SDASDAFDHFGJ广东富豪</p>
  <p>SDASDAFDHFGJ广东富豪</p>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'index',
  mounted() {
    const p = d3.select('.main').selectAll('p');
    p.style('color', 'pink').style('font-size', '40px');
    console.log(p);
  }
}
</script>

<style scoped>

</style>