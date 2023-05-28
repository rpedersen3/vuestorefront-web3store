import gql from 'graphql-tag';
export default gql`
  query($productId: Int, $combinationId: [Int]) {
    productVariant(
      productId: $productId
      combinationId: $combinationId
    ) {
      product {
        id
        image
        variantPrice
        variantPriceAfterDiscount
        variantHasDiscountedPrice
      }
      productId
      displayName
      price
      listPrice
      hasDiscountedPrice
    }
  }
`;
