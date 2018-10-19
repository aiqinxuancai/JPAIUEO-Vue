<template>
  <div 
    class="titlebtn" 
    v-bind:style="style"
    v-on:click="click">
    <i v-bind:class="buttontype"></i>
    
    </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
const style = {
  min: {
    //backgroundColor: 'green',
    right: "80px"
  },
  max: {
    //backgroundColor: 'yellow',
    right: "45px"
  },
  close: {
    //backgroundColor: 'black',
    right: "10px"
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