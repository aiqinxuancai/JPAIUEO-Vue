<template>

  <div id="showpanel" > 
    <el-button id="button_hiragana"  type="text" slot="reference" @click="myclick" @mouseover.native="mymouseover" @mouseout.native="mymouseout">{{showHiragana}}</el-button>
    <el-button id="button_katakana"  type="text" slot="reference" @click="myclick" @mouseover.native="mymouseover" @mouseout.native="mymouseout">{{showKatakana}}</el-button>
    <div v-if="mouseOver" id="show_pronunciation" >{{showPronunciation}}</div>
    <audio ref="audio" @pause="onPause" @play="onPlay" v-bind:src="showPronunciationURL" ></audio>
  </div>
</template>

<script>
const fs = require("fs");
import { setInterval, clearInterval } from "timers";
/**
 * 生成随机数
 */
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

export default {
  data() {
    return {
      showHiragana: "A", //平假名
      showKatakana: "A", //片假名
      showPronunciation: "A", //发音
      showPronunciationURL: "A", //音频地址
      mouseOver: false,
      hasChange: false,
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false
      }
    };
  },
  computed: {},
  created() {
    this.myclick();
  },
  methods: {
    myclick() {
      this.hasChange = true;
      this.mouseOver = false;
      //console.log("myclick");
      let self = this;
      fs.readFile(__dirname + "/data.json", "utf8", function(err, data) {
        //优化为预读取？
        var root = JSON.parse(data);
        //随机选择一个清音的行
        let count = 0;
        for (var key in root.qing) {
          count++;
        }
        let num = randomNum(0, count - 1);

        count = 0;
        let soundKey = "";
        for (var key in root.qing) {
          if (count == num) {
            soundKey = key;
            break;
          }
          count++;
        }
        //
        console.log(soundKey);
        console.log(root.qing[soundKey]);

        //随机选择这一行中的某一个音
        let numSub = randomNum(0, root.qing[soundKey].length - 1);

        console.log(root.qing[soundKey][numSub]);
        self.showHiragana = root.qing[soundKey][numSub].ping;
        self.showKatakana = root.qing[soundKey][numSub].pian;
        self.showPronunciation = root.qing[soundKey][numSub].pronunciation;
        self.showPronunciationURL =
          "https://res.hjfile.cn/pt/m/jp/50yin/audio/" +
          root.qing[soundKey][numSub].ping +
          ".mp3";

        let timeId = setInterval(() => {
          self.hasChange = false;
          clearInterval(timeId);
          console.log("Clear hasChange");
        }, 1000);
      });
    },
    mymouseover() {
      //console.log("mymouseover");
      if (this.hasChange) {
        //无视操作
      } else {
        if (this.audio.playing == false) {
          this.$refs.audio.play();
        }
        this.mouseOver = true;
      }
    },
    mymouseout() {
      //console.log("mymouseout");
      this.mouseOver = false;
    },
    onPlay() {
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    }
  }

  // let timer = setInterval(() => {
  //   console.log("timer1");
  // }, 1000);
};
</script>
    
<style>
#show_pronunciation {
  font-size: 16px;
  margin: auto;
  width: auto;
  height: auto;
  color: rgb(235, 130, 32);
}

#button_hiragana,
#button_katakana {
  font-size: 50px;
}

#showpanel {
  text-align: center;
  margin: auto 0;
  -webkit-app-region: no-drag;
}

.el-col {
  border-radius: 2px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>