import BufWrapper from '@minecraft-js/bufwrapper';
import Packet from './Packet';

export default class PlayerInfoPacket extends Packet<PlayerInfo> {
  public static id = 8;

  public constructor(buf?: BufWrapper) {
    super(buf);
  }

  public write(data: PlayerInfo): void {
    this.data = data;

    this.buf = new BufWrapper();
    this.buf.writeVarInt(PlayerInfoPacket.id); // Packet ID

    this.buf.writeUUID(data.uuid);

    this.buf.writeVarInt(data.cosmetics.length);
    for (const cosmetic of data.cosmetics) {
      this.buf.writeVarInt(cosmetic.id);
      this.buf.writeBoolean(cosmetic.equipped);
    }
    this.buf.writeInt(data.color);
    this.buf.writeBoolean(data.unknownBooleanA);
    this.buf.writeBoolean(data.premium);
    this.buf.writeBoolean(data.clothCloak);
    this.buf.writeBoolean(data.showHatAboveHelmet);
    this.buf.writeBoolean(data.scaleHatWithHeadwear);

    const unknownHashMapKeys = Object.keys(data.unknownHashMap);
    this.buf.writeVarInt(unknownHashMapKeys.length);
    for (const key of unknownHashMapKeys) {
      this.buf.writeInt(parseInt(key));
      this.buf.writeFloat(data.unknownHashMap[key]);
    }

    this.buf.writeInt(data.plusColor);
    this.buf.writeBoolean(data.unknownBooleanB);
  }

  public read(): void {
    const uuid = this.buf.readUUID();
    const cosmeticsLength = this.buf.readVarInt();
    const cosmetics: Cosmetic[] = [];
    for (let i = 0; i < cosmeticsLength; i++) {
      cosmetics.push({
        id: this.buf.readVarInt(),
        equipped: this.buf.readBoolean(),
      });
    }

    const color = this.buf.readInt();
    const unknownBooleanA = this.buf.readBoolean();
    const premium = this.buf.readBoolean();
    const clothCloak = this.buf.readBoolean();
    const showHatAboveHelmet = this.buf.readBoolean();
    const scaleHatWithHeadwear = this.buf.readBoolean();

    const unknownHashMapKeysLength = this.buf.readVarInt();
    const unknownHashMap: { [key: number]: number } = {};
    for (let i = 0; i < unknownHashMapKeysLength; i++) {
      const key = this.buf.readInt();
      const value = this.buf.readFloat() as number;
      unknownHashMap[key] = value;
    }

    const plusColor = this.buf.readInt();
    const unknownBooleanB = this.buf.readBoolean();

    this.data = {
      uuid,
      cosmetics,
      color,
      unknownBooleanA,
      premium,
      clothCloak,
      showHatAboveHelmet,
      scaleHatWithHeadwear,
      unknownHashMap,
      plusColor,
      unknownBooleanB,
    };
  }
}

interface Cosmetic {
  id: number;
  equipped: boolean;
}

interface PlayerInfo {
  uuid: string;
  cosmetics: Cosmetic[];
  color: number;
  unknownBooleanA: boolean;
  premium: boolean;
  clothCloak: boolean;
  showHatAboveHelmet: boolean;
  scaleHatWithHeadwear: boolean;
  unknownHashMap: { [key: number]: number };
  plusColor: number;
  unknownBooleanB: boolean;
}
