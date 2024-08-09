import 'dotenv/config.js';

import { EPBot } from '@lib/client.js';
import { ActivityType, GatewayIntentBits, Partials } from 'discord.js';

const { Guilds, GuildMessages, GuildMembers, MessageContent, GuildVoiceStates } = GatewayIntentBits;

const { Channel, GuildMember, Message, Reaction, ThreadMember, User } = Partials;

const client = new EPBot({
  // Essentials
  clientOptions: {
    intents: [Guilds, GuildMessages, GuildMembers, MessageContent, GuildVoiceStates],
    partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User],
    presence: {
      status: 'dnd',
      activities: [
        {
          name: 'नाम में क्या रखा है? जीवन का असली आधार तो प्रेम है।',
          type: ActivityType.Custom,
          state: '🎓 Unlock Your Financial Growth Together!',
        },
      ],
    },
  },
  debug: true
});

try {
  await client.login();
} catch (error) {
  console.error('Failed to login:\n', error);
}
