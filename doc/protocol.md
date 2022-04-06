# Overview

| Packet ID | Name              | Bound to |
|-----------|-------------------|----------|
| 2         | ConsoleCommand    | Server   |
| 3         | Notification      | Client   |
| 4         | FriendList        | Client   |
| 5         | FriendMessage     | Client   |
| 6         | JoinServer        | Server   |
| 7         |                   |          |
| 8         | PlayerInfo        | Client   |
| 9         | FriendRequest     | Server   |
| 16        |                   |          |
| 17        |                   |          |
| 18        |                   |          |
| 20        | ApplyCosmetics    | Server   |
| 21        | FriendResponse    | Client   |
| 22        |                   |          |
| 24        |                   |          |
| 25        |                   |          |
| 33        | ForceCrash        | Client   |
| 35        |                   |          |
| 36        |                   |          |
| 39        | DoEmote           | Server   |
| 40        |                   |          |
| 48        | PlayerInfoRequest | Server   |
| 50        |                   |          |
| 51        | PlayEmote         | Client   |
| 52        |                   |          |
| 53        |                   |          |
| 54        |                   |          |
| 55        |                   |          |
| 56        | EquipEmote        | Server   |
| 57        | GiveEmotes        | Client   |
| 64        |                   |          |
| 65        |                   |          |
| 67        |                   |          |
| 68        |                   |          |
| 69        |                   |          |
| 70        |                   |          |
| 71        |                   |          |
| 72        |                   |          |
| 73        |                   |          |
| 1056      |                   |          |

# Clientbound packets

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
  online: `Array<{ uuid: string, unknownStringA: string, unknownInt: int, unknownStringB: string }>`
  offline: `Array<{ uuid: string, unknownString: string, unknownLong: long }>`
}
```

## FriendMessage - `5`

```js
{
  uuid: 'string',
  message: 'string'
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

## FriendResponse - `21`

```js
{
  added: 'boolean',
  uuid: 'string'
}
```

## PlayEmote - `51`

```js
{
  uuid: 'UUID',
  id: 'int'
}
```

## ForceCrash - `33`

```js
{}
```

# Serverbound packets

## ConsoleCommand - `2`

```js
{
  command: 'string'
}
```

## JoinServer - `6`

```js
{
  ip: 'string'
}
```

## FriendRequest - `9`

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
