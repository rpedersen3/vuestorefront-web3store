import { Context, useFacetFactory } from '@vue-storefront/core';
import { ParamsFromUrl, SearchResultParams } from '@vue-storefront/web3store-api/src/types/types';
import { FacetResultsData } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: SearchResultParams<ParamsFromUrl>): Promise<FacetResultsData> => {
    
    console.info('(Rich) useFacet search ');

    const { customQueryProducts, customQueryCategories } = params.input;

    let categoryResponse = null;
    let categoriesResponse = null;
    let categoryIdForProductCache = null;
    if (params.input.fetchCategory) {
      categoryResponse = await context.$web3store.api.getCategory(params.input.categoryParams, customQueryCategories, params.input.categoryParams?.cacheKey);
      categoryIdForProductCache = categoryResponse.data?.category.id;
    }
    if (params.input.fetchCategories) {
      console.info('(Rich) useFacet fetch categories: ' + JSON.stringify(params.input.fetchCategories));
      categoriesResponse = await context.$web3store.api.getCategories(params.input.categoryParams, customQueryCategories, params.input.categoryParams?.cacheKey);
      console.info('(Rich) facet response: ' + JSON.stringify(categoriesResponse.data))

      categoryIdForProductCache = categoriesResponse?.data?.categories?.categories?.[0].id;
    }

    console.info('(Rich) useFacet fetch product template list: ' + JSON.stringify(params.input.productParams));
    //const { data: filteredProductsData } = await context.$web3store.api.getProductsList(params.input.productParams, customQueryProducts, params.input.productParams?.cacheKey, categoryIdForProductCache);

    const { data: filteredProductAssetsData } = await context.$web3store.api.getProductAssetsList(params.input.productParams, customQueryProducts);

    params.input.productParams.filter.attributeValueId = [];
    params.input.productParams.filter.ids = null;


    //const { data: productsData } = await context.$web3store.api.getProductsList(params.input.productParams, customQueryProducts);
    /*
    return {
      minPrice: productsData?.products?.minPrice || 0,
      maxPrice: productsData?.products?.maxPrice || 10000,
      category: categoryResponse?.data?.category || {},
      categories: categoriesResponse?.data?.categories?.categories || [],
      products: productsData.products.products,
      filteredProducts: filteredProductsData.products.products,
      filteredProductVariants: null, //filteredProductVariantsData.productVariants.productVariants,
      filteredProductAssets: filteredProductAssetsData.productAssets.productAssets,
      attributes: filteredProductsData.products.assetAttributeValues,
      itemsPerPage: 1,
      facets: filteredProductsData.products.facets,
      perPageOptions: 20,
      totalProducts: productsData.products.totalCount
    };
    */

    console.info("******* facets: " + JSON.stringify(categoryResponse.data?.category.facets))

    return {
      minPrice: 0, //productsData?.products?.minPrice || 0,
      maxPrice: 10000, //productsData?.products?.maxPrice || 10000,
      category: categoryResponse?.data?.category || {},
      categories: categoriesResponse?.data?.categories?.categories || [],
      products: null, //productsData.products.products,
      filteredProducts: null, //filteredProductsData.products.products,
      filteredProductVariants: null,
      filteredProductAssets: filteredProductAssetsData.productAssets.productAssets,
      attributes: null, //filteredProductsData.products.assetAttributeValues,
      itemsPerPage: 1,
      facets: categoryResponse.data?.category?.facets || [],
      perPageOptions: 20,
      totalProducts: 100 //productsData.products.totalCount
    };
  }
};

export default useFacetFactory<any>(factoryParams);
