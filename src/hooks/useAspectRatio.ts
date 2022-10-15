import { ref, watch, computed } from "vue";

const DEFAULT_WIDTH = 480;
const ASPECT_RATIO = 9 / 16;

export default function useAspectRatio() {
  const width = ref(DEFAULT_WIDTH);

  const height = computed(() => {
    return width.value * ASPECT_RATIO;
  });

  return {
    width,
    height,
  };
}
