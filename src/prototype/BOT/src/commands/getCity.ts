import {Context as BotContext} from "../bot/context";
import {Markup} from "telegraf";

type Context = BotContext;

export const getCity = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.session.scene.current === "getRegCity") {
    ctx.session.city = ctx.message.text;
    await ctx.reply("Пожалуйста введите ФИО", Markup.keyboard([
      "Назад"
    ]).resize());
    ctx.session.scene = {
      prev: ctx.session.scene.current,
      current: "getFullName"
    }
  } else if (ctx.session.scene.current === "getPassCity") {
    ctx.session.city = ctx.message.text;
    await ctx.reply("Выберете дату посещения в формате ('MM DD YYYY')", Markup.keyboard([
      "Назад"
    ]).resize());
    ctx.session.scene = {
      prev: ctx.session.scene.current,
      current: "getDate"
    }
  } else {
    await next();
  }
}
