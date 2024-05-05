class ProjectFileSerializer < ActiveModel::Serializer
  attributes :id, :name, :project_id, :key
end
