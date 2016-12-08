class Api::FriendsController < ApplicationController

  def create
    friend_email = friends_params[:email]
    @friend = User.find_by(email: friend_email)
    @friendship = Friendship.new(user_id:current_user.id, friend_id: @friend.id)

    debugger

    if @friendship.save
      render :show
    else
      render json: ['Invalid user, user does not exist'], status: 401
    end


  end


  def destroy

  end

  private

  def friends_params
    params.require(:friends).permit(:username, :email)
  end


end
