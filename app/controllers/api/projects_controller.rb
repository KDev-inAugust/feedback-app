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
        object_key = params[:key] # Assuming key is passed as a parameter

        configuration = Rails.application.config.active_storage.service_configurations(:amazon)
        region = configuration["amazon"]["region"]
        access_key_id = configuration["amazon"]["access_key_id"]
        secret_access_key = configuration["amazon"]["secret_access_key"]
        bucket = configuration["amazon"]["bucket"]

        s3 = Aws::S3::Resource.new(
          credentials: Aws::Credentials.new(
            access_key_id,
            secret_access_key
          ),
          region: region
        )
        # project.assets.attach(params[:key])
        # project.assets.last.update(filename: params[:name])
        # ActiveStorageAttachment.last.update(project_id: params[:id])

        # Generate a presigned URL for downloading the object

        # 7 days from now
        obj = s3.bucket('kmssawsbucket').object(params[:key])
        url = obj.presigned_url(:get, expires_in: 500000)
        
        end
        render json: project
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

