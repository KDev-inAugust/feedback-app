class ActiveStorageAttachment < ApplicationRecord
    belongs_to :project
    has_many :comments, dependent: :destroy
end