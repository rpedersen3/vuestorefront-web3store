# Web3Store VueStorefront Integration

## description of marketplace

https://www.richcanvas3.com/web3-composable-commerce-experiment


## configure

C:\github\web3storefront

* yarn
* yarn add postcss-preset-env@7.3.0 -W
*  only when go to node 20, set NODE_OPTIONS=--openssl-legacy-provider
* yarn build
* yarn dev

## storefront needs the following services to run

### ProductAssetService
C:\github\ProductAssetService
github productAssetService

### ODOO eCommerce Server
C:\ODOO


## vue-storefront configuration

vue-storefront requires a specific set of vue and nuxt packages.  To get it to build here is the specific set of versions.

The key is to make sure you are using nuxt2.0 where the home page references "default.extends" and not "defineComponent"

<pre>
    "devDependencies": {
    "vue": "2.6.14",
    "nuxt": "2.15.8",
    "vue-server-renderer": "2.6.14",
    "vue-template-compiler": "2.6.14",
    },
  "resolutions": 
  { 
    "@glidejs/glide": "3.5.2", 
    "@nuxtjs/composition-api": "0.29.3",
	"vue": "2.6.14",
	"vue-server-renderer": "2.6.14",
	"vue-template-compiler": "2.6.14"
  },
</pre>

I used these commands to help. 
- removed yarn.lock and node_modules in various folders

<pre>
    npm list vue
    npm list nuxt
    npm list vue-server-renderer
    npm list vue-template-compiler

    yarn
    yarn build
    yarn dev
</pre>
