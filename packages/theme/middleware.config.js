//const odooBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL;
//const graphqlBaseUrl = `${odooBaseUrl}graphql/rc`;
const odooBaseUrl = "http://localhost:5000/";
const graphqlBaseUrl = `${odooBaseUrl}graphql`;
const baseDomain = process.env.SITE_URL?.replace('https://', '')?.slice(0, -1) || '';

const extendApiMethods = require('./custom-api/api');
const customQueries = require('./custom-api/customQueries');

console.info("(Rich) **************************** " + graphqlBaseUrl + " *****************")
module.exports = {
  integrations: { 
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
        baseDomain,
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
