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

    @ManyToOne(() => Brand, (brand) => brand.ingredients, { nullable: true })
    @Field(() => Brand, { nullable: true })
    brand!: Brand;

    @ManyToMany(() => Shop, (shop) => shop.ingredients)
    @JoinTable()
    @Field(() => [Shop], { nullable: true })
    shops!: Shop[];


    @ManyToOne(() => Ingredient, (ingredient) => ingredient.variations, { nullable: false })
    @Field(() => Ingredient)
    ingredient!: Ingredient;
}

@InputType()
export class IngredientVariationCreateManyInput {
    @Field(() => [String])
    names!: string[]; // Tableau de noms des variations

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => ID)
    ingredientId!: number; // ID de l'ingrédient parent
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
    ingredientId?: number;
}
