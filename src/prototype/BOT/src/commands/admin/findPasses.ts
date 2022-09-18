import {Context} from "../../bot/context";
import {canManagePasses} from "../../utils/canManagePasses";
import {canFindPasses} from "../../utils/canFindPasses";

export  const findPasses = async (ctx: Context, next: () => Promise<void>) => {
  if (await canManagePasses(ctx.from.id) && await canFindPasses(ctx.from.id)) {
    await ctx.reply("Поиск пропуска\nУкажите ID пропуска");
    ctx.session.scene = {
      prev: ctx.session.scene.current,
      current: "getPassID"
    }
  } else {
    await next();
  }
}
