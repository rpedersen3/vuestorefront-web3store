/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';
import { GraphQlSendResetPasswordParams } from '@vue-storefront/web3store-api';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  resetPassword: async (context: Context, { email, customQuery }) => {
    const params : GraphQlSendResetPasswordParams = {
      email: email
    };

    const { data } = await context.$web3store.api.sendResetPassword(params, customQuery);

    return data;
  },

  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    await context.$web3store.api.changePassword(
      { token: tokenValue, newPassword }, customQuery
    );
    return {};
  }
};

export default useForgotPasswordFactory<any>(factoryParams);
