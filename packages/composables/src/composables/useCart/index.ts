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
  ProductAsset
} from '@vue-storefront/odoo-api';

const params: UseCartFactoryParams<Cart, OrderLine, ProductAsset> = {
  load: async (context: Context, { customQuery }) => {

    const { data } = await context.$odoo.api.cartLoad(customQuery);

    return data.cart;
  },

  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {

    console.info("add item to cart ++++++++: " + product)

    /*
    if (product && !params.isProductInCart(context, { currentCart, product })) {
      console.info("get product variant ++++++++")
      const productId = product.productVariant
        ? product.productVariant?.product?.id
        : null;

      const addItemParams: GraphQlCartAddItemParams = {
        productId,
        quantity
      };
      const { data } = await context.$odoo.api.cartAddItem(
        addItemParams,
        customQuery
      );

      return data?.cartAddItem;
    }
    */
    // product is productAsset

    console.info("check if is in cart")
    if (product && !params.isInCart(context, { currentCart, product })) {
      console.info("get product asset ++++++++")
      
      //productAssetSlug: productAsset.slug,
      const addItemParams: GraphQlCartAddItemParams = {
        productAssetSlug: product.slug,
        quantity: quantity
      };
      const { data } = await context.$odoo.api.cartAddItem(
        addItemParams,
        customQuery
      );

      console.info("cart item added ++++++++")
      return data?.cartAddItem;
    }

    return currentCart;
  },

  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    const addItemParams: GraphQlCartRemoveItemParams = {
      lineId: product.id
    };
    const { data } = await context.$odoo.api.cartRemoveItem(
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

    const { data } = await context.$odoo.api.cartUpdateItemQty(
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

    const { data, errors } = await context.$odoo.api.applyCoupon(params, customQuery);

    if (data.applyCoupon?.error) {
      console.log("(Rich) ************ apply coupon composable useCart => load")
      const { data: cartData } = await context.$odoo.api.cartLoad(customQuery);
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
    /*
    return (
      currentCart?.order?.orderLines?.some(
        (item) => item.product.id === productId
      ) || false
    );
      */
    return false;
  }

};

export default useCartFactory<Cart, OrderLine, ProductAsset>(params);
