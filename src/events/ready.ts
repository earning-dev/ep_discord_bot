import { event } from '@lib/builders/events.js';

export default event({
  name: 'ready',
  exec: async (_, client) => {
    _.log(`Logged in as ${client.user.tag}!`);
  },
});
