class Api::BillsController < ApplicationController

  def create

  end

  def you_owe
    # look through billsplits where current_user.id is equal to recipient_id
    # nested array of each person you owe money to (the total amount if multiple bills) and within that the amount owed if recipient_paid? is false
    # put amount_calculator() in the bills model?
    # [ [author_id, amount], [author_id, amount] ]



  end

  def you_are_owed

  end



  # LOGIC FOR BILL SPLIT CALCULATIONS GO INTO THE BILLS MODEL

end
