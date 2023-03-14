class Project < ApplicationRecord
     # this is an active storage macro
     has_many_attached :assets

     #  this method generates the urls for the assets that we will use
     #  as the src in an audio element
     def asset_urls
         assets.map do |asset|
           Rails.application.routes.url_helpers.rails_blob_path(asset, only_path: true)
         end
     end

     def asset_names
        assets.map do |asset| 
          asset.filename
        end
     end

     def asset_ids
        assets.map do |asset| 
        asset.id
      end
     end

     def asset_id_to_URL(params)
        asset=assets.find_by(id: params)
        debugger
        Rails.application.routes.url_helpers.rails_blob_path(asset, only_path: true)
     end

end
