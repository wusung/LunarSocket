# LunarSocket

Lunar Socket is a Websocket server for Lunar Client.
It allows you to proxy the connection between Lunar Client and Lunar Servers. (To give you cosmetics or emotes for example)

Lunar Client <-> Lunar Socket <-> Lunar Servers

It can intercepts and edit the data in the packets.

# Protocol

You can see Lunar Client protocol detailed [here](https://github.com/Solar-Tweaks/LunarSocket/blob/main/doc/protocol.md)

# Installation

```bash
$ git clone https://github.com/Solar-Tweaks/LunarSocket # Clone repo
$ cd LunarSocket # Go to LunarSocket folder
$ npm install # Install dependencies
$ npm run build # Build the project
```

# Configuration

Open the `config.example.jsonc` file and edit the values
Once you have edited the file save it as `config.json` and start the server.

## Database

There's two types of databases available:

- `instanceStorage` - Stores the data in the Lunar Socket instance which means that the data will be deleted when the server is restarted/stopped/updated.
- `mango` - Stores the data in a MongoDB database.

# Start the server

```bash
$ npm start
```
