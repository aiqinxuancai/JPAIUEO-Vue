<template>
  <div id="wrapper">
    <audio ref="audio" :src="nowPlaySrc" ></audio>
    <main >
      <el-row style="text-align: center;top: 6px;" >
        <el-col :span="24" v-for="(value, key) in tableData.qing" :key="key" style="margin-bottom: 1px;background-color:rgba(255,255,255,0.03);" >
            <el-col :span="2" style="height: 100%;line-height: 60px;color: #72767d;font-size: 24px; text-align: center;margin-left: 14px;" >{{key}}</el-col>
            <el-col :span="4" :push="tabName[valueSub.pronunciation]" v-for="(valueSub, index) in value" :key="index">
                <el-button type="text" size="mini" style="font-size: 24px" @click="playSound(valueSub.ping)">{{valueSub.ping}}</el-button>
                <el-button type="text" size="mini" style="font-size: 24px" @click="playSound(valueSub.ping)">{{valueSub.pian}}</el-button>
                <div style="font-size: 14px;color:#A6A7A8;top:-10px;bottom: 0px;width: 100%;">{{valueSub.pronunciation}}</div>
            </el-col>
            <el-col :span="2" ></el-col>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
const fs = require("fs");

export default {
  name: "full-data-window",
  components: {},
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    playSound(data) {
      console.log("playSound：" + data);
      this.$refs.audio.src = 'https://res.hjfile.cn/pt/m/jp/50yin/audio/' + data + '.mp3';
      this.$refs.audio.play();
      this.isShowPronunciation = true;
    }
  },
  created() {
    let self = this;
    fs.readFile(__static + "/data.json", "utf8", function(err, data) {
      self.tableData = JSON.parse(data);
      console.log(self.tableData.qing);
    });
  },
  computed: {},
  data() {
    return {
      tableData: {},
      tabName: {
        yu: 4, 
        yo: 8,
        wo: 12
      },
      nowPlaySrc: ""
    };
  }
};
</script>

<style>
@import url("https://fonts.font.im/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  /* background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  ); */
  background-color: #2f3136;
  height: 100vh;
  padding: 20px 4px;
  width: 100vw;
}


</style>
