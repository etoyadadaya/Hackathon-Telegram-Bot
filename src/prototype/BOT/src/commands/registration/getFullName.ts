import {Context} from "../../bot/context";
import axios from "axios";
import {Markup} from "telegraf";

export const getFullName = async (ctx: Context, next: () => Promise<void>) => {
  ctx.session.scene = {
    prev: ctx.session.scene.current,
    current: "main"
  }

  const last_name = ctx.message.text.split(" ")[0];
  const first_name = ctx.message.text.split(" ")[1];
  const middle_name = ctx.message.text.split(" ")[2];
  const uid = ctx.from.id;
  const city = ctx.session.city;
  axios.post("http://127.0.0.1:3000/api/v1/users", {last_name, first_name, middle_name, uid, city}).then(async (res) => {
    if (res.status === 201) {
      await ctx.reply("Пользователь успешно зарегестрирован", Markup.keyboard([
        "Заказать пропуск"
      ]).resize());
    }
  }).catch(async (err) => {
    if (err.response.status === 400) {
      const errors = err.response.data.errors;
      let message = "";

      Object.keys(errors).forEach((error: string) => {
        message += `${error}: ${errors[error]}\n`
      })

      await ctx.reply(message, Markup.keyboard(
        [
          "Регистрация"
        ]
      ).resize());
    }
  });
}
