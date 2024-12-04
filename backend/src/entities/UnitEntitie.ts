import { IsNotEmpty, Length, Matches } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity("units")
@ObjectType()
export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column({ unique: true })
    @IsNotEmpty({ message: "Unit name is required" })
    @Length(1, 50, { message: "Unit name must be between 1 and 50 characters" })
    @Field()
    name!: string;

    @Column()
    @IsNotEmpty({ message: "Abbreviation is required" })
    @Length(1, 10, { message: "Abbreviation must be between 1 and 10 characters" })
    @Matches(/^[\p{L}]+$/u, { message: "Abbreviation must only contain letters, including accented characters" })
    @Field()
    abbreviation!: string;
}

@InputType()
export class UnitCreateInput {
    @IsNotEmpty({ message: "Unit name is required" })
    @Length(1, 50, { message: "Unit name must be between 1 and 50 characters" })
    @Field()
    name!: string;

    @IsNotEmpty({ message: "Abbreviation is required" })
    @Length(1, 10, { message: "Abbreviation must be between 1 and 10 characters" })
    @Matches(/^[\p{L}]+$/u, { message: "Abbreviation must only contain letters, including accented characters" })
    @Field()
    abbreviation!: string;
}

@InputType()
export class UnitUpdateInput {
    @Length(1, 50, { message: "Unit name must be between 1 and 50 characters" })
    @Field({ nullable: true })
    name?: string;

    @Length(1, 10, { message: "Abbreviation must be between 1 and 10 characters" })
    @Matches(/^[\p{L}]+$/u, { message: "Abbreviation must only contain letters, including accented characters" })
    @Field({ nullable: true })
    abbreviation?: string;
}
