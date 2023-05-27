//const web3storeBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL;
//const graphqlBaseUrl = `${web3storeBaseUrl}graphql/rc`;
const web3storeBaseUrl = "http://localhost:5000/";
const graphqlBaseUrl = `${web3storeBaseUrl}graphql`;
const baseDomain = process.env.SITE_URL?.replace('https://', '')?.slice(0, -1) || '';

const extendApiMethods = require('./custom-api/api');
const customQueries = require('./custom-api/customQueries');

console.info("(Rich) **************************** " + graphqlBaseUrl + " *****************")
module.exports = {
  integrations: { 
    web3store: {
      location: '@vue-storefront/web3store-api/server',
      configuration: {
        web3storeBaseUrl,
        graphqlBaseUrl,
        baseDomain,
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
    }
  }
};
