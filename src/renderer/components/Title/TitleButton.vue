<template>
  <div class="titlebtn" v-bind:style="style" v-on:click="click">
    <i v-bind:class="buttontype" style="color:#a6a7a8;"  ></i>
    </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
const style = {
  min: {
    //backgroundColor: 'green',
    right: "75px"
  },
  max: {
    //backgroundColor: 'yellow',
    right: "40px"
  },
  close: {
    //backgroundColor: 'black',
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
      ipc.send(this.type);
    }
  },
  data() {
    if (this.type == "min") {
        return { buttontype: "el-icon-minus" };
    } else if (this.type == "max") {
        return { buttontype: "el-icon-circle-plus-outline" };
    } else if (this.type == "close") {
        return { buttontype: "el-icon-close" };
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