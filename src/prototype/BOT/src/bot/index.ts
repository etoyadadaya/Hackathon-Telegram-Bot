import {getConfig} from "../config/config";
import {Telegraf} from "telegraf";
import LocalSession from "telegraf-session-local";
import {Context} from "./context";
import {adminPanel} from "../commands/admin/admin";
import {statusPassChange} from "../commands/admin/statusPassChange";
import {rolesUsersChange} from "../commands/admin/rolesUsersChange";
import {help} from "../commands/help";
import {getCity} from "../commands/getCity";
import {getFullName} from "../commands/registration/getFullName";
import {registration} from "../commands/registration";
import {getPass} from "../commands/passes/getPass";
import getTime from "../commands/passes/getTime";
import {getDate} from "../commands/passes/getDate";
import {checkDateAndCity} from "../commands/passes/checkDateAndCity";
import {main} from "../commands/main";
import {getPasses} from "../commands/getPasses";
import {allGood} from "../commands/passes/allGood";
import {findPasses} from "../commands/admin/findPasses";
import {getPassID} from "../commands/admin/getPassID";
import {setPass} from "../commands/admin/setPass";
import {setByUserID} from "../commands/admin/setByUserID";
import {changeRoles} from "../commands/admin/changeRoles";
const {token, cities} = getConfig("./config.yml");

const bot = new Telegraf<Context>(token);

bot.use((new LocalSession({database: "db.json"})).middleware());

bot.start(main);

bot.help(help);

bot.hears("Регистрация", registration);

bot.hears("Заказать пропуск", getPass);

bot.hears(cities, getCity);

bot.hears("Все верно", allGood);

bot.hears("Исправить", checkDateAndCity);

bot.hears("Список пропусков", getPasses);

bot.command("passes", getPasses);

bot.hears("Админка", adminPanel);

bot.command("admin", adminPanel);

bot.hears("Изменить статус пропуска", statusPassChange);

bot.hears("Изменить роли пользователей", rolesUsersChange);

bot.hears("Поиск пропуска", findPasses);

bot.hears(["Одобрить", "Отказать", "Исполнить"], setPass);

bot.hears(["Управление ролями", "Управление пропусками", "Поиск пропусков"], changeRoles);

bot.hears("Назад", main);

bot.on("text", async (ctx, next) => {
  if (ctx.session.scene.current === "getFullName") {
    await getFullName(ctx, next);
  } else if (ctx.session.scene.current === "getTime") {
    await getTime(ctx, next);
  } else if (ctx.session.scene.current === "getDate") {
    await getDate(ctx, next);
  } else if (ctx.session.scene.current === "getPassID") {
    await getPassID(ctx, next);
  } else if (ctx.session.scene.current === "setByUserID") {
    await setByUserID(ctx, next);
  } else {
    await ctx.reply("Команда не распознана, попробуйте /help");
  }
})

bot.catch((err) => {
  console.error("[PassBOT]: telegraf error occured", err);
});

export async function start(): Promise<void> {

  await bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
