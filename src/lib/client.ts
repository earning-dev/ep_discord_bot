import { Client } from 'discord.js';
import { loadCommands } from './loaders/commands.js';
import { loadEvents } from './loaders/events.js';
import { createLogger } from './utils/logger.js';

// Types
import type { EPBOptions } from './types/client.js';
import type { Logger } from './types/logger.js';

export class EPBot extends Client {
  public readonly eOptions: EPBOptions;
  public readonly log: Logger;

  constructor(options: EPBOptions) {
    super(options.clientOptions);

    this.eOptions = options;
    this.log = createLogger(this);
  }

  async login(token?: string): Promise<string> {
    // Load Events
    this.log.debug('Loading events...');
    await loadEvents(this);
    this.log.debug('Events loaded.');

    // Load Commands
    this.log.debug('Loading commands...');
    await loadCommands(this);
    this.log.debug('Commands loaded.');

    return super.login(token);
  }
}
