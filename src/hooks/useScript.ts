import { Ref, watch } from "vue";

export default function useScript(embedURL: Ref) {
  watch(embedURL, () => {
    let divScripts = document.getElementById("load-script")!;
    let newScript = document.createElement("script");
    newScript.src =
      "https://test.trueid.id/embed/snippets/dist/latest/embed.min.js";
    divScripts.appendChild(newScript);
  });

  return {};
}
