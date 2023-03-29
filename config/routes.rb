Rails.application.routes.draw do
  resources :client_projects
  resources :comments
  resources :projects
  resources :users
  resources :active_storage_attachments
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  post "/add_asset", to: "projects#add_asset"
  put "/asset_purge", to: "projects#asset_purge"
  # patch "/comments/:id", to: "comments#update"
  # Defines the root path route ("/")
  # root "articles#index"
end
