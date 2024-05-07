class ProjectFileSerializer < ActiveModel::Serializer
  attributes :id, :name, :project_id, :key, :url
  
  has_many :comments
end
