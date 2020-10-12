import { Fridge } from "../entities/Fridge";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
@Resolver()
export class FridgeResolver {
  @Query(() => [Fridge])
  fridges(@Ctx() { em }: MyContext): Promise<Fridge[]> {
    return em.find(Fridge, {});
  }

  @Query(() => Fridge, {nullable: true})
  fridge(
    @Arg('id') id: number,
    @Ctx() { em }: MyContext
    ): Promise<Fridge | null> {
    return em.findOne(Fridge, { id });
  }
  @Mutation(() => Fridge)
  async createFridge(
    @Arg('title') title: string,
    @Ctx() { em }: MyContext
  ): Promise<Fridge> {
    const fridge = em.create(Fridge, {title})
    await em.persistAndFlush(fridge)
    return fridge
  }
  @Mutation(() => Fridge, {nullable: true})
  async updateFridge(
    @Arg('id') id: number,
    @Arg('title', () => String, {nullable: true}) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Fridge | null> {
    const fridge = await em.findOne(Fridge, { id })
      if (!fridge) {
        return null
      }
      if (typeof title !== 'undefined') {
        fridge.title = title
        await em.persistAndFlush(fridge)
    }
    return fridge
  }
  @Mutation(() => Fridge, {nullable: true})
  async deleteFridge(
    @Arg('id') id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
  try {
    await em.nativeDelete(Fridge, { id })
  } catch {
    return false
  }
    return true
  }
}
