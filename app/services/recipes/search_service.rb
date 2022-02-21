class Recipes::SearchService
  def initialize(sanitizer = ActiveRecord::Base)
    @sanitizer = sanitizer
  end

  def call(scope, query)
    @scope = scope

    @scope
      .merge(query_through_ingredients(query))
  end

  private

  attr_reader :sanitizer

  def query_through_ingredients(query)
    return @scope if query[:ingredients].blank?

    ids = @scope
      .joins('RIGHT OUTER JOIN ingredients ON recipes.id = ingredients.recipe_id')
      .where("to_tsvector('french', ingredients.name) @@ to_tsquery(:query)", query: query_string(query[:ingredients]))
      .order(
        sanitizer.sanitize_sql_for_order(
          [
            Arel.sql("ts_rank_cd(to_tsvector('french', ingredients.name), to_tsquery(?)) ASC"),
            query_string(query[:ingredients])
          ]
        )
      ).ids
    @scope.klass.where(id: ids)
  end

  def query_string(text)
    text
      .split(',')
      .map(&:strip)
      .map do |element|
        next element unless element.match?(/\s+/)

        "'#{element}'"
      end
      .join(' | ')
  end
end
