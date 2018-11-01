<template>
  <div class="titlebtn" v-bind:style="style" v-on:click="click">
    <i v-bind:class="buttontype" style="color:#a6a7a8;"  ></i>
    </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
const style = {
  more: {
    right: "5px"
  },
  close: {
    right: "5px"
  }
};
export default {
  name: "Titlebtn",
  props: ["type"],
  computed: {
    style: function() {
      return style[this.type];
    }
  },
  methods: {
    click: function() {
      console.log(this.$route.path);
      ipc.send(this.type, this.$route.path);
    }
  },
  data() {
    if (this.type == "close") {
      return { buttontype: "el-icon-close" };
    } else if (this.type == "more") {
      return { buttontype: "el-icon-more" };
    }
    return { buttontype: "el-icon-minus" };
  }
};
</script>
    
<style>
.titlebtn {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  -webkit-app-region: no-drag;
}
</style>