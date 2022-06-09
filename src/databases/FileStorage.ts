import { readFile, stat, writeFile } from 'node:fs/promises';
import Player, { DatabasePlayer } from '../player/Player';
import getConfig from '../utils/config';
import Database from './Database';

export default class FileStorage extends Database {
  private filePath: string;
  private file: { [key: string]: DatabasePlayer };

  public constructor() {
    super();

    this.init();
  }

  private async init(): Promise<void> {
    this.filePath = (await getConfig()).database.config.filePath;
    this.file = {};

    if (!(await stat(this.filePath).catch(() => undefined))) {
      await this.writeFile();
    }

    const file = await readFile(this.filePath, 'utf8');
    this.file = JSON.parse(file);
  }

  private async writeFile(): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(this.file));
  }

  public async setPlayer(player: Player): Promise<void> {
    this.file[player.uuid] = player.getDatabasePlayer();
    await this.writeFile();
  }

  public async getPlayer(uuid: string): Promise<DatabasePlayer> {
    return this.file[uuid];
  }
}
