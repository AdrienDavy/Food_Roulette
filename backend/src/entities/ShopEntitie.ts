import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Brand } from "./BrandEntitie";
import { Ingredient } from "./IngredientEntitie";
import { IsUrl } from "class-validator";

@Entity("shops")
@ObjectType()
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @Field()
    name!: string;

    @Column({ nullable: true })
    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;


    @ManyToMany(() => Brand, (brand) => brand.id)
    @JoinTable()
    @Field(() => [Brand], { nullable: true })
    brands!: Brand[];

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.id)
    @JoinTable()
    @Field(() => [Ingredient], { nullable: true })
    ingredients!: Ingredient[];
}

@InputType()
export class ShopCreateInput {
    @Field()
    name!: string;

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => [ID], { nullable: true })
    brandIds!: number[];

    @Field(() => [ID], { nullable: true })
    ingredientIds!: number[];
}

@InputType()
export class ShopUpdateInput {
    @Field({ nullable: true })
    name?: string;

    @IsUrl({}, { message: "Image must be a valid URL" })
    @Field({ nullable: true })
    image!: string;

    @Field(() => [ID], { nullable: true })
    brandIds?: number[];

    @Field(() => [ID], { nullable: true })
    ingredientIds?: number[];
}
