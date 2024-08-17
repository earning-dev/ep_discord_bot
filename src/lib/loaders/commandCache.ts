import { Cache } from '@lib/cache.js';
import { EPBot } from '@lib/client.js';
import { AnyCommand, CommandIdMap, IdResolverMap } from '@lib/types/commands.js';
import { registerCommands } from './commands.register.js';

export async function getCommandIdMap(client: EPBot, commands: AnyCommand[]) {
  client.log.debug('Loading command cache...');

  const idResolverMap = new CommandIdResolver();
  const cache = new CommandCache();

  if (cache.validate(commands)) {
    client.log.debug('Command cache is valid');

    const commandIdMap = idResolverMap.get(commands);

    if (commandIdMap) {
      client.log.debug('Command Id Resolution success');
      return commandIdMap;
    }

    // This will only run if a CommandManager isn't returned above
    client.log.debug('Id Resolver failed, re-registering commands');
  }

  client.log.debug('Command cache is invalid, registering commands');

  const commandIdMap = await registerCommands(client, commands);

  client.log.debug('Command cache Updated');
  cache.set(commands);

  client.log.debug('Command Id Resolver Updated');
  idResolverMap.set(commandIdMap);

  return commandIdMap;
}

export class CommandCache {
  private cache = new Cache('command-cache');

  set(commands: AnyCommand[]) {
    this.cache.set<string[]>(this.getHashIds(commands));
  }

  getHashIds(commands: AnyCommand[]) {
    return commands.map((cmd) => cmd.hashId);
  }

  validate(commands: AnyCommand[]): boolean {
    const ids = this.cache.get<string[]>();
    if (!ids || !Array.isArray(ids)) return false;

    const newIds = this.getHashIds(commands);

    // If the lengths aren't the same then they can't possibly be equal
    if (newIds.length != ids.length) return false;

    // If a id in newIds doesn't exist in the cache then exit
    for (const id of newIds) {
      if (!ids.includes(id)) return false;
    }

    return true;
  }
}

export class CommandIdResolver {
  private cache = new Cache('command-Id-resolver');

  set(commands: CommandIdMap) {
    const data: IdResolverMap = {};

    for (const [commandId, command] of commands) {
      data[commandId] = command.hashId;
    }

    this.cache.set<IdResolverMap>(data);
  }

  get(commands: AnyCommand[]): CommandIdMap | false {
    const ids = this.cache.get<IdResolverMap>();

    if (!ids) return false;

    const commandIdMap: CommandIdMap = new Map();
    const commandsArray = Array.from(commands);

    for (const [commandId, hashId] of Object.entries(ids)) {
      const command = commandsArray.find((command) => command.hashId === hashId);

      if (!command) return false;

      commandIdMap.set(commandId, command);
    }

    return commandIdMap;
  }
}
