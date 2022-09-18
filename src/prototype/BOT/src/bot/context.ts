import {Context as TelegrafContext} from "telegraf";

export interface Session {
  scene: {
    prev: string;
    current: string;
  };
  city: string;
  date: Date;
  selectPassId: number;
  selectUserId: number;
}

export interface Context extends TelegrafContext {
  session: Session;
  message: any;
}
