/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import { useVSFContext, vsfRef, Context, sharedRef} from '@vue-storefront/core';
import { GraphQlGetProductVariantParams } from '@vue-storefront/web3store-api';

const useProductVariant = (queryParams: Record<string, string>): any => {
  const context: Context = useVSFContext();

  const errors = vsfRef([], 'errors');
  const productVariants = vsfRef([], 'productVariants');
  const productVariant = sharedRef(null, Object?.values(queryParams)?.join('-') || 'productVariant');
  const elementNames = vsfRef({}, 'elementNames');

  const resetPasswordErrors = () => (errors.value = []);

  return {
    elementNames,
    resetPasswordErrors,
    productVariants,
    productVariant,
    errors
  };
};

export default useProductVariant;
