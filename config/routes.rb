Rails.application.routes.draw do
  root to: 'home#index'
  get '/products', to: 'products#index'
  mount ShopifyApp::Engine, at: '/'
end
