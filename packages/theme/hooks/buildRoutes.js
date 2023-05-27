require('dotenv').config();
//const web3storeBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL;
//const graphqlBaseUrl = `${web3storeBaseUrl}graphql/rc`;
const web3storeBaseUrl = 'http://localhost:5000';
const graphqlBaseUrl = `${web3storeBaseUrl}`;
const consola = require('consola');
const chalk = require('chalk');
const axios = require('axios');
const fsExtra = require('fs-extra');
const products = `
query {
  products (pageSize: 150000) {
    products {
      id
      slug
    }
  }
}
`;

const categories = `
query {
  categories (pageSize: 10000) {
    categories {
      id
      name
      slug
      parent {
        id
        slug
      }
    }
  }
}
`;

const headers = { headers: {
  'Content-Type': 'application/json',
  'resquest-host': web3storeBaseUrl
}};

const fetchProducts = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${products}` }, headers);
};

const fetchCategories = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${categories}` }, headers);
};

const removeLastItemFromArray = (array) => {
  const slugs = array?.map(item =>item.slug.split('/'));
  const splited = slugs.map(item => ({
    name: item[item.length - 1],
    path: item.join('/')
  }));
  return [...new Set(splited)];
};

module.exports = async () => {
  if (!web3storeBaseUrl) {
    consola.error(chalk.bold('WEB3STORE'), ' - You need create a .env or set BACKEND_BASE_URL || BASE_URL ');
    return;
  }
  consola.info(chalk.bold('WEB3STORE'), ' - Started fetch (product|categories) to build custom routes...');

  const { data } = await fetchProducts();
  const { data: categoriesData } = await fetchCategories();

  //await fsExtra.outputJson('customRoutes/products.json', removeLastItemFromArray(data.data.products.products));
  //await fsExtra.outputJson('customRoutes/categories.json', categoriesData.data.categories.categories
  //  .filter(item => item.slug && item.slug !== 'false')
  //  .map(item => ({
  //    name: `${item.name}-${item.id}`,
  //   path: item.slug
  //  })));

  consola.success(chalk.bold('WEB3STORE'), ' - Finish build custom routes!');
};
