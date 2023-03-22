class AddProjectIdToActiveStorageAttachments < ActiveRecord::Migration[7.0]
  def change
    add_column :active_storage_attachments, :project_id, :integer
  end
end
