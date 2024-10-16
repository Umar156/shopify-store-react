class ManageOrderController < ApiController
  require 'net/http'
  require 'uri'
  require 'json'
  protect_from_forgery with: :null_session

  def orders
    user_shop = UserShop.find_by(user_id: current_user.id)
    if user_shop.nil?
      render json: { error: 'UserShop not found' }, status: :not_found
      return
    end

    shop = Shop.find_by(id: user_shop.shop_id)
    if shop.nil?
      render json: { error: 'Shop not found' }, status: :not_found
      return
    end

    uri = URI.parse("https://#{shop.shopify_domain}/admin/orders.json?email=#{current_user.email}")
    request = Net::HTTP::Get.new(uri)
    request["X-Shopify-Access-Token"] = shop.shopify_token

    begin
      response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
        http.request(request)
      end

      case response
      when Net::HTTPSuccess
        render json: JSON.parse(response.body)
      else
        render json: { error: "HTTP Error: #{response.message}" }, status: response.code.to_i
      end
    rescue JSON::ParserError => e
      render json: { error: 'Failed to parse JSON response' }, status: :internal_server_error
    rescue => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end