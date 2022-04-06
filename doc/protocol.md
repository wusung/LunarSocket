# Overview

| Packet ID | Name                                                                                          | Bound to |
|-----------|-----------------------------------------------------------------------------------------------|----------|
| 2         | ConsoleMessage ([C](#consolemessage-clientbound---2)\|[S](#consolemessage-serverbound---2))   | Both     |
| 3         | [Notification](#notification---3)                                                             | Client   |
| 4         | [FriendList](#friendlist---4)                                                                 | Client   |
| 5         | [FriendMessage](../src/packets/FriendMessage.ts)                                              | Both     |
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
| 35        |                                                                                               |          |
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
| 68        |                                                                                               |          |
| 69        |                                                                                               |          |
| 70        |                                                                                               |          |
| 71        |                                                                                               |          |
| 72        |                                                                                               |          |
| 73        |                                                                                               |          |
| 1056      |                                                                                               |          |

# Clientbound packets

## ConsoleMessage (clientbound) - `2`

```js
{
  message: 'string'
}
```

## Notification - `3`

```js
{
  title: 'string',
  message: 'string'
}
```

## FriendList - `4`

```js
{
  consoleAccess: 'boolean',
  requestsEnabled: 'boolean',
  online: `Array<{ uuid: string, displayName: string, unknownInt: int, status: string }>`,
  offline: `Array<{ uuid: string, displayName: string, offlineFor: long }>`
}
```

## FriendMessage - `5`

```js
{
  uuid: 'string',
  message: 'string'
}
```

## Unknown - `7`

```js
{
  // Don't ask me why this is called bulk ¯\_(ツ)_/¯
  // That's how Lunar calls it
  bulk: 'JsonArray (sent as string and parsed when received)'
}
```

## PlayerInfo - `8`

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

```js
{
  uuid: 'string',
  username: 'string'
}
```

## FriendResponse (clientbound) - `21`

```js
{
  accepted: 'boolean',
  uuid: 'string'
}
```

## ForceCrash - `33`

```js
{}
```

## PlayEmote - `51`

```js
{
  uuid: 'UUID',
  id: 'int'
}
```

## GiveEmotes - `57`

```js
{
  owned: 'Array<int>',
  equipped: 'Array<int>'
}
```

# Serverbound packets

## ConsoleMessage (serverbound) - `2`

```js
{
  message: 'string'
}
```

## FriendMessage - `5`

```js
{
  uuid: 'string',
  message: 'string'
}
```

## JoinServer - `6`

```js
{
  uuid: 'string', // Seems to always be empty ¯\_(ツ)_/¯
  server: 'string'
}
```

## FriendRequest (serverbound) - `9`

```js
{
  uuid: 'string',
  username: 'string'
}
```

## ApplyCosmetics - `20`

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

```js
{
  accepted: 'boolean',
  uuid: 'string'
}
```

## TaskList - `36`

```js
{
  tasks: 'Array<string>'
}
```

## DoEmote - `39`

```js
{
  id: 'int'
}
```

## PlayerInfoRequest - `48`

```js
{
  uuids: 'Array<UUI>'
}
```

## EquipEmotes - `56`

```js
{
  emotes: 'Array<int>'
}
```

## ModSettings - `64`

```js
{
  settings: 'Map<string, boolean>',
  game: 'string'
}
```