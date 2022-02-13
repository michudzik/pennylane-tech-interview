require 'rails_helper'

RSpec.describe Recipe, type: :model do
  describe 'columns' do
    it 'defines expected columns' do
      expect(subject.attributes.keys).to match_array(
        [
          'id',
          'author_id',
          'image_id',
          'prep_time',
          'cook_time',
          'total_time',
          'budget',
          'difficulty',
          'quantity_of_people',
          'rate',
          'name',
          'tip',
          'created_at',
          'updated_at'
        ]
      )
    end
  end

  describe 'enums' do
    it 'defines difficulty enum' do
      expect(described_class.difficulties).to eq(
        "very_easy" => 0,
        "easy" => 1,
        "medium" => 2,
        "hard" => 3
      )
    end

    it 'defines budget enum' do
      expect(described_class.budgets).to eq(
        "cheap" => 0,
        "reasonable" => 1,
        "expensive" => 2
      )
    end
  end
end
