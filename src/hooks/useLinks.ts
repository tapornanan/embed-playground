import { computed, ref, watch } from "vue";

const TEST = "test";
const DEV = "dev";
const LOCAL = "local";

export default function useLink() {
  const embedURL = ref("");
  const transformedEmbedURL = ref("");
  const env = ref([DEV, TEST, LOCAL]);
  const currentEnv = ref(TEST);

  const links = ref([
    "[protocol]://[env]/embed/movie/o4MDXg3mqj6A/?autoplay=true",
    "[protocol]://[env]/embed/series/EY50PNxQgzOl/EY50PNxQgzOl/love-on-the-island/?autoplay=true",
    "[protocol]://[env]/embed/series/EY50PNxQgzOl/9E779ggKGdmE/love-on-the-island/?autoplay=true",
  ]);

  const onChangeEmbedURL = (newURL: string) => {
    embedURL.value = newURL;
  };

  const currentProtocol = computed(() => {
    switch (currentEnv.value) {
      case "dev":
      case "test":
        return "https";
      default:
        return "http";
    }
  });

  const currentHostname = computed(() => {
    switch (currentEnv.value) {
      case "dev":
        return "dev.trueid.id";
      case "test":
        return "test.trueid.id";
      default:
        return "localhost:3001";
    }
  });

  watch(embedURL, (newVal) => {
    transformedEmbedURL.value = getTransformedURL(newVal);
  });

  const getTransformedURL = (link: string) => {
    return link
      .replace("[env]", currentHostname.value)
      .replace("[protocol]", currentProtocol.value);
  };

  return {
    env,
    currentEnv,
    links,
    embedURL,
    getTransformedURL,
    transformedEmbedURL,
    onChangeEmbedURL,
  };
}
