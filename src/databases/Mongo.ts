import { Collection, MongoClient } from 'mongodb';
import Player, { DatabasePlayer } from '../player/Player';
import getConfig from '../utils/config';
import logger from '../utils/logger';
import Database from './Database';

export default class Mongo extends Database {
  private isConnected: boolean;
  private client: MongoClient;
  private collection: Collection;
  private queue: Player[];

  public constructor() {
    super();

    this.isConnected = false;
    this.queue = [];
    this.init();
  }

  private async init(): Promise<void> {
    const config = await getConfig();

    this.client = new MongoClient(config.database.config.mongo);
    await this.client.connect();
    const db = this.client.db('LunarSocket');
    this.collection = db.collection('players');

    this.isConnected = true;
    logger.log('Connected to MongoDB');

    this.emptyQueue();
  }

  private async emptyQueue(): Promise<void> {
    if (this.queue.length === 0) return;
    logger.debug(`Executing ${this.queue.length} queued database calls`);
    const promises = this.queue.map((p) => this.setPlayer(p));
    return void (await Promise.all(promises));
  }

  public async setPlayer(player: Player): Promise<void> {
    // If not connected, push the player instance into the queue
    // Once the connection will be established, the setPlayer
    // method will be called again with the player instance
    if (!this.isConnected && !this.queue.includes(player))
      return void this.queue.push(player);

    const existingPlayer = await this.getPlayer(player.uuid);

    if (existingPlayer)
      this.collection.updateOne(
        { uuid: player.uuid },
        { $set: player.getDatabasePlayer() }
      );
    else
      await this.collection.insertOne({
        // Mango specific data, used to get the player
        uuid: player.uuid,
        ...player.getDatabasePlayer(),
      });
  }

  public async getPlayer(uuid: string): Promise<DatabasePlayer> {
    return await this.collection.findOne<DatabasePlayer>({ uuid });
  }
}
