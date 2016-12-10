# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  amount      :float            not null
#  description :string           not null
#  bill_date   :date             not null
#  paid        :boolean          default(FALSE)
#  author_id   :integer          not null
#  split       :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#



class Bill < ActiveRecord::Base

  validates :amount, :description, :bill_date, :author_id, presence: true

  has_many(
    :bill_splits,
    :class_name => 'Billsplit',
    :foreign_key => :bill_id,
    :primary_key => :id
  )

  belongs_to(
    :bill_author,
    :class_name => 'User',
    :foreign_key => :author_id,
    :primary_key => :id
  )

  user = User.find(current_user.id)

  def you_owe

    # Find all of the bill_ids from billsplits where recipient_id == user.id and recipient_paid == false

    # Then 

    # look through billsplits where current_user.id is equal to recipient_id
    # nested array of each person you owe money to (the total amount if multiple bills) and within that the amount owed if recipient_paid? is false
    # put amount_calculator() in the bills model?
    # [ [author_username, amount], [author_username, amount] ]



  end

  def you_are_owed

  end


end
