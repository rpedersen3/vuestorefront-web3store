import { Context, CustomQuery, useCategoryFactory, UseCategoryFactoryParams} from '@vue-storefront/core';
import { Category, GraphQlGetCategoryParams} from '@vue-storefront/web3store-api';

const params: UseCategoryFactoryParams<Category, GraphQlGetCategoryParams> = {
  categorySearch: async (context: Context, params?:any & { customQuery?: CustomQuery }) => {

    const { data } = await context.$web3store.api.getCategories(params, params?.customQuery);

    return data?.categories?.categories;
  }
};

export default useCategoryFactory<Category, GraphQlGetCategoryParams>(params);
