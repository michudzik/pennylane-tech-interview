import Tag from "./tag";
import Ingredient from "./ingredient";
import Author from "./author";
import Image from "./image";

type Recipe = {
  name: string;
  tip: string;
  difficulty: string;
  budget: string;
  rate: number;
  quantity_of_people: number;
  prep_time: string;
  cook_time: string;
  total_time: string;
  image?: Image;
  author: Author;
  tags: Tag[];
  ingredients: Ingredient[];
};

export default Recipe;
