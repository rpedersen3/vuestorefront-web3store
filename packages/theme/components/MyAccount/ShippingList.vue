
<template>
  <SfLoader :loading="loading" style="height: 300px">
    <div>
      <div
        v-for="shipping in addresses"
        :key="shipping.id"
        class="shipping"
        data-testid="shipping-address-list-item"
      >
        <div class="flex flex-row justify-between items-end mb-5">
          <div class="shipping__content">
            <p class="shipping__address">
              <span class="font-bold">{{ shipping.name }}</span
              ><br />
              {{ shipping.street }} {{ shipping.apartment }}<br />{{
                shipping.zipCode
              }}
              {{ shipping.city }},<br />{{ shipping.country.name }}
            </p>
            <p class="shipping__address">
              {{ shipping.phoneNumber }}
            </p>
          </div>
          <div class="flex flex-row gap-3">
            <Web3StoreButton
              @click="handleDeleteAddress(shipping)"
              class="smartphone-only"
            >
              <SfIcon icon="cross" color="gray" size="14px" />
            </Web3StoreButton>
            <Web3StoreButton
              data-testid="change-address"
              @click="handleChangeAddress(shipping)"
            >
              {{ $t('Change') }}
            </Web3StoreButton>
            <Web3StoreButton
              class="desktop-only"
              styleType="Danger"
              @click="handleDeleteAddress(shipping)"
            >
              {{ $t('Delete') }}
            </Web3StoreButton>
          </div>
        </div>
      </div>
    </div>
  </SfLoader>
</template>
<script lang="ts">
import { Address } from '@vue-storefront/web3store-api';
import { useUserShipping } from '@vue-storefront/web3store';
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { SfIcon, SfLoader } from '@storefront-ui/vue';
import { useUiNotification } from '~/composables';
export default defineComponent({
  components: {
    SfIcon,
    SfLoader
  },
  props: {
    addresses: {
      type: Array as PropType<Address[]>,
      default: []
    }
  },
  setup({}, { emit }) {
    const { deleteAddress, loading } = useUserShipping();
    const { send } = useUiNotification();

    const handleDeleteAddress = async (shipping: Address) => {
      await deleteAddress({
        address: { id: shipping.id }
      });

      send({
        message: 'Successfully deleted!',
        type: 'info'
      });
    };

    const handleChangeAddress = (shipping: Address) => {
      emit('change', shipping);
    };

    return {
      handleChangeAddress,
      handleDeleteAddress,
      loading
    };
  }
});
</script>
<style scoped lang="scss">
::v-deep .sf-button {
  max-height: 53px;
}
</style>
