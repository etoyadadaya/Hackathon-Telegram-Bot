import {Context} from "../../bot/context";

export const getDate = async (ctx: Context, next: () => Promise<void>) => {
  const date = new Date(ctx.message.text);
  const nowDate = new Date(Date.now() + 10800000);
  if (date < nowDate) {
    return ctx.reply("Вы указали дату которая уже прошла");
  }
  ctx.session.date = date;
  await ctx.reply("Выберете время посещения в формате ('HH:MM')");
  ctx.session.scene = {
    prev: ctx.session.scene.current,
    current: "getTime"
  }
}