# == Schema Information
#
# Table name: billsplits
#
#  id             :integer          not null, primary key
#  bill_id        :integer          not null
#  recipient_id   :integer          not null
#  recipient_paid :boolean          default(FALSE)
#  created_at     :datetime
#  updated_at     :datetime
#

class Billsplit < ActiveRecord::Base

  validates :bill_id, :recipient_id, presence: true

  belongs_to(
    :recipient,
    :class_name => 'User',
    :foreign_key => :recipient_id,
    :primary_key => :id
  )

  has_one(
    :bill_author,
    :through => :bill,
    :source => :bill_author
  )

  belongs_to(
    :bill,
    :class_name => 'Bill',
    :foreign_key => :bill_id,
    :primary_key => :id
  )



end
