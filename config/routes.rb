Rails.application.routes.draw do
    post '/rails/active_storage/direct_uploads', to: 'overrides/direct_uploads#create'

  namespace :api do
    
    resources :client_projects
    resources :comments
    resources :projects
    resources :users
    resources :active_storage_attachments
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    post "/login", to: "sessions#create"
    post "/signup", to: "users#create"
    delete "/logout", to: "sessions#destroy"
    get "/me", to: "users#show"
    post "/add_asset", to: "projects#add_asset"
    put "/asset_purge", to: "projects#asset_purge"
  
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
