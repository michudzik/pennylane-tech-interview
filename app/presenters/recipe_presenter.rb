class RecipePresenter
  def call(recipes)
    recipes.map do |recipe|
      recipe
        .attributes
        .except('created_at', 'updated_at', 'author_id', 'image_id')
        .merge(associations(recipe))
    end
  end

  private

  def associations(recipe)
    {
      'tags' => format_tags(recipe),
      'ingredients' => format_ingredients(recipe),
      'author' => format_author(recipe),
      'image' => recipe.image.present? ? format_image(recipe) : {}
    }
  end

  def format_image(recipe)
    {
      'url' => recipe.image.url
    }
  end

  def format_author(recipe)
    {
      'id' => recipe.author.id,
      'username' => recipe.author.username,
    }
  end

  def format_tags(recipe)
    recipe.tags.map do |tag|
      tag.attributes.except('created_at', 'updated_at')
    end
  end

  def format_ingredients(recipe)
    recipe.ingredients.map do |ingredient|
      ingredient.attributes.except('created_at', 'updated_at')
    end
  end
end
