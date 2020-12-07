import { Fridge } from "../entities/Fridge";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";

@InputType()
class FridgeInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@ObjectType()
class PaginatedFridges {
  @Field(() => [Fridge])
  fridges: Fridge[];
  @Field()
  hasMore: boolean;
}
@Resolver(Fridge)
export class FridgeResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Fridge) {
    return root.text.slice(0, 50);
  }

  @Query(() => PaginatedFridges)
  async fridges(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedFridges> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Fridge)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);
    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    const fridges = await qb.getMany();

    return {
      fridges: fridges.slice(0, realLimit - 1),
      hasMore: fridges.length === realLimit,
    };
  }

  @Query(() => Fridge, { nullable: true })
  fridge(@Arg("id") id: number): Promise<Fridge | undefined> {
    return Fridge.findOne(id);
  }
  @Mutation(() => Fridge)
  @UseMiddleware(isAuth)
  async createFridge(
    @Arg("input") input: FridgeInput,
    @Ctx() { req }: MyContext
  ): Promise<Fridge> {
    return Fridge.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }
  @Mutation(() => Fridge, { nullable: true })
  async updateFridge(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Fridge | null> {
    const fridge = await Fridge.findOne(id);
    if (!fridge) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Fridge.update({ id }, { title });
    }
    return fridge;
  }
  @Mutation(() => Fridge, { nullable: true })
  async deleteFridge(@Arg("id") id: number): Promise<boolean> {
    await Fridge.delete(id);
    return true;
  }
}
