import { EventData, EventExec, EventName } from '@lib/types/events.js';

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

export function event<T extends EventName>(options: EventData<T> & { exec: EventExec<T> }) {
  const { exec, ...rest } = options;
  const event = new Event(options.name, exec, rest);
  return event;
}
