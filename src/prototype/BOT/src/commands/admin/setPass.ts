import {Context} from "../../bot/context";
import axios from "axios";
import {adminPanel} from "./admin";
import {statusPassChange} from "./statusPassChange";

export const setPass = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.session.scene.current === "setByPassID") {
    if (ctx.message.text === "Одобрить") {
      axios.put(`http://127.0.0.1:3000/api/v1/passes/${ctx.session.selectPassId}`, {
        status: 1
      }).then(async (res) => {
        if (res.status === 200) {
          await ctx.reply("Статус успешно изменен");
          await adminPanel(ctx, next);
        }
      }).catch((err) => {
        if (err.response?.status !== 404) {
          ctx.reply("Что то сломалось, попробуйте позже");
        }
      })
    }
    if (ctx.message.text === "Исполнить") {
      axios.put(`http://127.0.0.1:3000/api/v1/passes/${ctx.session.selectPassId}`, {
        status: 2
      }).then(async (res) => {
        if (res.status === 200) {
          await ctx.reply("Статус успешно изменен");
          await adminPanel(ctx, next);
        }
      }).catch((err) => {
        if (err.response?.status !== 404) {
          ctx.reply("Что то сломалось, попробуйте позже");
        }
      })
    }
    if (ctx.message.text === "Отказать") {
      axios.put(`http://127.0.0.1:3000/api/v1/passes/${ctx.session.selectPassId}`, {
        status: 4
      }).then(async (res) => {
        if (res.status === 200) {
          await ctx.reply("Статус успешно изменен");
          await adminPanel(ctx, next);
        }
      }).catch((err) => {
        if (err.response?.status !== 404) {
          ctx.reply("Что то сломалось, попробуйте позже");
        }
      })
    }
  }
  if (ctx.session.scene.current === "setByPassIDRetry") {
    if (ctx.message.text === "Одобрить") {
      axios.put(`http://127.0.0.1:3000/api/v1/passes/${ctx.session.selectPassId}`, {
        status: 1
      }).then(async (res) => {
        if (res.status === 200) {
          await ctx.reply("Статус успешно изменен");
          await statusPassChange(ctx, next);
        }
      }).catch((err) => {
        if (err.response?.status !== 404) {
          ctx.reply("Что то сломалось, попробуйте позже");
        }
      })
    }
    if (ctx.message.text === "Отказать") {
      axios.put(`http://127.0.0.1:3000/api/v1/passes/${ctx.session.selectPassId}`, {
        status: 4
      }).then(async (res) => {
        if (res.status === 200) {
          await ctx.reply("Статус успешно изменен");
          await statusPassChange(ctx, next);
        }
      }).catch((err) => {
        if (err.response?.status !== 404) {
          ctx.reply("Что то сломалось, попробуйте позже");
        }
      })
    }
    if (ctx.message.text === "Исполнить") {
      await next();
    }
  }
}
