class Api::ActiveStorageAttachmentsController < ApplicationController
    before_action :authorize
    def index 
        asa=ActiveStorageAttachment.all
        render json: asa
    end

end