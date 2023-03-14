class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :asset_urls, :asset_names, :asset_ids
  has_many :assets
end
