/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import {
  Cart,
  GraphQlCartAddItemParams,
  GraphQlCartRemoveItemParams,
  GraphQlCartUpdateItemQtyParams,
  GraphQlApplyCouponParams,
  OrderLine,
  Product
} from '@vue-storefront/web3store-api';

const params: UseCartFactoryParams<Cart, OrderLine, Product> = {
  load: async (context: Context, { customQuery }) => {

    console.log("(Rich) ************  composable useCart => load")
    console.log("(Rich) ************  $odoo: " + context.$odoo)
    console.log("(Rich) ************  $web3store: " + context.$web3store)

    const { data } = await context.$odoo.api.cartLoad(customQuery);

    return data.cart;
  },

  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {

    if (!params.isInCart(context, { currentCart, product })) {
      console.info("get product variant ++++++++")
      const productId = product.productVariant
        ? product.productVariant?.product?.id
        : null;

      const addItemParams: GraphQlCartAddItemParams = {
        productId,
        quantity
      };
      const { data } = await context.$web3store.api.cartAddItem(
        addItemParams,
        customQuery
      );

      return data?.cartAddItem;
    }

    return currentCart;
  },

  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    const addItemParams: GraphQlCartRemoveItemParams = {
      lineId: product.id
    };
    const { data } = await context.$web3store.api.cartRemoveItem(
      addItemParams,
      customQuery
    );

    return data?.cartRemoveItem;
  },

  updateItemQty: async (context: Context, { currentCart, product: orderLine, quantity, customQuery }) => {
    const updateItemParams: GraphQlCartUpdateItemQtyParams = {
      lineId: orderLine.id,
      quantity
    };

    const { data } = await context.$web3store.api.cartUpdateItemQty(
      updateItemParams,
      customQuery
    );

    return data?.cartUpdateItem;
  },

  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return currentCart;
  },

  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {

    const params : GraphQlApplyCouponParams = { promo: couponCode };

    const { data, errors } = await context.$web3store.api.applyCoupon(params, customQuery);

    if (data.applyCoupon?.error) {
      console.log("(Rich) ************ apply coupon composable useCart => load")
      const { data: cartData } = await context.$web3store.api.cartLoad(customQuery);
      return {
        updatedCart: cartData.cart,
        updatedCoupon: { applied: data.applyCoupon?.error }
      };
    }

    return { updatedCart: currentCart, updatedCoupon: { applied: data.applyCoupon?.error } };
  },

  removeCoupon: async (
    context: Context,
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: removeCoupon');
    return { updatedCart: currentCart };
  },

  isInCart: (context: Context, { currentCart, product }) => {
    //const productId = product.productVariant
    //  ? product.productVariant.product.id
    //  : null;
    const productId = null

    return (
      currentCart?.order?.orderLines?.some(
        (item) => item.product.id === productId
      ) || false
    );
  }
};

export default useCartFactory<Cart, OrderLine, Product>(params);
