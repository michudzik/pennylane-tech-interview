require 'rails_helper'

RSpec.describe Api::RecipesController, type: :request do
  describe '/api/recipes' do
    subject { get '/api/recipes' }

    it 'returns 200' do
      subject
      expect(response).to have_http_status :ok
    end
  end
end
