class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :active_storage_attachment_id
      t.integer :user_id
      t.integer :track_time
      t.text :body

      t.timestamps
    end
  end
end
