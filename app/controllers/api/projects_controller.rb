class Api::ProjectsController < ApplicationController
    before_action :authorize
    def index
        projects=Project.all
        # render json: projects, include: ['active_storage_attachments', 'active_storage_attachments.comments.user_name']
        render json: projects.with_attached_assets
    end

    def show
        project=Project.find_by(id: params[:id])
        if (project.user_id==session[:user_id] )
        render json: project, include: ['active_storage_attachments', 'active_storage_attachments.comments.user_name', 'client_projects', 'client_projects.projects']
        else render json: { error: "This Account Does Not have access to that path, click the project link above to access Project for this account"}, status: :unauthorized
        end
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
        asas=ActiveStorageAttachment.where(project_id: params[:id]).destroy_all
        assets.purge
        project.destroy
        render json: project
    end

    def add_asset
        if params[:asset]=="undefined" || params[:name]==""
            render json: { error: "make sure you have both a file and a file name"}, status: :unprocessable_entity
        else 
        project = Project.find_by(id: params[:id])
        project.assets.attach(params[:asset])
        project.assets.last.update(filename: params[:name])
        ActiveStorageAttachment.last.update(project_id: params[:id])
        render json: project
        end
    end

    def asset_purge
        asset=Project.find_by(id: params[:project_id]).assets.find_by(id: params[:asset_id])
        asa=ActiveStorageAttachment.find_by(id: params[:asset_id])
        asa.destroy
        project=Project.find_by(id: params[:project_id])
        render json: project
    end

    private

    def project_params
        params.permit(:name, :user_id)
    end

   
end

