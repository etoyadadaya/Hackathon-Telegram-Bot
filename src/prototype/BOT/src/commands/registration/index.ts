import {Markup} from "telegraf";
import {Context} from "../../bot/context";
import {getConfig} from "../../config/config";
const {cities} = getConfig("./config.yml");

export const registration = async (ctx: Context, next: () => Promise<void>) => {
  await ctx.reply("Пожалуста выберете город", Markup.keyboard([
    cities, ["Назад"]
  ]).resize());
  ctx.session.scene = {
    prev: ctx.session.scene.current,
    current: "getRegCity"
  }
}