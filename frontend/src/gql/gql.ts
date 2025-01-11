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
    "\nmutation CreateBrand($data: BrandCreateInput!) {\n  createBrand(data: $data) {\n    id\n    name\n    image\n  }\n}\n": types.CreateBrandDocument,
    "\nmutation DeleteBrand($id: ID!) {\n  deleteBrand(id: $id) {\n    id\n    name\n  }\n}\n": types.DeleteBrandDocument,
    "\nquery QueryBrand($brandId: ID!) { \n  brand(id: $brandId) {    \n    id\n    name\n    image\n  }\n}\n": types.QueryBrandDocument,
    "\nquery QueryBrands {\n  brands {\n    id\n    name\n    image   \n  }\n}\n": types.QueryBrandsDocument,
    "\nmutation UpdateBrand($data: BrandUpdateInput!, $id:ID!) {\n  updateBrand(data: $data, id:$id) {\n    id\n    name\n  }\n}\n": types.UpdateBrandDocument,
    "\nmutation CreateIngredient($data: IngredientCreateInput!) {\n  createIngredient(data: $data) {\n    id\n    name\n    type {\n      id\n      name\n      image\n      }\n  }\n}\n": types.CreateIngredientDocument,
    "\nmutation DeleteIngredient($id: ID!) {\n  deleteIngredient(id: $id) {\n    id\n    name\n  }\n}\n": types.DeleteIngredientDocument,
    "\nquery QueryIngredient($ingredientId: ID!) { \n  ingredient(id: $ingredientId) {    \n    id\n    name\n    image\n    hasIngredient\n    type {\n      id\n      name\n      image\n    }\n    variations {\n      id\n      name\n      image\n      hasIngredient\n      brand {\n        id\n        name\n        image\n      }\n      shops {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n": types.QueryIngredientDocument,
    "\nquery QueryIngredients {\n  ingredients {\n    id\n    name\n    image\n    hasIngredient\n    type {\n      id\n      name\n      image\n    }\n    variations {\n      id\n      name\n      image\n      hasIngredient\n      brand {\n        id\n        name\n        image\n      }\n      shops {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n": types.QueryIngredientsDocument,
    "\nmutation UpdateIngredient($data: IngredientUpdateInput!, $id:ID!) {\n  updateIngredient(data: $data, id:$id) {\n    id\n    name\n    type {\n      id\n      name\n      image\n      }\n  }\n}\n": types.UpdateIngredientDocument,
    "\nmutation CreateIngredientType($data: IngredientTypeCreateInput!) {\n  createIngredientType(data: $data) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n": types.CreateIngredientTypeDocument,
    "\nmutation DeleteIngredientType($id: ID!) {\n  deleteIngredientType(id: $id) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n": types.DeleteIngredientTypeDocument,
    "\nquery QueryIngredientType($ingredientTypeId: ID!) { \n  ingredientType(id: $ingredientTypeId) {    \n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n": types.QueryIngredientTypeDocument,
    "\nquery QueryIngredientTypes {\n  ingredientTypes {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n": types.QueryIngredientTypesDocument,
    "\nmutation UpdateIngredientType($data: IngredientTypeUpdateInput!, $id:ID!) {\n  updateIngredientType(data: $data, id:$id) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n": types.UpdateIngredientTypeDocument,
    "\nmutation DeleteIngredientVariation($id: ID!) {\n  deleteIngredientVariation(id: $id) {\n    id\n  }\n}\n": types.DeleteIngredientVariationDocument,
    "\nquery QueryIngredientVariation($ingredientVariationId: ID!) { \n  ingredientVariation(id: $ingredientVariationId) {    \n    id\n    name\n    image\n  }\n}\n": types.QueryIngredientVariationDocument,
    "\nquery QueryIngredientVariations {\n  ingredientVariations {\n    id\n    name\n    image\n  }\n}\n": types.QueryIngredientVariationsDocument,
    "\nmutation UpdateIngredientVariation($data: IngredientVariationUpdateInput!, $id:ID!) {\n  updateIngredientVariation(data: $data, id:$id) {\n    id\n  }\n}\n": types.UpdateIngredientVariationDocument,
    "\nmutation CreateRecipe($data: RecipeCreateInput!) {\n  createRecipe(data: $data) {\n    id\n  }\n}\n": types.CreateRecipeDocument,
    "\nmutation DeleteRecipe($id: ID!) {\n  deleteRecipe(id: $id) {\n    id\n  }\n}\n": types.DeleteRecipeDocument,
    "\nquery Recipe($recipeId: ID!) {\n  recipe(id: $recipeId) {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n": types.RecipeDocument,
    "\nquery Recipes {\n  recipes {\n    id\n    name\n    image\n    cookTime\n    preparation\n    recipeType\n    isAlcoholicDrink\n    season {\n      id\n      seasonName\n    }\n    ingredients {\n      id\n      name\n      image\n      variations {\n        id\n        name\n        image\n        hasIngredient\n        brand {\n          id\n          name\n          image\n        }\n        shops {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n}\n": types.RecipesDocument,
    "\nmutation UpdateRecipe($data: RecipeUpdateInput!, $id:ID!) {\n  updateRecipe(data: $data, id:$id) {\n    id\n  }\n}\n": types.UpdateRecipeDocument,
    "\nmutation CreateSeason($data: SeasonCreateInput!) {\n  createSeason(data: $data) {\n    id\n  }\n}\n": types.CreateSeasonDocument,
    "\nmutation DeleteSeason($id: ID!) {\n  deleteSeason(id: $id) {\n    id\n  }\n}\n": types.DeleteSeasonDocument,
    "\nquery Season($seasonId: ID!) {\n  season(id: $seasonId) {\n    id\n    seasonName\n  }\n}\n": types.SeasonDocument,
    "\nquery Seasons {\n  seasons {\n    id\n    seasonName\n  }\n}\n": types.SeasonsDocument,
    "\nmutation UpdateSeason($data: SeasonUpdateInput!, $id:ID!) {\n  updateSeason(data: $data, id:$id) {\n    id\n  }\n}\n": types.UpdateSeasonDocument,
    "\nmutation DeleteShop($id: ID!) {\n  deleteShop(id: $id) {\n    id\n  }\n}\n": types.DeleteShopDocument,
    "\nquery Shop($shopId: ID!) {\n  shop(id: $shopId) {\n    id\n    name\n    image\n  }\n}\n": types.ShopDocument,
    "\nquery Shops {\n  shops {\n    id\n    name\n    image\n  }\n}\n": types.ShopsDocument,
    "\nmutation UpdateShop($data: ShopUpdateInput!, $updateShopId: ID!) {\n  updateShop(data: $data, id: $updateShopId) {\n    id\n  }\n}\n": types.UpdateShopDocument,
    "\nmutation CreateTag($data: TagCreateInput!) {\n  createTag(data: $data) {\n    id\n  }\n}\n": types.CreateTagDocument,
    "\nmutation DeleteTag($id: ID!) {\n  deleteTag(id: $id) {\n    id\n  }\n}\n": types.DeleteTagDocument,
    "\nquery QueryTag($tagId: ID!) { \n  tag(id: $tagId) {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n": types.QueryTagDocument,
    "\nquery Tags {\n  tags {\n    id\n    name\n    recipes {\n      id\n      name\n      preparation\n      cookTime\n      image\n      recipeType\n      season {\n        id\n        seasonName\n      }\n      variations {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n": types.TagsDocument,
    "\nmutation UpdateTag($data: TagUpdateInput!, $id:ID!) {\n  updateTag(data: $data, id:$id) {\n    id\n  }\n}\n": types.UpdateTagDocument,
    "\nmutation CreateUnit($data: UnitCreateInput!) {\n  createUnit(data: $data) {\n    id\n  }\n}\n": types.CreateUnitDocument,
    "\nmutation DeleteUnit($id: ID!) {\n  deleteUnit(id: $id) {\n    id\n  }\n}\n": types.DeleteUnitDocument,
    "\nquery Unit($unitId: ID!) {\n  unit(id: $unitId) {\n    id\n    name\n    abbreviation\n  }\n}\n": types.UnitDocument,
    "\nquery Units {\n  units {\n    id\n    name\n    abbreviation\n  }\n}\n": types.UnitsDocument,
    "\nmutation UpdateUnit($data: UnitUpdateInput!, $updateUnitId: ID!) {\n  updateUnit(data: $data, id: $updateUnitId) {\n    id\n  \n  }\n}\n": types.UpdateUnitDocument,
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
export function gql(source: "\nmutation CreateBrand($data: BrandCreateInput!) {\n  createBrand(data: $data) {\n    id\n    name\n    image\n  }\n}\n"): (typeof documents)["\nmutation CreateBrand($data: BrandCreateInput!) {\n  createBrand(data: $data) {\n    id\n    name\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteBrand($id: ID!) {\n  deleteBrand(id: $id) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nmutation DeleteBrand($id: ID!) {\n  deleteBrand(id: $id) {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryBrand($brandId: ID!) { \n  brand(id: $brandId) {    \n    id\n    name\n    image\n  }\n}\n"): (typeof documents)["\nquery QueryBrand($brandId: ID!) { \n  brand(id: $brandId) {    \n    id\n    name\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryBrands {\n  brands {\n    id\n    name\n    image   \n  }\n}\n"): (typeof documents)["\nquery QueryBrands {\n  brands {\n    id\n    name\n    image   \n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateBrand($data: BrandUpdateInput!, $id:ID!) {\n  updateBrand(data: $data, id:$id) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nmutation UpdateBrand($data: BrandUpdateInput!, $id:ID!) {\n  updateBrand(data: $data, id:$id) {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateIngredient($data: IngredientCreateInput!) {\n  createIngredient(data: $data) {\n    id\n    name\n    type {\n      id\n      name\n      image\n      }\n  }\n}\n"): (typeof documents)["\nmutation CreateIngredient($data: IngredientCreateInput!) {\n  createIngredient(data: $data) {\n    id\n    name\n    type {\n      id\n      name\n      image\n      }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteIngredient($id: ID!) {\n  deleteIngredient(id: $id) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nmutation DeleteIngredient($id: ID!) {\n  deleteIngredient(id: $id) {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryIngredient($ingredientId: ID!) { \n  ingredient(id: $ingredientId) {    \n    id\n    name\n    image\n    hasIngredient\n    type {\n      id\n      name\n      image\n    }\n    variations {\n      id\n      name\n      image\n      hasIngredient\n      brand {\n        id\n        name\n        image\n      }\n      shops {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery QueryIngredient($ingredientId: ID!) { \n  ingredient(id: $ingredientId) {    \n    id\n    name\n    image\n    hasIngredient\n    type {\n      id\n      name\n      image\n    }\n    variations {\n      id\n      name\n      image\n      hasIngredient\n      brand {\n        id\n        name\n        image\n      }\n      shops {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryIngredients {\n  ingredients {\n    id\n    name\n    image\n    hasIngredient\n    type {\n      id\n      name\n      image\n    }\n    variations {\n      id\n      name\n      image\n      hasIngredient\n      brand {\n        id\n        name\n        image\n      }\n      shops {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery QueryIngredients {\n  ingredients {\n    id\n    name\n    image\n    hasIngredient\n    type {\n      id\n      name\n      image\n    }\n    variations {\n      id\n      name\n      image\n      hasIngredient\n      brand {\n        id\n        name\n        image\n      }\n      shops {\n        id\n        name\n        image\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateIngredient($data: IngredientUpdateInput!, $id:ID!) {\n  updateIngredient(data: $data, id:$id) {\n    id\n    name\n    type {\n      id\n      name\n      image\n      }\n  }\n}\n"): (typeof documents)["\nmutation UpdateIngredient($data: IngredientUpdateInput!, $id:ID!) {\n  updateIngredient(data: $data, id:$id) {\n    id\n    name\n    type {\n      id\n      name\n      image\n      }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateIngredientType($data: IngredientTypeCreateInput!) {\n  createIngredientType(data: $data) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"): (typeof documents)["\nmutation CreateIngredientType($data: IngredientTypeCreateInput!) {\n  createIngredientType(data: $data) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteIngredientType($id: ID!) {\n  deleteIngredientType(id: $id) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"): (typeof documents)["\nmutation DeleteIngredientType($id: ID!) {\n  deleteIngredientType(id: $id) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryIngredientType($ingredientTypeId: ID!) { \n  ingredientType(id: $ingredientTypeId) {    \n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"): (typeof documents)["\nquery QueryIngredientType($ingredientTypeId: ID!) { \n  ingredientType(id: $ingredientTypeId) {    \n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryIngredientTypes {\n  ingredientTypes {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"): (typeof documents)["\nquery QueryIngredientTypes {\n  ingredientTypes {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateIngredientType($data: IngredientTypeUpdateInput!, $id:ID!) {\n  updateIngredientType(data: $data, id:$id) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"): (typeof documents)["\nmutation UpdateIngredientType($data: IngredientTypeUpdateInput!, $id:ID!) {\n  updateIngredientType(data: $data, id:$id) {\n    id\n    name\n    image\n    shops {\n      id\n      name\n      image\n    }\n    brand {\n      id\n      name\n      image\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteIngredientVariation($id: ID!) {\n  deleteIngredientVariation(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteIngredientVariation($id: ID!) {\n  deleteIngredientVariation(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryIngredientVariation($ingredientVariationId: ID!) { \n  ingredientVariation(id: $ingredientVariationId) {    \n    id\n    name\n    image\n  }\n}\n"): (typeof documents)["\nquery QueryIngredientVariation($ingredientVariationId: ID!) { \n  ingredientVariation(id: $ingredientVariationId) {    \n    id\n    name\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryIngredientVariations {\n  ingredientVariations {\n    id\n    name\n    image\n  }\n}\n"): (typeof documents)["\nquery QueryIngredientVariations {\n  ingredientVariations {\n    id\n    name\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateIngredientVariation($data: IngredientVariationUpdateInput!, $id:ID!) {\n  updateIngredientVariation(data: $data, id:$id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation UpdateIngredientVariation($data: IngredientVariationUpdateInput!, $id:ID!) {\n  updateIngredientVariation(data: $data, id:$id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateRecipe($data: RecipeCreateInput!) {\n  createRecipe(data: $data) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateRecipe($data: RecipeCreateInput!) {\n  createRecipe(data: $data) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteRecipe($id: ID!) {\n  deleteRecipe(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteRecipe($id: ID!) {\n  deleteRecipe(id: $id) {\n    id\n  }\n}\n"];
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
export function gql(source: "\nmutation UpdateRecipe($data: RecipeUpdateInput!, $id:ID!) {\n  updateRecipe(data: $data, id:$id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation UpdateRecipe($data: RecipeUpdateInput!, $id:ID!) {\n  updateRecipe(data: $data, id:$id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateSeason($data: SeasonCreateInput!) {\n  createSeason(data: $data) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateSeason($data: SeasonCreateInput!) {\n  createSeason(data: $data) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteSeason($id: ID!) {\n  deleteSeason(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteSeason($id: ID!) {\n  deleteSeason(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Season($seasonId: ID!) {\n  season(id: $seasonId) {\n    id\n    seasonName\n  }\n}\n"): (typeof documents)["\nquery Season($seasonId: ID!) {\n  season(id: $seasonId) {\n    id\n    seasonName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Seasons {\n  seasons {\n    id\n    seasonName\n  }\n}\n"): (typeof documents)["\nquery Seasons {\n  seasons {\n    id\n    seasonName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateSeason($data: SeasonUpdateInput!, $id:ID!) {\n  updateSeason(data: $data, id:$id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation UpdateSeason($data: SeasonUpdateInput!, $id:ID!) {\n  updateSeason(data: $data, id:$id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteShop($id: ID!) {\n  deleteShop(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteShop($id: ID!) {\n  deleteShop(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Shop($shopId: ID!) {\n  shop(id: $shopId) {\n    id\n    name\n    image\n  }\n}\n"): (typeof documents)["\nquery Shop($shopId: ID!) {\n  shop(id: $shopId) {\n    id\n    name\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Shops {\n  shops {\n    id\n    name\n    image\n  }\n}\n"): (typeof documents)["\nquery Shops {\n  shops {\n    id\n    name\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateShop($data: ShopUpdateInput!, $updateShopId: ID!) {\n  updateShop(data: $data, id: $updateShopId) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation UpdateShop($data: ShopUpdateInput!, $updateShopId: ID!) {\n  updateShop(data: $data, id: $updateShopId) {\n    id\n  }\n}\n"];
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
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateUnit($data: UnitCreateInput!) {\n  createUnit(data: $data) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateUnit($data: UnitCreateInput!) {\n  createUnit(data: $data) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteUnit($id: ID!) {\n  deleteUnit(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteUnit($id: ID!) {\n  deleteUnit(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Unit($unitId: ID!) {\n  unit(id: $unitId) {\n    id\n    name\n    abbreviation\n  }\n}\n"): (typeof documents)["\nquery Unit($unitId: ID!) {\n  unit(id: $unitId) {\n    id\n    name\n    abbreviation\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Units {\n  units {\n    id\n    name\n    abbreviation\n  }\n}\n"): (typeof documents)["\nquery Units {\n  units {\n    id\n    name\n    abbreviation\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateUnit($data: UnitUpdateInput!, $updateUnitId: ID!) {\n  updateUnit(data: $data, id: $updateUnitId) {\n    id\n  \n  }\n}\n"): (typeof documents)["\nmutation UpdateUnit($data: UnitUpdateInput!, $updateUnitId: ID!) {\n  updateUnit(data: $data, id: $updateUnitId) {\n    id\n  \n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;