<template>
  <div id="showpanel"> 
    <el-button id="showbutton"  type="text" slot="reference" @click="myclick" @mouseover="mymouseover">{{showHiragana}}</el-button>
    <el-button id="showbutton"  type="text" slot="reference" @click="myclick" @mouseover="mymouseover">{{showKatakana}}</el-button>
  </div>
</template>

<script>
const fs = require("fs");

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
      showKatakana: "A",
      showPronunciation: "A"
    };
  },
  computed: {},
  created() {
    this.myclick();
  },
  methods: {
    myclick() {
      console.log("myclick");
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

        console.log(soundKey);
        console.log(root.qing[soundKey]);

        //随机选择这一行中的某一个音
        let numSub = randomNum(0, root.qing[soundKey].length - 1);

        console.log(root.qing[soundKey][numSub]);
        self.showHiragana = root.qing[soundKey][numSub].ping;
        self.showKatakana = root.qing[soundKey][numSub].pian;
        self.showPronunciation = root.qing[soundKey][numSub].pronunciation;
      });
    },
    mymouseover() {
      console.log("mymouseover");
    }
  }

  // let timer = setInterval(() => {
  //   console.log("timer1");
  // }, 1000);
};
</script>
    
<style>
#showbutton {
  font-size: 64px;
}

#showpanel {
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