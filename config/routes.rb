Rails.application.routes.draw do
  root "home#index"

  namespace :api, defaults: { format: :json } do
    resources :recipes, only: %i[index]
  end
end
