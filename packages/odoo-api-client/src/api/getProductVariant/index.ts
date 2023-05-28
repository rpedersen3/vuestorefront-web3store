/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getProductVariantQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductVariantParams, ProductVariantResult } from '../../index';

export default async function getProductVariant(
  context: Context,
  params: GraphQlGetProductVariantParams,
  customQuery?: CustomQuery
): Promise<FetchResult<ProductVariantResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getProductVariant } = context.extendQuery(
    customQuery, { getProductVariant: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getProductVariant.query}`,
    variables: getProductVariant.variables,
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  return response;
}
