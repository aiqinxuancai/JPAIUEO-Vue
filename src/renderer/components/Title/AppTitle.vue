<template>

    <div id="title">
      
        <TitleButton type="min" />
        <TitleButton type="max" />
        <TitleButton type="close" />
        <!-- <el-button v-on:click="handleAfterLeave">{{ name }}</el-button> -->
    </div>
</template>

<script>




import TitleButton from "./TitleButton.vue";
//import Vue from "Vue";


export default {
  name: "Title",
  components: {
    TitleButton
  },
  data() {
    return { name: "Vue.js" };
  },
  methods: {
    handleAfterLeave() {
     
    }
  }
};
// var vm = new Vue({
//   el: "#title",
//   data: {
//     yes: true,
//     no: false,
//     age: 28,
//     name: "Vue.js"
//   },
//   methods: {
//     cool: function(event) {
//       //   // `this` 在方法里指当前 Vue 实例
//       //   alert("Hello " + this.name + "!");
//       //   // `event` 是原生 DOM 事件
//       //   if (event) {
//       //     alert(event.target.tagName);
//       //   }
//       //this.alert("Hello " + this.name + "!");
//     }
//   }
// });
</script>
    
<style>

#title {
  position: absolute;
  width: 100%;
  height: 28px;
  background-color: rgb(198, 47, 47);
  -webkit-app-region: drag;
}
</style>