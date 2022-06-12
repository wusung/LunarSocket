import BufWrapper from '@minecraft-js/bufwrapper';
import Packet from './Packet';

export default class ApplyCosmeticsPacket extends Packet<ApplyCosmetics> {
  public static id = 20;

  public constructor(buf?: BufWrapper) {
    super(buf);
  }

  public write(data: ApplyCosmetics): void {
    this.data = data;

    this.buf = new BufWrapper();
    this.buf.writeVarInt(ApplyCosmeticsPacket.id); // Packet ID

    this.buf.writeInt(data.cosmetics.length);
    for (const cosmetic of data.cosmetics) {
      this.buf.writeLong(cosmetic.id);
      this.buf.writeBoolean(cosmetic.equipped);
    }

    this.buf.writeBoolean(data.clothCloak);
    this.buf.writeBoolean(data.showHatAboveHelmet);
    this.buf.writeBoolean(data.scaleHatWithHeadwear);

    this.buf.writeVarInt(Object.keys(data.unknownMap).length);
    for (const key in data.unknownMap) {
      if (Object.prototype.hasOwnProperty.call(data.unknownMap, key)) {
        const element = data.unknownMap[key];
        this.buf.writeInt(parseInt(key));
        this.buf.writeFloat(element);
      }
    }

    this.buf.writeInt(data.unknownInt);
    this.buf.writeBoolean(data.unknownBoolean);
  }

  public read(): void {
    const cosmeticsLength = this.buf.readInt();
    const cosmetics: Cosmetic[] = [];
    for (let i = 0; i < cosmeticsLength; i++) {
      cosmetics.push({
        // Returns a number and not a bigint because the `asBigInt` argument is not passed
        id: this.buf.readLong() as number,
        equipped: this.buf.readBoolean(),
      });
    }

    const clothCloak = this.buf.readBoolean();
    const showHatAboveHelmet = this.buf.readBoolean();
    const scaleHatWithHeadwear = this.buf.readBoolean();

    const unknownMapLength = this.buf.readVarInt();
    const unknownMap: { [key: number]: number } = {};
    for (let i = 0; i < unknownMapLength; i++)
      unknownMap[this.buf.readInt()] = this.buf.readFloat();

    const unknownInt = this.buf.readInt();
    const unknownBoolean = this.buf.readBoolean();

    this.data = {
      cosmetics,
      clothCloak,
      showHatAboveHelmet,
      scaleHatWithHeadwear,
      unknownMap,
      unknownInt,
      unknownBoolean,
    };
  }
}

interface Cosmetic {
  id: number;
  equipped: boolean;
}

interface ApplyCosmetics {
  cosmetics: Cosmetic[];
  clothCloak: boolean;
  showHatAboveHelmet: boolean;
  scaleHatWithHeadwear: boolean;
  unknownMap: { [key: number]: number };
  unknownInt: number;
  unknownBoolean: boolean;
}
