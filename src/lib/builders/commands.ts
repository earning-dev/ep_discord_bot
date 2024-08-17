import { ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
import { BaseInteraction } from 'discord.js';
import { createHash } from 'node:crypto';
import { AutocompleteExec, CommandExec, ContextMenuCommandData, SlashCommandData } from '@lib/types/commands.js';

export class BaseCommand<
  A extends SlashCommandData | ContextMenuCommandData,
  K extends CommandExec<T>,
  T extends BaseInteraction = ChatInputCommandInteraction | ContextMenuCommandInteraction,
> {
  public readonly data: A;
  public readonly exec: K;

  constructor(data: A, exec: K) {
    if (typeof exec !== 'function') throw new TypeError(`Expected type function for run, received ${typeof exec}`);

    this.data = data;
    this.exec = exec;
  }

  get hashId() {
    return createHash('sha256').update(JSON.stringify(this.data)).digest('hex');
  }
}

export class ContextMenuCommand extends BaseCommand<
  ContextMenuCommandData,
  CommandExec<ContextMenuCommandInteraction>,
  ContextMenuCommandInteraction
> {
  constructor(data: ContextMenuCommandData, exec: CommandExec<ContextMenuCommandInteraction>) {
    super(data, exec);
  }
}

export function contextMenuCommand({
  data,
  exec,
}: {
  data: ContextMenuCommandData;
  exec: CommandExec<ContextMenuCommandInteraction>;
}): ContextMenuCommand {
  return new ContextMenuCommand(data, exec);
}

export class SlashCommand extends BaseCommand<
  SlashCommandData,
  CommandExec<ChatInputCommandInteraction>,
  ChatInputCommandInteraction
> {
  public readonly autocomplete?: AutocompleteExec;

  constructor(data: SlashCommandData, exec: CommandExec<ChatInputCommandInteraction>, autocomplete?: AutocompleteExec) {
    if (typeof autocomplete !== 'undefined' && typeof autocomplete !== 'function') {
      throw new TypeError(`Expected type function for autocomplete, received ${typeof autocomplete}`);
    }
    super(data, exec);
    this.autocomplete = autocomplete;
  }
}

export function slashCommand({
  data,
  exec,
  autocomplete,
}: {
  data: SlashCommandData;
  exec: CommandExec<ChatInputCommandInteraction>;
  autocomplete?: AutocompleteExec;
}): SlashCommand {
  return new SlashCommand(data, exec, autocomplete);
}
