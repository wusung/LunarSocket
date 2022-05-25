import { connectedPlayers } from '..';
import logger from '../utils/logger';
import Command from './Command';

const command = new Command(
  'broadcast',
  'Broadcast a message to everyone, will be displayed as a pop up notification'
);

command.help = `usage: broadcast <message>`;

command.setHandler(async (player, command, args) => {
  let message = args
    .join(' ')
    .replace(/&([0123456789AaBbCcDdEeFfKkLlMmNnOoRr])/g, '§$1');

  for (const player of connectedPlayers) player.sendNotification('', message);

  logger.log(`${player.username} broadcasted: ${message}`);
});

export default command;
