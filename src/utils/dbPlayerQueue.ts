import Player from '../player/Player';
import logger from './logger';

export default class DatabasePlayerQueue {
  private queue: Player[];
  private setPlayer: (player: Player) => Promise<void>;

  public constructor(setPlayer: (player: Player) => Promise<void>) {
    this.queue = [];
    this.setPlayer = setPlayer;
  }

  public push(player: Player): void {
    if (this.queue.includes(player)) return;
    this.queue.push(player);
  }

  public async emptyQueue(): Promise<void> {
    if (this.queue.length === 0) return;
    logger.debug(`Executing ${this.queue.length} queued database calls`);
    const promises = this.queue.map((p) => this.setPlayer(p));
    return void (await Promise.all(promises));
  }
}
