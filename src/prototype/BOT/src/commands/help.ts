import {Context} from "../bot/context";

export const help = async (ctx: Context, next: () => Promise<void>) => {
  await ctx.reply("/start - открыть стартовое меню\n/passes - список пропусков");
}
