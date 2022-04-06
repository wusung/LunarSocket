# Overview

| Packet ID | Name                                                                                          | Bound to |
|-----------|-----------------------------------------------------------------------------------------------|----------|
| 2         | ConsoleMessage ([C](#consolemessage-clientbound---2)\|[S](#consolemessage-serverbound---2))   | Both     |
| 3         | [Notification](#notification---3)                                                             | Client   |
| 4         | [FriendList](#friendlist---4)                                                                 | Client   |
| 5         | [FriendMessage](#friendmessage---5)                                              | Both     |
| 6         | [JoinServer](#joinserver---6)                                                                 | Server   |
| 7         | [Unknown](#unknown---7)                                                                       | Client   |
| 8         | [PlayerInfo](#playerinfo---8)                                                                 | Client   |
| 9         | FriendRequest ([C](#friendrequest-clientbound---9)\|[S](#friendrequest-serverbound---9))      | Both     |
| 16        |                                                                                               |          |
| 17        |                                                                                               |          |
| 18        |                                                                                               |          |
| 20        | [ApplyCosmetics](#applycosmetics---20)                                                        | Server   |
| 21        | FriendResponse ([C](#friendresponse-clientbound---21)\|[S](#friendresponse-serverbound---21)) | Both     |
| 22        |                                                                                               |          |
| 24        |                                                                                               |          |
| 25        |                                                                                               |          |
| 33        | [ForceCrash](#forcecrash---33)                                                                | Client   |
| 35        | [TaskListRequest](#tasklistrequest---35)                                                      | Client   |
| 36        | [TaskList](#tasklist---36)                                                                    | Server   |
| 39        | [DoEmote](#doemote---39)                                                                      | Server   |
| 40        |                                                                                               |          |
| 48        | [PlayerInfoRequest](#playerinforequest---48)                                                  | Server   |
| 50        |                                                                                               |          |
| 51        | [PlayEmote](#playemote---51)                                                                  | Client   |
| 52        |                                                                                               |          |
| 53        |                                                                                               |          |
| 54        |                                                                                               |          |
| 55        |                                                                                               |          |
| 56        | [EquipEmote](#equipemotes---56)                                                               | Server   |
| 57        | [GiveEmotes](#giveemotes---57)                                                                | Client   |
| 64        | [ModSettings](#modsettings---64)                                                              | Server   |
| 65        |                                                                                               |          |
| 67        |                                                                                               |          |
| 68        | [HostList](#hostlist---68)                                                                    | Server   |
| 69        |                                                                                               |          |
| 70        |                                                                                               |          |
| 71        |                                                                                               |          |
| 72        |                                                                                               |          |
| 73        |                                                                                               |          |
| 1056      |                                                                                               |          |

# Clientbound packets

## ConsoleMessage (clientbound) - `2`

Send a message to the player's console.

Note: *supports Minecraft color codes*

```js
{
  message: 'string'
}
```

## Notification - `3`

Send a pop up notification to the client. Title field can be an empty string. However description cannot.

Note: *supports Minecraft color codes*

```js
{
  title: 'string',
  message: 'string'
}
```

## FriendList - `4`

Packet containing your friend list. Sent at boot by lunar.

Note: *We suppose that the `unknownInt` is for an online friend is the friend's Minecraft version.*

Note: *The `online` array seems to be empty everytime and another packet is telling if the friend is online.*

```js
{
  consoleAccess: 'boolean',
  requestsEnabled: 'boolean',
  online: `Array<{ uuid: string, displayName: string, unknownInt: int, status: string }>`,
  offline: `Array<{ uuid: string, displayName: string, offlineFor: long }>`
}
```

## FriendMessage - `5`

When a friend of the player sends a message.

Note: *The `uuid` field is a string and not an UUID! This is not a mistake*

```js
{
  uuid: 'string',
  message: 'string'
}
```

## Unknown - `7`

???

```js
{
  // Don't ask me why this is called bulk ¯\_(ツ)_/¯
  // That's how Lunar calls it
  bulk: 'JsonArray (sent as string and parsed when received)'
}
```

## PlayerInfo - `8`

Packet containing a player details.
Used in two cases:
  - When it tells information about the current player
  - When it tells information about other players

Note: *The `equipped` field for cosmetics is ignored when the packet tells information about another player. 
Which means lunar sends you only equipped cosmetics*

```js
{
  uuid: 'UUID',
  cosmetics: 'Array<{ id: number, equipped: boolean }>',
  color: 'int',
  unknownBooleanA: 'boolean',
  premium: 'boolean',
  clothCloak: 'boolean',
  unknownBooleanC: 'boolean',
  unknownBooleanD: 'boolean',
  unknownHashMap: 'HashMap<int, float>',
  plusColor: 'int'
}
```

## FriendRequest (clientbound) - `9`

When the player receives a friend request from someone

Note: *The `uuid` field is a string and not an UUID! This is not a mistake*
Note: *The `uuid` field seems to be empty everytime

```js
{
  uuid: 'string',
  username: 'string'
}
```

## FriendResponse (clientbound) - `21`

Sent when a player accepts or denies your friend request

Note: *The `uuid` field is a string and not an UUID! This is not a mistake*

```js
{
  accepted: 'boolean',
  uuid: 'string'
}
```

## ForceCrash - `33`

Crash the client ¯\\_(ツ)_/¯

```js
{}
```

## TaskListRequest - `35`

Send a task list request to the client. 
The client should send back a [TaskList](#tasklist---36) packet with the data

Note: *yes privacy*

```js
{}
```

## PlayEmote - `51`

Play the emote animation for someone

```js
{
  uuid: 'UUID',
  id: 'int'
}
```

## GiveEmotes - `57`

Packet containing all player's emotes

```js
{
  owned: 'Array<int>',
  equipped: 'Array<int>'
}
```

# Serverbound packets

## ConsoleMessage (serverbound) - `2`

Sent when the player sends a message in the Admin Console.

Note: *In order to open the Admin Console, you need to open your friend menu and press <kbd>F1</kbd>.
The `consoleAccess` field ([FriendList](#friendlist---4)) packet should be on `true` as well or you won't be able to open the console.*

```js
{
  message: 'string'
}
```

## FriendMessage - `5`

Sent when the player sends a message to one of his friends

```js
{
  uuid: 'string',
  message: 'string'
}
```

## JoinServer - `6`

Sent when the player joins a server

Note: *An empty string is set when the player leaves the server*

```js
{
  uuid: 'string', // Seems to always be empty ¯\_(ツ)_/¯
  server: 'string'
}
```

## FriendRequest (serverbound) - `9`

Sent when you send a friend request to someone

Note: *The `uuid` field is a string and not an UUID! This is not a mistake*

```js
{
  uuid: 'string',
  username: 'string'
}
```

## ApplyCosmetics - `20`

Sent when you equip a cosmetic or change ClothCloak state

```js
{
  cosmetics: 'Array<{ id: number, equipped: boolean }>',
  clothCloak: 'boolean',
  unknownBooleanA: 'boolean',
  unknownBooleanB: 'boolean',
  unknownMap: 'Map<Int, Float>',
  unknownInt: 'int'
}
```

## FriendResponse (serverbound) - `21`

Sent when uh I don't remember

```js
{
  accepted: 'boolean',
  uuid: 'string'
}
```

## TaskList - `36`

Packet containing the output of the `tasklist.exe` program on Windows..
Sent after receiving the [TaskListRequest](#tasklistrequest---35) packet.

Note: *yes privacy*

```js
{
  tasks: 'Array<string>'
}
```

## DoEmote - `39`

Sent when you are trying to emote

```js
{
  id: 'int'
}
```

## PlayerInfoRequest - `48`

Sent when the player wants information about other connected players.
The server should send after some [PlayerInfo](#playerinfo---8) if some players are running Lunar Client.

```js
{
  uuids: 'Array<UUID>'
}
```

## EquipEmotes - `56`

Sent when you equip an emote

Note: *the packet is only sent when you leave the emote menu (not the selector)*

```js
{
  emotes: 'Array<int>'
}
```

## ModSettings - `64`

Packet containing all your mods and their state (whether they are enabled or not)

Note: *this packet seems to be sent very very often*

```js
{
  settings: 'Map<string, boolean>',
  game: 'string'
}
```

## HostList - `68`

Packet containing your `hosts` file.

Note: *this packet was introduced to prevent players from overriding lunar client domains and using custom websockets/api without modifying the game*

Note: *yes privacy*

```js
{
  hosts: 'Array<string>'
}
```
