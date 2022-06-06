import Command from './Command';

const command = new Command('kickme', 'Kick yourself from the websocket');

command.setHandler((player) => {
  player.removePlayer();
});

export default command;
