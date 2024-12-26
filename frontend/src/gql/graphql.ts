/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredientTypes?: Maybe<Array<IngredientType>>;
  ingredientVariations?: Maybe<Array<IngredientVariation>>;
  name: Scalars['String']['output'];
};

export type BrandCreateInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientVariationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
};

export type BrandUpdateInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientVariationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IdInput = {
  id: Scalars['ID']['input'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  hasIngredient?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  season?: Maybe<Season>;
  shops?: Maybe<Array<Shop>>;
  type?: Maybe<IngredientType>;
  variations?: Maybe<Array<IngredientVariation>>;
};

export type IngredientCreateInput = {
  hasIngredient?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  seasonId?: InputMaybe<Scalars['ID']['input']>;
  shopIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  typeId?: InputMaybe<Scalars['ID']['input']>;
};

export type IngredientType = {
  __typename?: 'IngredientType';
  brand?: Maybe<Brand>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Array<Ingredient>>;
  name: Scalars['String']['output'];
  shops?: Maybe<Array<Shop>>;
};

export type IngredientTypeCreateInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type IngredientTypeUpdateInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IngredientUpdateInput = {
  hasIngredient?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seasonId?: InputMaybe<Scalars['ID']['input']>;
  shopId?: InputMaybe<Scalars['ID']['input']>;
  typeId?: InputMaybe<Scalars['ID']['input']>;
};

export type IngredientVariation = {
  __typename?: 'IngredientVariation';
  brand?: Maybe<Brand>;
  hasIngredient: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredient: Ingredient;
  name: Scalars['String']['output'];
  shops?: Maybe<Array<Shop>>;
};

export type IngredientVariationCreateManyInput = {
  hasIngredient?: Scalars['Boolean']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientId: Scalars['ID']['input'];
  names: Array<Scalars['String']['input']>;
};

export type IngredientVariationUpdateInput = {
  hasIngredient?: Scalars['Boolean']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBrands: Array<Brand>;
  createIngredient: Ingredient;
  createIngredientType: IngredientType;
  createIngredientVariations: Array<IngredientVariation>;
  createRecipe: Recipe;
  createSeason: Season;
  createShops: Array<Shop>;
  createTag: Tag;
  createUnit: Unit;
  deleteBrand?: Maybe<Brand>;
  deleteIngredient?: Maybe<Ingredient>;
  deleteIngredientType?: Maybe<IngredientType>;
  deleteIngredientVariation?: Maybe<IngredientVariation>;
  deleteRecipe?: Maybe<Recipe>;
  deleteSeason?: Maybe<Season>;
  deleteShop?: Maybe<Shop>;
  deleteTag?: Maybe<Tag>;
  deleteUnit?: Maybe<Unit>;
  updateBrand?: Maybe<Brand>;
  updateIngredient?: Maybe<Ingredient>;
  updateIngredientType?: Maybe<IngredientType>;
  updateIngredientVariation?: Maybe<IngredientVariation>;
  updateRecipe?: Maybe<Recipe>;
  updateSeason?: Maybe<Season>;
  updateShop?: Maybe<Shop>;
  updateTag?: Maybe<Tag>;
  updateUnit?: Maybe<Unit>;
};


export type MutationCreateBrandsArgs = {
  data: Array<BrandCreateInput>;
};


export type MutationCreateIngredientArgs = {
  data: IngredientCreateInput;
};


export type MutationCreateIngredientTypeArgs = {
  data: IngredientTypeCreateInput;
};


export type MutationCreateIngredientVariationsArgs = {
  data: IngredientVariationCreateManyInput;
};


export type MutationCreateRecipeArgs = {
  data: RecipeCreateInput;
};


export type MutationCreateSeasonArgs = {
  data: SeasonCreateInput;
};


export type MutationCreateShopsArgs = {
  data: Array<ShopCreateInput>;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateUnitArgs = {
  data: UnitCreateInput;
};


export type MutationDeleteBrandArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteIngredientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteIngredientTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteIngredientVariationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSeasonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShopArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUnitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBrandArgs = {
  data: BrandUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateIngredientArgs = {
  data: IngredientUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateIngredientTypeArgs = {
  data: IngredientTypeUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateIngredientVariationArgs = {
  data: IngredientVariationUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateRecipeArgs = {
  data: RecipeUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSeasonArgs = {
  data: SeasonUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShopArgs = {
  data: ShopCreateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUnitArgs = {
  data: UnitUpdateInput;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  brand?: Maybe<Brand>;
  brands: Array<Brand>;
  ingredient?: Maybe<Ingredient>;
  ingredientType?: Maybe<IngredientType>;
  ingredientTypes: Array<IngredientType>;
  ingredientVariation?: Maybe<IngredientVariation>;
  ingredientVariations: Array<IngredientVariation>;
  ingredients: Array<Ingredient>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  season?: Maybe<Season>;
  seasons: Array<Season>;
  shop?: Maybe<Shop>;
  shops: Array<Shop>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  unit?: Maybe<Unit>;
  units: Array<Unit>;
};


export type QueryBrandArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIngredientArgs = {
  id: IdInput;
};


export type QueryIngredientTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIngredientVariationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySeasonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUnitArgs = {
  id: Scalars['ID']['input'];
};

export type Recipe = {
  __typename?: 'Recipe';
  cookTime?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Array<Ingredient>>;
  isAlcoholicDrink: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  preparation: Scalars['String']['output'];
  recipeType: Scalars['String']['output'];
  season?: Maybe<Season>;
  tags?: Maybe<Array<Tag>>;
  variations?: Maybe<Array<IngredientVariation>>;
};

export type RecipeCreateInput = {
  cookTime?: InputMaybe<Scalars['Float']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  isAlcoholicDrink?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  preparation: Scalars['String']['input'];
  seasonId?: InputMaybe<Scalars['ID']['input']>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  type?: RecipeType;
  variationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Les types possibles de recettes. */
export enum RecipeType {
  Accompagnement = 'ACCOMPAGNEMENT',
  AmuseBouche = 'AMUSE_BOUCHE',
  Aperitif = 'APERITIF',
  Autre = 'AUTRE',
  Boisson = 'BOISSON',
  Cocktail = 'COCKTAIL',
  Dessert = 'DESSERT',
  Entree = 'ENTREE',
  Patisserie = 'PATISSERIE',
  Plat = 'PLAT',
  Salade = 'SALADE',
  Sauce = 'SAUCE',
  Snack = 'SNACK',
  Soupe = 'SOUPE'
}

export type RecipeUpdateInput = {
  cookTime?: InputMaybe<Scalars['Float']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  isAlcoholicDrink?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preparation?: InputMaybe<Scalars['String']['input']>;
  seasonId?: InputMaybe<Scalars['ID']['input']>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  type?: InputMaybe<RecipeType>;
  variationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID']['output'];
  recipes?: Maybe<Array<Recipe>>;
  seasonName: Scalars['String']['output'];
};

export type SeasonCreateInput = {
  name: SeasonName;
};

/** Les différentes saisons pour les ingrédients et les recettes */
export enum SeasonName {
  Automne = 'AUTOMNE',
  Ete = 'ETE',
  Hiver = 'HIVER',
  Printemps = 'PRINTEMPS',
  TouteAnnee = 'TOUTE_ANNEE'
}

export type SeasonUpdateInput = {
  name?: InputMaybe<SeasonName>;
};

export type Shop = {
  __typename?: 'Shop';
  brands?: Maybe<Array<Brand>>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Array<Ingredient>>;
  name: Scalars['String']['output'];
};

export type ShopCreateInput = {
  brandIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  recipes: Array<Recipe>;
};

export type TagCreateInput = {
  name: Scalars['String']['input'];
};

export type TagUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Unit = {
  __typename?: 'Unit';
  abbreviation: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UnitCreateInput = {
  abbreviation: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UnitUpdateInput = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type IngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string, image?: string | null }> };

export type RecipeQueryVariables = Exact<{
  recipeId: Scalars['ID']['input'];
}>;


export type RecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, image?: string | null, cookTime?: number | null, preparation: string, recipeType: string, isAlcoholicDrink: boolean, season?: { __typename?: 'Season', id: string, seasonName: string } | null, ingredients?: Array<{ __typename?: 'Ingredient', id: string, name: string, image?: string | null, variations?: Array<{ __typename?: 'IngredientVariation', id: string, name: string, image?: string | null, hasIngredient: boolean, brand?: { __typename?: 'Brand', id: string, name: string, image?: string | null } | null, shops?: Array<{ __typename?: 'Shop', id: string, name: string, image?: string | null }> | null }> | null }> | null } | null };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: string, name: string, image?: string | null, cookTime?: number | null, preparation: string, recipeType: string, isAlcoholicDrink: boolean, season?: { __typename?: 'Season', id: string, seasonName: string } | null, ingredients?: Array<{ __typename?: 'Ingredient', id: string, name: string, image?: string | null, variations?: Array<{ __typename?: 'IngredientVariation', id: string, name: string, image?: string | null, hasIngredient: boolean, brand?: { __typename?: 'Brand', id: string, name: string, image?: string | null } | null, shops?: Array<{ __typename?: 'Shop', id: string, name: string, image?: string | null }> | null }> | null }> | null }> };

export type SeasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonsQuery = { __typename?: 'Query', seasons: Array<{ __typename?: 'Season', id: string, seasonName: string }> };

export type CreateTagMutationVariables = Exact<{
  data: TagCreateInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: string } };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag?: { __typename?: 'Tag', id: string } | null };

export type QueryTagQueryVariables = Exact<{
  tagId: Scalars['ID']['input'];
}>;


export type QueryTagQuery = { __typename?: 'Query', tag?: { __typename?: 'Tag', id: string, name: string, recipes: Array<{ __typename?: 'Recipe', id: string, name: string, preparation: string, cookTime?: number | null, image?: string | null, recipeType: string, season?: { __typename?: 'Season', id: string, seasonName: string } | null, variations?: Array<{ __typename?: 'IngredientVariation', id: string, name: string, image?: string | null }> | null }> } | null };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, recipes: Array<{ __typename?: 'Recipe', id: string, name: string, preparation: string, cookTime?: number | null, image?: string | null, recipeType: string, season?: { __typename?: 'Season', id: string, seasonName: string } | null, variations?: Array<{ __typename?: 'IngredientVariation', id: string, name: string, image?: string | null }> | null }> }> };

export type UpdateTagMutationVariables = Exact<{
  data: TagUpdateInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag?: { __typename?: 'Tag', id: string } | null };


export const IngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<IngredientsQuery, IngredientsQueryVariables>;
export const RecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"isAlcoholicDrink"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"hasIngredient"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RecipeQuery, RecipeQueryVariables>;
export const RecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"isAlcoholicDrink"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"hasIngredient"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RecipesQuery, RecipesQueryVariables>;
export const SeasonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}}]}}]} as unknown as DocumentNode<SeasonsQuery, SeasonsQueryVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const QueryTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QueryTagQuery, QueryTagQueryVariables>;
export const TagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TagsQuery, TagsQueryVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;