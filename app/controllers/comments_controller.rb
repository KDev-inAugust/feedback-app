class CommentsController < ApplicationController

    def index
        comments=Comment.all
        render json: comments
    end

    def show
        comment=Comment.find_by(id: params[:id])
        render json: comment
    end

    def create
        comment=Comment.create(comment_params)
        comments=Comment.where(active_storage_attachment_id: params[:active_storage_attachment_id])
        render json: comments
    end

    def update
        comment=Comment.find_by(id: params[:id])
        comment.update(comment_params)
        render json: comment
    end

    def destroy
        comment=Comment.find_by(id: params[:id])
        comment.destroy
        render json: comment
    end

    private

    def comment_params
        params.permit(:active_storage_attachment_id, :user_id, :track_time, :body)
    end
end
