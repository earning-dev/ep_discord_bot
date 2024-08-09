import type { EPBot } from '@lib/client.js';
import type { Awaitable, ClientEvents } from 'discord.js';

export type EventName = keyof ClientEvents;

export type EventExec<T extends EventName> = (
  client: EPBot,
  ...args: T extends keyof ClientEvents ? ClientEvents[T] : any[]
) => Awaitable<void>;

export interface EventData<T extends EventName> {
  name: T;
  disabled?: string;
  once?: boolean;
}

