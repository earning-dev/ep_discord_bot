import { SnowflakeUtil } from 'discord.js';

/**
 * Check if the given id is a valid snowflake.
 * Thanks to https://github.com/ghostdevv/jellycommands
 *
 * @param {any} id - The id to be checked.
 * @returns {id is string} - True if the id is a valid snowflake, false otherwise.
 */
export function isSnowflake(id: any): id is string {
    try {
        SnowflakeUtil.deconstruct(id);
        return true;
    } catch {
        return false;
    }
}