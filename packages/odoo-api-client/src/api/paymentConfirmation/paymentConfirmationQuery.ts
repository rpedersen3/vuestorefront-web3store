import gql from 'graphql-tag';
import orderFragment from '../../fragments/orderFragment';

export default gql`
  query {
    paymentConfirmation {
      ${orderFragment}
    }
  }
`;
