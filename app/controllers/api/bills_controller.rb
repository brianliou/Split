class Api::BillsController < ApplicationController

  def create

    # Ajax request for bill pay form
    # $.ajax({url:'/api/bills', method:'POST', data: {bills:
    #   { amount: 30,
    #     recipients: [13, 14],
    #     description: "Dinner",
    #     bill_date: "2016-12-01"
    #   }}})
    split = bill_params[:amount].to_f / (bill_params[:recipients].length + 1)

    @bill = Bill.new(amount: bill_params[:amount].to_i,
                     description: bill_params[:description],
                     bill_date: bill_params[:bill_date],
                     author_id: current_user.id,
                     split: bill_params[:recipients].length + 1,
                    )
    if @bill.save
      # Create billsplits for each recipient_id
      bill_params[:recipients].each do |id|
        Billsplit.create(bill_id: @bill.id, recipient_id: id.to_i, split_amount: split.round(2) )
      end
      @bills = current_user.net_payments(current_user.id)
      render json: @bills.to_json
    else
      render json: @bill.errors.full_messages, status: 422
    end


  end

  def getBills

    @bills = current_user.net_payments(current_user.id)

    render json: @bills.to_json

  end



  def update

    # Ajax request for settle up form
    # $.ajax({url:'/api/bills', method:'PUT', data: {bills:
    #   { amount: 50.00,
    #     settleFrom: 4,
    #     settleTo: 2
    #   }}})

    # AJAX example returns this array for new_billsplit_info - [[5, true, 0], [8, true, 0], ["new", false, 27.78]]

    ############### NEED TO EDIT PARAMS SO THAT IT WORKS WITH CURRENT USER #######
    new_billsplit_info = current_user.settle_up(bill_params[:settleFrom].to_i, bill_params[:settleTo].to_i, bill_params[:amount].to_f)
    # Helper method to find all of the paid ones

    # Update paid billsplits
    if new_billsplit_info["paid"].length > 0
      ids = new_billsplit_info["paid"]
      Billsplit.where(id: ids).update_all(recipient_paid: true, split_amount: 0)
    end

    # Update unpaid billsplits
    unless new_billsplit_info["unpaid"].empty?
      Billsplit.find(new_billsplit_info["unpaid"].keys[0]).update(recipient_paid: false, split_amount: new_billsplit_info["unpaid"].values[0])
    end

    # Update new billsplit if overpayment
    if new_billsplit_info["new"] > 0
      new_bill = Bill.create(amount: new_billsplit_info["new"],
                            description:"Overpayment",
                            bill_date: Time.now.strftime("%Y/%m/%d").gsub(/\//,'-'),
                            author_id: bill_params[:settleFrom],
                            split: 2
                            )
      Billsplit.create(bill_id: new_bill.id, recipient_id: bill_params[:settleTo], split_amount: new_billsplit_info["new"])
    end

    # Updating paid column for bills after billsplits have been updated
    bill_paid_info = current_user.bill_paid

    Bill.where(id: bill_paid_info).update_all(paid: true)

    @bills = current_user.net_payments(current_user.id)
    render json: @bills.to_json

  end

  private

  def bill_params
    params.require(:bills).permit(:amount, {:recipients => []}, :description, :bill_date, :settleFrom, :settleTo)
  end

end
