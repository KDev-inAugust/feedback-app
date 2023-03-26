class ClientProjectsController < ApplicationController

    def index
        cp=ClientProject.all
        render json: cp
    end

end
