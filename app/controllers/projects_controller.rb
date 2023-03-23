class ProjectsController < ApplicationController
    before_action :authorize, only: [:create, :destroy]
    def index
        projects=Project.all
        render json: projects
    end

    def show
        project=Project.find_by(id: params[:id])
        assets=project.assets.all
        render json: project
    end

    def create
        project=Project.create(project_params)
        if project.valid?
            render json: project
        else 
            render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
        end
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
        
        ActiveStorageAttachment.last.update(project_id: params[:id])
        
        render json: project
    end

    def purge
        asset=Project.find_by(id: params[:project_id]).assets.find_by(id: params[:asset_id])
        asa=ActiveStorageAttachment.find_by(id: params[:asset_id])
        asa.destroy
        asset.purge
        project=Project.find_by(id: params[:project_id])
        render json: project
    end

    private

    def project_params
        params.permit(:name, :user_id)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end

