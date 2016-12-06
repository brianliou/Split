class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user.nil?
      render json: ["Invalid username or password"], status: 401
    else
      login(@user)
      render json: @user
    end

  end



  def destroy
    if current_user.nil?
      render json: ["No valid user to logout"], status: 404
    else
      logout
      render json: {}
    end
  end

end
