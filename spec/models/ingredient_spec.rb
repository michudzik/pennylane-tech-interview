require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  describe 'columns' do
    it 'defines expected columns' do
      expect(subject.attributes.keys).to match_array(['id', 'name', 'recipe_id', 'created_at', 'updated_at'])
    end
  end
end
