<template>

  <div id="showpanel" > 
    <audio ref="audio" @pause="onPause" @play="onPlay" v-bind:src="showPronunciationURL" ></audio>
    <el-button id="button-hiragana"  type="text" slot="reference" @click="myclick" >{{showHiragana}}</el-button>
    <el-button id="button-katakana"  type="text" slot="reference" @click="myclick" >{{showKatakana}}</el-button>
    <div id="show-pronunciation" >
      <el-button size="mini" type="text" class="fas fa-volume-up" style="font-size:12px; height:10px;" @click="playSound"></el-button>
      <el-button size="mini" v-if="isShowPronunciation" type="text" @click="playSound">{{showPronunciation}}</el-button>
    </div>
    
    
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
      showPronunciationURL: "", //音频地址
      isShowPronunciation: false,
      audio: {
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
      this.isShowPronunciation = false;
      //console.log("myclick");
      let self = this;
      fs.readFile(__static + "/data.json", "utf8", function(err, data) {
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

        // let timeId = setInterval(() => {
        //   clearInterval(timeId);
        //   console.log("Clear hasChange");
        // }, 1000);
      });
    },
    playSound() {
      this.$refs.audio.play();
      this.isShowPronunciation = true;
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
#show-pronunciation {
  font-size: 16px;
  height: 26px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #2a2c31;
  color: #ffffff;
  vertical-align: top;
}

#button-hiragana,
#button-katakana {
  font-size: 50px;
}

#showpanel {
  text-align: center;
  margin: auto 0;
  -webkit-app-region: no-drag;
}
</style>