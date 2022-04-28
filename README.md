# brawl.js (Brawlhalla API Wrapper)
`brawl.js` is a wrapper for the [Brawlhalla API](https://dev.brawlhalla.com). it has many methods and built in filters so you dont have to filter the fetched data yourself.\
for example, you can fetch a player's name with one line of code instead of having to fetch manually, filtering results and etc.

## Installation
Yarn:
```
yarn add brawl.js
```
npm:
```
npm install brawl.js --save
```

## Importing and setup:
To import the library, use the following:
```js
// ESM
import BrawlhallaApi from "brawl.js"
// CommonJS
const BrawlhallaApi = require("brawl.js").default
const API_KEY = "YOUR_API_KEY"

const bh = new BrawlhallaApi(API_KEY, "eu") // "eu" is the region, default region is "all"
```

## Methods
For some methods there is an optional region parameter, if you don't add a parameter, the default region would be `all`, you can also set a region without having to add a region to each method paramater, example:
```js
const bh = new BrawlhallaApi(API_KEY, "eu") // this would use the "eu" region
```
you can also change the api key/region whenever you want, example:
```js
bh.region = "us-e"
bh.API_KEY = "ANOTHER-API-KEY"
```
## .get1v1Rankings(page?, region?)
```js
const top1v1 = await bh.get1v1Rankings()
console.log(top1v1)
```
Returns: an array of the top 1v1 players.

## .get2v2Rankings(page?, region?)
```js
const top2v2 = await bh.get2v2Rankings()
console.log(top2v2)
```
Returns: an array of the top 2v2 players.
## .getRankings(mode, page?, region?)
`mode`: Required, there's `1v1`, `2v2`, and special rank modes like kung foot, enter the mode you want to get the leaderboard from.
```js
const topkungfoot = await bh.getRankings("kungfoot")
console.log(topkungfoot)
```
Returns: an array of the top `mode` players.
## .getRankedByName(name, region?, page?, exact?, exactCharCase?)
`name`: the player name to search for.\
`exact`: default: `false`. If this value is `true`, it will return only exact matches, if it is `false`, it will return partial matches\
`exactCharCase`: default: `false`. If this value is `true`, it will return only exact character case matches, if it is `false`, it will not check for character case, needs exact to be `true`.
```js
const player = await bh.getRankedByName("ChdML", undefined, undefined, true)
console.log(player)
```

## .getPlayerStats(id)
`id`: the `brawlhalla_id` of the player
```js
const player = await bh.getPlayerStats("5156845")
console.log(player)
```

Returns: an object containing the clan info.

## .getPlayerRankedStats(id)
`id`: the `brawlhalla_id` of the player
```js
const player = await bh.getPlayerRankedStats("5156845")
console.log(player)
```

Returns: an object containing the clan info.

## .getPlayerBySteam64ID(id)
`id`: the steam64 id of the player
```js
const player = await bh.getPlayerBySteam64ID("76561197996943884")
console.log(player)
```

Returns: an object containing the player's `brawlhalla_id` and `name`.

## .getClan(id)
`id`: the `clan_id` of the clan
```js
const clan = await bh.getClan(1)
console.log(clan)
```

Returns: an object containing the clan info.

## .getLegendById(id)
`id`: the `legend_id` of the legend
```js
const cassidy = await bh.getLegendById(4)
console.log(cassidy)
```

Returns: an object containing the legend info.
## .getLegends()
```js
const legends = await bh.getLegends(4)
console.log(legends)
```

Returns: an array of all of the legends.

## .getLegendByName(name)
Not really recommended, since it has to make 2 requests to get the legends and then get the legend info\
`name`: the name of the legend
```js
const cassidy = await bh.getLegendByName("cassidy")
console.log(cassidy)
```

Returns: an object containing the legend info.

## .get(path)
`path`: the path to the api endpoint, example: `/rankings/1v1/all/1` would result in the url to be `https://api.brawlhalla.com/rankings/1v1/all/1`
```js
const legends = await bh.get("legend/all")
console.log(legends)
```

Returns: the fetched result.


## Error codes:
| Status      | Message |
| ----------- | ----------- |
| `403`   | Forbidden – Bad API key or missing API key        |
| `404`   | Not Found/Bad Request - The requested resource was not found, or required parameters are missing or possibly invalid        |
| `429`   | Too Many Requests – API key has hit the rate limit. |
| `503`   | Service Unavailable – We’re temporarily offline for maintenance. Please try again later. |