export default `
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
`;
