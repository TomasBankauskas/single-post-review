# Stackbit

www.stackbit.com

The content of this site is managed by DatoCMS.

# Running Your Site Locally

```
npm install
```

1. get "netlify-api-key" from project menu in [Stackbit dashboard](https://app.stackbit.com/dashboard)
2. run the following command to assign this key to `STACKBIT_API_KEY` environment variable:

`export STACKBIT_API_KEY=netlify-api-key`

3. run the following command to fetch site contents from DatoCMS:

`node ./stackbit-pull.js`

4. Starts a development server

`npm run develop`

5. Browse to [http://localhost:8000/](http://localhost:8000/)
