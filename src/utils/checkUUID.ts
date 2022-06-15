import ConsolePlayer from '../commands/ConsolePlayer';
import Player from '../player/Player';

export default function checkUUID(uuid: string, player: Player | ConsolePlayer): boolean {
  const match =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(uuid.toLowerCase());
  if (!match) player.sendConsoleMessage(`§c${uuid} is not a valid UUID!`);
  return match;
}
