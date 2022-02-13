class Recipes::FilterService
  def call(scope, query)
    @scope = scope

    @scope
      .merge(budget_scope(query))
  end

  private

  def budget_scope(query)
    return @scope if query[:budget].blank?

    @scope.where(budget: query[:budget])
  end
end
