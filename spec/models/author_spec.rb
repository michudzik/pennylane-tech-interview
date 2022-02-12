require 'rails_helper'

RSpec.describe Author, type: :model do
  describe 'columns' do
    it 'defines expected columns' do
      expect(subject.attributes.keys).to match_array(['id', 'username', 'created_at', 'updated_at'])
    end
  end
end
