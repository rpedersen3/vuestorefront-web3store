/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
} from '@vue-storefront/core';
import {
  Product,
  ProductVariant,
  ProductAsset,
  Attribute,
  AttributeValue
} from '@vue-storefront/web3store-api';

import { SearchData, ProductAssetGetters } from '../types';

type ProductAssetFilters = any;

export const getProductAssetName = (productAsset: ProductAsset): string =>
  productAsset?.name || 'Product Asset \'s name';

export const getProductAssetProperties = (productAsset: ProductAsset): AttributeValue[] =>
  productAsset?.attributeValues || [];

export const getProductAssetSlug = (productAsset: ProductAsset): string => {
  console.info("(Rich) get asset slug: " + productAsset?.slug)
  return productAsset?.slug || '';
}


export const getProductAssetPrice = (productAsset: ProductAsset): AgnosticPrice => {
  return {
    regular: productAsset?.listPrice || productAsset?.price,
    special: productAsset?.listPrice || productAsset?.price
  };
};

export const getProductAssetGallery = (
  productAsset: ProductAsset
): AgnosticMediaGalleryItem[] => {
  const images: AgnosticMediaGalleryItem[] = [];

  const normal = productAsset?.image || '';
  const big = normal;

  images.push({
    small: `${productAsset?.smallImage || ''}`,
    big,
    normal
  });

  return images;
};

export const getProductAssetCoverImage = (productAsset: ProductAsset): string => {

    return productAsset?.image || '';
};

export const getProductAssetImageFilename = (productAsset: ProductAsset): string => {

  return productAsset?.imageFilename || '';
};

export const getProductAssetFiltered = (
  productAssets: ProductAsset[],
  filters: ProductAssetFilters | ProductAsset[] = {}
): ProductAsset[] => {
  if (!productAssets) {
    return [];
  }

  return productAssets;
};
// es
export const getProductAssetAttributes = (
  productAsset: ProductAsset,
  filterByAttributeName?: string[]
): Record<string, AgnosticAttribute | string> => {
  const attributes = {};
  const groupedByName = {};
  /*
  productAsset?.attributeValues?.forEach((option) => {
    groupedByName[option.attribute.name] = {
      type: option.displayType,
      variantId: option.id,
      label: option.attribute.name,
      values: []
    };
  });
  productAsset?.attributeValues?.forEach((option) => {
    groupedByName[option.attribute.name].values.push({
      value: String(option.id),
      label: option.type
    });
  });

  productAsset?.attributeValues?.forEach((option) => {
    if (!attributes[option.displayType]) {
      attributes[option.displayType] = [];
    }
    if (
      groupedByName[option.attribute.name].type === option.displayType &&
      !attributes[option.displayType].some(
        (item) =>
          item.variantId === groupedByName[option.attribute.name].variantId
      )
    ) {
      attributes[option.displayType].push(groupedByName[option.attribute.name]);
    }
  });
  */
  return attributes;
};


export const getProductAssetDescription = (productAsset: ProductAsset): any =>
  (productAsset as any)?.description || '';

export const getProductAssetCategoryIds = (productAsset: ProductAsset): string[] =>
  (productAsset as any)?.categoriesRef || '';

export const getProductAssetId = (productAsset: ProductAsset): string =>
  (productAsset as any)?.id || '';

export const getFormattedPrice = (listPrice: number): string =>
  String(listPrice);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAssetTotalReviews = (productAsset: ProductAsset): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAssetAverageRating = (productAsset: ProductAsset): number => 0;

export const  getProductAssets = (searchData: SearchData): ProductAsset[] => {
  if (!searchData?.data?.filteredProductAssets || searchData?.data?.filteredProductAssets?.length === 0) {
    console.info('(Rich) product asset getters => no product assets')
    return [];
  }

  return searchData.data.filteredProductAssets;
};

const productAssetGetters: ProductAssetGetters<
  ProductAsset ,
  ProductAssetFilters
> = {
  getName: getProductAssetName,
  getSlug: getProductAssetSlug,
  getPrice: getProductAssetPrice,
  getGallery: getProductAssetGallery,
  getCoverImage: getProductAssetCoverImage,
  getFiltered: getProductAssetFiltered,
  getAttributes: getProductAssetAttributes,
  getDescription: getProductAssetDescription,
  getCategoryIds: getProductAssetCategoryIds,
  getId: getProductAssetId,
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductAssetTotalReviews,
  getAverageRating: getProductAssetAverageRating,
  getProperties: getProductAssetProperties,
  getImageFilename: getProductAssetImageFilename,
  getProductAssets: getProductAssets
};

export default productAssetGetters;
