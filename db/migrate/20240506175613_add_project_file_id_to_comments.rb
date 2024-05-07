class AddProjectFileIdToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :project_file_id, :integer
  end
end
