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

## Deliverables
### Repository
https://github.com/michudzik/fictional-tribble

### User stories
- As a user, I would like to be able to see all of the recipes, so that I can search for those, which interest me.
- As a user, I would like to be able to choose recipes based on my budget, so that I look only at those, which are affordable for me.
- As a user, I would like to be able to search through recipes by providing a list of ingredients which I have in my home.
- As a user, I would like to be able to filter recipes by the difficulty level, so that I can feel comfortable, while preparing food.
https://github.com/michudzik/fictional-tribble/pull/11

### Database structure
Database's structure alongside some of the decisions, which I've taken is described here: https://github.com/michudzik/fictional-tribble/pull/9

### Application
Hosted on Heroku: https://shielded-wave-40691.herokuapp.com/
Manual for setup up on local environment: https://github.com/michudzik/fictional-tribble/blob/main/README.md
