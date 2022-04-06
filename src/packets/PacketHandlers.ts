import { EventEmitter } from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import BufWrapper from '@minecraft-js/bufwrapper';

import Player from '../Player';
import logger from '../utils/logger';
import GiveEmotesPacket from './GiveEmotesPacket';
import PlayEmotePacket from './PlayEmotePacket';
import DoEmotePacket from './DoEmotePacket';
import ConsoleCommand from './ConsoleMessage';
import JoinServerPacket from './JoinServerPacket';
import EquipEmotesPacket from './EquipEmotesPacket';
import NotificationPacket from './NotificationPacket';
import PlayerInfoPacket from './PlayerInfoPacket';
import ApplyCosmeticsPacket from './ApplyCosmeticsPacket';
import PlayerInfoRequestPacket from './PlayerInfoRequestPacket';
import FriendListPacket from './FriendListPacket';
import FriendMessagePacket from './FriendMessage';
import PacketId7 from './PacketId7';
import ConsoleMessagePacket from './ConsoleMessage';
import FriendRequestPacket from './FriendRequestPacket';
import FriendResponsePacket from './FriendResponsePacket';
import ForceCrashPacket from './ForceCrashPacket';
import ModSettingsPacket from './ModSettingsPacket';

// Outgoing is when a packet is sent by the server to the client
export class OutgoingPacketHandler extends (EventEmitter as new () => TypedEventEmitter<OutgoingPacketHandlerEvents>) {
  public static packetMap = {
    giveEmotes: GiveEmotesPacket,
    playEmote: PlayEmotePacket,
    notification: NotificationPacket,
    playerInfo: PlayerInfoPacket,
    friendList: FriendListPacket,
    friendMessage: FriendMessagePacket,
    id7: PacketId7,
    friendRequest: FriendRequestPacket,
    friendResponse: FriendResponsePacket,
    forceCrash: ForceCrashPacket,
  };

  public static packets = Object.values(OutgoingPacketHandler.packetMap);

  private player: Player;

  public constructor(player: Player) {
    super();
    this.player = player;
  }

  public handle(data: Buffer): void {
    const buf = new BufWrapper(data);

    const id = buf.readVarInt();
    const Packet = OutgoingPacketHandler.packets.find((p) => p.id === id);

    if (!Packet) {
      // logger.warn('Unknown packet id (outgoing):', id);
      return this.player.writeToClient(data);
    }

    const packet = new Packet(buf);
    packet.read();

    const event = Object.keys(OutgoingPacketHandler.packetMap).find(
      (key) => OutgoingPacketHandler.packetMap[key] === Packet
    );
    // @ts-ignore - event is type of string and not keyof OutgoingPacketHandlerEvents but it works anyway
    if (this.listenerCount(event) > 0) this.emit(event, packet);
    else this.player.writeToClient(data);
  }
}

type OutgoingPacketHandlerEvents = {
  giveEmotes: (packet: GiveEmotesPacket) => void;
  playEmote: (packet: PlayEmotePacket) => void;
  notification: (packet: NotificationPacket) => void;
  playerInfo: (packet: PlayerInfoPacket) => void;
  friendList: (packet: FriendListPacket) => void;
  id7: (packet: PacketId7) => void;
  friendRequest: (packet: FriendRequestPacket) => void;
  friendResponse: (packet: FriendResponsePacket) => void;
};

// Incoming is when a packet is sent by the client to the server
export class IncomingPacketHandler extends (EventEmitter as new () => TypedEventEmitter<IncomingPacketHandlerEvents>) {
  public static packetMap = {
    doEmote: DoEmotePacket,
    consoleMessage: ConsoleMessagePacket,
    joinServer: JoinServerPacket,
    equipEmotes: EquipEmotesPacket,
    applyCosmetics: ApplyCosmeticsPacket,
    playerInfoRequest: PlayerInfoRequestPacket,
    friendMessage: FriendMessagePacket,
    friendRequest: FriendRequestPacket,
    friendResponse: FriendResponsePacket,
    modSettings: ModSettingsPacket,
  };

  public static packets = Object.values(IncomingPacketHandler.packetMap);

  private player: Player;

  public constructor(player: Player) {
    super();
    this.player = player;
  }

  public handle(data: Buffer): void {
    const buf = new BufWrapper(data);

    const id = buf.readVarInt();
    const Packet = IncomingPacketHandler.packets.find((p) => p.id === id);

    if (id === 50) return;

    if (!Packet) {
      logger.warn('Unknown packet id (incoming):', id, data.toString('hex'));
      return this.player.writeToServer(data);
    }

    const packet = new Packet(buf);
    packet.read();

    const event = Object.keys(IncomingPacketHandler.packetMap).find(
      (key) => IncomingPacketHandler.packetMap[key] === Packet
    );
    // @ts-ignore - event is type of string and not keyof IncomingPacketHandlerEvents but it works anyway
    if (this.listenerCount(event) > 0) this.emit(event, packet);
    else this.player.writeToServer(data);
  }
}

type IncomingPacketHandlerEvents = {
  doEmote: (packet: DoEmotePacket) => void;
  consoleMessage: (packet: ConsoleCommand) => void;
  joinServer: (packet: JoinServerPacket) => void;
  equipEmotes: (packet: EquipEmotesPacket) => void;
  applyCosmetics: (packet: ApplyCosmeticsPacket) => void;
  playerInfoRequest: (packet: PlayerInfoRequestPacket) => void;
  friendRequest: (packet: FriendRequestPacket) => void;
  friendResponse: (packet: FriendResponsePacket) => void;
  modSettings: (packet: ModSettingsPacket) => void;
};
