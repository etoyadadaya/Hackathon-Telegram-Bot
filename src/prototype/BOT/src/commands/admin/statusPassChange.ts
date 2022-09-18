import {Context} from "../../bot/context";
import axios from "axios";
import {adminPanel} from "./admin";
import {getDataString} from "../../utils/getDataString";
import {getUserDataByID} from "../../utils/getUserDataByID";
import {Markup} from "telegraf";
import {canManagePasses} from "../../utils/canManagePasses";

export const statusPassChange = async (ctx: Context, next: () => Promise<void>) => {
  if (await canManagePasses(ctx.from.id)) {
    let city: number;

    if (ctx.session.city == "Москва") {
      city = 0;
    } else if (ctx.session.city == "Казань") {
      city = 1;
    } else if (ctx.session.city == "Новосибирск") {
      city = 2;
    }
    axios.get<{
      id: number,
      status: number,
      date: Date,
      term: Date,
      city: string,
      userId: number,
      createdAt: Date,
      updatedAt: Date
    }>(`http://127.0.0.1:3000/api/v1/passes/city/${city}`).then(async (res) => {
      if (res.status === 200) {
        let status = "Заявка";
        const createDate = `${getDataString(res.data.date)}`;
        let termDate = "";
        let updateDate = "";

        switch (res.data.status) {
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

        if (res.data.status !== 0) {
          termDate = `${getDataString(res.data.term)}`;
        }

        if (res.data.status !== 0) {
          updateDate = `${getDataString(res.data.updatedAt)}`;
        }

        let message = `ПРОПУСК  #${res.data.id}\n\nГород: ${res.data.city}\nСтатус: ${status}\nДата и время: ${createDate}\n`;

        if (res.data.status !== 0) {
          message += `Дата и время окончания действия пропуска: ${termDate}\nДата и время последнего обновления статуса: ${updateDate}\n`;
        }

        const {user, errors} = await getUserDataByID(res.data.userId);

        if (!errors && user) {
          message += `Заказал: ${user.last_name} ${user.first_name} ${user.middle_name}`
        }
        await ctx.reply(message, Markup.keyboard([
          ["Одобрить", "Отказать"],
          ["Назад"]
        ]).resize());
        ctx.session.scene = {
          prev: ctx.session.scene.current,
          current: "setByPassIDRetry"
        }
        ctx.session.selectPassId = res.data.id;
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
