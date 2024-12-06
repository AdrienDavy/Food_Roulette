import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IsUrl, Length, Matches } from "class-validator";
import { Ingredient } from "./IngredientEntitie";
import { Brand } from "./BrandEntitie";
import { Shop } from "./ShopEntitie";

@Entity("ingredient_types")
@ObjectType()
export class IngredientType extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID!)
    id!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    @Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères." })
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, { message: "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets." })
    @Field()
    name!: string;

    @Column({ nullable: true })
    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @ManyToOne(() => Brand, (brand) => brand.ingredientTypes, { nullable: true })
    @Field(() => Brand, { nullable: true })
    brand!: Brand;

    @ManyToMany(() => Shop, (shop) => shop.ingredients)
    @JoinTable()
    @Field(() => [Shop], { nullable: true })
    shops!: Shop[];


    @OneToMany(() => Ingredient, (ingredient) => ingredient.type)
    @Field(() => [Ingredient], { nullable: true })
    ingredients!: Ingredient[];
}

@InputType()
export class IngredientTypeCreateInput {
    @Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères." })
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, { message: "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets." })
    @Field()
    name!: string;

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;
}

@InputType()
export class IngredientTypeUpdateInput {
    @Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères." })
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, { message: "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets." })
    @Field({ nullable: true })
    name?: string;

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;
}
