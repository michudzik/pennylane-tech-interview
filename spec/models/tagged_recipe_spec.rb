require 'rails_helper'

RSpec.describe TaggedRecipe, type: :model do
  describe 'columns' do
    it 'defines expected columns' do
      expect(subject.attributes.keys).to match_array(['id', 'recipe_id', 'tag_id'])
    end
  end
end
