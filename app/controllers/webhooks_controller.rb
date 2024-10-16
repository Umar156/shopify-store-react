class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token # Skip CSRF token verification for webhooks

  def app_uninstalled
    Rails.logger.info("Shop uninstalled: #{params.inspect}")
    
    # Handle app uninstallation logic (e.g., remove shop data from your database)
    # Example: Shop.find_by(shopify_domain: params[:domain]).destroy if params[:domain]
    
    head :ok # Respond with HTTP status 200
  end

  def customers_data_request
    Rails.logger.info("Data request received: #{params.inspect}")
    
    # Handle customer data request (e.g., prepare data to send back to Shopify)
    # You may not need to respond to this event, but log or process as required
    
    head :ok # Respond with HTTP status 200
  end

  def customers_redact
    Rails.logger.info("Customer data redact request: #{params.inspect}")
    
    # Handle customer data redaction (e.g., remove customer data from your database)
    
    head :ok # Respond with HTTP status 200
  end

  def shop_redact
    Rails.logger.info("Shop data redact request: #{params.inspect}")
    
    # Handle shop data redaction (e.g., remove shop data from your database)
    
    head :ok # Respond with HTTP status 200
  end
end
