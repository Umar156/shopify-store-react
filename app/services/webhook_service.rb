##   this is used foe connection between shopify and create webhook if webhooks in shopify_app.rb not work

# require 'shopify_api'

# class WebhookService
#   def initialize(domain, token)
#     @shop = domain
#     @token = token
#   end

#   def perform
#     binding.pry
#     res = shopify_connect
#     if res[:status]
#       webhooks = [{ address: "#{ENV['DOMAIN_NAME']}/shopify_api/webhooks/customers_create", topic: 'customers/create' }]
      
#       webhooks.each do |webhook|
#         create_webhook(webhook)
#       rescue StandardError => e
#         puts "Failed to create webhook: #{e.message}"
#       end
#     else
#       puts "Shopify API connection failed: #{res[:error]}"
#     end
#   end

#   def shopify_connect
#     binding.pry
#     session = ShopifyAPI::Auth::Session.new(shop: @shop, access_token: @token)
#     ShopifyAPI::Context.activate_session(session)
#     {status: true}
#   rescue StandardError => e
#     {status: false, error: e.message}
#   end

#   def create_webhook(webhook_details)
#     binding.pry
#     webhooks = ShopifyAPI::Webhook.all.as_json
#     webhook_found = webhooks.find { |webhook| webhook['address'] == webhook_details[:address] }
#     webhook = if webhook_found.present? 
#                 ShopifyAPI::Webhook.find(webhook_found['id'])
#               else
#                 ShopifyAPI::Webhook.new
#               end
#     webhook.address = webhook_details[:address]
#     webhook.topic = webhook_details[:topic]
#     webhook.format = 'json'
#     webhook.save
#   end
# end