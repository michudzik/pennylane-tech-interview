class Recipes::SearchService
  def call(scope, query)
    @scope = scope

    @scope
      .merge(query_through_ingredients(query))
  end

  private

  def query_through_ingredients(query)
    return @scope if query[:ingredients].blank?

    @scope
      .joins(:ingredients)
      .where("ingredients.name SIMILAR TO '%(#{query_string(query[:ingredients])})%'")
  end

  def query_string(text)
    text
      .split(',')
      .map(&:strip)
      .join('|')
  end
end
