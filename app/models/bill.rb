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

  has_many(
    :bill_recipients,
    :through => :bill_splits,
    :source => :recipient
  )

  def self.you_owe(user_id)
    # All of the bills a user has received by who he owes (author_id), total bill amount, and split
    you_owe_list = {}

    bills = Bill.select(:author_id, :amount, :split)
                .joins(:bill_splits).joins(:bill_author)
                .where('recipient_id = ?', user_id)
                .where('recipient_paid = false')
                .where('paid = false')
                .includes(:bill_author)

    bills.each do |bill|
      amount = bill.amount / bill.split
      if you_owe_list.has_key? bill.bill_author.username
        temp_amount = you_owe_list[bill.bill_author.username]
        you_owe_list[bill.bill_author.username] = temp_amount + amount
      else
        you_owe_list[bill.bill_author.username] = amount
      end
    end
    you_owe_list

  end

  def self.you_are_owed(user_id)

    you_are_owed_list = {}
    # all the recipient_ids are people that owe you money
    bills = Bill.joins(:bill_splits).joins(:bill_author).where('author_id = ?', user_id).where('recipient_paid = false').where('paid = false').includes(:bill_recipients)

    #billsplit = Billsplit.joins(:bill).where('author_id = ?', user_id).where('recipient_paid = false').where('paid = false').includes(:recipient)

    bills.uniq.each do |bill|
      bill.bill_recipients.each do |user|
        amount = bill.amount / bill.split
        if you_are_owed_list.has_key? user.username
          temp_amount = you_are_owed_list[user.username]
          you_are_owed_list[user.username] = temp_amount + amount
        else
          you_are_owed_list[user.username] = amount
        end
      end
    end

    you_are_owed_list


  end


end
