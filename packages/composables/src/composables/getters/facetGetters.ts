/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AgnosticBreadcrumb,
  AgnosticCategoryTree,
  AgnosticFacet,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  FacetsGetters
} from '@vue-storefront/core';
import { Category, Product, ProductVariant, ProductAsset } from '@vue-storefront/web3store-api';
import { FacetResultsData, SearchData } from '../types';
import CategoryGetters from './categoryGetters';
const getAll = (
  searchData: SearchData,
  criteria?: string[]
): AgnosticFacet[] => [];

const isNumeric = (num) => !isNaN(num);

const getGrouped = (
  searchData: SearchData,
  criteria?: string[]
): AgnosticGroupedFacet[] => {
  if (!searchData?.data?.attributes) return [];

  if (!searchData?.data?.attributes) return [];

  const facets = searchData.data.facets;

  facets.forEach(facet => {
    if (facet.displayType == "range") {
      if (facet.min == null) {
        facet.min = 0
      }
      if (facet.filteredMin == null) {
        facet.filteredMin = 0
      }
      if (facet.max == null) {
        facet.max = 0
      }
      if (facet.filteredMax == null) {
        facet.filteredMax = 0
      }
      facet.config = {
        "start":[facet.filteredMin, facet.filteredMax],
        "range":{"min":facet.min,"max":facet.max},
        "step":1, 
        "connect": true,
        "direction": "ltr",
        "orientation": "horizontal",
        "behaviour": "tap-drag",
        "tooltips": true,
        "keyboardSupport": true}
    }

    if (facet.displayType == "checkbox-list") {
      facet.options = []
      if (facet.list != null) {
        facet.list.forEach(item => {
          facet.options.push({
            id: String(item),
            value: item,
            label: item,
            metadata: item,
            htmlColor: item
          })
        })
      }
      
    }
    
  })
  
  //console.info('------------------------------------------------------')
  //console.info('resulting facets: ' + JSON.stringify(facets))
  //console.info('------------------------------------------------------')
  return facets;
};

const getSortOptions = (searchData: SearchData): AgnosticSort => ({
  options: [
    {
      id: 'list_price desc',
      value: 'price,DESC',
      attrName: 'Price: High to Low',
      type: ''
    },
    {
      id: 'list_price asc',
      value: 'price,ASC',
      attrName: 'Price: Low to High',
      type: ''
    },
    { id: 'name asc', value: 'name,ASC', attrName: 'Name: A to Z', type: '' },
    { id: 'name desc', value: 'name,DESC', attrName: 'Name: Z to A', type: '' }
  ],
  selected: searchData.input.sort || 'name asc'
});

const getCategoryTree = (searchData: SearchData): AgnosticCategoryTree => {


  if (!searchData?.data?.category) {
    return { items: [], label: '', isCurrent: false };
  }

  const category = searchData.data.category;
  let parentCategory: Category = category;

  if (!category?.childs && category?.parent) {
    parentCategory = category?.parent?.parent;
  }

  return CategoryGetters.getTree(parentCategory);
};

const getCategory = (searchData: SearchData): Category => searchData?.data?.category;

const getProducts = (searchData: SearchData): Product[] => {
  if (!searchData?.data?.products || searchData?.data?.products?.length === 0) {
    console.info('(Rich) no products')
    return [];
  }
  console.info('(Rich) has products: ' + searchData.data.products)
  searchData.data.products.forEach(function (product) {
    console.info("(Rich) has product: " + product.name);
  }); 

  return searchData.data.products;
};

const getFilteredProducts = (searchData: SearchData): Product[] => {
  if (!searchData?.data?.filteredProducts || searchData?.data?.filteredProducts?.length === 0) {
    console.info('(Rich) no filtered products')
    return [];
  }
  console.info('(Rich) has products: ' + searchData.data.filteredProducts)
  searchData.data.filteredProducts.forEach(function (product) {
    console.info("(Rich) has filtered product: " + product.name);
  }); 

  return searchData.data.filteredProducts;
};

const getFilteredProductVariants = (searchData: SearchData): ProductVariant[] => {
  if (!searchData?.data?.filteredProductVariants || searchData?.data?.filteredProductVariants?.length === 0) {
    console.info('(Rich) no filtered product variants')
    return [];
  }
  console.info('(Rich) has product variants: ' + searchData.data.filteredProductVariants)
  searchData.data.filteredProductVariants.forEach(function (productVariant) {
    console.info("(Rich) has filtered product variant: " + productVariant.name);
  }); 

  return searchData.data.filteredProductVariants;
};

const getFilteredProductAssets = (searchData: SearchData): ProductAsset[] => {
  if (!searchData?.data?.filteredProductAssets || searchData?.data?.filteredProductAssets?.length === 0) {
    console.info('(Rich) no filtered product assets')
    return [];
  }

  return searchData.data.filteredProductAssets;
};

const getPagination = (searchData: SearchData): AgnosticPagination => {
  const itemsPerPage = searchData.input?.pageSize || 12;

  return {
    currentPage: 1,
    totalPages: Math.ceil(searchData.data?.totalProducts / itemsPerPage) || 1,
    totalItems: searchData.data?.totalProducts,
    itemsPerPage,
    pageOptions: [5, 12, 15, 20]
  };
};

const getBreadcrumbsByProduct = (product: Product): AgnosticBreadcrumb[] => {
  console.info('(Rich) product categories query')
  const category = product.categories?.filter((cat) => cat?.name !== 'All');
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  if (!category) {
    return [];
  }
  breadcrumbs.push({
    text: category[0]?.name,
    link: category[0]?.slug
  });

  return breadcrumbs || [];
};

const getBreadcrumbs = ({ input }: SearchData): AgnosticBreadcrumb[] => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  breadcrumbs.push({
    text: input.currentRootCategory?.name,
    link: input.currentRootCategory?.slug
  });

  if (input.params.slug_2 && !isNumeric(input.params.slug_2)) {
    const splited = input.params.slug_2.split('-');
    breadcrumbs.push({ text: splited[2], link: '' });
  }

  return breadcrumbs;
};

const facetGetters: FacetsGetters<FacetResultsData, any> = {
  getBreadcrumbsByProduct,
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getFilteredProducts,
  getFilteredProductVariants,
  getFilteredProductAssets,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
