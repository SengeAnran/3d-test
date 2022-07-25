const methods = {
  append: ƒ (name), // 末尾添加元素
  attr: ƒ (name, value), // 修改或添加属性
  call: ƒ (),//插入组件
  classed: ƒ (name, value),// 给元素添加类?
  clone: ƒ (deep), // 拷贝
  constructor: ƒ Selection(groups, parents),
  data: ƒ (value, key), // 绑定数组数据
  datum: ƒ (value), // 绑定数据
  dispatch: ƒ (type, params),
  each: ƒ (callback),// 遍历？
  empty: ƒ (), // 清空元素内部?
  enter: ƒ (), // 获取多余的绑定数据
  exit: ƒ (),// 获取未绑定数据的元素
  filter: ƒ (match),
  html: ƒ (value), // 修改或获取元素内容
  insert: ƒ (name, before), // 在元素前插入元素
  interrupt: ƒ (name),
  join: ƒ (onenter, onupdate, onexit),
  lower: ƒ (),
  merge: ƒ (context),
  node: ƒ (),
  nodes: ƒ (),
  on: ƒ (typename, value, options),
  order: ƒ (),
  property: ƒ (name, value),
  raise: ƒ (),
  remove: ƒ (),// 删除当前元素
  select: ƒ (select), // 选择元素
  selectAll: ƒ (select),// 选择所以元素
  selectChild: ƒ (match),// 选择匹配的第一个孩子元素，默认第一个
  selectChildren: ƒ (match),// 选择匹配的所有的孩子元素，默认所以有
  selection: ƒ selection_selection(),
  size: ƒ (),//当前选择集元素的数量
  sort: ƒ (compare),// 排序？
  style: ƒ (name, value, priority),
  text: ƒ (value), // 修改或获取元素文本值
  transition: ƒ (name),
  Symbol(Symbol.iterator),
}