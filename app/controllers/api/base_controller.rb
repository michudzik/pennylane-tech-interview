module Api
  class BaseController < ActionController::API
    include Pagy::Backend
  end
end
