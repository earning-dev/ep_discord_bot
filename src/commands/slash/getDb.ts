import { slashCommand } from '@lib/builders/commands.js';
import { FILE_PATHS } from '@lib/constants.js';
import excelManager from '@lib/utils/excelManager.js';
import pointStoreManager from '@lib/utils/pointStore.js';
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default slashCommand({
  data: new SlashCommandBuilder()
    .setName('get-db')
    .setDescription('Get user points database in form of a excel file!')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .toJSON(),

  exec: async ({ client, interaction }) => {
    await interaction.deferReply({ ephemeral: true });

    const users = pointStoreManager.getDB();
    const data: Array<Array<string>> = [['User Id', 'Username', 'Points', 'Created At', 'Last Updated At']];

    users.forEach((user) => {
      data.push([
        user.id,
        user.username.trim(),
        user.points.toString(),
        user.createdAt.trim(),
        user.lastUpdatedAt.trim(),
      ]);
    });

    const excelFile = await excelManager.cleanWriteToExcel(FILE_PATHS.USER_DB.xlsx, data, "Users' Points");
    interaction.editReply({ files: [excelFile] }).catch((e) => console.error);
  },
});
