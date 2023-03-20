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

    def destroy
        project=Project.find_by(id: params[:id])
        assets=Project.find_by(id: params[:id]).assets.all
        assets.purge
        project.destroy
        render json: project
    end

    def add_asset
        project = Project.find_by(id: params[:id])
        project.assets.attach(params[:asset])
        project.assets.last.update(filename: params[:name])
        render json: project
    end

    def purge
        asset=Project.find_by(id: params[:project_id]).assets.find_by(id: params[:asset_id])
        asset.purge
        project=Project.find_by(id: params[:project_id])
        render json: project
    end

end

