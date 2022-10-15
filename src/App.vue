<script lang="ts">
import useAspectRatio from "./hooks/useAspectRatio";
import useLinks from './hooks/useLinks'
import useScript from './hooks/useScript'

export default {
  setup() {
    const { width, height } = useAspectRatio();
    const {
      links,
      env,
      currentEnv,
      embedURL,
      transformedEmbedURL,
      getTransformedURL,
      onChangeEmbedURL
    } = useLinks()

    useScript(embedURL);

    const onReload = () => {
      window.location.reload();
    }

    return {
      onReload,

      width,
      height,
      links,

      env,
      currentEnv,
      getTransformedURL,
      onChangeEmbedURL,
      transformedEmbedURL
    };
  },
};
</script>

<template>
  <div class="container">
    <section>
      <h4>Embed Tester <button @click="onReload">Reload</button></h4>

      <div v-for="link in links" :key="link">
        <button class="btn" type="button" @click="onChangeEmbedURL(link)">
          {{ getTransformedURL(link) }}
        </button>
      </div>

      <p>
        Calculated embed width: <strong>({{ width }}px)</strong> and height:
        <strong>({{ height }}px)</strong>
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
      <input type="text" id="embedURL" v-model="transformedEmbedURL" placeholder="place embed URL here" />
    </section>

    <div id="load-script"></div>
    <iframe :src="transformedEmbedURL" :width="`${width}px`" :height="`${height}px`" frameborder="0"
      data-trueidplayer-float="true"></iframe>
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
