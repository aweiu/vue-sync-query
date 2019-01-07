# vue-sync-query
使 Vue 实例中的 data 和 $route.query 同步修改

## 安装
```
npm install vue-sync-query
```

## 使用
```
// 安装
import Vue from 'vue'
import syncQuery from 'vue-sync-query'
Vue.use(syncQuery)
```
```
export default {
  data () {
    return {
      name: 'Jack',
      sex: 'man',
      age: 10,
      date: new Date()
    }
  },
  // 尽量在 created 周期内执行
  created () {
    // this.name 和 this.$route.query.name (浏览器 url 中的 query.name )会同步变化，默认值为 Jack ，而且不会影响到 query 中的其他字段
    this.$syncQuery('name')
    // 当实例中的 sex 变化时，query 中仅会保留 name 和 sex ，age 和 date 会被移除
    this.$syncQuery('sex', { include: ['name'] })
    // 当实例中的 age 变化时，query 中的 sex 会被移除
    this.$syncQuery('age', { exclude: ['sex'] })
    // 时间戳和 Date 的互相转换
    this.$syncQuery('date', { 
       dataToQuery: (date: Date) => date.getTime(),
       queryToData: (timestamp: string) => new Date(timestamp)
    })
  }
}
```
