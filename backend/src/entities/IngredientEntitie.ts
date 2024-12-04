import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IsNotEmpty, IsUrl, Length } from "class-validator";
import { IngredientType } from "./IngredientTypeEntitie";
import { Season } from "./SeasonEntitie";

@Entity("ingredients")
@ObjectType()
export class Ingredient extends BaseEntity {
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

    @ManyToOne(() => IngredientType, { nullable: true })
    @Field(() => IngredientType, { nullable: true })
    type!: IngredientType;

    @ManyToOne(() => Season, { nullable: true })
    @Field(() => Season, { nullable: true })
    season!: Season;

    @Column({ default: false })
    @Field()
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
    typeId!: number;

    @Field(() => ID, { nullable: true })
    seasonId!: number;

    @Field({ defaultValue: false })
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
    typeId?: number;

    @Field(() => ID, { nullable: true })
    seasonId?: number;

    @Field({ nullable: true })
    hasIngredient?: boolean;
}
