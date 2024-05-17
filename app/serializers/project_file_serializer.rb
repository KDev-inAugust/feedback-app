class ProjectFileSerializer < ActiveModel::Serializer
  attributes :id, :name, :project_id, :key, :url, :comments
  
  has_many :comments
end
