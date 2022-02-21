require 'rails_helper'

RSpec.describe Recipes::SearchService do
  describe '#call' do
    context 'when search string is not provided' do
      let!(:recipe) { create(:recipe) }

      it 'returns the initial scope' do
        expect(subject.call(Recipe.all, {})).to match_array [recipe]
      end
    end

    describe 'text matching' do
      context 'when search string does not match any of the recipes' do
        let!(:recipe_1) { create(:recipe) }
        let!(:recipe_2) { create(:recipe) }

        let!(:ingredient_1) { create(:ingredient, recipe_id: recipe_1.id, name: '150g of banana') }
        let!(:ingredient_2) { create(:ingredient, recipe_id: recipe_2.id, name: '150g of sugar') }

        it 'does not return any recipe' do
          query = { ingredients: 'orange' }

          expect(subject.call(Recipe.all, query)).to eq []
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

      context 'it allows to search by multi-word ingredients' do
        let!(:recipe) { create(:recipe) }

        let!(:ingredient_1) { create(:ingredient, recipe_id: recipe.id, name: '1/2 orange') }

        it 'returns recipes which match either ingredient' do
          query = { ingredients: '1/2 orange' }

          expect(subject.call(Recipe.all, query)).to match_array [recipe]
        end

        it 'does not throw an error' do
          query = { ingredients: '1/2 orange' }

          expect { subject.call(Recipe.all, query) }.not_to raise_error
        end
      end
    end

    describe 'order' do
      let!(:recipe_1) { create(:recipe) }
      let!(:recipe_2) { create(:recipe) }

      let!(:ingredient_1) { create(:ingredient, recipe_id: recipe_1.id, name: '150g of orange') }
      let!(:ingredient_2) { create(:ingredient, recipe_id: recipe_1.id, name: '150g of sugar') }
      let!(:ingredient_3) { create(:ingredient, recipe_id: recipe_2.id, name: '150g of sugar') }
      let!(:ingredient_4) { create(:ingredient, recipe_id: recipe_2.id, name: '150g of banana') }

      it 'returns the most relevant recipe first' do
        query = { ingredients: 'sugar, banana' }

        expect(subject.call(Recipe.all, query)).to match_array [recipe_2, recipe_1]
      end
    end
  end
end
