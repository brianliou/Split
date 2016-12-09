# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base

  validates :username, :session_token, :password_digest, :email, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  has_many(
    :friendships,
    :class_name => 'Friendship',
    :foreign_key => :user_id,
    :primary_key => :id
  )

  has_many(
    :friends,
    :through => :friendships,
    :source => :friend
  )

  has_many(
    :authors,
    :class_name => 'Billsplit',
    :foreign_key => :author_id,
    :primary_key => :id
  )

  has_many(
    :recipients,
    :class_name => 'Billsplit',
    :foreign_key => :recipient_id,
    :primary_key => :id
  )

  has_many(
    :bills_created,
    :through => :authors,
    :source => :author
  )

  has_many(
    :bills_owed,
    :through => :recipients,
    :source => :recipient
  )


  attr_reader :password

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
    self.session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end
end
