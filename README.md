## Setup
### Requirements
- Ruby 3
- Node.js 14.15
- PostgreSQL

### Procedure
```
$ bundle install
$ yarn install
$ bundle exec rails db:create db:migrate
$ wget https://d1sf7nqdl8wqk.cloudfront.net/recipes.json.gz && gzip -dc recipes.json.gz > recipes.json
$ bundle exec rails runner script/seed_database.rb recipes.json
```

## Tests
RSpec has been chosen as the default test engine

```
$ bundle exec rspec
```

## Running the application
Given that the app got created with Rails 7 and the frontend runs on React, it has to be started like this

```
$ bundle exec ./bin/dev
```

_If that does not work, please `gem install foreman` or `./bin/dev` without the `bundle exec` prefix, as it is highly probable that you already have foreman installed, but is not included in the gemset_

## Deployment

Heroku has been configured to automatically deploy the `main` branch on
merge.
