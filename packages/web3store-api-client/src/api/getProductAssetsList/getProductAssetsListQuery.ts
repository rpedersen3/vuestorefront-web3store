import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';
export default gql`
  query(
    $filter: ProductAssetFilterInput
    $currentPage: Int
    $pageSize: Int = 0
    $search: String
    $sort: ProductAssetSortInput
  ) {
    productAssets(
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
      productAssets {
        ${productFragment}
      }
    }
  }
`;
