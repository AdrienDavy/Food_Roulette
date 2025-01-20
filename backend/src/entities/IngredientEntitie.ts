import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IsNotEmpty, IsUrl, Length } from "class-validator";
import { IngredientType } from "./IngredientTypeEntitie";
import { Season } from "./SeasonEntitie";
import { IngredientVariation } from "./IngredientVariationEntitie";
import { Shop } from "./ShopEntitie";

@Entity("ingredients")
@ObjectType()
export class Ingredient extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID!)
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

    @OneToMany(() => IngredientVariation, (variation) => variation.ingredient)
    @Field(() => [IngredientVariation], { nullable: true })
    variations!: IngredientVariation[];

    @ManyToOne(() => IngredientType, (type) => type.ingredients, { nullable: true })
    @Field(() => IngredientType, { nullable: true })
    type!: IngredientType;

    @ManyToOne(() => Season, (season) => season.ingredients, { nullable: true })
    @Field(() => Season, { nullable: true })
    season!: Season;

    @ManyToMany(() => Shop, (shop) => shop.ingredients, { nullable: true })
    @JoinTable()
    @Field(() => [Shop], { nullable: true })
    shops!: Shop[];

    @Column({ default: false })
    @Field({ nullable: true })
    hasIngredient!: boolean;
}

@InputType()
export class IngredientCreateInput {
    @IsNotEmpty({ message: "Name is required" })
    @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
    @Field()
    name!: string;

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => ID, { nullable: true })
    variationId!: number;

    @Field(() => ID, { nullable: true })
    typeId!: number;

    @Field(() => ID, { nullable: true })
    seasonId!: number;

    @Field(() => [ID], { nullable: true })
    shopIds!: number[];

    @Field({ defaultValue: false, nullable: true })
    hasIngredient!: boolean;
}

@InputType()
export class IngredientUpdateInput {
    @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
    @Field({ nullable: true })
    name?: string;

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image?: string;

    @Field(() => ID, { nullable: true })
    variationId!: number;

    @Field(() => ID, { nullable: true })
    typeId?: number;

    @Field(() => ID, { nullable: true })
    seasonId?: number;

    @Field(() => ID, { nullable: true })
    shopId!: number;

    @Field({ defaultValue: false, nullable: true })
    hasIngredient?: boolean;
}
