import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";
import { IsEnum } from "class-validator";

// Définir l'énumération des saisons
export enum SeasonName {
    PRINTEMPS = "printemps",
    ETE = "été",
    AUTOMNE = "automne",
    HIVER = "hiver",
    TOUTE_ANNEE = "toute l/année",
}

// Enregistrer l'énumération pour TypeGraphQL
registerEnumType(SeasonName, {
    name: "SeasonName",
    description: "Les différentes saisons pour les ingrédients et les recettes",
});

// Définir l'entité Season
@Entity("seasons")
@ObjectType()
export class Season extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID!)
    id!: number;

    @Column({
        type: "enum",
        enum: SeasonName,
        default: SeasonName.TOUTE_ANNEE,
    })
    @IsEnum(SeasonName, { message: "La saison doit être l'une des valeurs suivantes : printemps, été, automne, hiver, toute l'année" })
    name!: SeasonName;

    // Ajout d'un getter pour transformer la valeur en minuscule
    @Field(() => String)
    get seasonName(): string {
        switch (this.name) {
            case SeasonName.PRINTEMPS:
                return "printemps";
            case SeasonName.ETE:
                return "été";
            case SeasonName.AUTOMNE:
                return "automne";
            case SeasonName.HIVER:
                return "hiver";
            case SeasonName.TOUTE_ANNEE:
                return "toute l'année";
        }
    }
}

// Définir l'input pour la création de Season
@InputType()
export class SeasonCreateInput {
    @IsEnum(SeasonName, { message: "La saison doit être l'une des valeurs suivantes : printemps, été, automne, hiver, toute l'année" })
    @Field(() => SeasonName)
    name!: SeasonName;
}

// Définir l'input pour la mise à jour de Season
@InputType()
export class SeasonUpdateInput {
    @IsEnum(SeasonName, { message: "La saison doit être l'une des valeurs suivantes : printemps, été, automne, hiver, toute l'année" })
    @Field(() => SeasonName, { nullable: true })
    name?: SeasonName;
}
