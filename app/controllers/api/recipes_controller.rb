module Api
  class RecipesController < BaseController
    def index
      recipe_scope = filter_service.call(scope, permitted_params)
      recipe_scope = search_service.call(recipe_scope, permitted_params)

      pagy, records = pagy(recipe_scope.includes(:tags, :author, :image, :ingredients))

      render :index, locals: { recipes: recipe_presenter.call(records), pagination: pagy }
    end

    private

    def recipe_presenter
      RecipePresenter.new
    end

    def scope
      ::Recipe.all
    end

    def filter_service
      ::Recipes::FilterService.new
    end

    def search_service
      ::Recipes::SearchService.new
    end

    def permitted_params
      params.permit(:ingredients, :difficulty, budget: [])
    end
  end
end
