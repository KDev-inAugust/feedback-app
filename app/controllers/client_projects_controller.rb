class ClientProjectsController < ApplicationController

    def index
        cp=ClientProject.all
        render json: cp
    end

    def show
        project=Project.find_by(id: params[:id])
        client_ids=project.client_projects.map{|index| index.user_id}
        if client_ids.include?(session[:user_id])
            render json: project, include: ['active_storage_attachments', 'active_storage_attachments.comments.user_name', 'client_projects', 'client_projects.projects']
        else render json: { error: "This Account Does Not have access to that path, click the project link above to access Project for this account"}, status: :unauthorized
        end
    end

    def create
        
        if ClientProject.where(user_id: params[:user_id], project_id: params[:project_id]).exists?
            render json: {error: "that client record already exists"}
        elsif User.where(id: params[:user_id]).exists? and User.where(id: params[:user_id])!=User.where(id: session[:user_id])
            client_project=ClientProject.create(client_project_params)
                render json: client_project
        else render json: { error: "we can't create that record, make sure the user exists and that you are not addin gyourself as a client" }
        end
    end

    private 
    def client_project_params
        params.permit(:project_id, :user_id)
    end
end
