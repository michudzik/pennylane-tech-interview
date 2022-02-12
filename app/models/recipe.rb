class Recipe < ApplicationRecord
  belongs_to :author
  belongs_to :image, optional: true

  has_many :tagged_recipes
  has_many :tags, through: :tagged_recipes
  has_many :ingredients

  enum :difficulty, { very_easy: 0, easy: 1, medium: 2, hard: 3 }
  enum :budget, { cheap: 0, reasonable: 1, expensive: 2 }
end
