<script>
export default {
  data() {
    return {
      width: 480,
      height: 0,
      aspect: 9 / 16,
      embedURL: "",
      links: [
        "https://test.trueid.id/embed/movie/o4MDXg3mqj6A/?autoplay=true",
        "http://localhost:3001/embed/movie/o4MDXg3mqj6A/?autoplay=true",
        "http://localhost:3001/embed/series/EY50PNxQgzOl/EY50PNxQgzOl/love-on-the-island/?autoplay=true",
      ],
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
    onClickLink(link) {
      this.embedURL = link;
    },
  },
  watch: {
    embedURL(val) {
      if (val) {
        let divScripts = document.getElementById("load-script");
        let newScript = document.createElement("script");
        newScript.src =
          "https://test.trueid.id/embed/snippets/dist/latest/embed.min.js";
        divScripts.appendChild(newScript);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <section>
      <h4>Embed Tester <button @click="onReload">Reload</button></h4>

      <div v-for="link in links" :key="link">
        <button class="btn" type="button" @click="onClickLink(link)">
          {{ link }}
        </button>
      </div>

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
    <div id="load-script"></div>
    <iframe
      :src="embedURL"
      :width="`${width}px`"
      :height="`${calcHeight}px`"
      frameborder="0"
      data-trueidplayer-float="true"
    ></iframe>
  </div>
</template>

<style lang="scss">
.container {
  height: 500vh;
}
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

  .btn {
    margin: 0 0 20px 0;
    width: 100%;
  }
}
</style>
