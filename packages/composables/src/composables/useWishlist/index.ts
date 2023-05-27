/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import {
  Wishlist,
  WishlistItem,
  Product,
  GraphQlWishlistAddItemParams,
  GraphQlWishlistRemoveItemParams
} from '@vue-storefront/web3store-api';

const params: UseWishlistFactoryParams<Wishlist, WishlistItem, Product> = {
  load: async (context: Context) => {
    const { data } = await context.$web3store.api.wishlistLoad();

    return data.wishlistItems;
  },

  addItem: async (context: Context, { currentWishlist, product, customQuery }) => {
    if (!params.isInWishlist(context, { currentWishlist, product })) {
      const addWishlistItemParams: GraphQlWishlistAddItemParams = {
        productId: null
      };

      const { data } = await context.$web3store.api.wishlistAddItem(
        addWishlistItemParams, customQuery
      );

      return data.wishlistAddItem;
    }

    return currentWishlist;
  },

  removeItem: async (context: Context, { currentWishlist, product, customQuery }) => {
    const productIdToCompare = product.product.id;

    const wishlistItem = currentWishlist.wishlistItems.find(
      (item) => item.product.id == productIdToCompare
    );

    const removeItemParams: GraphQlWishlistRemoveItemParams = {
      wishId: wishlistItem.id
    };

    const { data } = await context.$web3store.api.wishlistRemoveItem(
      removeItemParams, customQuery
    );

    return data.wishlistRemoveItem;
  },

  isInWishlist: (context: Context, { currentWishlist, product }) => {
    return null
  },

  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return currentWishlist;
  }
};

export default useWishlistFactory<Wishlist, WishlistItem, Product>(params);
