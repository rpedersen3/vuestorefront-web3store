const { integrations } = require('../middleware.config');
const graphqlBaseUrl = integrations.web3store.configuration.graphqlBaseUrl;

const consola = require('consola');
const chalk = require('chalk');
const axios = require('axios');
const queries = require('../helpers/buildQueries');

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Request-Host': integrations.web3store.configuration.baseDomain
  }
};

const fetchProducts = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.products}` }, headers);
};

const fetchCategories = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.categories}` }, headers);
};

const getAppRoutes = async (): Promise<Array<string>> => {
  consola.info(chalk.bold('WEB3STORE'), ' - Started fetch sitemap dynamic routes...');

  const { data } = await fetchProducts();
  const { data: categoriesData } = await fetchCategories();

  consola.success(chalk.bold('WEB3STORE'), ' - Finished fetch sitemap dynamic routes from web3store!');

  return [
    ...data.data.products.products.map(product => product.slug),
    ...categoriesData.data.categories.categories.map(category => {
      if (category.parent) {
        return category.parent.slug;
      }

      return category.slug;
    })
  ];
};

export default getAppRoutes;
