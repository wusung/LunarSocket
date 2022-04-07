import Command from './Command';
import Player from '../Player';
import online from './online';
import help from './help';
import whitelist from './whitelist';

export default class CommandHandler {
  public player: Player;

  public static commands: Command[] = [online, help, whitelist];

  public constructor(player: Player) {
    this.player = player;
  }

  handle(raw: string): void {
    const command = CommandHandler.commands.find((c) =>
      raw.startsWith(c.command)
    );

    if (!command) {
      return this.player.sendConsoleMessage('§cCommand not found');
    }

    if (raw.split(' ').includes('-h') || raw.split(' ').includes('--help')) {
      if (command.help) {
        const messages = command.help.split('\n'); // Console doesn't support \n
        messages.forEach((m) => this.player.sendConsoleMessage(m));
      } else
        this.player.sendConsoleMessage(
          "§cThis command doesn't have a help message"
        );
      return;
    }

    command.trigger(this.player, raw);
  }
}
