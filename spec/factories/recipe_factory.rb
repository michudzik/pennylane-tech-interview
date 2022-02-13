FactoryBot.define do
  factory :recipe do
    name { 'test-name' }
    tip { 'test-tip' }
    quantity_of_people { 2 }
    rate { 5 }
    prep_time { '15min' }
    cook_time { '15min' }
    total_time { '30min' }
    budget { 'cheap' }
    difficulty { 'very_easy' }

    author
  end
end
