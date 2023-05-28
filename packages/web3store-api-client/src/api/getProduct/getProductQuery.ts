import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';
export default gql`
  query ($id: String){
    product (id: $id){
      ${productFragment}
    }
  }
`;
