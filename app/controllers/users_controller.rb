class UsersController < ApplicationController

    def index
        users=User.all
        render json: users
    end

    def show
        user=User.find_by(id: session[:user_id])
        if user 
            render json: user, include: ['posts.topics'] 
        else
            render json: { error: "That Username and Password combination is not recognized" }, status: :unauthorized
        end
    end
end
