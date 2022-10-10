<script>
export default {
  data() {
    return {
      width: 480,
      height: 0,
      aspect: 9 / 16,
      embedURL: "http://localhost:3001/embed/movie/o4MDXg3mqj6A/?autoplay=true",
    };
  },
  computed: {
    calcHeight() {
      return this.width * this.aspect;
    },
  },
  methods: {
    onReload() {
      window.location.reload();
    },
  },
};
</script>

<template>
  <section>
    <h4>Embed Tester <button @click="onReload">Reload</button></h4>
    <p>
      Calculated embed width: <strong>({{ width }}px)</strong> and height:
      <strong>({{ calcHeight }}px)</strong>
    </p>
    <label for="embedWidth">Embed Width</label>
    <input type="range" id="embedWidth" v-model="width" max="800" min="300" />
    <hr />
    <label for="embedURL"> Embed URL </label>
    <input
      type="text"
      id="embedURL"
      v-model="embedURL"
      placeholder="place embed URL here"
    />
  </section>
  <iframe
    :src="embedURL"
    :width="`${width}px`"
    :height="`${calcHeight}px`"
    frameborder="0"
  ></iframe>
</template>

<style lang="scss">
section {
  text-align: left;
  margin-bottom: 3rem;
  background: #eee;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid rgb(154, 154, 154);
  border-radius: 4px;

  input {
    margin-bottom: 20px;
    width: 100%;
  }

  button {
    margin-left: 20px;
  }
}
</style>
