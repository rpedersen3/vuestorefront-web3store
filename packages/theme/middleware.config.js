//const web3storeBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL;
//const graphqlBaseUrl = `${web3storeBaseUrl}graphql/rc`;

const web3storeBaseUrl = "http://localhost:5000/";
const web3storeGraphqlBaseUrl = `${web3storeBaseUrl}graphql`;
const web3storeBaseDomain = process.env.SITE_URL?.replace('https://', '')?.slice(0, -1) || '';

const odooBaseUrl = "http://localhost:8069/";
const odooGraphqlBaseUrl = `${odooBaseUrl}graphql/rc`;
const odooBaseDomain = process.env.SITE_URL?.replace('https://', '')?.slice(0, -1) || '';


const extendApiMethods = require('./custom-api/api');
const customQueries = require('./custom-api/customQueries');

console.info("(Rich) web3storeGraphqlBaseUrl  **************************** " + web3storeGraphqlBaseUrl + " *****************")
console.info("(Rich) odooGraphqlBaseUrl **************************** " + odooGraphqlBaseUrl + " *****************")

module.exports = {
  integrations: { 
    web3store: {
      location: '@vue-storefront/web3store-api/server',
      configuration: {
        siteBaseUrl: web3storeBaseUrl,
        graphqlBaseUrl: web3storeGraphqlBaseUrl,
        web3storeBaseDomain,
        redisClient: (process.env.REDIS_ENABLED === 'true')
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'web3store-extension',
          extendApiMethods
        }
      ],
      customQueries
    },
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        siteBaseUrl: odooBaseUrl,
        graphqlBaseUrl: odooGraphqlBaseUrl,
        odooBaseDomain,
        redisClient: (process.env.REDIS_ENABLED === 'true')
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'odoo-extension',
          extendApiMethods
        }
      ],
      customQueries
    }
  }
};
