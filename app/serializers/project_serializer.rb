class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :asset_urls, :asset_names
  has_many :assets
end
