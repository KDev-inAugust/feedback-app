class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :active_storage_attachment
end
