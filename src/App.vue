<script>
export default {
  data() {
    return {
      width: 480,
      height: 0,
      aspect: 9 / 16,
      embedURL: "",
      links: [
        "[protocol]://[env]/embed/movie/o4MDXg3mqj6A/?autoplay=true",
        "[protocol]://[env]/embed/movie/o4MDXg3mqj6A/?autoplay=true",
        "[protocol]://[env]/embed/series/EY50PNxQgzOl/EY50PNxQgzOl/love-on-the-island/?autoplay=true",
        "[protocol]://[env]/embed/series/EY50PNxQgzOl/9E779ggKGdmE/love-on-the-island/?autoplay=true",
      ],
      env: ["dev", "test", "local"],
      currentEnv: "test",
      finalEmbedURL: "",
    };
  },
  computed: {
    calcHeight() {
      return this.width * this.aspect;
    },
    currentProtocol() {
      switch (this.currentEnv) {
        case "dev":
        case "test":
          return "https";
        default:
          return "http";
      }
    },
    currentEnvironment() {
      switch (this.currentEnv) {
        case "dev":
          return "dev.trueid.id";
        case "test":
          return "test.trueid.id";
        default:
          return "localhost:3001";
      }
    },
  },
  methods: {
    onReload() {
      window.location.reload();
    },
    onClickLink(link) {
      this.embedURL = link;
    },
    getTransformURL(link) {
      return link
        .replace("[env]", this.currentEnvironment)
        .replace("[protocol]", this.currentProtocol);
    },
  },
  watch: {
    embedURL(val) {
      if (val) {
        this.finalEmbedURL = this.getTransformURL(this.embedURL);

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
          {{ getTransformURL(link) }}
        </button>
      </div>

      <p>
        Calculated embed width: <strong>({{ width }}px)</strong> and height:
        <strong>({{ calcHeight }}px)</strong>
      </p>

      <label for="embedWidth">Embed Width</label>
      <input type="range" id="embedWidth" v-model="width" max="800" min="300" />
      <hr />

      <label for="env">Env</label><br />
      <select v-model="currentEnv">
        <option :value="e" v-for="e in env" :key="e">{{ e }}</option>
      </select>
      <hr />

      <label for="embedURL"> Embed URL </label>
      <input
        type="text"
        id="embedURL"
        v-model="finalEmbedURL"
        placeholder="place embed URL here"
      />
    </section>

    <div id="load-script"></div>
    <iframe
      :src="finalEmbedURL"
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
