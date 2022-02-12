## Usage
# bundle exec rails runner extract_unique_data recipes.json
#
# Purpose
# Extract values from difficulty & budget fields, so that one can assess whether it
# can be made into an enum
#

require 'json'

file_stream = File.open(ARGV[0])

budget_values = []
difficulty_levels = []

file_stream.readlines.each do |obj|
  recipe = JSON.parse(obj)

  budget_values << recipe["budget"]
  difficulty_levels << recipe["difficulty"]
end

puts "Possible budget values: #{budget_values.uniq.inspect}"
puts "Possible difficulty level: #{difficulty_levels.uniq.inspect}"
