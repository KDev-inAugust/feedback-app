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
        path=Rails.application.routes.url_helpers.rails_blob_path(project.assets.last, only_path: true)
        # render json: {path:[path], name: project.assets.last.filename}
        render json: project
    end

    def purge
        asset=Project.find_by(id: params[:project_id]).assets.find_by(id: params[:asset_id])
        path=Rails.application.routes.url_helpers.rails_blob_path(asset, only_path: true)
        asset.purge
        project=Project.find_by(id: params[:project_id])
        # render json: [path]
        render json: project
    end

end
