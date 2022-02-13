require 'rails_helper'

RSpec.describe Recipes::SearchService do
  describe '#call' do
    context 'when search string is not provided' do
      let!(:recipe) { create(:recipe) }

      it 'returns the initial scope' do
        expect(subject.call(Recipe.all, {})).to match_array [recipe]
      end
    end

    context 'when search string is provided' do
      let!(:recipe_1) { create(:recipe) }
      let!(:recipe_2) { create(:recipe) }

      let!(:ingredient_1) { create(:ingredient, recipe_id: recipe_1.id, name: '150g of orange') }
      let!(:ingredient_2) { create(:ingredient, recipe_id: recipe_2.id, name: '150g of sugar') }

      it 'returns only recipes which ingredients match the search string' do
        query = { ingredients: 'orange' }

        expect(subject.call(Recipe.all, query)).to match_array [recipe_1]
      end
    end

    context 'when mutiple ingredients are provided' do
      let!(:recipe_1) { create(:recipe) }
      let!(:recipe_2) { create(:recipe) }

      let!(:ingredient_1) { create(:ingredient, recipe_id: recipe_1.id, name: '150g of orange') }
      let!(:ingredient_2) { create(:ingredient, recipe_id: recipe_2.id, name: '150g of sugar') }

      it 'returns recipes which match either ingredient' do
        query = { ingredients: 'orange, sugar' }

        expect(subject.call(Recipe.all, query)).to match_array [recipe_1, recipe_2]
      end
    end
  end
end
