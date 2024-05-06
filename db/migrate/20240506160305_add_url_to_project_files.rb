class AddUrlToProjectFiles < ActiveRecord::Migration[7.0]
  def change
    add_column :project_files, :url, :string
  end
end
