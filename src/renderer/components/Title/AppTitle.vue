<template>

    <div id="title">
        <div id="titletext">JPAIUEO</div>
        <!-- <TitleButton type="min" />
        <TitleButton type="max" /> -->
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


#titletext {
  position: fixed;
  width: 100%;
  height: 10px;
  color: aliceblue;
  font-size: 0.8em;
  margin: auto 0;
  left: 4px;
  -webkit-app-region: drag;
}

#title {
  position: absolute;
  width: 100%;
  height: 16px;
  background-color: #288add;
  -webkit-app-region: drag;
}
</style>