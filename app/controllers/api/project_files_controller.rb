class Api::ProjectFilesController < ApplicationController

    def index
        project_files=ProjectFile.all
        render json: project_files
    end

    def create
        project_file=ProjectFile.create(project_params)
        if project.valid?
            render json: project
        else 
            render json: { errors: project_file.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        project_file=ProjectFile.find_by(id: params[:id])
        project_file.destroy
        render json: project_file
    end

    private

    def project_file_params
        params.permit(:name, :project_id, key)
    end
end
