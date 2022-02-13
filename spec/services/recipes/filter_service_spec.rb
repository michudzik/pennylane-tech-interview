require 'rails_helper'

RSpec.describe Recipes::FilterService do
  describe '#call' do
    context 'when filter params are not passed in' do
      let!(:recipe) { create(:recipe) }

      it 'returns the initial scope' do
        expect(subject.call(Recipe.all, {})).to match_array [recipe]
      end
    end

    context 'when scope is filtered by budget' do
      let!(:expensive_recipe) { create(:recipe, budget: 'expensive') }
      let!(:cheap_recipe) { create(:recipe, budget: 'cheap') }

      context 'when only one budget type is requested' do
        it 'returns the only matching recipes' do
          query = { budget: ['cheap'] }

          expect(subject.call(Recipe.all, query)).to match_array [cheap_recipe]
        end
      end

      context 'when more than one budget type is requested' do
        it 'returns the all matching recipes' do
          query = { budget: ['cheap', 'expensive'] }

          expect(subject.call(Recipe.all, {})).to match_array [cheap_recipe, expensive_recipe]
        end
      end
    end
  end
end
