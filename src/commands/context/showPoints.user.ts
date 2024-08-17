import { contextMenuCommand } from '@lib/builders/commands.js';
import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  PermissionFlagsBits,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import pointStoreManager from '@lib/utils/pointStore.js';
import { createPointsEmbed } from '@lib/utils/index.js';
import { EMOJIS } from '@lib/constants.js';

export default contextMenuCommand({
  data: new ContextMenuCommandBuilder()
    .setName('showPoints')
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .toJSON(),
  exec: async ({ client, interaction }) => {
    await interaction.deferReply({ ephemeral: true });

    const user = (interaction as UserContextMenuCommandInteraction).targetUser;
    const dbUser = await pointStoreManager.getUser(user);

    await interaction.editReply({
      embeds: [
        createPointsEmbed(
          `${EMOJIS.fire} ${user} has \`${dbUser.points}\` points!`,
          `Last updated: ${dbUser.lastUpdatedAt} ❘ Created: ${dbUser.createdAt}`,
        ),
      ],
    });
  },
});
