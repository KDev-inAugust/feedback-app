class ActiveStorageAttachmentsController < ApplicationController

    def index 
        asa=ActiveStorageAttachment.all
        render json: asa
    end

end