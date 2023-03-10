class ProjectsController < ApplicationController
   
    def index
        projects=Project.all
        render json: projects
    end

    def add_asset
        project = Project.find_by(id: params[:id])
        project.assets.attach(params[:asset])
        render json: project.assets.last
    end
end
