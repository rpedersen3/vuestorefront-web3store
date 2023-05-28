/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getProductQuery';
import { GraphQlGetProductParams, SingleProductResult } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';
import { randomIntegerBetween } from '../..';

export default async function getProduct(
  context: Context,
  params: GraphQlGetProductParams,
  customQuery?: CustomQuery,
  cacheKey?: string
): Promise<FetchResult<SingleProductResult>> {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo as ApolloClient<any>;

  let cachedProduct = null;
  if (cacheKey && redisClient && (cachedProduct = await redisClient.get(cacheKey))) {
    return cachedProduct;
  }

  const { getProduct } = context.extendQuery(
    customQuery, { getProduct: { query, variables: params } }
  );

  console.info("(Rich) ******************* product query ************* ")
  console.info("   params: " + JSON.stringify(params))
  console.info("   custom: " + JSON.stringify(customQuery))
  
  const response = await apolloClient.query({
    query: gql`${getProduct.query}`,
    variables: getProduct.variables,
    errorPolicy: 'all'
  });

  delete response?.data?.cookie;
  if (cacheKey && redisClient && response.data?.product) {
    redisClient.set(
      cacheKey,
      response,
      [`API-P${response.data.product.id}`],
      { timeout: process.env.REDIS_TTL_CACHE_MAXIMUM ? randomIntegerBetween(Number(process.env.REDIS_TTL_CACHE_MINIMUM), Number(process.env.REDIS_TTL_CACHE_MAXIMUM)) : 86400 }
    );
  }

  console.info("(Rich) response: " + JSON.stringify(response.data?.product))
  
  return response;
}
