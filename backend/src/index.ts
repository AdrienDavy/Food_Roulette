import "reflect-metadata";
import { datasource } from "./datasource/datasource";
import { buildSchema } from "type-graphql";
import { PicturesResolver } from "./resolvers/Pictures";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { TagsResolver } from "./resolvers/Tags";
import { SeasonsResolver } from "./resolvers/SeasonsResolver";
import { IngredientTypesResolver } from "./resolvers/IngredientTypesResolver";
import { UnitsResolver } from "./resolvers/UnitsResolver";
import { IngredientsResolver } from "./resolvers/IngredientsResolver";

async function initiliaze() {
  await datasource.initialize();
  console.log("Datasource is connected 🔌");

  const schema = await buildSchema({
    resolvers: [SeasonsResolver, IngredientTypesResolver, UnitsResolver, IngredientsResolver],
    validate: true
  })

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });
  console.log(`GraphQL server ready at ${url}`);


}

initiliaze();