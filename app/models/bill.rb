# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  amount      :float            not null
#  description :string           not null
#  bill_date   :date             not null
#  paid        :boolean          default(FALSE)
#  created_at  :datetime
#  updated_at  :datetime
#


# Need to add author_id to the bill

class Bill < ActiveRecord::Base

  validates :amount, :description, :bill_date, presence: true

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


end
