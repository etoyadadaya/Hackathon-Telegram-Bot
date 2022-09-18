import {Markup} from "telegraf";
import {Context} from "../../bot/context";
import {getConfig} from "../../config/config";
const {cities} = getConfig("./config.yml");

export const checkDateAndCity = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.session.scene.current === "checkDateAndCity") {
    ctx.session.scene = {
      prev: ctx.session.scene.current,
      current: "getPassCity"
    }
    await ctx.reply("Выберите ваш город", Markup.keyboard([
      cities, ["Назад"]
    ]).resize());
  }
}