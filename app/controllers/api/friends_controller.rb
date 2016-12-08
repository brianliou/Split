class Api::FriendsController < ApplicationController

  def create
    friend_email = friends_params[:email]
    @friend = User.find_by(email: friend_email)
    @friendship = Friendship.new(user_id:current_user.id, friend_id: @friend.id)

    # JSON response needs to include user_id

    # Add different errors
    ## If you are trying to friend yourself
    ## If you are trying to friend a user that doesn't exist
    ## If you are trying to refriend someone you're already friends with

    if @friendship.save
      render :show
    else
      render json: ['Invalid user, user does not exist'], status: 401
    end

  end

  def index

  end

  def show

  end


  def destroy

  end

  private

  def friends_params
    params.require(:user).permit(:username, :email)
  end


end
