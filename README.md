
## Vue Storefront 2 integration with Web3Store

This project is a Web3Store integration with [Vue Storefront 2](https://github.com/vuestorefront-community/vue-storefront/).



## How to start?

1. yarn install
2. yarn build # (optional) Verify if everything works properly by building all three projects
3. yarn dev
4. to run this you need to have Web3Store "Product Asset Service" running




## Directory structure

* **packages/api-client** - communicates with a backend;
* **packages/composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **packages/theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)


## Support

## Credits

### Authors:


## Contributors ✨

This was branched from the ODOO - vueStorefront integration

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

