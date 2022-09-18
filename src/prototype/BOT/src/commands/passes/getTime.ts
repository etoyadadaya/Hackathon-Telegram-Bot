import {getAsDate} from "../../utils/getDate";
import {Markup} from "telegraf";
import {Context} from "../../bot/context";

const getTime = async (ctx: Context, next: () => Promise<void>) => {
  const date = getAsDate(ctx.session.date, String(ctx.message.text));
  const nowDate = new Date(Date.now() + 10800000);
  if (date < nowDate) {
    return ctx.reply("Вы указали время которое уже прошло");
  }
  ctx.session.date = date;
  await ctx.reply(`Проверьте дату, время и город\n Город: ${ctx.session.city}\n Дата и время: ${ctx.session.date.toDateString()} ${ctx.session.date.getHours()}:${ctx.session.date.getMinutes()}`, Markup.keyboard([
    ["Все верно", "Исправить"],
    ["Назад"]
  ]).resize());
  ctx.session.scene = {
    prev: ctx.session.scene.current,
    current: "checkDateAndCity.ts"
  }
}

export default getTime;
