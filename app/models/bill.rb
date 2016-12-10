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

  def self.you_owe(user_id)
    user = User.find(current_user.id)

    # All of the bills a user has received by who he owes (author_id), total bill amount, and split

    Bill.select(:author_id, :amount, :split).joins(:bill_splits).joins(:bill_author).where('recipient_id = ?', user.id).where('recipient_paid = false').where('paid = false').includes(:bill_author)


    # Find all of the bill_ids from billsplits where recipient_id == user.id and recipient_paid == false

    # Then with those bills find all of the author_ids, amount, and split where paid == false

    # Then create a hash { User.find(author_id).username: amount } and increment by amount

    # Generate Json array from ruby hash http://stackoverflow.com/questions/18900391/generate-an-json-array-from-a-hash-in-jbuilder

    # look through billsplits where current_user.id is equal to recipient_id
    # nested array of each person you owe money to (the total amount if multiple bills) and within that the amount owed if recipient_paid? is false
    # put amount_calculator() in the bills model?
    # [ [author_username, amount], [author_username, amount] ]


    ################################
    ########### START HERE ######### ## Go back and relearn activerecord querying
    ################################ ## https://github.com/appacademy/curriculum/blob/master/sql/readings/joins.md



  end

  def you_are_owed

  end


end
