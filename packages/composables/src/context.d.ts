import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { ClientInstance, Config, Web3StoreApiMethods } from '@vue-storefront/web3store-api';

declare module '@vue-storefront/core' {
  export interface Context {
    $web3store: IntegrationContext<ClientInstance, Config, ApiClientMethods<Web3StoreApiMethods>>;
  }
}
