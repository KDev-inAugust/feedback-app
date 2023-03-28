class ClientProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_id, :user_id, :project 
end
