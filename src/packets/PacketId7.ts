import BufWrapper from '@minecraft-js/bufwrapper';
import logger from '../utils/logger';

import Packet from './Packet';

export default class PacketId7 extends Packet<id7> {
  public static id = 7;

  public constructor(buf?: BufWrapper) {
    super(buf);
  }

  public write(data: id7): void {
    this.data = data;

    this.buf = new BufWrapper();
    this.buf.writeVarInt(PacketId7.id); // Packet ID

    this.buf.writeString(JSON.stringify(data.bulk));
  }

  public read(): void {
    logger.debug(this.buf.buffer);
    this.data = {
      bulk: JSON.parse(this.buf.readString()),
    };
  }
}

interface id7 {
  bulk: unknown[];
}
