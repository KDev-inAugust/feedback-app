module Overrides
    class DirectUploadsController < ActiveStorage::DirectUploadsController
      skip_before_action :verify_authenticity_token
      puts "Generating presigned URL"
    end
  end