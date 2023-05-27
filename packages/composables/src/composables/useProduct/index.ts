import { Context, useProductFactory, UseProductFactoryParams, CustomQuery} from '@vue-storefront/core';
import { GraphQlGetProductParams, Product } from '@vue-storefront/web3store-api';

const params: UseProductFactoryParams<Product, GraphQlGetProductParams> = {
  productsSearch: async (context: Context, params: GraphQlGetProductParams & { customQuery?: CustomQuery }): Promise<Product> => {

    console.info('(Rich) useProduct product search ********')
    console.info('(Rich) params ' + JSON.stringify(params))

    const { customQuery } = params;

    const { data } = await context.$web3store.api.getProduct(params, customQuery, params.cacheKey);

    return data.product;
  }
};



export default useProductFactory<Product, GraphQlGetProductParams>(params);
