module Api
  class RecipesController < BaseController
    def index
      render :index, locals: { recipes: recipe_presenter.call(scope) }
    end

    private

    def recipe_presenter
      RecipePresenter.new
    end

    def scope
      ::Recipe.includes(:tags, :author, :image, :ingredients).all
    end
  end
end
