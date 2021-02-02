<template>
  <div>
    <h2 class="title">cpn b标题</h2>
    <p>cpn内容cpn内容cpn内容cpn内容cpn内容</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "xcxcxc",
    };
  },
  methods: {
    click() {
      console.log("click btn");
    },
  },
};
</script>

<style scoped>
.title {
  color: green;
}
</style>
