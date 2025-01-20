import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Ingredient } from "./IngredientEntitie";
import { IsNotEmpty, IsUrl, Length } from "class-validator";
import { Brand } from "./BrandEntitie";
import { Shop } from "./ShopEntitie";
import { Season } from "./SeasonEntitie";
import { IngredientType } from "./IngredientTypeEntitie";

@Entity("ingredient_variations")
@ObjectType()
export class IngredientVariation extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @IsNotEmpty({ message: "Name is required" })
    @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
    @Field()
    name!: string;

    @Column({ nullable: true })
    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @ManyToOne(() => Brand, (brand) => brand.ingredientVariations, { nullable: true })
    @Field(() => Brand, { nullable: true })
    brand!: Brand | null;

    @ManyToMany(() => Shop, (shop) => shop.ingredientVariations)
    @JoinTable()
    @Field(() => [Shop], { nullable: true })
    shops!: Shop[];

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.variations, { nullable: false })
    @Field(() => Ingredient)
    ingredient!: Ingredient;

    @ManyToOne(() => IngredientType, { nullable: true })
    @Field(() => IngredientType, { nullable: true })
    type!: IngredientType | null;

    @ManyToOne(() => Season, { nullable: true })
    @Field(() => Season, { nullable: true })
    season!: Season | null;

    @Column({ default: false })
    @Field()
    hasIngredient!: boolean;
}

@InputType()
export class IngredientVariationCreateInput {
    @Field(() => String)
    name!: string; // Tableau de noms des variations

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => ID, { nullable: true })
    brandId!: number; // ID de la marque parent

    @Field(() => ID, { nullable: true })
    ingredientId!: number; // ID de l'ingrédient parent

    @Field(() => ID, { nullable: true })
    typeId!: number;

    @Field(() => ID, { nullable: true })
    seasonId!: number;

    @Field(() => [ID], { nullable: true })
    shopIds!: number[];

    @Field({ defaultValue: false })
    hasIngredient!: boolean;

}


@InputType()
export class IngredientVariationUpdateInput {
    @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
    @Field({ nullable: true })
    name?: string;

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => ID, { nullable: true })
    brandId!: number; // ID de la marque parent

    @Field(() => ID, { nullable: true })
    ingredientId?: number;

    @Field(() => ID, { nullable: true })
    typeId!: number;

    @Field(() => ID, { nullable: true })
    seasonId!: number;

    @Field(() => [ID], { nullable: true })
    shopIds!: number[];

    @Field({ defaultValue: false })
    hasIngredient!: boolean;

}
