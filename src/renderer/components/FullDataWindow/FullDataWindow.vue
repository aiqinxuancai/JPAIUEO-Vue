<template>
  <div id="wrapper">
    <audio ref="audio" :src="nowPlaySrc" ></audio>
    <main >
      <el-row style="text-align: center;top: 6px;" >
        <el-col :span="24" v-for="(value, key) in tableData.qing" :key="key" style="margin-bottom: 1px;background-color:rgba(255,255,255,0.03);" > 
            <el-col :span="2" style="height: 100%;line-height: 60px;color: #72767d;font-size: 24px; text-align: center;margin-left: 14px;" >{{key}}</el-col>
            <el-col id="item" :span="4" :push="tabName[valueSub.pronunciation]" v-for="(valueSub, index) in value" :key="index"  >
                <el-button type="text" size="mini" :style="style(valueSub.ping)" @click="playSound(valueSub.ping)">{{valueSub.ping}}</el-button>
                <el-button type="text" size="mini" :style="style(valueSub.pian)" @click="playSound(valueSub.ping)">{{valueSub.pian}}</el-button>
                <div style="font-size:14px;color:#A6A7A8;top:-10px;bottom: 0px;width: 100%;">{{valueSub.pronunciation}}</div>
            </el-col>
            <el-col :span="2" ></el-col>
        </el-col>
      </el-row>
      <div class="el-row" id="buttom-info">
        <el-col :span="2" :offset="8" class="info-item" >
          <div class="info-div-text-title">掌握程度</div>
        </el-col>
        <el-col :span="2" class="info-item" >
          <div class="info-div-color" style="background-color: #fc9c12;"></div>
          <div class="info-div-text">初</div>
        </el-col>
        <el-col :span="2" class="info-item">
          <div class="info-div-color" style="background-color: #438a08;"></div>
          <div class="info-div-text">中</div>
        </el-col>
        <el-col :span="2" class="info-item">
          <div class="info-div-color" style="background-color: #409eff;"></div>
          <div class="info-div-text">高</div>
        </el-col>
      </div>
    </main>
  </div>
</template>

<script>
const fs = require("fs");
const remote = require("electron").remote;
const storage = remote.getGlobal("storage");

const style = {
  level1: {
    "font-size": "24px",
    height: "20px",
    color: "#fc9c12"
  },
  level2: {
    "font-size": "24px",
    height: "20px",
    color: "#438a08"
  },
  level3: {
    "font-size": "24px",
    height: "20px",
    color: "#409eff"
  }
};

export default {
  name: "full-data-window",
  components: {},
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    playSound(data) {
      console.log("playSound：" + data);
      this.$refs.audio.src =
        "https://res.hjfile.cn/pt/m/jp/50yin/audio/" + data + ".mp3";
      this.$refs.audio.play();
      this.isShowPronunciation = true;
    },
    style(name) {
      var nowProficiency = storage.get(name, 0);

      if (nowProficiency >= 0 && nowProficiency < 3) {
        return style["level1"];
      } else if (nowProficiency >= 3 && nowProficiency < 6) {
        return style["level2"];
      } else if (nowProficiency >= 6 && nowProficiency < 9) {
        return style["level3"];
      }

      return style["level1"];
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

#item {
  margin-top: 2px;
  margin-left: 0px;
}

#buttom-info {
  font-size: 12px;
  height: 26px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #2a2c31;
  color: #ffffff;
  vertical-align: bottom;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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

.info-item {
  text-align: center;
  padding-top: 3px;
}

.info-div-color {
  display: inline-block;
  height: 8px;
  width: 8px;
}

.info-div-text {
  display: inline-block;
  color: #a6a7a8;
}

.info-div-text-title {
  color: #a6a7a8;
}

</style>
