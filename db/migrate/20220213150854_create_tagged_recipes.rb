class CreateTaggedRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :tagged_recipes do |t|
      t.references :tag
      t.references :recipe
    end
  end
end
