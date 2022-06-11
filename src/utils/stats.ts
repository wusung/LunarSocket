import { writeFile } from 'node:fs/promises';
import { connectedPlayers } from '..';

const stats = {
  onlinePlayers: {} as { [key: string]: number },
};

function onlineListener(): void {
  setInterval(async () => {
    const date = new Date();
    const key = `${date.getHours()}:${date.getMinutes()}`;
    stats.onlinePlayers[key] = connectedPlayers.length;

    setTimeout(() => {
      delete stats.onlinePlayers[key];
    }, 24 * 60 * 60 * 1000);

    let csv = 'Time, Online Players\n';
    for (const time in stats.onlinePlayers) {
      if (Object.prototype.hasOwnProperty.call(stats.onlinePlayers, time)) {
        const count = stats.onlinePlayers[time];
        csv += `${time},${count}\n`;
      }
    }

    await writeFile('stats.csv', csv, 'utf8');
  }, 1 * 60 * 1000); // Every minutes
}

export default function startStats(): void {
  onlineListener();
}
