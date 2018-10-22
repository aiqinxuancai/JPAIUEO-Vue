<template>

    <div id="title">
        <div id="titletext">JPAIUEO</div>

        <TitleButton type="close" />
    </div>
</template>

<script>

import TitleButton from "./TitleButton.vue";

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