/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import mutation from './cartAddItemMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlCartAddItemParams, CartAddItemResult } from '../../index';

export default async function cartAddItem(
  context: Context,
  params: GraphQlCartAddItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CartAddItemResult>> {

  params.productId = 1
  console.info("odoo cart add item mutate: " + JSON.stringify(params))

  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { cartAddItem } = context.extendQuery(
    customQuery, { cartAddItem: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${cartAddItem.mutation}`,
    variables: cartAddItem.variables,
    errorPolicy: 'all'
  });

  return response;
}
