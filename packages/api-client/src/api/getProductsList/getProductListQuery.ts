import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';
export default gql`
  query(
    $filter: ProductFilterInput
    $currentPage: Int
    $pageSize: Int = 0
    $search: String
    $sort: ProductSortInput
  ) {
    products(
      filter: $filter
      currentPage: $currentPage
      pageSize: $pageSize
      search: $search
      sort: $sort
    ) {
      totalCount
      facets {
        id
        name
        displayName
        displayType
        structType
        scalarType
        min,
        filteredMin,
        max,
        filteredMax,
        list
        filteredList
      }
      attributeValues {
        id
        type
        displayType
        value
        htmlColor
        search
        attribute{
          id
          name
          structType
          scalarType
          min
          max
          values
        }
        
      }
      assetAttributeValues {
        id
        type
        displayType
        value
        htmlColor
        search
        attribute{
          id
          name
          structType
          scalarType
          min
          max
          values
        }
        
      }
      products {
        ${productFragment}
      }
    }
  }
`;
