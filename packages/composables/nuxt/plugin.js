import { integrationPlugin } from '@vue-storefront/core';
const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export default integrationPlugin(({ app, integration }) => {
  console.info("(Rich) add integration plugin web3store .......")
  integration.configure('web3store', {
    app,
    ...moduleOptions
    // other options
  });
  console.info("(Rich) add integration plugin odoo .......")
  integration.configure('odoo', {
    app,
    ...moduleOptions
    // other options
  });
  console.info("(Rich) add integration plugins done")
});
