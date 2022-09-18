import {Context} from "../../bot/context";
import axios from "axios";
import {main} from "../main";

export const changeRoles = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.session.scene.current === "changeRoles") {
    if (ctx.message.text === "Управление ролями") {
      axios.get<{
        canManageRoles: boolean,
        canManagePasses: boolean,
        canFindPasses: boolean
      }>(`http://127.0.0.1:3000/api/v1/users/${ctx.session.selectUserId}`).then(async (res) => {
        if (res.status === 200) {
          axios.put(`http://127.0.0.1:3000/api/v1/users/${ctx.session.selectUserId}`, {
            canManageRoles: !res.data.canManageRoles
          }).then(async () => {
            await ctx.reply("Роль успешно изменена");
            await main(ctx, next);
          })
        }
      }).catch(() => {})
    }
    if (ctx.message.text === "Управление пропусками") {
      axios.get<{
        canManagePasses: boolean,
      }>(`http://127.0.0.1:3000/api/v1/users/${ctx.session.selectUserId}`).then(async (res) => {
        if (res.status === 200) {
          axios.put(`http://127.0.0.1:3000/api/v1/users/${ctx.session.selectUserId}`, {
            canManagePasses: !res.data.canManagePasses
          }).then(async () => {
            await ctx.reply("Роль успешно изменена");
            await main(ctx, next);
          }).catch(async (err) => {
            await ctx.reply("Что то сломалось")
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    if (ctx.message.text === "Поиск пропусков") {
      axios.get<{
        canFindPasses: boolean
      }>(`http://127.0.0.1:3000/api/v1/users/${ctx.session.selectUserId}`).then(async (res) => {
        if (res.status === 200) {
          axios.put(`http://127.0.0.1:3000/api/v1/users/${ctx.session.selectUserId}`, {
            canFindPasses: !res.data.canFindPasses
          }).then(async () => {
            await ctx.reply("Роль успешно изменена");
            await main(ctx, next);
          })
        }
      }).catch(() => {
      })
    }
  }
}