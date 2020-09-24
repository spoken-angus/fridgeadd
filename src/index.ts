import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Fridge } from "./entities/Fridge";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const fridge = orm.em.create(Fridge, { title: "my first post" });
  // await orm.em.persistAndFlush(fridge);

  const fridges = await orm.em.find(Fridge, {});
  console.log(fridges);
};

main().catch((err) => {
  console.error(err);
});