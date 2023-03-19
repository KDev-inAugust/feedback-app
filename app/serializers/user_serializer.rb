class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :projects
  has_many :projects
end
