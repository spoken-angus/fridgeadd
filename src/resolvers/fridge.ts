import { Fridge } from "../entities/Fridge";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Int } from "type-graphql";

@Resolver()
export class FridgeResolver {
  @Query(() => [Fridge])
  fridges(@Ctx() { em }: MyContext): Promise<Fridge[]> {
    return em.find(Fridge, {});
  }

  @Query(() => Fridge, {nullable: true})
  fridge(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext
    ): Promise<Fridge | null> {
    return em.findOne(Fridge, { id });
  }
}
