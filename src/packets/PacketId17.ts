import BufWrapper from '@minecraft-js/bufwrapper';

import Packet from './Packet';

export default class PacketId17 extends Packet<Id17> {
  public static id = 17;

  public constructor(buf?: BufWrapper) {
    super(buf);
  }

  public write(data: Id17): void {
    this.data = data;

    this.buf = new BufWrapper(null, { oneConcat: true });
    this.buf.writeVarInt(PacketId17.id); // Packet ID

    this.buf.writeString(data.uuid);

    this.buf.finish();
  }

  public read(): void {
    this.data = {
      uuid: this.buf.readString(),
    };
  }
}

interface Id17 {
  uuid: string;
}
