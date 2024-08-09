import type { EPBot } from '@lib/client.js';
import type { Awaitable, ClientEvents } from 'discord.js';

/**
 * Represents the type of event names.
 * This type is a mapped type of `ClientEvents`, which maps each key of `ClientEvents` to its type.
 */
export type EventName = keyof ClientEvents;

/**
 * Represents the type of event execution functions.
 * Takes an `EPBot` instance and the arguments of the event.
 * @template T - The type of the event name.
 * @param client - The `EPBot` instance.
 * @param args - The arguments of the event. The type of the arguments depends on the event name `T`.
 * @returns A promise that resolves to `void`.
 */
export type EventExec<T extends EventName> = (
  client: EPBot,
  ...args: T extends keyof ClientEvents ? ClientEvents[T] : any[]
) => Awaitable<void>;

/**
 * Represents the data of an event.
 * @template T - The type of the event name.
 * @property name - The name of the event.
 * @property disabled - (Optional) A string indicating why the event is disabled.
 * @property once - (Optional) A boolean indicating whether the event should be executed once.
 */
export interface EventData<T extends EventName> {
  /**
   * The name of the event.
   */
  name: T;

  /**
   * (Optional) Whether to disable the event.
   */
  disabled?: boolean;

  /**
   * (Optional) A boolean indicating whether the event should be executed once.
   */
  once?: boolean;
}
