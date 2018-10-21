<template>
  <div id="showpanel"> 
    <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      
        <el-button id="showbutton" type="text" slot="reference" @click="changeshow">{{ maintitle }}</el-button>
      
    </el-popover>
  </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
const fs = require("fs");

import { clearInterval, setInterval, setTimeout, clearTimeout } from "timers";

export default {
  name: "ShowPanel",
  props: ["type"],
  computed: {
    style: function() {}
  },
  mounted() {},
  created() {
    // let timer = setInterval(() => {
    //   console.log("timer1");
    // }, 1000);
  },

  onunload() {
    console.log("onunload");
  },
  methods: {
    changeshow() {
      console.log("changeshow");
      fs.readFile(__dirname + "/data.json", "utf8", function(err, data) {
        var root = JSON.parse(data);
        //console.log(jsonObj.qing);
        console.log(root.qing.a[1]);
      });
    }
  },
  data() {
    return { maintitle: "A" };
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