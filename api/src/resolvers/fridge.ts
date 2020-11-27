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
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";

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
  async fridges(): Promise<Fridge[]> {
    return Fridge.find();
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
