// import {
//     IsEmail,
//     IsNotEmpty,
//     IsUrl,
//     Length,
//     Max,
//     Min,
//     IsArray,
//     IsPositive,
//     IsInt,
//     ValidateNested,
// } from "class-validator";
// import {
//     BaseEntity,
//     BeforeInsert,
//     Column,
//     Entity,
//     JoinTable,
//     ManyToMany,
//     ManyToOne,
//     PrimaryGeneratedColumn,
// } from "typeorm";
// import { Category } from "./Category";
// import { Tag } from "./TagEntitie";
// import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
// import { IdInput } from "./Id";

// @Entity()
// @ObjectType()
// export class Ad extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     @Field(() => ID!)
//     id!: number;

//     @ManyToOne(() => Category, (category) => category.ads)
//     @Field(() => Category)
//     category!: Category;

//     @ManyToMany(() => Tag, (tag) => tag.ads)
//     @JoinTable()
//     @Field(() => [Tag])
//     tags!: Tag[];

//     @Column()
//     @Field()
//     title!: string;

//     @Column({ nullable: true })
//     @Field({ nullable: true })
//     description!: string;

//     @Column()
//     @Field()
//     owner!: string;

//     @Column()
//     @Field(() => Int)
//     price!: number;

//     @Column()
//     @Field()
//     picture!: string;

//     @Column()
//     @Field()
//     location!: string;

//     @Column()
//     @Field()
//     createdAt!: Date;

//     @BeforeInsert()
//     private setCreateAt() {
//         this.createdAt = new Date();
//     }
// }

// @InputType()
// export class AdCreateInput {

//     @IsNotEmpty({ message: "Category is required" })
//     @Field(() => IdInput)
//     category!: IdInput;

//     @IsArray({ message: "Tags must be an array" }) // Validation pour le tableau de tags
//     @Field(() => [IdInput])
//     tags!: IdInput[];

//     @IsNotEmpty({ message: "Title is required" })
//     @Length(3, 100, { message: "Title must be between 10 and 100 characters" })
//     @Field()
//     title!: string;

//     @IsNotEmpty({ message: "Description is required" })
//     @Length(20, 1000, { message: "Description must be between 20 and 1000 characters" })
//     @Field({ nullable: true })
//     description!: string;

//     @IsEmail({}, { message: "Owner must be a valid email" })
//     @IsNotEmpty({ message: "Owner is required" })
//     @Field()
//     owner!: string;

//     @IsPositive({ message: "Price must be positive" })
//     @Min(0, { message: "Price must be greater than or equal to 0" })
//     @Max(1000000, { message: "Price must be lower than or equal to 1,000,000 cents" })
//     @Field(() => Int)
//     price!: number;

//     @IsUrl({}, { message: "Picture must be a valid URL" })
//     @IsNotEmpty({ message: "Picture URL is required" })
//     @Field()
//     picture!: string;

//     @IsNotEmpty({ message: "Location is required" })
//     @Field()
//     location!: string;

// }

// @InputType()
// export class AdUpdateInput {
//     @IsNotEmpty({ message: "Category is required" })
//     @Field(() => IdInput, { nullable: true })
//     category!: IdInput;

//     @IsArray({ message: "Tags must be an array" }) // Validation pour le tableau de tags
//     @Field(() => [IdInput], { nullable: true })
//     tags!: IdInput[];

//     @IsNotEmpty({ message: "Title is required" })
//     @Length(3, 100, { message: "Title must be between 10 and 100 characters" })
//     @Field({ nullable: true })
//     title!: string;

//     @IsNotEmpty({ message: "Description is required" })
//     @Length(20, 1000, { message: "Description must be between 20 and 1000 characters" })
//     @Field({ nullable: true })
//     description!: string;

//     @IsEmail({}, { message: "Owner must be a valid email" })
//     @IsNotEmpty({ message: "Owner is required" })
//     @Field({ nullable: true })
//     owner!: string;

//     @IsPositive({ message: "Price must be positive" })
//     @Min(0, { message: "Price must be greater than or equal to 0" })
//     @Max(1000000, { message: "Price must be lower than or equal to 1,000,000 cents" })
//     @Field(() => Int, { nullable: true })
//     price!: number;

//     @IsUrl({}, { message: "Picture must be a valid URL" })
//     @IsNotEmpty({ message: "Picture URL is required" })
//     @Field({ nullable: true })
//     picture!: string;

//     @IsNotEmpty({ message: "Location is required" })
//     @Field({ nullable: true })
//     location!: string;
// }
