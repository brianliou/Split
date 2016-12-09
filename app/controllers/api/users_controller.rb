
class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end

  end

  def addfriend
    friend_email = user_params[:email]
    @friend = User.find_by(email: friend_email)

    if @friend.nil?
      render json: ['User does not exist!'], status: 401
    elsif @friend.id == current_user.id
      render json: ['You cannot friend yourself'], status: 401
    else
      @friendship = Friendship.new(user_id:current_user.id, friend_id: @friend.id)

      if @friendship.save
        render json: @friend
      else
        render json: ['Invalid user, user does not exist'], status: 401
      end
    end

  end

  def showfriends
    user = User.find(current_user.id)
    @friends = user.friends
    render :friends
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
