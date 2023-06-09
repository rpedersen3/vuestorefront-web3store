/* eslint-disable no-prototype-builtins */
import { Context, useVSFContext, sharedRef } from '@vue-storefront/core';
import { ref } from '@nuxtjs/composition-api';

const useShipping = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const shippingMethods = sharedRef([], 'shippingMethods');

  const resetCountryErrors = () => (errors.value = { graphQLErrors: [] });

  const searchShippingMethods = async () => {

    if (shippingMethods.value.length > 0) {
      return shippingMethods;
    }

    const { data } = await context.$web3store.api.shippingGetDeliveryMethods();

    shippingMethods.value = data.deliveryMethods.map((method) => ({
      ...method,
      id: String(method.id)
    }));
  };

  return {
    resetCountryErrors,
    searchShippingMethods,
    shippingMethods,
    errors
  };
};

export default useShipping;
