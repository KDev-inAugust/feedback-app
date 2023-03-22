class ActiveStorageAttachmentSerializer < ActiveModel::Serializer
  attributes :id, :name, :project_id, :comments

  has_many :comments
end
