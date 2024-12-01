import { DateTime } from 'luxon';
import { computed } from 'vue';

export const useDatetime = () => {
  const currentDate = computed(() => DateTime.now());

  return {
    currentDate,
    DateTime
  };
};
