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

@Resolver()
export class FridgeResolver {
  @Query(() => [Fridge])
  async fridges(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Fridge[]> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Fridge)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);
    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
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
