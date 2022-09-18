import {Context} from "../../bot/context";
import {Markup} from "telegraf";
import {getConfig} from "../../config/config";
const {cities} = getConfig("./config.yml");

export const getPass = async (ctx: Context, next: () => Promise<void>) => {
  await ctx.reply("Выберите ваш город", Markup.keyboard([
    cities, ["Назад"]
  ]).resize());
  ctx.session.scene = {
    prev: ctx.session.scene.current,
    current: "getPassCity"
  }
}
