import "reflect-metadata";
import { datasource } from "./datasource/datasource";
import { buildSchema } from "type-graphql";
import { PicturesResolver } from "./resolvers/Pictures";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { TagsResolver } from "./resolvers/TagsResolver";
import { SeasonsResolver } from "./resolvers/SeasonsResolver";
import { IngredientTypesResolver } from "./resolvers/IngredientTypesResolver";
import { UnitsResolver } from "./resolvers/UnitsResolver";
import { IngredientsResolver } from "./resolvers/IngredientsResolver";
import { IngredientVariationResolver } from "./resolvers/IngredientsVariationResolver";
import { BrandResolver } from "./resolvers/BrandsResolver";
import { ShopResolver } from "./resolvers/ShopsResolver";
import { RecipesResolver } from "./resolvers/RecipesResolver";

async function initiliaze() {
  await datasource.initialize();
  console.log("Datasource is connected 🔌");

  const schema = await buildSchema({
    resolvers: [
      BrandResolver,
      IngredientsResolver,
      IngredientVariationResolver,
      IngredientTypesResolver,
      RecipesResolver,
      SeasonsResolver,
      ShopResolver,
      TagsResolver,
      UnitsResolver,
    ],
    validate: true
  })

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });
  console.log(`GraphQL server ready at ${url}`);


}

initiliaze();