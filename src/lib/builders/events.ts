import { EventData, EventExec, EventName } from '@lib/types/events.js';

/**
 * Represents an event in the bot.
 * @template T - The type of the event name.
 */
export class Event<T extends EventName> {
  public readonly data: EventData<T>;

  constructor(
    public readonly name: T,
    public readonly exec: EventExec<T>,
    data: EventData<T>,
  ) {
    if (typeof name !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    if (!exec || typeof exec != 'function')
      throw new TypeError(`Expected type function for run, received ${typeof exec}`);

    this.data = data;
  }
}

/**
 * Creates a new event.
 * @template T - The type of the event name.
 * @param options - The options for the event.
 * @returns The created event.
 */
export function event<T extends EventName>(options: EventData<T> & { exec: EventExec<T> }) {
  const { exec, ...rest } = options;
  return new Event(options.name, exec, rest);
}
