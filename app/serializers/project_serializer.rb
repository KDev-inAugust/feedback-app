class ProjectSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :user, :user_id, :asset_urls, :asset_names, :asset_ids, :client_projects, :project_files, :project_file_urls, :project_file_names, :project_file_ids
  has_many :assets
  has_many :active_storage_attachments
  has_many :comments, through: :active_storage_attachments
  has_many :comments, through: :project_files
  has_many :client_projects
  has_many :project_files

end
