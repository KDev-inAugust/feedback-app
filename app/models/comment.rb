class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :active_storage_attachment
    belongs_to :project_file

    def user_name
        self.user.name
    end
end
