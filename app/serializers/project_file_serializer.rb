class ProjectFileSerializer < ActiveModel::Serializer
  attributes :id, :name, :project_id, :key
  
  has_many :comments
end
