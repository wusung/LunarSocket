import { connectedPlayers } from '..';
import Command from './Command';

const command = new Command(
  'broadcast',
  'Broadcast a message to everyone, will be displayed as a pop up notification'
);

command.help = `usage: broadcast <message>`;

command.setHandler(async (player, command, args) => {
  const message = args.join(' ');

  for (player of connectedPlayers) {
    player.sendNotification('', message);
  }
});

export default command;
