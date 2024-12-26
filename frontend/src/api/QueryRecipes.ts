import { gql } from "../gql";


export const queryRecipes = gql(`
query Recipes {
  recipes {
    id
    name
    image
    cookTime
    preparation
    recipeType
    isAlcoholicDrink
    season {
      id
      seasonName
    }
    ingredients {
      id
      name
      image
      variations {
        id
        name
        image
        hasIngredient
        brand {
          id
          name
          image
        }
        shops {
          id
          name
          image
        }
      }
    }
  }
}
`);
