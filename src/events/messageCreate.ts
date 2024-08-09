import { event } from '@lib/builders/events.js';

export default event({
  name: 'messageCreate',
  exec: async (client, msg) => {
    client.log('Message created!!!!', msg.content);
  },
});
