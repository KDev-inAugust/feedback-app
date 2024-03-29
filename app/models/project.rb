class Project < ApplicationRecord
    validates :name, presence: true
     # this is an active storage macro
     has_many_attached :assets, dependent: :destroy
     belongs_to :user
     has_many :active_storage_attachments, dependent: :destroy
     has_many :comments, through: :active_storage_attachments
     has_many :client_projects, dependent: :destroy

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

end
