# frozen_string_literal: true

class Shop < ActiveRecord::Base
  include ShopifyApp::ShopSessionStorageWithScopes

  has_many :user_shops, dependent: :destroy
  has_many :users, through: :user_shops

  validates :shopify_token, presence: true, uniqueness: true
  def api_version
    ShopifyApp.configuration.api_version
  end
end
