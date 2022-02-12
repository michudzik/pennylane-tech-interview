class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :tip

      t.integer :quantity_of_people
      t.integer :rate

      t.string :prep_time
      t.string :cook_time
      t.string :total_time

      t.integer :budget
      t.integer :difficulty

      t.references :author, foreign_key: true
      t.references :image, foreign_key: true

      t.timestamps
    end
  end
end
