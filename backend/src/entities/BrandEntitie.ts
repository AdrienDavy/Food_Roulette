import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IngredientType } from "./IngredientTypeEntitie";
import { IngredientVariation } from "./IngredientVariationEntitie";
import { IsOptional, IsUrl } from "class-validator";

@Entity("brands")
@ObjectType()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID!)
    id!: number;

    @Column()
    @Field()
    name!: string;

    @Column({ nullable: true })
    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @OneToMany(() => IngredientType, (type) => type.brand)
    @Field(() => [IngredientType], { nullable: true })
    ingredientTypes!: IngredientType[];

    @OneToMany(() => IngredientVariation, (variation) => variation.brand)
    @Field(() => [IngredientVariation], { nullable: true })
    ingredientVariations!: IngredientVariation[];
}

@InputType()
export class BrandCreateInput {

    @Field({ nullable: false })
    name!: string;

    @IsOptional()
    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => [ID], { nullable: true })
    ingredientVariationIds!: number[];
}

@InputType()
export class BrandUpdateInput {
    @Field()
    name?: string;

    @IsOptional()
    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => [ID], { nullable: true })
    ingredientVariationIds!: number[];
}
