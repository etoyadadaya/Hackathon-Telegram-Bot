import {Context} from "../../bot/context";
import axios from "axios";
import {adminPanel} from "./admin";
import {canManageRoles} from "../../utils/canManageRoles";

export  const rolesUsersChange = async (ctx: Context, next: () => Promise<void>) => {
  if (await canManageRoles(ctx.from.id)) {
    let city: number;

    switch (ctx.session.city) {
      case "Москва": {
        city = 0;
        break;
      }
      case "Казань": {
        city = 1;
        break;
      }
      case "Новосибирск": {
        city = 2;
        break
      }
    }
    axios.get<{
      uid: number,
      first_name: string,
      middle_name: string,
      last_name: string,
      canManageRoles: boolean,
      canManagePasses: boolean,
      canFindPasses: boolean
    }[]>(`http://127.0.0.1:3000/api/v1/users/city/${city}`).then(async (res) => {
      if (res.status === 200) {
        res.data.forEach((user) => {
          let message = `ID: ${user.uid}\nФамилия: ${user.last_name}\nИмя: ${user.first_name}\nОтчество: ${user.middle_name}\n\n`;

          if (user.canManageRoles) {
            message += `✅ Управление ролями\n\n`
          } else {
            message += `❌ Управление ролями\n\n`
          }
          if (user.canManagePasses) {
            message += `✅ Управление пропусками\n\n`
          } else {
            message += `❌ Управление пропусками\n\n`
          }
          if (user.canFindPasses) {
            message += `✅ Поиск пропусков\n\n`
          } else {
            message += `❌ Поиск пропусков\n\n`
          }

          ctx.reply(message);
        });
        setTimeout(async () => {
          await ctx.reply("Укажите ID нужного пользователя");
          ctx.session.scene = {
            prev: ctx.session.scene.current,
            current: "setByUserID"
          }
        }, 0)
      }
    }).catch(async (err) => {
      if (err.response?.status === 404) {
        await ctx.reply("Поздравляем, вы рассмотрели все заявки, возвращайтесь позже");
        await adminPanel(ctx, next);
      }
    })
  } else {
    await next();
  }
}
