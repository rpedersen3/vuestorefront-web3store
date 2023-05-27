/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from '@vue-storefront/core';
import {
  usePaymentProviderFactory,
  UsePaymentProviderParams
} from '../../factories/usePaymentProviderFactory';
import { PaymentProvider, PaymentMethod, GraphQlMakePaymentParams } from '@vue-storefront/web3store-api';

const factoryParams: UsePaymentProviderParams<PaymentProvider, PaymentMethod, GraphQlMakePaymentParams> = {

  getPaymentMethods: (context: Context, params): PaymentMethod[] => {
    console.log('implement getPaymentMethods');

    return [] as PaymentMethod[];
  },
  getPaymentExternal: async (context: Context, { params }): Promise<string> => {

    const externalParams: GraphQlMakePaymentParams = {
      paymentAcquireId: params.paymentAcquireId
    };

    const { data } = await context.$web3store.api.paymentMakeExternal(externalParams);

    return data?.makePayment.form;
  }
};

export default usePaymentProviderFactory<PaymentProvider, PaymentMethod, GraphQlMakePaymentParams>(factoryParams);
