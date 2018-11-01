<template>
    <div id="title-panel">
        <div id="titletext">JPAIUEO</div>
        <TitleButton type="more" v-if='showMore' />
        <TitleButton type="close" v-if='showMore == false'/>
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
    return { showMore: this.$route.path == "/" };
  },
  methods: {
    handleAfterLeave() {}
  }
};
</script>
    
<style>
#titletext {
  position: fixed;
  width: 100%;
  height: 22px;
  color: #a6a7a8;
  font-size: 0.8em;
  margin: auto 0;
  left: 4px;
  top: 2px;
  -webkit-app-region: drag;
}

#title-panel {
  position: absolute;
  width: 100%;
  height: 22px;
  background-color: #202225;
  -webkit-app-region: drag;
}
</style>