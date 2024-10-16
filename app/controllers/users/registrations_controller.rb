class Users::RegistrationsController < Devise::RegistrationsController
  protect_from_forgery with: :null_session
  before_action :user_params, only: %i[create]
  respond_to :json

  def create
    user = User.find_by(email: params[:email])
    user.update(first_name: params[:firstName], last_name: params[:lastName], email: params[:email], password: params[:password])
    if user.save
      respond_with user, location: after_sign_up_path_for(user)
    else
      respond_with user, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:registration).permit(:firstName, :lastName, :email, :password, :confirmPassword)
  end

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: {
      status: 'success',
      text: 'Signed up successfully.'
    }, status: :ok
  end

  def register_failed
    render json: { message: "User couldn't be created successfully." }, status: :unprocessable_entity
  end
end
