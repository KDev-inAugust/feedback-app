class Api::ProjectsController < ApplicationController
    before_action :authorize
    before_action :storage_config , only: [:show, :add_asset, :asset_purge]
   
    def index
        projects=Project.all
        # render json: projects, include: ['active_storage_attachments', 'active_storage_attachments.comments.user_name']
        render json: projects.with_attached_assets
    end

    
    def show
        project=Project.find_by(id: params[:id])
        if (project.user_id==session[:user_id] )
           # 7 days from now
            project.project_files.map do |file|
                obj = @s3.bucket('kmssawsbucket').object(file.key)
                url = obj.presigned_url(:get, expires_in: 7200)
                file.url=url
            end
        render json: project, include: ['active_storage_attachments', 'active_storage_attachments.comments.user_name', 'client_projects', 'client_projects.projects', 'project_files.comments']
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
    
        # 7 days from now
        obj = @s3.bucket('kmssawsbucket').object(params[:key])
        url = obj.presigned_url(:get, expires_in: 500000)
        project_file=ProjectFile.create(name: params[:name], key: params[:key], project_id: params[:id], url: url)
        render json: project
        end
    end

    def asset_purge
        project_file=ProjectFile.find_by(id: params[:asset_id])
        object_key=project_file.key
        project=Project.find_by(id: params[:project_id])
        # # Delete the object
        project_file.destroy
    

        configuration = Rails.application.config.active_storage.service_configurations(:amazon)
        region = configuration["amazon"]["region"]
        access_key_id = configuration["amazon"]["access_key_id"]
        secret_access_key = configuration["amazon"]["secret_access_key"]
    
        
        client = Aws::S3::Client.new(
          credentials: Aws::Credentials.new(
            access_key_id,
            secret_access_key
          ),
          region: region
        )

        response = client.delete_object({
            bucket: @bucket,
            key: object_key,
        })
        if response.successful?
            render json: project
          else
            render json: { error: response.error, error_message: response.error.message }
          end

    end

    private

    def project_params
        params.permit(:name, :user_id)
    end

    def storage_config
        configuration = Rails.application.config.active_storage.service_configurations(:amazon)
        region = configuration["amazon"]["region"]
        access_key_id = configuration["amazon"]["access_key_id"]
        secret_access_key = configuration["amazon"]["secret_access_key"]
        @bucket = configuration["amazon"]["bucket"]

        @s3 = Aws::S3::Resource.new(
          credentials: Aws::Credentials.new(
            access_key_id,
            secret_access_key
          ),
          region: region
        )
    end
end