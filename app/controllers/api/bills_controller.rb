class Api::BillsController < ApplicationController

  def create

  end

  def index

    Bill.you_owe(current_user.id)

    # json array from ruby hash
    # http://stackoverflow.com/questions/18900391/generate-an-json-array-from-a-hash-in-jbuilder

  end

end
