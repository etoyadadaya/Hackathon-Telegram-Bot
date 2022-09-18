import {Context} from "../bot/context";
import {getPassesData} from "../utils/getPassesData";
import {getDataString} from "../utils/getDataString";
import axios from "axios";

export const getPasses = async (ctx: Context, next: () => Promise<void>) => {
  const {passes, errors} = await getPassesData(ctx.from.id);

  if (errors) {
    await ctx.reply("Что-то сломалось, попробуйте позже");
  } else {
    if (passes) {
      passes.forEach((pass) => {
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

        if (pass.status !== 0 && pass.status !== 4) {
          termDate = `${getDataString(pass.term)}`;
        }

        if (pass.status !== 0) {
          updateDate = `${getDataString(pass.updatedAt)}`;
        }

        let message = `ПРОПУСК  #${pass.id}\n\nГород: ${pass.city}\nСтатус: ${status}\nДата и время: ${createDate}\n`;

        if (pass.status !== 0 && pass.status !== 4) {
          message += `Дата и время окончания действия пропуска: ${termDate}\n`;
        }

        if (pass.status !== 0) {
          message += `Дата и время последнего обновления статуса: ${updateDate}\n`;
        }

        ctx.reply(message);
      })
    } else {
      await ctx.reply("Ничего не найдено");
    }
  }
}