import { Client } from 'discord.js';

// Types
import type { EPBOptions } from './types/client.js';

export class EPBot extends Client {
  constructor(options: EPBOptions) {
    super(options.clientOptions);
  }

  async login(token?: string): Promise<string> {
    return super.login(token);
  }
}
