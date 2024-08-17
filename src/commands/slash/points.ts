import { slashCommand } from '@lib/builders/commands.js';
import { EMOJIS } from '@lib/constants.js';
import { createPointsEmbed } from '@lib/utils/index.js';
import pointStoreManager from '@lib/utils/pointStore.js';
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default slashCommand({
  data: new SlashCommandBuilder()
    .setName('point')
    .setDescription('Points of the user')
    .addSubcommand((cmd) =>
      cmd
        .setName('add')
        .setDescription('Adds points to the user')
        .addUserOption((opt) => opt.setName('user').setDescription('User to add points').setRequired(true))
        .addNumberOption((opt) =>
          opt.setName('points').setDescription('Points to add').setMinValue(1).setMaxValue(100).setRequired(true),
        ),
    )
    .addSubcommand((cmd) =>
      cmd
        .setName('remove')
        .setDescription('Removes points from the user')
        .addUserOption((opt) => opt.setName('user').setDescription('User to remove points from').setRequired(true))
        .addNumberOption((opt) =>
          opt.setName('points').setDescription('Points to remove').setMinValue(1).setMaxValue(100).setRequired(true),
        )
        .addStringOption((opt) =>
          opt.setName('reason').setDescription('Reason for removing points').setRequired(true).setMinLength(12),
        ),
    )
    .addSubcommand((cmd) =>
      cmd
        .setName('show')
        .setDescription('Shows total points of the user')
        .addUserOption((opt) => opt.setName('user').setDescription('User to show the points of')),
    )
    .toJSON(),

  exec: async ({ client, interaction }) => {
    await interaction.deferReply({ ephemeral: true });

    const command = interaction.options.getSubcommand(true);
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const points = interaction.options.getNumber('points') || 0;
    const deductionReason = interaction.options.getString('reason') || '';

    let dbUser = await pointStoreManager.getUser(targetUser);

    switch (command) {
      case 'add':
        dbUser = await pointStoreManager.updatePoints(targetUser, points, 'add');
        await interaction.editReply({
          embeds: [
            createPointsEmbed(
              `${EMOJIS.success} Added \`${points}\` points to ${targetUser} !\n- They now have \`${dbUser.points}\` points!`,
              `Last updated: ${dbUser.lastUpdatedAt} ❘ Created: ${dbUser.createdAt}`,
            ),
          ],
        });

        await targetUser
          .send({
            embeds: [
              createPointsEmbed(
                `${EMOJIS.success} You were awarded \`${points}\` points !\n- You now have \`${dbUser.points}\` points!`,
                `Last updated: ${dbUser.lastUpdatedAt} ❘ Created: ${dbUser.createdAt}`,
              ).setTitle('Congrats! 🎉'),
            ],
          })
          .catch((r) =>
            interaction.followUp({
              embeds: [
                {
                  description: `${EMOJIS.fail} Failed to send a direct message to ${targetUser}, they might have blocked direct messages from this server!`,
                  color: 0xff0000,
                },
              ],
              ephemeral: true,
            }),
          );
        break;

      case 'remove':
        if (points > dbUser.points) {
          await interaction.editReply({
            embeds: [
              createPointsEmbed(
                `${EMOJIS.fail} ${targetUser} has only \`${dbUser.points}\` points!`,
                `Created: ${dbUser.createdAt}`,
                'Fail',
              ),
            ],
          });
          break;
        }
        dbUser = await pointStoreManager.updatePoints(targetUser, points, 'remove');
        await interaction.editReply({
          embeds: [
            createPointsEmbed(
              `${EMOJIS.success} Removed \`${points}\` from ${targetUser} !\n- They now have \`${dbUser.points}\` points!`,
              `Last updated: ${dbUser.lastUpdatedAt} ❘ Created: ${dbUser.createdAt}`,
            ),
          ],
        });

        await targetUser
          .send({
            embeds: [
              createPointsEmbed(
                `${EMOJIS.fail} \`${points}\` points have been deducted from you!\n - You now have \`${dbUser.points}\` points!`,
                `Last updated: ${dbUser.lastUpdatedAt} ❘ Created: ${dbUser.createdAt}`,
                'Fail',
              )
                .setFields({ name: 'Reason', value: `${deductionReason}` })
                .setTitle('Oops! 😢'),
            ],
          })
          .catch((r) =>
            interaction.followUp({
              embeds: [
                {
                  description: `${EMOJIS.fail} Failed to send a direct message to ${targetUser}, they might have blocked direct messages from this server!`,
                  color: 0xff0000,
                },
              ],
              ephemeral: true,
            }),
          );
        break;

      case 'show':
        await interaction.editReply({
          embeds: [
            createPointsEmbed(
              `${EMOJIS.fire} ${targetUser} has \`${dbUser.points}\` points!`,
              `Last updated: ${dbUser.lastUpdatedAt} ❘ Created: ${dbUser.createdAt}`,
            ),
          ],
        });
        break;

      default:
        console.warn('[Unreachable Reached]: Invalid command');
        break;
    }
  },
});
