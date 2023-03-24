class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :active_storage_attachment

    def user_name
        self.user.name
    end
end
