import { Fridge } from "../entities/Fridge";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

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
  async createFridge(@Arg("title") title: string): Promise<Fridge> {
    return Fridge.create({ title }).save();
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
