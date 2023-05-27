require('dotenv').config();
const consola = require('consola');
const chalk = require('chalk');
const axios = require('axios');
const fsExtra = require('fs-extra');
const web3storeBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL;

const redirectUrl = `${web3storeBaseUrl}vsf/redirects`;

module.exports = () => {
  if (!web3storeBaseUrl) {
    consola.error(chalk.bold('WEB3STORE'), ' - You need create a .env or set BACKEND_BASE_URL || BASE_URL ');
    return;
  }

  consola.info(chalk.bold('WEB3STORE'), ' - Started fetch WEB3STORE redirects...');

  axios.get(redirectUrl)
    .then(({ data }) => {
      fsExtra.writeJson('customRoutes/redirects.json', data).then(() => {
        consola.success(chalk.bold('WEB3STORE'), ' - Redirects.json written!');
      });
    }).catch((error) => {
      consola.error(chalk.bold('WEB3STORE'), ' - Redirects request failed');
      consola.error(error);
    });
};
