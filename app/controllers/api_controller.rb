class ApiController < ApplicationController
  before_action :authenticate_user

  protected

  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last
    return render json: { error: 'Unauthorized (Missing Token)' }, status: :unauthorized unless token

    begin
      jwt_payload = JWT.decode(token, ENV['JWT_SECRET_KEY'])
      user_id = jwt_payload.first['sub']
      @current_user = User.find_by(id: user_id)

      unless @current_user
        return render json: { error: "Unauthorized (User not found for ID: #{user_id})" }, status: :unauthorized
      end
    rescue JWT::DecodeError => e
      render json: { error: "Unauthorized (JWT Decode Error: #{e.message})" }, status: :unauthorized
    end
  end
end
