import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Unit, UnitCreateInput, UnitUpdateInput } from "../entities/UnitEntitie";
import { GraphQLResolveInfo } from "graphql";
import { validate } from "class-validator";
import { makeRelations } from "../utils/makeRelations";

@Resolver()
export class UnitsResolver {
    @Query(() => [Unit])
    async units(@Info() info: GraphQLResolveInfo): Promise<Unit[]> {
        const units = await Unit.find({
            relations:
                makeRelations(info, Unit),
        });
        return units;
    }

    @Query(() => Unit, { nullable: true })
    async unit(@Arg("id", () => ID) id: number): Promise<Unit | null> {
        const unit = await Unit.findOne({ where: { id } });
        if (unit) {
            return unit;
        } else {
            return null;
        }
    }

    @Mutation(() => Unit)
    async createUnit(@Arg("data", () => UnitCreateInput) data: UnitCreateInput): Promise<Unit> {
        const newUnit = new Unit();
        Object.assign(newUnit, data);
        await newUnit.save();
        return newUnit;
    }

    @Mutation(() => Unit, { nullable: true })
    async updateUnit(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => UnitUpdateInput) data: UnitUpdateInput
    ): Promise<Unit | null> {
        const unit = await Unit.findOneBy({ id });
        if (!unit) return null;

        Object.assign(unit, data);
        await unit.save();
        return unit;
    }

    @Mutation(() => Unit, { nullable: true })
    async deleteUnit(@Arg("id", () => ID) id: number): Promise<Unit | null> {
        const unit = await Unit.findOneBy({ id });
        if (!unit) return null;

        await unit.remove();
        Object.assign(unit, { id });
        return unit;
    }
}
