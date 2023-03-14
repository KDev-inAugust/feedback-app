Rails.application.routes.draw do
  resources :projects
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post "/add_asset", to: "projects#add_asset"
  put "/asset_purge", to: "projects#purge"
  # Defines the root path route ("/")
  # root "articles#index"
end
