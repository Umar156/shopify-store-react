class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :user_shops, dependent: :destroy
  has_many :shops, through: :user_shops

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, if: :password_required?

  private
  def password_required?
    !password.nil? || !password_confirmation.nil?
  end
end