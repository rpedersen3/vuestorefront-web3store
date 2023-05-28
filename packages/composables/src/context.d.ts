import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { ClientInstance as Web3StoreClientInstance, Config as Web3StoreConfig, ApiMethods as Web3StoreApiMethods } from '@vue-storefront/web3store-api';
import { ClientInstance as OdooClientInstance, Config as OdooConfig, ApiMethods as OdooApiMethods } from '@vue-storefront/odoo-api';

declare module '@vue-storefront/core' {
  export interface Context {
    $odoo: IntegrationContext<OdooClientInstance, OdooConfig, ApiClientMethods<OdooApiMethods>>;
    $web3store: IntegrationContext<Web3StoreClientInstance, Web3StoreConfig, ApiClientMethods<Web3StoreApiMethods>>;
  }
}
