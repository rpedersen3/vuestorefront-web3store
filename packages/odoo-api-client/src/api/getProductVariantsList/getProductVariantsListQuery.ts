import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';
export default gql`
  query(
    $filter: ProductVariantFilterInput
    $currentPage: Int
    $pageSize: Int = 0
    $search: String
    $sort: ProductVariantSortInput
  ) {
    productVariants(
      filter: $filter
      currentPage: $currentPage
      pageSize: $pageSize
      search: $search
      sort: $sort
    ) {
      totalCount
      attributeValues {
        id
        type
        displayType
        htmlColor
        search
        attribute{
          id
          name
        }
        
      }
      productVariants {
        ${productFragment}
      }
    }
  }
`;
