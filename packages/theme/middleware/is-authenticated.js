export default async ({ app, redirect }) => {
  if (!app.$cookies.get('web3store-user')) {
    return redirect('/');
  }
};
