class Users::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session  

  def create
    user = User.find_for_authentication(email: params[:email])

    return session_failed("Something went wrong") if user.nil?
    if user.valid_password?(params[:password])
      sign_in user
      respond_with(user)
    else
      session_failed("Invalid email or password")
    end
  rescue StandardError => e
    render json: { error: e.message }
  end

  def destroy; end

  private 
 
  def respond_with(current_user, _opts = {})
   
    render json: {
      status: { 
        status: 200, message: 'Logged in successfully.',
      }
    }, status: :ok
  end
  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, ENV['JWT_SECRET_KEY']).first
      current_user = User.find(jwt_payload['sub'])
    end
    
    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.',
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end



