class Api::BillsController < ApplicationController

  def create

  end

  def index

    Bill.you_owe(current_user.id)

  end

end
