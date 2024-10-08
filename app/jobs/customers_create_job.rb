class CustomersCreateJob < ActiveJob::Base
  extend ShopifyAPI::Webhooks::Handler

  class << self
    def handle(topic:, shop:, body:)
      perform_later(topic: topic, shop_domain: shop, webhook: body)
    end
  end

  def perform(topic:, shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      raise ActiveRecord::RecordNotFound, "Shop Not Found"
    end

    shop.with_shopify_session do |session|
      customer_email = webhook["email"]
      if customer_email.present?
        user = User.find_or_create_by!(email: customer_email)
        shop.users << user unless shop.users.include?(user)
        SendMailWorker.perform_async(customer_email)
      else
        logger.warn("Customer email not found in the webhook data.")
      end
    end
  end
end
