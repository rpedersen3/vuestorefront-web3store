
import cartGetters from '../../../../src/composables/getters/cartGetters';
import { mockedCart } from '../__mocks__/mockedCart';

it('get cart items', () => {
  const categoryTree = cartGetters.getItems(mockedCart);

  expect(categoryTree).toStrictEqual(mockedCart.order.orderLines);
});

it('get cart item name', () => {
  const categoryTree = cartGetters.getItemName(mockedCart.order.orderLines[0]);

  expect(categoryTree).toStrictEqual(
    mockedCart.order.orderLines[0].product.displayName
  );
});

it.skip('get cart item variant image', () => {
  const categoryTree = cartGetters.getItemImage(mockedCart.order.orderLines[0]);

  expect(categoryTree).toStrictEqual(
    mockedCart.order.orderLines[0].product.image
  );
});
it('get cart item price', () => {
  const categoryTree = cartGetters.getItemPrice(mockedCart.order.orderLines[0]);

  expect(categoryTree).toStrictEqual({
    regular: 186.25,
    special: 186.25
  });
});

it('get cart item quantity', () => {
  const categoryTree = cartGetters.getItemQty(mockedCart.order.orderLines[0]);

  expect(categoryTree).toStrictEqual(4);
});

it('get cart item sku', () => {
  const itemSku = cartGetters.getItemSku({
    id: 123,
    product: {
      id: 321,
      sku: 'sky_001'
    }
  });

  expect(itemSku).toStrictEqual('sky_001');
});

it('get cart item sku without sky', () => {
  const categoryTree = cartGetters.getItemSku({
    id: 123,
    product: {
      id: 321,
      sku: null
    }
  });

  expect(categoryTree).toStrictEqual('321');
});

it('get cart totals', () => {
  const categoryTree = cartGetters.getTotals(mockedCart);

  expect(categoryTree).toStrictEqual({ subtotal: 1633.75, total: 1643.75 });
});

it('get cart sshipping price', () => {
  const categoryTree = cartGetters.getShippingPrice(mockedCart);

  expect(categoryTree).toStrictEqual(10);
});

it('cart total items', () => {
  const totalItems = cartGetters.getTotalItems(mockedCart);

  expect(totalItems).toBe(4);
});
