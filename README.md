# nuxt2-node-cache

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

This is to demonstrate using node-cache npm package with express to cache http responses from http calls made server-side on the node server.

We can call our endpoints on the node server that are located in server-middleware\api\index.js

In there you will see one call is using node-cache, the rest either return a string or make an http call without caching the response.
