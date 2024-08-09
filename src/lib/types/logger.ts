/**
 * Interface for a logging utility.
 * Provides methods for various levels of logging.
 */
export interface Logger {
    /**
     * Default logging method.
     * Can be used to log any type of messages.
     *
     * @param {...any[]} messages - The messages to log.
     */
    (...messages: any[]): void;

    /**
     * Logs informational messages.
     *
     * @param {...any[]} messages - The messages to log.
     */
    log: (...messages: any[]) => void;

    /**
     * Logs debug messages.
     * Useful for debugging purposes.
     *
     * @param {...any[]} messages - The messages to log.
     */
    debug: (...messages: any[]) => void;

    /**
     * Logs error messages.
     * Should be used for logging errors.
     *
     * @param {...any[]} errors - The errors to log.
     */
    error: (...errors: any[]) => void;
}