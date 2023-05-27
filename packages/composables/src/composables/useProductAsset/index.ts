/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import { useVSFContext, vsfRef, Context, sharedRef} from '@vue-storefront/core';
import { GraphQlGetProductAssetParams } from '@vue-storefront/web3store-api';

const useProductAsset = (queryParams: Record<string, string>): any => {
  const context: Context = useVSFContext();

  const errors = vsfRef([], 'errors');
  const productAssets = vsfRef([], 'productAssets');
  const productAsset = sharedRef(null, 'productAsset');
  const elementNames = vsfRef({}, 'elementNames');

  const resetPasswordErrors = () => (errors.value = []);

  const searchProductAsset = async ({ slug, customQuery }) => {

    console.info("(Rich) search product asset")
    const params: GraphQlGetProductAssetParams = {
      slug: slug //'/product/0xf7F8C5e703B973b20F5ceFd9e78896a32E4a0bc9/43'
    };

    //if (combinationIds.length === 0) return;

    const { data } = await context.$web3store.api.getProductAsset(params, customQuery);

    console.info("(Rich) search product asset results: " + JSON.stringify(data?.productAssets))

    productAsset.value = data?.productAssets;
  };
  

  return {
    elementNames,
    resetPasswordErrors,
    productAssets,
    productAsset,
    searchProductAsset,
    errors
  };
};

export default useProductAsset;
