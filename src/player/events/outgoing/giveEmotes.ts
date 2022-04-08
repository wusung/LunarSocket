import GiveEmotesPacket from '../../../packets/GiveEmotesPacket';
import logger from '../../../utils/logger';
import Player from '../../Player';

export default function (player: Player, packet: GiveEmotesPacket): void {
  player.emotes.owned.owned = packet.data.owned;
  player.emotes.equipped.owned = packet.data.equipped;
  player.sendEmotes();
  player.updateInstanceStorage();
  logger.debug(
    `[GiveEmotes] ${player.username} has given emote data.`,
    packet.data
  );
}
