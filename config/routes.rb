Rails.application.routes.draw do
  resources :projects
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  post "/add_asset", to: "projects#add_asset"
  put "/asset_purge", to: "projects#purge"
  # Defines the root path route ("/")
  # root "articles#index"
end
