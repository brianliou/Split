# == Schema Information
#
# Table name: friendships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Friendship < ActiveRecord::Base

  validates :user_id, :friend_id, presence: true

  # Necessary to make sure you don't have duplicate friendships

  validates :user_id, :uniqueness => {
    :scope => :friend_id,
    :message => "Friendship should only exist once"
  }

  belongs_to(
    :user,
    :class_name => 'User',
    :foreign_key => :user_id,
    :primary_key => :id
  )

  belongs_to(
    :friend,
    :class_name => 'User',
    :foreign_key => :friend_id,
    :primary_key => :id
  )



end
