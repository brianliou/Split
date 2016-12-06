Rails.application.routes.draw do

  root to: 'static_pages#home'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
  end

end
