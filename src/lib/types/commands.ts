import { ContextMenuCommand, SlashCommand } from '@lib/builders/commands.js';
import { EPBot } from '@lib/client.js';
import {
  AutocompleteInteraction,
  Awaitable,
  BaseInteraction,
  Guild,
  RESTPostAPIApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';

export type SlashCommandData = RESTPostAPIApplicationCommandsJSONBody;
export type ContextMenuCommandData = RESTPostAPIContextMenuApplicationCommandsJSONBody;

export interface CommandExecOptions<T extends BaseInteraction> {
  client: EPBot;
  interaction: T;
  epGuild: Guild;
}

export type CommandExec<T extends BaseInteraction> = (options: CommandExecOptions<T>) => Awaitable<void>;
export type AutocompleteExec = (options: { client: EPBot; interaction: AutocompleteInteraction }) => Awaitable<void>;
export type AnyCommand = SlashCommand | ContextMenuCommand;

export type CommandIdMap = Map<string, AnyCommand>;
export type IdResolverMap = Record<string, string>;