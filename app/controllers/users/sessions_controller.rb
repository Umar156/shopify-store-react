class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in(user)
      render json: { message: 'Signed in successfully', user: user }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy; end
end
