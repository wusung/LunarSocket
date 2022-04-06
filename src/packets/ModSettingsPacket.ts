import BufWrapper from '@minecraft-js/bufwrapper';

import Packet from './Packet';

export default class ModSettingsPacket extends Packet<ModSettings> {
  public static id = 64;

  public constructor(buf?: BufWrapper) {
    super(buf);
  }

  public write(data: ModSettings): void {
    this.data = data;

    this.buf = new BufWrapper();
    this.buf.writeVarInt(ModSettingsPacket.id); // Packet ID

    this.buf.writeVarInt(Object.keys(data.settings).length);
    for (const key in data.settings) {
      this.buf.writeString(key);
      this.buf.writeBoolean(data.settings[key]);
    }

    this.buf.writeString(data.game);
  }

  public read(): void {
    const settingsLength = this.buf.readVarInt();
    const settings = {};
    for (let i = 0; i < settingsLength; i++) {
      const key = this.buf.readString();
      settings[key] = this.buf.readBoolean();
    }

    const game = this.buf.readString();

    this.data = {
      settings,
      game,
    };
  }
}

interface ModSettings {
  settings: { [key: string]: boolean };
  game: string;
}
