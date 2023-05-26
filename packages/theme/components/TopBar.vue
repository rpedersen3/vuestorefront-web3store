<template>

</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  }
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
