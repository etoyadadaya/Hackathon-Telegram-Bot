import {Context} from "../../bot/context";
import {getPassData} from "../../utils/getPassData";
import {Markup} from "telegraf";
import {getUserDataByID} from "../../utils/getUserDataByID";
import {getDataString} from "../../utils/getDataString";
import {adminPanel} from "./admin";
import axios from "axios";

export const getPassID = async (ctx: Context, next: () => Promise<void>) => {
  const {pass, errors} = await getPassData(ctx.message.text);

  if (errors) {
    await ctx.reply("Что-то сломалось, попробуйте позже");
  } else {
    if (pass) {
      let status = "Заявка";
      const createDate = `${getDataString(pass.date)}`;
      let termDate = "";
      let updateDate = "";

      if (pass.status === 1) {
        if (Date.now() > Date.parse(new Date(pass.term).toISOString())) {
          axios.put(`http://127.0.0.1:3000/api/v1/passes/${pass.id}`, {status: 3}).catch(() => {});
          pass.status = 3;
        }
      }

      switch (pass.status) {
        case 0: {
          status = "Заявка";
          break;
        }
        case 1: {
          status = "Одобрен";
          break;
        }
        case 2: {
          status = "Был использован";
          break;
        }
        case 3: {
          status = "Истек";
          break;
        }
        case 4: {
          status = "Отказано";
          break;
        }
      }

      if (pass.status !== 0) {
        termDate = `${getDataString(pass.term)}`;
      }

      if (pass.status !== 0) {
        updateDate = `${getDataString(pass.updatedAt)}`;
      }

      let message = `ПРОПУСК  #${pass.id}\n\nГород: ${pass.city}\nСтатус: ${status}\nДата и время: ${createDate}\n`;

      if (pass.status !== 0) {
        message += `Дата и время окончания действия пропуска: ${termDate}\nДата и время последнего обновления статуса: ${updateDate}\n`;
      }

      const {user, errors} = await getUserDataByID(pass.userId);

      if (!errors && user) {
        message += `Заказал: ${user.last_name} ${user.first_name} ${user.middle_name}`
      }

      if (pass.status !== 0 && pass.status !== 1) {
        await ctx.reply(message);
        await adminPanel(ctx, next);
      } else {
        await ctx.reply(message, Markup.keyboard([
          ["Одобрить", "Отказать"],
          ["Назад", "Исполнить"]
        ]).resize());
        ctx.session.scene = {
          prev: ctx.session.scene.current,
          current: "setByPassID"
        }
        ctx.session.selectPassId = pass.id;
      }
    } else {
      await ctx.reply("Ничего не найдено");
    }
  }
}