class SendMailWorker
  include Sidekiq::Worker

  def perform(customer_email)
    UserMailer.notify_user(customer_email).deliver_now
  rescue StandardError => e
    Sidekiq.logger.error "Error sending email: #{e.message}"
  end
end
