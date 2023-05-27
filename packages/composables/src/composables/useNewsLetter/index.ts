import { Context, Logger} from '@vue-storefront/core';
import { useNewsletterFactory, UseNewsletterFactoryParams } from '../../factories/useNewsLetterFactory';

const factoryParams: UseNewsletterFactoryParams<any, string> = {

  sendSubscription: async (context: Context, params) => {
    Logger.debug('[Web3Store]: Update user newsletter subscription', { params });

    const { data } = await context.$web3store.api.subscribeNewsLetter(
      {
        email: params.email
      }
    );

    return data.newsletterSubscribe;
  }
};

export default useNewsletterFactory<any, string>(factoryParams);
