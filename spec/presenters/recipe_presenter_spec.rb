require 'rails_helper'

RSpec.describe RecipePresenter do
  describe '#call' do
    let(:author) { instance_double('Author', :author, id: 'test-author-id', username: 'test-author-username') }
    let(:tag) do
      instance_double(
        'Tag',
        :tag,
        attributes: {
          'id' => 'test-tag-id',
          'name' => 'test-tag-name',
          'created_at' => 'test-created-at',
          'updated_at' => 'test-updated-at'
        }
      )
    end
    let(:ingredient) do
      instance_double(
        'Ingredient',
        :ingredient,
        attributes: {
          'id' => 'test-ingredient-id',
          'name' => 'test-ingredient-name',
          'created_at' => 'test-created-at',
          'updated_at' => 'test-updated-at'
        }
      )
    end
    let(:image) { nil }
    let(:recipe) do
      instance_double(
        'Recipe',
        :recipe,
        attributes: {
          'created_at' => 'test-created-at',
          'updated_at' => 'test-updated-at',
          'author_id' => 'test-author-id',
          'image_id' => 'test-image-id',
          'sample_attr' => 'test-sample-attr'
          },
        tags: [tag],
        author: author,
        ingredients: [ingredient],
        image: image
      )
    end

    describe 'root object' do
      it 'returns recipe object with every unnecessary attribute omitted' do
        expect(subject.call([recipe]).first.except('tags', 'ingredients', 'author', 'image')).to eq(
          'sample_attr' => 'test-sample-attr'
        )
      end
    end

    describe 'author object' do
      it 'returns author id and username' do
        expect(subject.call([recipe]).first['author']).to eq('id' => 'test-author-id', 'username' => 'test-author-username')
      end
    end

    describe 'tag object' do
      it 'returns tag id and name' do
        expect(subject.call([recipe]).first['tags'].first).to eq('id' => 'test-tag-id', 'name' => 'test-tag-name')
      end
    end

    describe 'ingredient object' do
      it 'returns author id and username' do
        expect(subject.call([recipe]).first['ingredients'].first).to eq('id' => 'test-ingredient-id', 'name' => 'test-ingredient-name')
      end
    end

    describe 'image object' do
      context 'when recipe has an image' do
        let(:image) { instance_double('Image', :image, url: 'test-url') }

        it 'returns image object' do
          expect(subject.call([recipe]).first['image']).to eq('url' => 'test-url')
        end
      end

      context 'when recipe does not have an image' do
        it 'returns an empty object' do
          expect(subject.call([recipe]).first['image']).to eq({})
        end
      end
    end
  end
end
