import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";
import { IsEnum } from "class-validator";
import { Recipe } from "./RecipeEntitie";
import { Ingredient } from "./IngredientEntitie";

// Définir l'énumération des saisons
export enum SeasonName {
    PRINTEMPS = "Printemps",
    ETE = "Été",
    AUTOMNE = "Automne",
    HIVER = "Hiver",
    TOUTE_ANNEE = "Toute l/année",
}

// Enregistrer l'énumération pour TypeGraphQL
registerEnumType(SeasonName, {
    name: "SeasonName",
    description: "Les différentes saisons pour les ingrédients et les recettes",
});

// Définir l'entité Season
@Entity("seasons")
@ObjectType()
export class Season extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID!)
    id!: number;

    @Column({
        type: "enum",
        enum: SeasonName,
        default: SeasonName.TOUTE_ANNEE,
    })
    @IsEnum(SeasonName, { message: "La saison doit être l'une des valeurs suivantes : printemps, été, automne, hiver, toute l'année" })
    name!: SeasonName;

    @OneToMany(() => Recipe, (recipe) => recipe.season, { nullable: true })
    @Field(() => [Recipe], { nullable: true })
    recipes?: Recipe[];

    @OneToMany(() => Ingredient, (ingredient) => ingredient.season, { nullable: true })
    @Field(() => [Ingredient], { nullable: true })
    ingredients?: Ingredient[];

    // Ajout d'un getter pour transformer la valeur en minuscule
    @Field(() => String)
    get seasonName(): string {
        switch (this.name) {
            case SeasonName.PRINTEMPS:
                return "Printemps";
            case SeasonName.ETE:
                return "Été";
            case SeasonName.AUTOMNE:
                return "Automne";
            case SeasonName.HIVER:
                return "Hiver";
            case SeasonName.TOUTE_ANNEE:
                return "Toute l'année";
        }
    }
}

// Définir l'input pour la création de Season
@InputType()
export class SeasonCreateInput {
    @IsEnum(SeasonName, { message: "La saison doit être l'une des valeurs suivantes : printemps, été, automne, hiver, toute l'année" })
    @Field(() => SeasonName)
    name!: SeasonName;
}

// Définir l'input pour la mise à jour de Season
@InputType()
export class SeasonUpdateInput {
    @IsEnum(SeasonName, { message: "La saison doit être l'une des valeurs suivantes : printemps, été, automne, hiver, toute l'année" })
    @Field(() => SeasonName, { nullable: true })
    name?: SeasonName;
}
