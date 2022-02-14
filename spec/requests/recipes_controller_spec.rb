require 'rails_helper'

RSpec.describe Api::RecipesController, type: :request do
  describe '/api/recipes' do
    let(:filter_service) { instance_double('Recipes::FilterService', :filter_service) }
    let(:search_service) { instance_double('Recipes::SearchService', :search_service) }

    before do
      allow_any_instance_of(described_class).to receive(:pagy).and_return([{}, []])
      allow(Recipes::FilterService).to receive(:new).and_return(filter_service)
      allow(Recipes::SearchService).to receive(:new).and_return(search_service)
      allow(filter_service).to receive(:call).and_return([])
      allow(search_service).to receive(:call).and_return([])
    end

    it 'returns 200' do
      get '/api/recipes'
      expect(response).to have_http_status :ok
    end

    context 'filters' do
      it 'invokes a filtering service' do
        expect(filter_service).to receive(:call).with([], {}).and_return([])

        get '/api/recipes'
      end

      it 'passes down the query params' do
        expect(filter_service).to receive(:call).with([], { 'budget' => ['expensive'] }).and_return([])

        get '/api/recipes?budget[]=expensive'
      end
    end

    context 'search' do
      it 'invokes a search service' do
        expect(search_service).to receive(:call).with([], {}).and_return([])

        get '/api/recipes'
      end

      it 'passes down the search query' do
        expect(search_service).to receive(:call).with([], { 'ingredients' => 'test,test' }).and_return([])

        get '/api/recipes?ingredients=test,test'
      end
    end
  end
end
