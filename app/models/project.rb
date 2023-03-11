class Project < ApplicationRecord
     # this is an active storage macro
     has_many_attached :assets

     #  this method generates the urls for the assets that we will use
     #  at the src in an audio element
     def asset_urls
         assets.map do |asset|
           Rails.application.routes.url_helpers.rails_blob_path(asset, only_path: true)
         end
     end

end
