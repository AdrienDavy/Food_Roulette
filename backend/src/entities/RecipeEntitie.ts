import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    JoinTable,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType, InputType } from "type-graphql";
import { Season } from "./SeasonEntitie";
import { Ingredient } from "./IngredientEntitie";
import { IngredientVariation } from "./IngredientVariationEntitie";
import { Tag } from "./TagEntitie";
import { registerEnumType } from "type-graphql";
import { IsEnum, IsNotEmpty, IsUrl, Length } from "class-validator";

enum RecipeType {
    ENTREE = "entrée",
    PLAT = "plat",
    DESSERT = "dessert",
    PATISSERIE = "pâtisserie",
    COCKTAIL = "cocktail",
    SAUCE = "sauce",
    BOISSON = "boisson",
    AMUSE_BOUCHE = "amuse-bouche",
    APERITIF = "apéritif",
    SALADE = "salade",
    SOUPE = "soupe",
    SNACK = "snack",
    ACCOMPAGNEMENT = "accompagnement",
    AUTRE = "autre",
}

// Enregistrer l'Enum pour TypeGraphQL
registerEnumType(RecipeType, {
    name: "RecipeType",
    description: "Les types possibles de recettes.",
});

@Entity()
@ObjectType()
export class Recipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @Field()
    name!: string;

    @ManyToOne(() => Season, { nullable: true })
    @Field(() => Season, { nullable: true })
    season!: Season;

    @Column("text")
    @Field()
    preparation!: string;

    @Column({ type: "int", nullable: true })
    @Field({ nullable: true })
    cookTime!: number;

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.id)
    @JoinTable()
    @Field(() => [Ingredient], { nullable: true })
    ingredients!: Ingredient[];

    @ManyToMany(() => IngredientVariation, (variation) => variation.id)
    @JoinTable()
    @Field(() => [IngredientVariation], { nullable: true })
    variations!: IngredientVariation[];

    @ManyToMany(() => Tag, (tag) => tag.recipes)
    @JoinTable()
    @Field(() => [Tag], { nullable: true })
    tags!: Tag[];

    @Column({ nullable: true })
    @Field({ nullable: true })
    image!: string;

    @Column({
        type: "enum",
        enum: RecipeType,
        default: RecipeType.AUTRE,
    })
    @IsEnum(RecipeType, { message: "La saison doit être l'une des valeurs suivantes : printemps, été, automne, hiver, toute l'année" })
    type!: RecipeType;

    // Ajout d'un getter pour transformer la valeur en minuscule
    @Field(() => String)
    get recipeType(): string {
        switch (this.type) {
            case RecipeType.ACCOMPAGNEMENT:
                return "Accompagnement";
            case RecipeType.AMUSE_BOUCHE:
                return "Amuse bouche";
            case RecipeType.APERITIF:
                return "Apéritif";
            case RecipeType.AUTRE:
                return "Autre";
            case RecipeType.BOISSON:
                return "Boisson";
            case RecipeType.COCKTAIL:
                return "Cocktail";
            case RecipeType.DESSERT:
                return "Dessert";
            case RecipeType.ENTREE:
                return "Entrée";
            case RecipeType.PATISSERIE:
                return "Patisserie";
            case RecipeType.PLAT:
                return "Plat";
            case RecipeType.SALADE:
                return "Salade";
            case RecipeType.SAUCE:
                return "Sauce";
            case RecipeType.SNACK:
                return "Snack";
            case RecipeType.SOUPE:
                return "Soupe";
        }
    }

    @Column({ type: "boolean", default: false })
    @Field()
    isAlcoholicDrink!: boolean;



}
@InputType()
export class RecipeCreateInput {
    @IsNotEmpty({ message: "Name is required" })
    @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
    @Field()
    name!: string;

    @Field(() => ID, { nullable: true })
    seasonId?: number;

    @IsNotEmpty({ message: "Preparation instructions are required" })
    @Field()
    preparation!: string;

    @Field({ nullable: true })
    cookTime?: number;

    @Field(() => [ID], { nullable: true })
    ingredientIds?: number[];

    @Field(() => [ID], { nullable: true })
    variationIds?: number[];

    @Field(() => [ID], { nullable: true })
    tagIds?: number[];

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image?: string;

    @Field(() => RecipeType, { defaultValue: RecipeType.AUTRE })
    type!: RecipeType;

    @Field({ defaultValue: false })
    isAlcoholicDrink!: boolean;
}

@InputType()
export class RecipeUpdateInput {
    @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
    @Field({ nullable: true })
    name?: string;

    @Field(() => ID, { nullable: true })
    seasonId?: number;

    @Field({ nullable: true })
    preparation?: string;

    @Field({ nullable: true })
    cookTime?: number;

    @Field(() => [ID], { nullable: true })
    ingredientIds?: number[];

    @Field(() => [ID], { nullable: true })
    variationIds?: number[];

    @Field(() => [ID], { nullable: true })
    tagIds?: number[];

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image?: string;

    @Field(() => RecipeType, { nullable: true })
    type?: RecipeType;

    @Field({ nullable: true })
    isAlcoholicDrink?: boolean;
}
