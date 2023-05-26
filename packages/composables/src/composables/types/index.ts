/* eslint-disable @typescript-eslint/no-unused-vars */
import { FacetSearchResult } from '@vue-storefront/core';
import {
  AttributeValue,
  Attribute,
  Category,
  Product,
  ProductAsset,
  ProductVariant
} from '@vue-storefront/odoo-api';

type ProductAssetFilters = any;

export { 
  UseCategory, 
  UseProduct,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount,
  AgnosticAttribute,
  AgnosticMediaGalleryItem,
  AgnosticBreadcrumb
} from '@vue-storefront/core';


export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export interface UsePassword<> {
  sendResetPassword: (params: { email: string }) => Promise<void>;
}

export type UserAddress = Record<string, unknown>;

export type Cart = Record<string, unknown>;

export type CartItem = Record<string, unknown>;

export type Coupon = Record<string, unknown>;

export type Order = Record<string, unknown>;

export type OrderItem = Record<string, unknown>;

export type Review = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = Record<string, unknown>;

export type Wishlist = Record<string, unknown>;

export type ProductAssetsResponse = {
  data: ProductAsset[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  results: any[];
  total: number;
};

export interface FacetResultsData {
  minPrice: number;
  maxPrice: number;
  products: Product[];
  filteredProducts: Product[];
  filteredProductVariants: ProductVariant[];
  filteredProductAssets: ProductAsset[];
  category: Category;
  categories: Category[];
  //facets: Record<string, string>;
  totalProducts: number;
  perPageOptions: number;
  itemsPerPage: number;
  attributes: AttributeValue[];
  facets: Facet[];
}

export type SearchData = FacetSearchResult<FacetResultsData>;

export interface AgnosticFacetTree {
  label: string;
  slug?: string;
  items: AgnosticFacetTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}

export interface ProductAssetGetters<PRODUCT_ASSET, PRODUCT_ASSET_FILTER> {
  getName: (productAsset: PRODUCT_ASSET) => string;
  getSlug: (productAsset: PRODUCT_ASSET) => string;
  getPrice: (productAsset: PRODUCT_ASSET) => AgnosticPrice;
  getGallery: (productAsset: PRODUCT_ASSET) => AgnosticMediaGalleryItem[];
  getCoverImage: (productAsset: PRODUCT_ASSET) => string;
  getFiltered: (productAsset: PRODUCT_ASSET[], filters?: PRODUCT_ASSET_FILTER) => PRODUCT_ASSET[];
  getAttributes: (productAsset: PRODUCT_ASSET[] | PRODUCT_ASSET, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getDescription: (productAsset: PRODUCT_ASSET) => string;
  getCategoryIds: (productAsset: PRODUCT_ASSET) => string[];
  getId: (productAsset: PRODUCT_ASSET) => string;
  getFormattedPrice: (productAsset: number) => string;
  getTotalReviews: (productAsset: PRODUCT_ASSET) => number;
  getAverageRating: (productAsset: PRODUCT_ASSET) => number;
  getBreadcrumbs?: (productAsset: PRODUCT_ASSET) => AgnosticBreadcrumb[];
  [getterName: string]: any;
}

