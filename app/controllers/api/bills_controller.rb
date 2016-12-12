class Api::BillsController < ApplicationController

  def create

    split = bill_params[:amount].to_f / bill_params[:recipients].length

    @bill = Bill.new(amount: bill_params[:amount].to_i,
                     description: bill_params[:description],
                     bill_date: bill_params[:bill_date],
                     author_id: current_user.id,
                     split: bill_params[:recipients].length,
                    )
    if @bill.save
      # Create billsplits for each recipient_id
      bill_params[:recipients].each do |id|
        Billsplit.create(bill_id: @bill.id, recipient_id: id.to_i, split_amount: split.round(2) )
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
    debugger

    # Ajax request for settle up form
    # $.ajax({url:'/api/bills/1', method:'PUT', data: {bills:
    #   { amount: 30.00,
    #     settleFrom: 4,
    #     settleTo: 2
    #   }}})


    # new_billsplit_info = Bill.settle_up(user_id, recipient_id, amount)
    # new_billsplit_info = Bill.settle_up(2, 4, 50)
    new_billsplit_info = Bill.settle_up(bill_params[:settleFrom].to_i, bill_params[:settleTo].to_i, bill_params[:amount].to_f)
    # [[5, true, 0], [8, true, 0], ["new", false, 27.78]]

    debugger

    new_billsplit_info.each do |info|
      if info[0].is_a? Integer
        billsplit = Billsplit.find(info[0])
        billsplit.update(recipient_paid: info[1], split_amount: info[2])

        ## QUESTION should I try to use update_all to update billsplits by group?
        ## Billsplit.where('id = ?', [new_billsplit_info[0][0], new_billsplit_info[1][0], etc.])
      elsif info[0].is_a? String
        debugger
        new_bill = Bill.create(amount: info[2],
                              description:"Overpayment",
                              bill_date: Time.now.strftime("%Y/%m/%d").gsub(/\//,'-'),
                              author_id: bill_params[:settleTo],
                              split: 2
                              )
        Billsplit.create(bill_id: new_bill.id, recipient_id: bill_params[:settleFrom], split_amount: info[2])
        debugger
      end
    end

    bill_paid_info = Bill.bill_paid

    Bill.find(bill_paid_info).update_all(paid: true)

        # Create a new bill
        # Create a new billsplit
    #
    # Bill.settle_up(current_user.id, bill_params[:settle], 40) returns a nested array

    # Billsplit.find()

  end

  def destroy

  end

  private

  def bill_params
    params.require(:bills).permit(:amount, {:recipients => []}, :description, :bill_date, :settleFrom, :settleTo)
  end

end
