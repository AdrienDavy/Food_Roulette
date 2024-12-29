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
  name: Scalars['String']['input'];
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
  createBrand?: Maybe<Brand>;
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


export type MutationCreateBrandArgs = {
  data: BrandCreateInput;
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
  data: ShopUpdateInput;
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
  id: Scalars['ID']['input'];
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

export type ShopUpdateInput = {
  brandIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredientIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
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

export type CreateBrandMutationVariables = Exact<{
  data: BrandCreateInput;
}>;


export type CreateBrandMutation = { __typename?: 'Mutation', createBrand?: { __typename?: 'Brand', id: string, name: string, image?: string | null } | null };

export type DeleteBrandMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBrandMutation = { __typename?: 'Mutation', deleteBrand?: { __typename?: 'Brand', id: string } | null };

export type QueryBrandQueryVariables = Exact<{
  brandId: Scalars['ID']['input'];
}>;


export type QueryBrandQuery = { __typename?: 'Query', brand?: { __typename?: 'Brand', id: string, name: string, image?: string | null } | null };

export type QueryBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryBrandsQuery = { __typename?: 'Query', brands: Array<{ __typename?: 'Brand', id: string, name: string, image?: string | null }> };

export type UpdateBrandMutationVariables = Exact<{
  data: BrandUpdateInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateBrandMutation = { __typename?: 'Mutation', updateBrand?: { __typename?: 'Brand', id: string, name: string } | null };

export type CreateIngredientMutationVariables = Exact<{
  data: IngredientCreateInput;
}>;


export type CreateIngredientMutation = { __typename?: 'Mutation', createIngredient: { __typename?: 'Ingredient', id: string } };

export type DeleteIngredientMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteIngredientMutation = { __typename?: 'Mutation', deleteIngredient?: { __typename?: 'Ingredient', id: string } | null };

export type QueryIngredientQueryVariables = Exact<{
  ingredientId: Scalars['ID']['input'];
}>;


export type QueryIngredientQuery = { __typename?: 'Query', ingredient?: { __typename?: 'Ingredient', id: string, name: string, image?: string | null } | null };

export type QueryIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryIngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string, image?: string | null }> };

export type UpdateIngredientMutationVariables = Exact<{
  data: IngredientUpdateInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateIngredientMutation = { __typename?: 'Mutation', updateIngredient?: { __typename?: 'Ingredient', id: string } | null };

export type CreateIngredientTypeMutationVariables = Exact<{
  data: IngredientTypeCreateInput;
}>;


export type CreateIngredientTypeMutation = { __typename?: 'Mutation', createIngredientType: { __typename?: 'IngredientType', id: string } };

export type DeleteIngredientTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteIngredientTypeMutation = { __typename?: 'Mutation', deleteIngredientType?: { __typename?: 'IngredientType', id: string } | null };

export type QueryIngredientTypeQueryVariables = Exact<{
  ingredientTypeId: Scalars['ID']['input'];
}>;


export type QueryIngredientTypeQuery = { __typename?: 'Query', ingredientType?: { __typename?: 'IngredientType', id: string, name: string, image?: string | null } | null };

export type QueryIngredientTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryIngredientTypesQuery = { __typename?: 'Query', ingredientTypes: Array<{ __typename?: 'IngredientType', id: string, name: string, image?: string | null }> };

export type UpdateIngredientTypeMutationVariables = Exact<{
  data: IngredientTypeUpdateInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateIngredientTypeMutation = { __typename?: 'Mutation', updateIngredientType?: { __typename?: 'IngredientType', id: string } | null };

export type DeleteIngredientVariationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteIngredientVariationMutation = { __typename?: 'Mutation', deleteIngredientVariation?: { __typename?: 'IngredientVariation', id: string } | null };

export type QueryIngredientVariationQueryVariables = Exact<{
  ingredientVariationId: Scalars['ID']['input'];
}>;


export type QueryIngredientVariationQuery = { __typename?: 'Query', ingredientVariation?: { __typename?: 'IngredientVariation', id: string, name: string, image?: string | null } | null };

export type QueryIngredientVariationsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryIngredientVariationsQuery = { __typename?: 'Query', ingredientVariations: Array<{ __typename?: 'IngredientVariation', id: string, name: string, image?: string | null }> };

export type UpdateIngredientVariationMutationVariables = Exact<{
  data: IngredientVariationUpdateInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateIngredientVariationMutation = { __typename?: 'Mutation', updateIngredientVariation?: { __typename?: 'IngredientVariation', id: string } | null };

export type CreateRecipeMutationVariables = Exact<{
  data: RecipeCreateInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', id: string } };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRecipeMutation = { __typename?: 'Mutation', deleteRecipe?: { __typename?: 'Recipe', id: string } | null };

export type RecipeQueryVariables = Exact<{
  recipeId: Scalars['ID']['input'];
}>;


export type RecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, image?: string | null, cookTime?: number | null, preparation: string, recipeType: string, isAlcoholicDrink: boolean, season?: { __typename?: 'Season', id: string, seasonName: string } | null, ingredients?: Array<{ __typename?: 'Ingredient', id: string, name: string, image?: string | null, variations?: Array<{ __typename?: 'IngredientVariation', id: string, name: string, image?: string | null, hasIngredient: boolean, brand?: { __typename?: 'Brand', id: string, name: string, image?: string | null } | null, shops?: Array<{ __typename?: 'Shop', id: string, name: string, image?: string | null }> | null }> | null }> | null } | null };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: string, name: string, image?: string | null, cookTime?: number | null, preparation: string, recipeType: string, isAlcoholicDrink: boolean, season?: { __typename?: 'Season', id: string, seasonName: string } | null, ingredients?: Array<{ __typename?: 'Ingredient', id: string, name: string, image?: string | null, variations?: Array<{ __typename?: 'IngredientVariation', id: string, name: string, image?: string | null, hasIngredient: boolean, brand?: { __typename?: 'Brand', id: string, name: string, image?: string | null } | null, shops?: Array<{ __typename?: 'Shop', id: string, name: string, image?: string | null }> | null }> | null }> | null }> };

export type UpdateRecipeMutationVariables = Exact<{
  data: RecipeUpdateInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe?: { __typename?: 'Recipe', id: string } | null };

export type CreateSeasonMutationVariables = Exact<{
  data: SeasonCreateInput;
}>;


export type CreateSeasonMutation = { __typename?: 'Mutation', createSeason: { __typename?: 'Season', id: string } };

export type DeleteSeasonMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSeasonMutation = { __typename?: 'Mutation', deleteSeason?: { __typename?: 'Season', id: string } | null };

export type SeasonQueryVariables = Exact<{
  seasonId: Scalars['ID']['input'];
}>;


export type SeasonQuery = { __typename?: 'Query', season?: { __typename?: 'Season', id: string, seasonName: string } | null };

export type SeasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonsQuery = { __typename?: 'Query', seasons: Array<{ __typename?: 'Season', id: string, seasonName: string }> };

export type UpdateSeasonMutationVariables = Exact<{
  data: SeasonUpdateInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateSeasonMutation = { __typename?: 'Mutation', updateSeason?: { __typename?: 'Season', id: string } | null };

export type DeleteShopMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteShopMutation = { __typename?: 'Mutation', deleteShop?: { __typename?: 'Shop', id: string } | null };

export type ShopQueryVariables = Exact<{
  shopId: Scalars['ID']['input'];
}>;


export type ShopQuery = { __typename?: 'Query', shop?: { __typename?: 'Shop', id: string, name: string, image?: string | null } | null };

export type ShopsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShopsQuery = { __typename?: 'Query', shops: Array<{ __typename?: 'Shop', id: string, name: string, image?: string | null }> };

export type UpdateShopMutationVariables = Exact<{
  data: ShopUpdateInput;
  updateShopId: Scalars['ID']['input'];
}>;


export type UpdateShopMutation = { __typename?: 'Mutation', updateShop?: { __typename?: 'Shop', id: string } | null };

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

export type CreateUnitMutationVariables = Exact<{
  data: UnitCreateInput;
}>;


export type CreateUnitMutation = { __typename?: 'Mutation', createUnit: { __typename?: 'Unit', id: string } };

export type DeleteUnitMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUnitMutation = { __typename?: 'Mutation', deleteUnit?: { __typename?: 'Unit', id: string } | null };

export type UnitQueryVariables = Exact<{
  unitId: Scalars['ID']['input'];
}>;


export type UnitQuery = { __typename?: 'Query', unit?: { __typename?: 'Unit', id: string, name: string, abbreviation: string } | null };

export type UnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnitsQuery = { __typename?: 'Query', units: Array<{ __typename?: 'Unit', id: string, name: string, abbreviation: string }> };

export type UpdateUnitMutationVariables = Exact<{
  data: UnitUpdateInput;
  updateUnitId: Scalars['ID']['input'];
}>;


export type UpdateUnitMutation = { __typename?: 'Mutation', updateUnit?: { __typename?: 'Unit', id: string } | null };


export const CreateBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BrandCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<CreateBrandMutation, CreateBrandMutationVariables>;
export const DeleteBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteBrandMutation, DeleteBrandMutationVariables>;
export const QueryBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryBrandQuery, QueryBrandQueryVariables>;
export const QueryBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryBrandsQuery, QueryBrandsQueryVariables>;
export const UpdateBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BrandUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateBrandMutation, UpdateBrandMutationVariables>;
export const CreateIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateIngredientMutation, CreateIngredientMutationVariables>;
export const DeleteIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteIngredientMutation, DeleteIngredientMutationVariables>;
export const QueryIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ingredientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ingredientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryIngredientQuery, QueryIngredientQueryVariables>;
export const QueryIngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryIngredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryIngredientsQuery, QueryIngredientsQueryVariables>;
export const UpdateIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateIngredientMutation, UpdateIngredientMutationVariables>;
export const CreateIngredientTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIngredientType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientTypeCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIngredientType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateIngredientTypeMutation, CreateIngredientTypeMutationVariables>;
export const DeleteIngredientTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteIngredientType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteIngredientType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteIngredientTypeMutation, DeleteIngredientTypeMutationVariables>;
export const QueryIngredientTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryIngredientType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ingredientTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredientType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ingredientTypeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryIngredientTypeQuery, QueryIngredientTypeQueryVariables>;
export const QueryIngredientTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryIngredientTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredientTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryIngredientTypesQuery, QueryIngredientTypesQueryVariables>;
export const UpdateIngredientTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIngredientType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientTypeUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIngredientType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateIngredientTypeMutation, UpdateIngredientTypeMutationVariables>;
export const DeleteIngredientVariationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteIngredientVariation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteIngredientVariation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteIngredientVariationMutation, DeleteIngredientVariationMutationVariables>;
export const QueryIngredientVariationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryIngredientVariation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ingredientVariationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredientVariation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ingredientVariationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryIngredientVariationQuery, QueryIngredientVariationQueryVariables>;
export const QueryIngredientVariationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryIngredientVariations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredientVariations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryIngredientVariationsQuery, QueryIngredientVariationsQueryVariables>;
export const UpdateIngredientVariationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIngredientVariation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientVariationUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIngredientVariation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateIngredientVariationMutation, UpdateIngredientVariationMutationVariables>;
export const CreateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const DeleteRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const RecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"isAlcoholicDrink"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"hasIngredient"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RecipeQuery, RecipeQueryVariables>;
export const RecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"isAlcoholicDrink"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"hasIngredient"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RecipesQuery, RecipesQueryVariables>;
export const UpdateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const CreateSeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSeason"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeasonCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSeason"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSeasonMutation, CreateSeasonMutationVariables>;
export const DeleteSeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSeason"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSeason"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSeasonMutation, DeleteSeasonMutationVariables>;
export const SeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Season"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}}]}}]} as unknown as DocumentNode<SeasonQuery, SeasonQueryVariables>;
export const SeasonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}}]}}]} as unknown as DocumentNode<SeasonsQuery, SeasonsQueryVariables>;
export const UpdateSeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSeason"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeasonUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSeason"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSeasonMutation, UpdateSeasonMutationVariables>;
export const DeleteShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteShopMutation, DeleteShopMutationVariables>;
export const ShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Shop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shopId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<ShopQuery, ShopQueryVariables>;
export const ShopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<ShopsQuery, ShopsQueryVariables>;
export const UpdateShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShopUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateShopId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateShopMutation, UpdateShopMutationVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const QueryTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QueryTagQuery, QueryTagQueryVariables>;
export const TagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"preparation"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TagsQuery, TagsQueryVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;
export const CreateUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnitCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUnitMutation, CreateUnitMutationVariables>;
export const DeleteUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUnitMutation, DeleteUnitMutationVariables>;
export const UnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Unit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}}]}}]} as unknown as DocumentNode<UnitQuery, UnitQueryVariables>;
export const UnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}}]}}]} as unknown as DocumentNode<UnitsQuery, UnitsQueryVariables>;
export const UpdateUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnitUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUnitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUnitId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUnitMutation, UpdateUnitMutationVariables>;