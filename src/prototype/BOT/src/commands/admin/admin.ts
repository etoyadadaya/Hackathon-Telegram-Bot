import {Markup} from "telegraf";
import {Context} from "../../bot/context";
import {isADM} from "../../utils/isADM";
import {canManagePasses} from "../../utils/canManagePasses";
import {canManageRoles} from "../../utils/canManageRoles";
import {canFindPasses} from "../../utils/canFindPasses";

export const adminPanel = async (ctx: Context, next: () => Promise<void>) => {
  if (await isADM(ctx.from.id)) {
    ctx.session.scene = {
      prev: ctx.session.scene.current,
      current: "admin"
    };

    const firstLayer = [];
    const secondLayer = ["Назад"];

    await canManageRoles(ctx.from.id) && firstLayer.push("Изменить роли пользователей");

    await canManagePasses(ctx.from.id) && firstLayer.push("Изменить статус пропуска");

    await canManagePasses(ctx.from.id) && await canFindPasses(ctx.from.id) && secondLayer.push("Поиск пропуска");

    await ctx.reply("Админ панель", Markup.keyboard([
      firstLayer,
      secondLayer
    ]).resize());
  } else {
    await next();
  }
}
