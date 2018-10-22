<template>
  <div id="showpanel"> 
        <el-button id="showbutton" type="text" slot="reference" @click="myclick">{{showData}}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showData: "A"
    };
  },
  created() {
    this.changeshow();
  },
  methods: {
    myclick() {
      this.showData = "B";
    }
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