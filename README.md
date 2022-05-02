# Brawl.js 
Brawl.js is a wrapper for the Brawlhalla API, with many useful methods, check it out!

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
For some methods there is an optional region parameter, if you don't add a parameter, the default region would be `all`, you can also set a region without having to add a region to each method parameter, example:
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
Returns: an array of the players with the name `name`.
## .getPlayerStats(id)
`id`: the `brawlhalla_id` of the player
```js
const player = await bh.getPlayerStats("5156845")
console.log(player)
```

Returns: an object containing the player stats info.

## .getPlayerRankedStats(id)
`id`: the `brawlhalla_id` of the player
```js
const player = await bh.getPlayerRankedStats("5156845")
console.log(player)
```

Returns: an object containing the players ranked stats.

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
## .getEloReset(elo)
`elo`: Player's elo
```js
const new_elo = await bh.getEloReset(1900)
console.log(new_elo)
```

Returns: a number of the estimated elo reset value.
## .getTeamEloReset(elo)
`elo`: Team/Legend elo
```js
const new_team_elo = await bh.getTeamEloReset(1900)
console.log(new_team_elo)
```

Returns: a number of the estimated elo reset value.
## .getGlory(best_rating, wins, has_played_10_games)
`best_rating`: Peak elo rating of the player\
`wins`: Number of wins the player has\
`has_played_10_games`: If the player has played 10 games or more, this value should be `true`, otherwise it should be `false`
`has`
```js
const glory = await bh.getGlory(1900, 100, true)
console.log(glory)
```

Returns: an object of the wins, best rating, and total glory.

## .getGloryFromBestRating(best_rating)
`best_rating`: Peak elo rating of the player
`has`
```js
const best_rating_glory = await bh.getGloryFromBestRating(1900)
console.log(best_rating_glory)
```

Returns: a number of the best rating glory.
## .getGloryFromWins(wins, has_played_10_games)
`best_rating`: Peak elo rating of the player\
`has_played_10_games`: If the player has played 10 games or more, this value should be `true`, otherwise it should be `false`
```js
const wins_glory = await bh.getGloryFromWins(100, true)
console.log(wins_glory)
```

Returns: a number of the wins glory.
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

# Why I made this?
I made this so I could learn how to use the Brawlhalla API and I hope it can be useful for other people. If you have any questions, feel free to ask on the issues page.

# Changelog:
# V0.2.0:
- Added the `has_played_10_games` parameter for `getGloryFromWins` and `getGlory`
- Added Documentation for new methods listed below
# V0.1.9:
Added the following methods:
| Method | Parameters | Description |
| ----------- | ----------- | ----------- |
| `getGlory`  | `best_rating`, `wins`, `has_played_10_games`     | Returns an object of the wins, best rating, and total glory |
| `getGloryFromBestRating`  | `best_rating`     | Returns a number of the glory from best rating |
| `getGloryFromWins`  | `wins`,  `has_played_10_games`    | Returns a number of the glory from wins |
| `getEloReset`  | `elo`     | Returns a number of the rank elo reset |
| `getTeamEloReset`  | `elo`     | Returns a number of the team/legend elo reset |