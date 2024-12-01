import { systemColorKey, systemFontKey } from '@/css/types';
import { computed, inject } from 'vue';

export const useGlobal = () => {
  const colors = inject(systemColorKey);
  const fonts = inject(systemFontKey);

  const chartColors = ['#e10600', '#9c88ff', '#F79F1F', '#20bf6b', '#0097e6'];
  const chartOpacityColors = computed(() => chartColors.map(color => `${color}33`));

  return {
    colors,
    fonts,
    chartColors,
    chartOpacityColors
  };
};
