class ProjectsController < ApplicationController
   
    def index
        projects=Project.all
        render json: projects
    end

    def show
        project=Project.find_by(id: params[:id])
        assets=project.assets.all
        render json: project
    end

    def add_asset
        project = Project.find_by(id: params[:id])
        project.assets.attach(params[:asset])
        project.assets.last.update(filename: params[:name])
        render json: project.assets.last
    end
end
