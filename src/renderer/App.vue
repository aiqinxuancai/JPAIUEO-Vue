<template>
  <div id="app">
    <AppTitle />
    <router-view></router-view>
  </div>
</template>

<script>
// export default {
//   name: 'jpaiueo'
// }

import AppTitle from "./components/Title/AppTitle";
export default {
  name: "jpaiueo",
  components: {
    AppTitle
  }
};
</script>

<style>
/* CSS */
html,
body,
div {
  margin: 0;
  padding: 0;
}
</style>
