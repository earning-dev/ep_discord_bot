import type { ClientOptions } from 'discord.js';

/**
 * Represents the options for the `EPBot` class.
 *
 */
export interface EPBOptions {
  /**
   * The client options for creating a new discord.js client.
   *
   * @see [ClientOptions](https://discord.js.org/docs/packages/discord.js/14.15.3/ClientOptions:Interface)
   */
  clientOptions: ClientOptions;

  /**
   * Determines whether debug mode is enabled.
   * If `true`, debug messages will be logged.
   *
   * @default false
   */
  debug?: boolean;
}
