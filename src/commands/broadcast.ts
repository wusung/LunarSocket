import { connectedPlayers } from '..';
import Command from './Command';

const command = new Command('broadcast');

command.help = `usage: broadcast <message>`;

command.setHandler(async (player, command, args) => {
  const message = args.join(' ');

  for (player of connectedPlayers) {
    player.sendNotification('', message);
  }
});

export default command;
