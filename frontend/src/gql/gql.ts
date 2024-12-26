/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\nquery Ingredients {\n  ingredients {\n    id\n    name\n    image\n  }\n}\n": types.IngredientsDocument,
    "\nquery Recipe($recipeId: ID!) {\n  recipe(id: $recipeId) {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n": types.RecipeDocument,
    "\nquery Recipes {\n  recipes {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n": types.RecipesDocument,
    "\nquery Seasons {\n  seasons {\n    id\n    seasonName\n  }\n}\n": types.SeasonsDocument,
    "\nmutation CreateTag($data: TagCreateInput!) {\n  createTag(data: $data) {\n    id\n  }\n}\n": types.CreateTagDocument,
    "\nmutation DeleteTag($id: ID!) {\n  deleteTag(id: $id) {\n    id\n  }\n}\n": types.DeleteTagDocument,
    "\nquery QueryTag($tagId: ID!) { \n  tag(id: $tagId) {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n": types.QueryTagDocument,
    "\nquery Tags {\n  tags {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n": types.TagsDocument,
    "\nmutation UpdateTag($data: TagUpdateInput!, $id:ID!) {\n  updateTag(data: $data, id:$id) {\n    id\n  }\n}\n": types.UpdateTagDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Ingredients {\n  ingredients {\n    id\n    name\n    image\n  }\n}\n"): (typeof documents)["\nquery Ingredients {\n  ingredients {\n    id\n    name\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Recipe($recipeId: ID!) {\n  recipe(id: $recipeId) {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery Recipe($recipeId: ID!) {\n  recipe(id: $recipeId) {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Recipes {\n  recipes {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery Recipes {\n  recipes {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Seasons {\n  seasons {\n    id\n    seasonName\n  }\n}\n"): (typeof documents)["\nquery Seasons {\n  seasons {\n    id\n    seasonName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateTag($data: TagCreateInput!) {\n  createTag(data: $data) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateTag($data: TagCreateInput!) {\n  createTag(data: $data) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteTag($id: ID!) {\n  deleteTag(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteTag($id: ID!) {\n  deleteTag(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryTag($tagId: ID!) { \n  tag(id: $tagId) {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery QueryTag($tagId: ID!) { \n  tag(id: $tagId) {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Tags {\n  tags {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery Tags {\n  tags {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateTag($data: TagUpdateInput!, $id:ID!) {\n  updateTag(data: $data, id:$id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation UpdateTag($data: TagUpdateInput!, $id:ID!) {\n  updateTag(data: $data, id:$id) {\n    id\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;