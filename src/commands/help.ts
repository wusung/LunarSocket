import CommandHandler from './CommandHandler';
import Command from './Command';

const command = new Command('help');

command.setHandler((player) => {
  player.sendConsoleMessage('Available commands:');
  CommandHandler.commands.forEach((c) => {
    player.sendConsoleMessage(`  ${c.command}`);
  });
  player.sendConsoleMessage(' ');
  player.sendConsoleMessage('Use "command --help" to see command help message');
});

export default command;
