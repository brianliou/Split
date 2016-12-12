Rails.application.routes.draw do

  root to: 'static_pages#home'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      collection do
        post 'addFriend'
        get 'showFriends'
        get 'searchFriends'
      end
    end
    resource :session, only: [:create, :destroy]
    resources :friendships, only: [:create, :destroy, :index, :show]
    resource :bills, only: [:create, :index, :destroy, :update]
  end

end
