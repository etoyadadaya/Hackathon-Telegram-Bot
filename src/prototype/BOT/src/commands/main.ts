import {Context} from "../bot/context";
import {isADM} from "../utils/isADM";
import {Markup} from "telegraf";
import {getUserDataByUID} from "../utils/getUserDataByUID";

export const main = async (ctx: Context, next: () => Promise<void>) => {
  if (!ctx.session.scene?.current) {
    ctx.session.scene = {
      prev: "main",
      current: "main"
    }
  } else {
    ctx.session.scene = {
      prev: ctx.session.scene.current,
      current: "main"
    }
  }

  const {passes, user, errors} = await getUserDataByUID(ctx.from.id);


  if (errors) {
    await ctx.reply("Что-то сломалось, попробуйте позже");
  } else {
    const firstLayer = ["Заказать пропуск"];
    await isADM(ctx.from.id) && firstLayer.push("Админка");
    let secondLayer = [];
    passes?.forEach(() => {
      secondLayer = ["Список пропусков"];
    });
    if (user) {
      await ctx.reply(`Добро пожаловать: ${user.last_name} ${user.first_name} ${user.middle_name}`, Markup.keyboard([
        firstLayer, secondLayer
      ]).resize());
    } else {
      await ctx.reply("Добро пожаловать", Markup.keyboard([
        "Регистрация"
      ]).resize());
    }
  }
}