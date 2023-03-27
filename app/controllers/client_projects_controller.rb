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

end
