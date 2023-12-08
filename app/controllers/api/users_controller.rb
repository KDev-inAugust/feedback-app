class Api::UsersController < ApplicationController
    before_action :authorize, only: [:show, :index]
    def index
        users=User.all
        render json: users, include: ['active_storage_attachments.comments', 'projects.client_projects']
    end

    def create 
        user = User.create(user_params)
        if user.valid?
        session[:user_id]=user.id
        render json: user, status: :created
        else 
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        user=User.find_by(id: session[:user_id])
        if user 
            render json: user, include: ['client_projects', 'client_projects.project', 'projects.client_projects'] 
        else
            render json: { error: "That Username and Password combination is not recognized" }, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:name, :password, :password_confirmation)
    end
end
