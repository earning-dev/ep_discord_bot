import contextMenuCommands from '@commands/context/index.js';
import slashCommands from '@commands/slash/index.js';
import { EPBot } from '@lib/client.js';
import { AnyCommand } from '@lib/types/commands.js';
import { getCommandIdMap } from './commandCache.js';
import { ContextMenuCommand, SlashCommand } from '@lib/builders/commands.js';

const commands: AnyCommand[] = [];

slashCommands.forEach((cmd) => commands.push(cmd));
contextMenuCommands.forEach((cmd) => commands.push(cmd));

export async function loadCommands(client: EPBot) {
  const commandIdMap = await getCommandIdMap(client, commands);
  client.on('interactionCreate', async (interaction) => {
    client.log.debug(
      `Interaction received: ${interaction.id} | ${interaction.type} | Command Id: ${interaction.isCommand() && interaction.commandId}`,
    );

    const isCommandOrAutocomplete =
      interaction.isCommand() || interaction.isContextMenuCommand() || interaction.isAutocomplete();

    if (!isCommandOrAutocomplete) return;

    const command = commandIdMap.get(interaction.commandId);

    // If command is not found return - if unknownCommand message send
    if (!command)
      return void (!interaction.isAutocomplete() && interaction.reply(`Unknown command: ${interaction.commandName}`));

    if (interaction.isAutocomplete()) {
      if (command instanceof SlashCommand)
        await command.autocomplete?.({
          interaction,
          client,
        });

      return;
    }

    // Run the command
    try {
      let epGuild = client.guilds.cache.get(process.env.GUILD!);

      if (!epGuild) epGuild = await client.guilds.fetch(process.env.GUILD!);

      if (command instanceof SlashCommand && (interaction.isChatInputCommand() || interaction.isAutocomplete()))
        await command.exec({ client, interaction, epGuild });
      else if (command instanceof ContextMenuCommand && interaction.isContextMenuCommand()) {
        await command.exec({ client, interaction, epGuild });
      } else {
        interaction.reply('Not a valid command');
      }
    } catch (e) {
      console.error(
        `There was an error running command ${command.data.name}`,
        `interaction: ${interaction.id}, channel: ${interaction.channel}, guild: ${interaction.guild}`,
        e,
      );
    }
  });
}
