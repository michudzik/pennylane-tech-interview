source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.0"

gem "rails", "~> 7.0.2"
gem "sprockets-rails"
gem "pagy", "~> 5.10"
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem 'jb'
gem "jsbundling-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "redis", "~> 4.0"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

gem "bootsnap", require: false

group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem 'rspec-rails', '~> 5.0.0'
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "factory_bot"
  gem "selenium-webdriver"
  gem "webdrivers"
end
