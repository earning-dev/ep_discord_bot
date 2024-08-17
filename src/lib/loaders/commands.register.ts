import { EPBot } from '@lib/client.js';
import { AnyCommand, CommandIdMap } from '@lib/types/commands.js';
import { getAuthData } from '@lib/utils/token.js';
import { APIApplicationCommand, REST, Routes } from 'discord.js';

export async function registerCommands(client: EPBot, commands: AnyCommand[]): Promise<CommandIdMap> {
  const commandIdMap: CommandIdMap = new Map();
  const { clientId, token } = getAuthData(client);

  const rest = new REST().setToken(token);

  const registeredCommands = (await rest.put(Routes.applicationGuildCommands(clientId, process.env.GUILD || ''), {
    body: commands.map((cmd) => cmd.data),
  })) as APIApplicationCommand[];

  registeredCommands.forEach((cmd, i) => {
    commandIdMap.set(cmd.id, commands[i]);
  });

  return commandIdMap;
}
