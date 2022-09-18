import {Context} from "../../bot/context";
import axios from "axios";
import {Markup} from "telegraf";

export const setByUserID = async (ctx: Context, next: () => Promise<void>) => {
  axios.get<{
    id: number,
    uid: number,
    first_name: string,
    middle_name: string,
    last_name: string,
    canManageRoles: boolean,
    canManagePasses: boolean,
    canFindPasses: boolean
  }>(`http://127.0.0.1:3000/api/v1/users/${ctx.message.text}`).then(async (res) => {
    if (res.status === 200) {
      let message = `ID: ${res.data.uid}\nФамилия: ${res.data.last_name}\nИмя: ${res.data.first_name}\nОтчество: ${res.data.middle_name}\n\n`;

      if (res.data.canManageRoles) {
        message += `✅ Управление ролями\n\n`
      } else {
        message += `❌ Управление ролями\n\n`
      }
      if (res.data.canManagePasses) {
        message += `✅ Управление пропусками\n\n`
      } else {
        message += `❌ Управление пропусками\n\n`
      }
      if (res.data.canFindPasses) {
        message += `✅ Поиск пропусков\n\n`
      } else {
        message += `❌ Поиск пропусков\n\n`
      }

      await ctx.reply(message);
      await ctx.reply("Выберете роли которые вы хотите изменить", Markup.keyboard([
        ["Управление ролями", "Управление пропусками", "Поиск пропусков"],
        ["Назад"]
      ]).resize())
      ctx.session.scene = {
        prev: ctx.session.scene.current,
        current: "changeRoles"
      }
      ctx.session.selectUserId = ctx.message.text;
    }
  }).catch(async (err) => {
    if (err.response?.status === 404) {
      await ctx.reply("Указанный вами пользователь не найден");
    }
  })
}