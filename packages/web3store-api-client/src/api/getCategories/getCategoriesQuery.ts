import gql from 'graphql-tag';

export default gql`
  query(
    $search: String
    $filter: CategoryFilterInput
    $currentPage: Int
    $pageSize: Int
    $sort: CategorySortInput
  ) {
    categories(
      search: $search
      filter: $filter
      currentPage: $currentPage
      pageSize: $pageSize
      sort: $sort
    ) {
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
      categories {
        id
        name
        slug
        childs {
          id
          name
          slug
          childs {
            id
            name
            slug
          }
        }
        parent {
          id
          name
          slug
          parent {
            id
            name
            slug
            childs {
              id
              name
              slug
              childs {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
