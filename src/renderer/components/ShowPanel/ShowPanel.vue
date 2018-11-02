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
const os = require("os");

let remote = require("electron").remote;
let ipcRenderer = require("electron").ipcRenderer;
import { setInterval, clearInterval } from "timers";

const storage = remote.getGlobal("storage");

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
      showHiraganaTrue: "A", //平假名 用于存储
      showKatakanaTrue: "A", //片假名 用于存储
      showPronunciation: "A", //发音
      showPronunciationURL: "", //音频地址
      isShowPronunciation: false,
      isShowHiragana: true, //是否显示平假名
      isShowKatakana: true, //是否显示片假名

      audio: {
        playing: false
      }
    };
  },
  computed: {

  },
  created() {
    ipcRenderer.on("on-show-state-change", (event, arg) => {
      this.updateShowState();
    });
    this.myclick();
  },
  methods: {
    updateShowState() {
      this.isShowHiragana = remote.getGlobal("isShowHiragana");
      this.isShowKatakana = remote.getGlobal("isShowKatakana");
      if (this.isShowHiragana == false) {
        this.showHiragana = "×";
      } else {
        this.showHiragana = this.showHiraganaTrue;
      }
      if (this.isShowKatakana == false) {
        this.showKatakana = "×";
      } else {
        this.showKatakana = this.showKatakanaTrue;
      }
    },
    saveProficiency(name, score) {
      //存储熟练度
      console.log("There is data stored as " + score);
      var nowProficiency = storage.get(name, 0);
      storage.set(name, nowProficiency + score);
    },
    myclick() {
      //对记忆进行分数增减
      if (this.isShowHiragana) {
        if (this.isShowPronunciation) {
          //this.saveProficiency(this.showHiraganaTrue, -1); //查看了读音，减分
        } else {
          this.saveProficiency(this.showHiraganaTrue, 1); //没有查看读音就切换，加分
        }
      }
      if (this.isShowKatakana) {
        if (this.isShowPronunciation) {
          //this.saveProficiency(this.showKatakanaTrue, -1); //查看了读音，减分
        } else {
          this.saveProficiency(this.showKatakanaTrue, 1); //没有查看读音就切换，加分
        }
      }

      this.isShowPronunciation = false;
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

        self.showHiraganaTrue = root.qing[soundKey][numSub].ping;
        self.showKatakanaTrue = root.qing[soundKey][numSub].pian;

        self.showPronunciation = root.qing[soundKey][numSub].pronunciation;
        self.showPronunciationURL =
          "https://res.hjfile.cn/pt/m/jp/50yin/audio/" +
          root.qing[soundKey][numSub].ping +
          ".mp3";
        self.updateShowState();
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