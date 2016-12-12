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

  ###########
  # Settle_up method finds all billsplits between settle_from user and settle_to user
  # then the method creates a 2D array where the inner arrays have length 3
  # inner array indices correspond to the following:
  # 0: billsplit_id OR "new" which corresponds to an overpayment
  # 1: recipient_paid
  # 2: amount (will be 0 if paid is true)
  #
  # Ex) For Drew paying Matt 50 [[5, true, 0], [8, true, 0], ["new", false, 27.78]]
  ###########
  def self.settle_up(settle_from, settle_to, amount)

    billsplits = Billsplit.joins(:bill).where('author_id = ?', settle_to).where('recipient_id = ?', settle_from).where('recipient_paid = false')

    bill_settle_list = []

    billsplits.each do |split|
      temp_bill = []
      amount -= split.split_amount
      if amount > 0
        temp_bill.push(split.id)
        temp_bill.push(true)
        temp_bill.push(0)
        bill_settle_list.push(temp_bill)

      elsif amount < 0  # if settle up amount is less than a single billsplit amount
        temp_bill.push(split.id)
        temp_bill.push(false)
        temp_bill.push(-amount.round(2)) # settle_from user now still owes settle_to user by negative amount
        bill_settle_list.push(temp_bill)
        break # Do not continue going through billsplits

      else
        temp_bill.push(split.id)
        temp_bill.push(true)
        temp_bill.push(0)
        bill_settle_list.push(temp_bill)
        break # Do not continue going through billsplits

      end
    end

    # If after going through all of the billsplits amount > 0, then an overpayment has been made
    # and a new bill/billsplit needs to be created in the opposite direction.
    if amount > 0
      temp_bill = []
      temp_bill.push("new")
      temp_bill.push(false)
      temp_bill.push(amount.round(2))
      bill_settle_list.push(temp_bill)
    end

    bill_settle_list

  end

  ###########
  # Bill_paid method updates paid column for Bills. Returns an array
  # of bill_ids that need the paid column to be true
  ###########
  def self.bill_paid()
    bill_ids_to_update = []
    bills = Bill.includes(:bill_splits)

    bill_paid = true
    bills.each do |bill|
      bill.bill_splits.each do |split|
        bill_paid = bill_paid && split.recipient_paid
      end

      if bill_paid
        bill_ids_to_update.push(bill.id)
      end

      # Reset bill_paid back to true for when you go through first billsplit that has a false recipient_paid
      bill_paid = true
    end

    bill_ids_to_update

  end

  ###########
  # You_owe method creates a hash of user: amount where user is who the user_id
  # owes money and amount is the total amount from all bills
  ###########
  def self.you_owe(user_id)

    you_owe_list = {}
    billsplits = Billsplit.joins(:bill).includes(:bill_author).where('recipient_id = ?', user_id).where('recipient_paid = false').where('paid = false')
    billsplits.each do |bill|
      if you_owe_list.has_key? bill.bill_author.username
        temp_amount = you_owe_list[bill.bill_author.username]
        you_owe_list[bill.bill_author.username] = temp_amount + bill.split_amount
      else
        you_owe_list[bill.bill_author.username] = bill.split_amount
      end
    end

    you_owe_list
  end

  ###########
  # You_are_owed method creates a hash of user: amount where user is who owes
  # user_id money and amount is the total amount from all bills
  ###########
  def self.you_are_owed(user_id)

    you_are_owed_list = {}

    bills = Bill.joins(:bill_splits).joins(:bill_author).where('author_id = ?', user_id).where('recipient_paid = false').where('paid = false').includes(:bill_recipients)

    bills.uniq.each do |bill|
      bill.bill_splits.each do |split|
        user = split.recipient.username
        if you_are_owed_list.has_key? user
          temp_amount = you_are_owed_list[user]
          you_are_owed_list[user] = temp_amount + split.split_amount
        else
          you_are_owed_list[user] = split.split_amount
        end
      end
    end

    you_are_owed_list

  end


end
