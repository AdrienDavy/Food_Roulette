import { Matches } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Recipe } from "./RecipeEntitie";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @Matches(/^[a-zà-öø-ÿ]+$/, { message: "One word and lowercase letters only" })
    @Field()
    name!: string;

    @ManyToMany(() => Recipe, recipe => recipe.tags)
    @Field(() => [Recipe])
    recipes!: Recipe[];

}


@InputType()
export class TagCreateInput {
    @Matches(/^[a-zà-öø-ÿ]+$/, { message: "One word and lowercase letters only" })
    @Field()
    name!: string;
}

@InputType()
export class TagUpdateInput {
    @Matches(/^[a-zà-öø-ÿ]+$/, { message: "One word and lowercase letters only" })
    @Field({ nullable: true })
    name!: string;
}