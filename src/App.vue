<template>
<Home/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "./Pages/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
});
</script>

<style lang="scss">
  #app{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 6rem;
  }
</style>
