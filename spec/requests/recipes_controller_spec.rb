require 'rails_helper'

RSpec.describe Api::RecipesController, type: :request do
  describe '/api/recipes' do
    let(:filter_service) { instance_double('Recipes::FilterService', :filter_service) }

    it 'returns 200' do
      get '/api/recipes'
      expect(response).to have_http_status :ok
    end

    context 'filters' do
      it 'invokes a filtering service' do
        allow(Recipes::FilterService).to receive(:new).and_return(filter_service)

        expect(filter_service).to receive(:call).with([], {}).and_return([])

        get '/api/recipes'
      end

      it 'passes down the query params' do
        allow(Recipes::FilterService).to receive(:new).and_return(filter_service)

        expect(filter_service).to receive(:call).with([], { 'budget' => ['expensive'] }).and_return([])

        get '/api/recipes?budget[]=expensive'
      end
    end
  end
end
