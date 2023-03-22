class CommentSerializer < ActiveModel::Serializer
  attributes :id, :active_storage_attachment_id, :user_id, :track_time, :body
end
