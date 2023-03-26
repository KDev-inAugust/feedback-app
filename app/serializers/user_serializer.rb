class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :projects, :client_projects
  has_many :projects
  has_many :client_projects
end
