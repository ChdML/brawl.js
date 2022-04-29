// I hate typescript so much why did i think of this?
// I'm not sure if this is the best way to do this but it works
// Goofy types are not my thing
// I miss javascript
import axios from 'axios';
/**
* @param API_KEY
* @param region Optional, defaults to `all`, change the region if you wanna get the leaderboard from a different region
* @example
* ```js
* // CommonJS:
* const BrawlhallaApi = require('brawl.js').default
* // ES:
* import BrawlhallaApi from 'brawl.js'
* const bh = new BrawlhallaApi(API_KEY, "eu") // "eu" is the region, default region is "all", no need to add the region parameter
* ```
*/
export default class BrawlhallaApi {

  API_KEY: string;
  region?: string = "all";
  private handleError(err: any) {
    let result: any
    let errors: any = {
      401: {
        status: 401,
        message: `Unauthorized - You Must use HTTPS`
      },
      403: {
        status: 403,
        message: `Forbidden - Bad API key or missing API key`
      },
      404: {
        status: 404,
        message: `Not Found/Bad Request - The requested resource was not found, or required parameters are missing or possibly invalid`
      },
      429: {
        status: 429,
        message: `Too Many Requests - Your API key has hit the rate limit`
      },
      503: {
        status: 503,
        message:`Service Unavailable - We're temporarily offline for maintenance. Please try again later.`,
      }
    };
    if (err.response) {
      let status = err.response.status
      result = errors[status]
    } else if (err.request) {
      result = err.request
    } else {
      result = err.message
    }
    throw result
  }
  /**
* @param API_KEY
* @example
* ```js
* // CommonJS:
* const BrawlhallaApi = require('brawl.js').default
* // ES:
* import BrawlhallaApi from 'brawl.js'
* const bh = new BrawlhallaApi(API_KEY, "eu") // "eu" is the region, default region is "all", no need to add the region parameter
* ```
*/
  constructor(API_KEY: string, region: string = "all") {
    this.API_KEY = API_KEY;
    this.region = region;
  }
  /**
* @returns An object of the player's stats
* @param id the `brawlhalla_id` of the player
* @example
* ```js
* // Get player's stats
* let player = await BrawlhallaApi.getPlayerStats(1).catch((err) => console.log("Player does not exist!"))
* console.log(player)
* // {
* // "brawlhalla_id": 1,
* // ...}
* ```
*/
async getPlayerStats(id: number|string): Promise<object> {
  let result: Object = {};
  let url = `https://api.brawlhalla.com/player/${id}/stats?api_key=${this.API_KEY}`
  await axios.get(url).then(async (res) => {
    result = await res.data
  }).catch(this.handleError);
  return result
}
  /**
* @returns An object of the player's ranked stats if it exists
* @param id the `brawlhalla_id` of the player
* @example
* ```js
* // Get player's ranked stats
* let player = await BrawlhallaApi.getPlayerRankedStats(1).catch((err) => console.log("Player does not exist!"))
* console.log(player)
* // {
* // "brawlhalla_id": 1,
* // ...}
* ```
*/
async getPlayerRankedStats(id: number|string): Promise<object> {
  let result: Object = {};
  let url = `https://api.brawlhalla.com/player/${id}/ranked?api_key=${this.API_KEY}`
  await axios.get(url).then(async (res) => {
    result = await res.data
  }).catch(this.handleError);
  return result
}
  /**
* @returns An Array of all matched usernames
* @param name
* @param region Optional, defaults to `all`, change the region if you wanna get the leaderboard from a different region, 
* @param page Optional, defaults to 1
* @param exact default: `false`. If this value is true, it will return only exact matches, if it is false, it will return partial matches.
* @param exactCharCase default: `false`. If this value is true, it will return only exact character case matches, if it is false, it will not check for character case, needs `exact` to be true.
* @example
* ```js
* // Get all players with the name "ChdML"
* let players = await BrawlhallaApi.getByName("ChdML").catch((err) => console.log("Player does not exist!"))
* console.log(players)
* // [
* // {name: "ChdML", ...},
* // {name: "ChdML2"}, 
* // ...]
* ```
*/
  async getRankedByName(name: string, region: string = this.region || "all", page: number = 1, exact: boolean = false, exactCharCase: boolean = false): Promise<any> {
    let result: Array<any> = [];
    let url = `https://api.brawlhalla.com/rankings/1v1/${region}/${page}?name=${name}&api_key=${this.API_KEY}`
    // No support for 2v2 name searching yet.
    // let url2v2 = `https://api.brawlhalla.com/rankings/2v2/${this.region}/${page}?name=${name}&api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
      let arr: Array<any> = []
      if (exact) {
        for (let i = 0; i < result.length; i++) {
          if (exactCharCase ? result[i].name === name : result[i].name.toLowerCase() === name.toLowerCase()) {
            arr.push(result[i])
          }
        }
        result = arr
      }
    }).catch(this.handleError);
    return result
  }
  /**
* @returns An Array of all the top 1v1 players
* @param page default: `1`
* @param region default: `all`, change the region if you wanna get the leaderboard from a different region
* @example
* ```js
* // Get page 1 of the leaderboard, if no page was provided it would automatically fetch page 1
* let onevoneLeaderboard = await BrawlhallaApi.get1v1Rankings().catch((err) => console.log("Error occurred!", err))
* console.log(onevoneLeaderboard)
* // [
* // {rank: 1, ...},
* // {rank: 2}, 
* // ...]
* ```
* @example
* ```js
* // get page 2
* let onevoneLeaderboard2 = await BrawlhallaApi.get1v1Rankings(2).catch((err) => console.log("Error occurred!", err))
* console.log(onevoneLeaderboard2)
* // [
* // {rank: 50, ...},
* // {rank: 51}, 
* // ...]
* ```
*/
  async get1v1Rankings(page: number = 1, region: string = this.region || "all"): Promise<any> {
    let result: Array<any> = [];
    let url = `https://api.brawlhalla.com/rankings/1v1/${region}/${page}?api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
  /**
* @returns An Array of all the top players
* @param mode Required, there's `1v1`, `2v2`, and special rank modes, enter the mode you want to get the leaderboard from.
* @param page default: `1`
* @param region default: `all`, change the region if you wanna get the leaderboard from a different region
* @example
* ```js
* // Get page 1 of the leaderboard, if no page was provided it would automatically fetch page 1
* let kungfootLeaderboard = await BrawlhallaApi.getRankings("kungfoot").catch((err) => console.log("Error occurred!", err))
* console.log(kungfootLeaderboard)
* // [
* // {rank: 1, ...},
* // {rank: 2}, 
* // ...]
* ```
* @example
* ```js
* // get page 2
* let kungfootLeaderboard2 = await BrawlhallaApi.getRankings("kungfoot").catch((err) => console.log("Error occurred!", err))
* console.log(kungfootLeaderboard2)
* // [
* // {rank: 50, ...},
* // {rank: 51}, 
* // ...]
* ```
*/
  async getRankings(mode: string, page: number = 1, region: string = this.region || "all"): Promise<any> {
    let result: Array<any> = [];
    let url = `https://api.brawlhalla.com/rankings/${mode}/${region}/${page}?api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
  /**
* @returns An Array of all the top 2v2 players
* @param page default: `1`
* @param region default: `all`, change the region if you wanna get the leaderboard from a different region
* @example
* ```js
* // Get page 1 of the leaderboard, if no page was provided it would automatically fetch page 1
* let onevoneLeaderboard = await BrawlhallaApi.get2v2Rankings().catch((err) => console.log("Error occurred!", err))
* console.log(onevoneLeaderboard)
* // [
* // {rank: 1, ...},
* // {rank: 2}, 
* // ...]
* ```
* @example
* ```js
* // get page 2
* let onevoneLeaderboard2 = await BrawlhallaApi.get2v2Rankings(2).catch((err) => console.log("Error occurred!", err))
* console.log(onevoneLeaderboard2)
* // [
* // {rank: 50, ...},
* // {rank: 51}, 
* // ...]
* ```
*/
  async get2v2Rankings(page: number = 1, region: string = this.region || "all"): Promise<any> {
    let result: Array<any> = [];
    let url = `https://api.brawlhalla.com/rankings/2v2/${region}/${page}?api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
  /**
  * @returns An array of the player's `brawlhalla_id` and `name`
  * @param id
  * @example
  * ```js
  * let player = await BrawlhallaApi.getPlayerBySteam64ID(76561197996943884)
  * console.log(player)
  * // {
  * // "brawlhalla_id": ...,
  * // "name": ...
  * // }
  * ```
  */
  async getPlayerBySteam64ID(id: number|string): Promise<any> {
    let result: Object = {};
    let url = `https://api.brawlhalla.com/search?steamid=${id}&api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
  /**
* @param id
* @example
* ```js
* let clan = await BrawlhallaApi.getClan(1)
* console.log(clan)
* // {
* // "clan_id": 1,
* // ...
* // }
* ```
* @returns An object of the clan info
*/
  async getClan(id: number): Promise<any> {
    let result: Object = [];
    let url = `https://api.brawlhalla.com/clan/${id}?api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
  /**
 * @returns An array of all legends
 * @example
 * ```js
 * // Get all legends
 * let legends = await BrawlhallaApi.getLegends()
 * console.log(legends)
 * // [{...}, {...}, ...]
 * ```
 */
  async getLegends(): Promise<any> {
    let result: Array<any> = [];
    let url = `https://api.brawlhalla.com/legend/all?api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
  /**
* @returns An object of a legend from the provided id
* @param id
* @example
* ```js
* let cassidy = await BrawlhallaApi.getLegendById(4)
* console.log(cassidy)
* // {
* // "legend_id": 4,
* // ...
* // }
* 
* ```
*/
  async getLegendById(id: any): Promise<any> {
    let result: Object = {};
    let url = `https://api.brawlhalla.com/legend/${id}?api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
  /**
   Searches for a legend with the provided name, not really recommended if you know the legend id
 * @returns An object of a legend from the provided name
 * @param name
 * @example
 * ```js
 * let cassidy = await BrawlhallaApi.getLegendByName("cassidy")
 * console.log(cassidy)
 * // {
 * // "legend_name_key": "cassidy",
 * // ...
 * // }
 * 
 * ```
 */
  async getLegendByName(name: string): Promise<any> {
    let result: Object = {};
    let legends = await this.getLegends();
    let id = legends.find((legend: any) => legend.legend_name_key.toLowerCase() === name.toLowerCase() || legend.bio_name.toLowerCase() === name.toLowerCase())?.legend_id;

    if (id) {
      let url = `https://api.brawlhalla.com/legend/${id}?api_key=${this.API_KEY}`
      await axios.get(url).then(async (res) => {
        result = await res.data
      }).catch(this.handleError);
    }
    return result
  }

  /**
   Fetch a path using the `https://api.brawlhalla.com` url
 * @returns The result of the fetch request
 * @param path the path to fetch, example: `/legend/all`
 * @example
 * ```js
 * let legends = await BrawlhallaApi.get("/legend/all")
 * console.log(legends)
 * // {
 * // ...
 * // }
 * 
 * ```
 */
  async get(path: string): Promise<any> {
    let result: any;
    let url = `https://api.brawlhalla.com/${path}&api_key=${this.API_KEY}`
    await axios.get(url).then(async (res) => {
      result = await res.data
    }).catch(this.handleError);
    return result
  }
}
