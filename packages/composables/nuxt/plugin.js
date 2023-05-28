import { integrationPlugin } from '@vue-storefront/core';
const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export default integrationPlugin(({ app, integration }) => {
  console.info("(Rich) add integration plugins .......")
  integration.configure('web3store', {
    app,
    ...moduleOptions
    // other options
  });
  integration.configure('odoo', {
    app,
    ...moduleOptions
    // other options
  });
});
