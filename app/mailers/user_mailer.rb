class UserMailer < ApplicationMailer
  def notify_user(customer_email)
    @customer_email = customer_email
    @registration_url = "#{ENV['REGISTRATION_URL']}?email=#{CGI.escape(@customer_email)}"
    mail(to: @customer_email, subject: 'Registration Form')
  end
end