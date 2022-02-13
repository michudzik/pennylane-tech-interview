## Usage
# bundle exec rails runner script/seed_database.rb recipes.json
#
# Purpose
# Seed database with predefined data

require 'json'

def resolve_difficulty(difficulty)
  case difficulty
  when "très facile"
    :very_easy
  when "facile"
    :easy
  when "Niveau moyen"
    :medium
  when "difficile"
    :hard
  end
end

def resolve_budget(budget)
  case budget
  when "bon marché"
    :cheap
  when "Coût moyen"
    :reasonable
  when "assez cher"
    :expensive
  end
end

file_stream = File.open(ARGV[0])

while (line = file_stream.gets) do
  obj = JSON.parse(line)

  begin
    author = Author.find_or_create_by(username: obj['author'])
    image = obj['image'].present? ? Image.create!(url: obj['image']) : nil

    ingredients = obj['ingredients'].map do |ingredient|
      Ingredient.create!(name: ingredient)
    end

    tags = obj['tags'].map do |tag|
      Tag.find_or_create_by(name: tag)
    end

    recipe = Recipe.create!(
      name: obj['name'],
      rate: obj['rate'].to_i,
      tip: obj['author_tip'],
      quantity_of_people: obj['people_quantity'].to_i,
      author_id: author.id,
      image_id: image&.id,
      budget: resolve_budget(obj['budget']),
      difficulty: resolve_difficulty(obj['difficulty']),
      prep_time: obj['prep_time'],
      cook_time: obj['cook_time'],
      total_time: obj['total_time']
    )

    recipe.ingredients << ingredients
    recipe.tags << tags
    recipe.save!

    print '.'
  rescue StandardError => e
    puts "#{e} #{obj}"
  end
end

puts 'Done!'
