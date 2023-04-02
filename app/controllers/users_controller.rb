class UsersController < ApplicationController

    def index
        users=User.all
        render json: users, include: ['active_storage_attachments.comments', 'projects.client_projects']
    end

    def show
        user=User.find_by(id: session[:user_id])
        if user 
            render json: user, include: ['client_projects', 'client_projects.project', 'projects.client_projects'] 
        else
            render json: { error: "That Username and Password combination is not recognized" }, status: :unauthorized
        end
    end
end
