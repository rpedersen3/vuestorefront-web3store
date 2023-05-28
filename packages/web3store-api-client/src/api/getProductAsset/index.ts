/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getProductAssetQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductAssetParams, ProductAssetResult } from '../../index';

export default async function getProductAsset(
  context: Context,
  params: GraphQlGetProductAssetParams,
  customQuery?: CustomQuery
): Promise<FetchResult<ProductAssetResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getProductAsset } = context.extendQuery(
    customQuery, { getProductAsset: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getProductAsset.query}`,
    variables: getProductAsset.variables,
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  console.info("(Rich) api get product asset: " + JSON.stringify(response))
  return response;
}
