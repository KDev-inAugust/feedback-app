class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :user, :user_id, :asset_urls, :asset_names, :asset_ids, :client_projects
  has_many :assets
  has_many :active_storage_attachments
  has_many :comments, through: :active_storage_attachments
  has_many :client_projects
end
