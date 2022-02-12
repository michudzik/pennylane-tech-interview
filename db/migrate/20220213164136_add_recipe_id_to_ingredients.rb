class AddRecipeIdToIngredients < ActiveRecord::Migration[7.0]
  def change
    change_table :ingredients do |t|
      t.references :recipe, foreign_key: true
    end
  end
end
