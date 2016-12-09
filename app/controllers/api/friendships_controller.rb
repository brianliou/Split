class Api::FriendshipsController < ApplicationController


  # hit users controller to create friendship
  # no controllers on join tables

  # Cannot add friends that are not in the database, only add users that
  # are already in the database. Can't do bills with them

  # Working with bills that aren't users of the website requires a lot of logic
  # that you can't do.

  def create
    friend_email = friends_params[:email]
    @friend = User.find_by(email: friend_email)

    if @friend.nil?
      render json: ['User does not exist!'], status: 401
    elsif @friend.id == current_user.id
      render json: ['You cannot friend yourself'], status: 401
    else
      @friendship = Friendship.new(user_id:current_user.id, friend_id: @friend.id)

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

  end

  def index
    user = User.find(current_user.id)
    @friends = user.friends
    render :index
  end

  def show

  end


  def destroy

    # To do if time

  end

  private

  def friends_params
    params.require(:user).permit(:username, :email)
  end


end
