import { useParams } from "react-router-dom";
import { queryRecipe } from "../api/QueryRecipe";
import { useQuery } from "@apollo/client";

const Recipe = () => {
  const { id } = useParams();
  // --------------------------------QUERY--------------------------------

  const { data: recipeDataFromQuery } = useQuery(queryRecipe, {
    variables: { recipeId: id },
  });
  const recipe = recipeDataFromQuery?.recipe || [];

  return <div className=" bg-gray-600 p-4">Recette : {recipe.name}</div>;
};

export default Recipe;
