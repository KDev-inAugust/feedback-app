class CommentsController < ApplicationController

    def index
        comments=Comment.all
        render json: comments
    end

    def create
        comment=Comment.create(comment_params)
        comments=Comment.where(active_storage_attachment_id: params[:active_storage_attachment_id])
        render json: comments
    end

    def destroy
        comment=comment.find_by(id: params[:id])
        comment.destroy
    end

    
    private

    def comment_params
        params.permit(:active_storage_attachment_id, :user_id, :track_time, :body)
    end
end