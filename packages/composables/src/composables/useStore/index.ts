import { Store } from '@vue-storefront/web3store-api/src';
import { Context, useStoreFactory } from '@vue-storefront/core';

const useStore = useStoreFactory<Store>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(context: Context, params) {
    console.log('Mocked: useStore.load');

    return Promise.resolve({});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change(context: Context, params) {
    console.log('Mocked: useStore.change');

    return Promise.resolve({});
  }
});

export default useStore;
