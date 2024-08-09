import events from '@events/index.js';
import { Event } from '@lib/builders/events.js';

// Types
import type { EPBot } from '@lib/client.js';
import type { EventName } from '@lib/types/events.js';
import type { ClientEvents } from 'discord.js';

export async function loadEvents(client: EPBot): Promise<void> {
  for (const event of events) {
    if (!(event instanceof Event)) throw new Error(`Found invalid item "${event}" in events!`);

    const eventExec = async (...args: ClientEvents[EventName]) => {
      try {
        await (event as Event<EventName>).exec(client, ...args);
      } catch (error) {
        client.log.error(`There was an error running event -> ${event.name}\n`, error);
      }
    };

    !event.data.disabled && event.data.once ? client.once(event.name, eventExec) : client.on(event.name, eventExec);
  }
}
