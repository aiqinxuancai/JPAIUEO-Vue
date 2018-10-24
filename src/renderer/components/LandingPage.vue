<template>
  <div id="wrapper">
    <main>
      <show-panel></show-panel>
    </main>
  </div>
</template>

<script>
import ShowPanel from "./ShowPanel/ShowPanel";

export default {
  name: "landing-page",
  components: {ShowPanel},
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

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

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 100%;
}

</style>
