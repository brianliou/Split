class Api::BillsController < ApplicationController

  def create
    debugger

    $.ajax({url:'/api/bills', method:'POST', data: {bills: {amount: 30, recipients: { })
    # also will create billsplits for each recipient_id


  end

  def index

    you_owe_list = Bill.you_owe(current_user.id)
    you_are_owed_list = Bill.you_are_owed(current_user.id)
    @bills = {"owe": you_owe_list, "owed": you_are_owed_list }

    render json: @bills.to_json

  end

  def destroy

  end

  private

  def bill_params
    params.require(:bills).permit(:amount, :recipients, :description, :bill_date)
  end

end
