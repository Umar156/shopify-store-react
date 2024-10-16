Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  root to: 'home#index'
  get '/products', to: 'products#index'
  get '/shopify', to: 'shopify#index'
  mount ShopifyApp::Engine, at: '/shopify'
  post 'webhooks/app_uninstalled', to: 'webhooks#app_uninstalled'
  post 'webhooks/customers_data_request', to: 'webhooks#customers_data_request'
  post 'webhooks/customers_redact', to: 'webhooks#customers_redact'
  post 'webhooks/shop_redact', to: 'webhooks#shop_redact'
  get 'shopify/orders', to: 'manage_order#orders'
end
