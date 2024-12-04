import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Length, Matches } from "class-validator";

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
}

@InputType()
export class IngredientTypeCreateInput {
    @Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères." })
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, { message: "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets." })
    @Field()
    name!: string;
}

@InputType()
export class IngredientTypeUpdateInput {
    @Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères." })
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, { message: "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets." })
    @Field({ nullable: true })
    name?: string;
}
