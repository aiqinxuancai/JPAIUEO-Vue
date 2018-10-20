<template>

  <div id="showpanel"> 
    <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">

        <el-button id="showbutton" type="text" slot="reference">{{ buttontype }}</el-button>
      
    </el-popover>
  </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
import { setInterval } from 'timers';

export default {
  name: "ShowPanel",
  props: ["type"],
  computed: {
    style: function() {}
  },
  mounted() {},
  created() {
      setInterval(this.timer,1000);
  },
  methods: {
    click: function() {
      //ipc.send(this.type);
    },
    timer: function() {
      console.log("aaa");
    }
  },
  data() {
    return { buttontype: "あ" };
  }
};
</script>
    
<style>
#showbutton {
  font-size: 64px;
}

#showpanel {
  width: 20px;
  height: 20px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  -webkit-app-region: no-drag;
}
</style>