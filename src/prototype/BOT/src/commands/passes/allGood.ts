import {Context} from "../../bot/context";
import axios from "axios";
import {Markup} from "telegraf";
import {getConfig} from "../../config/config";
import {main} from "../main";
const {cities} = getConfig("./config.yml");

export const allGood = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.session.scene.current === "checkDateAndCity.ts") {
    await axios.post("http://127.0.0.1:3000/api/v1/passes", {date: ctx.session.date, userId: ctx.from.id, city: ctx.session.city}).then(async (res) => {
      if (res.status === 201) {
        await main(ctx, next);
      }
    }).catch(async (err) => {
      await ctx.reply("Произошла ошибка, попробуйте позже");
      console.error("[PASSBOT]: ", err);
      ctx.session.scene = {
        prev: ctx.session.scene.current,
        current: "getCity"
      }
      await ctx.reply("Выберите ваш город", Markup.keyboard([
        cities, ["Назад"]
      ]).resize());
    });
  }
}