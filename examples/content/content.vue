<template>
  <div class="content-view">
    <ul>
      <li @click="listClick('Flex')">flex</li>
      <li @click="listClick('Toast')">toast</li>
      <li @click="listClick('Spin')">spin</li>
      <li @click="listClick('Popup')">popup</li>
      <li @click="listClick('Icon')">icon</li>
      <li @click="listClick('Checkbox')">checkbox</li>
      <li @click="listClick('Radiobox')">radiobox</li>
      <li @click="listClick('Button')">button</li>
      <li @click="listClick('Dialog')">dialog</li>
      <li @click="listClick('Sticky')">sticky</li>
      <li @click="listClick('Calendar')">calendar</li>
      <li @click="listClick('Layout')">layout</li>
      <li @click="listClick('Citypicker')">citypicker</li>
      <li @click="listClick('Indicator')">indicator</li>
      <li @click="listClick('Slider')">slider</li>
      <li @click="listClick('ActionSheet')">action-sheet</li>
      <li @click="listClick('PickyStepper')">picky-stepper</li>
      <li @click="listClick('Counter')">counter</li>
      <li @click="listClick('PullRefresh')">pull-refresh</li>
      <li @click="listClick('Skeleton')">skeleton</li>
      <li @click="listClick('Picker')">picker</li>
      <li @click="listClick('DatePicker')">date-picker</li>
      <li @click="listClick('Tabs')">tabs</li>
      <li @click="listClick('JSapi')">js-api</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
export default class Content extends Vue {
  listClick(name: string): void {
    this.$router.push({ name });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  height: 100px;
}
.logo img {
  margin: 20px auto;
}
ul {
  list-style-type: none;
  padding: 0;
  user-select: none;
  margin: 0;
}
li {
  border-top: 1px solid #e4e4e4;
  line-height: 44px;
  cursor: pointer;
  color: #4f5959;
  font-size: 18px;
}
li:last-child {
  border-bottom: 1px solid #e4e4e4;
}
.content-view {
  text-align: center;
}
a {
  color: #42b983;
}
</style>
