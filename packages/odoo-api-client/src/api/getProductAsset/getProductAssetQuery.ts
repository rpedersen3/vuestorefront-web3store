import gql from 'graphql-tag';
export default gql`
  query($slug: String) {
    productAsset(
      slug: $slug
    ) {
      id
      smallImage
      price
      name
      description
      image
      imageFilename
      slug
      sku
      jsonLd
      isInWishlist
  
      attributeValues {
        id
        type
        displayType
        priceExtra
        attribute {
          id
          name
        }
        search
      }
    }
  }

`;
