<template>
<div class="main">
  <p> 张三 </p>
  <p id="label"> 李四 </p>
  <p> 王五 </p>
  <p> 赵六 </p>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'index',
  mounted() {
    // const p = d3.select('.main').selectAll('p');
    // 修改样式
    // p.style('color', 'pink').style('font-size', '40px'); //
    // 给每个p节点绑定china数据
    // p.datum('china').text(function (d, i) {
    //   console.log(d, i);
    //   return i + ":" + d;
    // });
    // // 循环遍历设置p节点文本内容
    // p

    // 分别将数组的各元素绑定到三个段落元素上
    const arr = ['1', '2', '3', '4','5', '6'];
    const p = d3.select('.main') // p 一定要是绑定元素后定p集合
      .selectAll('p')
      .data(arr)
      .text(function (d) {
      return d;
    });
    // p.exit().remove();

    console.log(p);
    p.enter() // 绑定的多余数据
      .append('p')
      .text(function (d) {
      return d;
    });
    // d3.select('.main')
    //   .selectAll('p')
    //   .data(['1','2']).exit().remove().text((d) => d);
    // console.log(p);
    const main = d3.select('.main');
    // main.datum('sss');
    // console.log(p.data());
    console.log(main);
    main.classed('class1', {color: 'pink'});
    main.classed('class2', {color: 'pink'});
    //插入元素
    // p.data(arr).append('a').text(function (d) {
    //   return d
    // }).attr('herf', function (d) {
    //   return d;
    // });
    // d3.select
    // main.insert('p', '#label').text('第一');
    // main.append('p', '#label').text('第二');

    // 删除元素
    // const deleteP = d3.select('#label');
    // deleteP.remove();
    // main.empty();
    // main.selectChild(':nth-child(2n)').style('color', 'pink');
    // main.html(`<p>新的元素</p>`);
    // console.log(main.selectChildren().size());
  }
}
</script>

<style scoped>

</style>