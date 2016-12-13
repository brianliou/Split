class Api::BillsController < ApplicationController

  def create

    # Ajax request for bill pay form
    # $.ajax({url:'/api/bills', method:'POST', data: {bills:
    #   { amount: 30,
    #     recipients: [13, 14],
    #     description: "Dinner",
    #     bill_date: "2016-12-01"
    #   }}})
    debugger
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


  end

  def index

    user = User.find(current_user.id)
    you_owe_list = user.you_owe(user.id)
    you_are_owed_list = user.you_are_owed(user.id)

    @bills = {"owe": you_owe_list, "owed": you_are_owed_list }

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

    debugger
    # Helper method to find all of the paid ones
    paid_and_other_list = find_paid_splits(new_billsplit_info)

    paid_billsplit_ids = paid_and_other_list[0].collect { |idx| idx[0] }

    if paid_billsplit_ids.length > 0
      Billsplit.where(id: paid_billsplit_ids).update_all(recipient_paid: true, split_amount: 0)
    end

    if paid_and_other_list[1].length > 0
      uneven_payment(paid_and_other_list[1])
    end

    # Updating paid column for bills after billsplits have been updated
    bill_paid_info = current_user.bill_paid
    debugger

    Bill.where(id: bill_paid_info).update_all(paid: true)

    render json: ["COMPLETE"]

  end

  ###########
  # Find_paid_splits is a helper method in my controller to split the billsplit array
  # into two separate groups
  # 1) Billsplits where the update needs to be setting paid to true and amount to 0
  # 2) Billsplits where the update needs to be an overpayment OR underpayment (paid stays false and amount decreases)
  #
  # Ex) For a billsplit array like this: [[5, true, 0], [8, true, 0], ["new", false, 27.78]]
  #     returns [[[5, true, 0], [8, true, 0]], ["new", false, 27.78]]
  ###########
  def find_paid_splits(array)
    # [[5, true, 0], [8, true, 0], ["new", false, 27.78]]
    paid_splits = []
    new_array = []
    dup_array = array.dup
    array.each_with_index do |split, idx|
      if split[2] == 0
        paid_splits.push(split)
        dup_array.shift
      end
    end

    new_array.push(paid_splits)
    new_array.push(dup_array.shift)

    new_array

  end

  ###########
  # Uneven_payment is a helper method for when the billsplit is an overpayment or underpayment
  # the billsplit either needs to be edited as
  # 1) Overpayment - Create new bill in the opposite direciton and new billsplit
  # 2) Underpayment - Edit billsplit to be a lowered split_amount
  ###########
  def uneven_payment(billsplit)

    if billsplit[0].is_a? Integer

      Billsplit.find(billsplit[0]).update(recipient_paid: billsplit[1], split_amount: billsplit[2])
    elsif billsplit[0].is_a? String

      new_bill = Bill.create(amount: billsplit[2],
                            description:"Overpayment",
                            bill_date: Time.now.strftime("%Y/%m/%d").gsub(/\//,'-'),
                            author_id: bill_params[:settleTo],
                            split: 2
                            )
      Billsplit.create(bill_id: new_bill.id, recipient_id: bill_params[:settleFrom], split_amount: billsplit[2])
    end

  end

  def destroy

  end

  private

  def bill_params
    params.require(:bills).permit(:amount, {:recipients => []}, :description, :bill_date, :settleFrom, :settleTo)
  end

end
