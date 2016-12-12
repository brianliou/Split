class Api::BillsController < ApplicationController

  def create

    @bill = Bill.new(amount: bill_params[:amount].to_i,
                     description: bill_params[:description],
                     bill_date: bill_params[:bill_date],
                     author_id: current_user.id,
                     split: bill_params[:recipients].length,
                    )
    if @bill.save
      # Create billsplits for each recipient_id
      bill_params[:recipients].each do |id|
        Billsplit.create(bill_id: @bill.id, recipient_id: id.to_i)
      end
      render json: ["Bill and bill splits created"]
    else
      render json: @bill.errors.full_messages, status: 422
    end

    # Ajax request for bill pay form
    # $.ajax({url:'/api/bills', method:'POST', data: {bills:
    #   { amount: 30,
    #     recipients: [13, 14],
    #     description: "Dinner",
    #     bill_date: "2016-12-01"
    #   }}})


  end

  def index

    you_owe_list = Bill.you_owe(current_user.id)
    you_are_owed_list = Bill.you_are_owed(current_user.id)
    @bills = {"owe": you_owe_list, "owed": you_are_owed_list }

    render json: @bills.to_json

  end

  def update

  end

  def destroy

  end

  private

  def bill_params
    params.require(:bills).permit(:amount, {:recipients => []}, :description, :bill_date)
  end

end
