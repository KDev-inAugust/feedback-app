class CreateProjectFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :project_files do |t|
      t.string :name
      t.integer :project_id
      t.string :key
      t.timestamps
    end
  end
end
