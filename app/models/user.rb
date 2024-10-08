class User < ApplicationRecord
  has_many :user_shops, dependent: :destroy
  has_many :shops, through: :user_shops

  validates :email, presence: true, uniqueness: true
end
