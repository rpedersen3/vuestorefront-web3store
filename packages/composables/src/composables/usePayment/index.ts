
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery} from '@vue-storefront/core';
import { Order, PaymentProvider } from '@vue-storefront/web3store-api';
import { usePaymentFactory, UsePaymentFactoryParams } from '../../factories/usePaymentFactory';
import useCart from '../useCart';

const factoryParams: UsePaymentFactoryParams<PaymentProvider, Order> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  getPaymentProviderList: async (context: Context, params): Promise<PaymentProvider[]> => {
    const { customQuery } = params;

    const { data } = await context.$web3store.api.paymentLoadProviders(params);

    return data.paymentAcquirers;
  },
  getPaymentConfirmation: async (context: Context, params: any): Promise<Order> => {
    const { customQuery } = params;

    const { data } = await context.$web3store.api.paymentConfirmation(params, customQuery);

    context.useCart.cart.value = data.paymentConfirmation;

    return data.paymentConfirmation;
  }

};

export default usePaymentFactory<PaymentProvider, Order>(factoryParams);
