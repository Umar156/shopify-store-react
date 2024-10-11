class Users::RegistrationsController < Devise::RegistrationsController
  protect_from_forgery with: :null_session
  respond_to :json
  before_action :user_params, only: %i[create]

  def create
    user = User.find_by(email: params[:email])
    user.update(first_name: params[:firstName], last_name: params[:lastName], email: params[:email], password: params[:password])
  end

  private

  def user_params
    params.require(:registration).permit(:firstName, :lastName, :email, :password, :confirmPassword)
  end
end
