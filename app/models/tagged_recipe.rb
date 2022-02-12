class TaggedRecipe < ApplicationRecord
  belongs_to :tag
  belongs_to :recipe
end
