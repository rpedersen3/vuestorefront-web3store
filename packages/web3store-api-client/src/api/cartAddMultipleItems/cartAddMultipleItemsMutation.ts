import gql from 'graphql-tag';
import orderFragment from '@vue-storefront/web3store-api/src/fragments/orderFragment';

export default gql`
  mutation($products: [ProductInput]!){
    cartAddMultipleItems(products: $products){
      ${orderFragment}
    }
  }`;
