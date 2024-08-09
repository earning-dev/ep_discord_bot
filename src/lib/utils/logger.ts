// Types
import type { EPBot } from '@lib/client.js';
import type { Logger } from '@lib/types/logger.js';

/**
 * Creates a logger object with methods for logging messages, errors and debug messages.
 *
 * @param {Nexonite} client - The Nexonite instance.
 * @returns {Logger} The logger object.
 */
export function createLogger(client: EPBot): Logger {
  /**
   * An object containing the logging methods.
   */
  const methods = {
    /**
     * Logs a message.
     *
     * @param {any[]} messages - The messages to log.
     */
    log: (...messages: any[]) => console.log('\x1b[1m\x1b[32m[Log]\x1b[22m\x1b[39m', ...messages),
    /**
     * Logs an error.
     *
     * @param {any[]} errors - The errors to log.
     */
    error: (...errors: any[]) => console.error('\x1b[1m\x1b[31m[Error]\x1b[22m\x1b[39m', ...errors),
    /**
     * Logs a debug message if the client is in debug mode.
     *
     * @param {any[]} messages - The debug messages to log.
     */
    debug: (...messages: any[]) => {
      if (client.eOptions.debug) {
        console.debug('\x1b[1m\x1b[34m[Debug]\x1b[22m\x1b[39m', ...messages);
      }
    },
  };

  // Merge the log method and the rest of the methods into one object and return it.
  return Object.assign(methods.log, methods);
}
