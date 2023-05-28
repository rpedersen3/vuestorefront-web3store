/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './signUpUserMutation';
import ApolloClient from 'apollo-client';
import { RegisterResult, Partner } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function signUpUser(
  context: Context,
  params: Partner,
  customQuery?: CustomQuery
): Promise<FetchResult<RegisterResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { signUpUser } = context.extendQuery(
    customQuery, { signUpUser: { mutation, variables: params } }
  );

  return await apolloClient.mutate({
    mutation: gql`${signUpUser.mutation}`,
    variables: signUpUser.variables,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache'
  });
}
