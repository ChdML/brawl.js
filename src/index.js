"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// I hate typescript so much why did i think of this?
// I'm not sure if this is the best way to do this but it works
// Goofy ass types are not my thing
// I miss javascript
var axios_1 = require("axios");
/**
* @param API_KEY
* @param region Optional, defaults to `all`, change the region if you wanna get the leaderboard from a different region
* @example
* ```js
* // CommonJS:
* const BrawlhallaApi = require('brawl.js').default
* // ES:
* import BrawlhallaApi from 'brawl.js'
* const client = new BrawlhallaApi(API_KEY) // if you want to add another paramater for the region
* ```
*/
var BrawlhallaApi = /** @class */ (function () {
    /**
  * @param API_KEY
  * @example
  * ```js
  * // CommonJS:
  * const BrawlhallaApi = require('brawl.js').default
  * // ES:
  * import BrawlhallaApi from 'brawl.js'
  * const client = new BrawlhallaApi(API_KEY) // if you want to add another paramater for the region
  * ```
  */
    function BrawlhallaApi(API_KEY, region) {
        if (region === void 0) { region = "all"; }
        this.region = "all";
        this.API_KEY = API_KEY;
        this.region = region;
    }
    BrawlhallaApi.prototype.handleError = function (err) {
        var result;
        var errors = {
            401: {
                status: 401,
                message: "Unauthorized - You Must use HTTPS"
            },
            403: {
                status: 403,
                message: "Forbidden - Bad API key or missing API key"
            },
            404: {
                status: 404,
                message: "Not Found/Bad Request - The requested resource was not found, or required parameters are missing or possibly invalid"
            },
            429: {
                status: 429,
                message: "Too Many Requests - Your API key has hit the rate limit"
            },
            503: {
                status: 503,
                message: "Service Unavailable - We're temporarily offline for maintenance. Please try again later."
            }
        };
        if (err.response) {
            var status_1 = err.response.status;
            result = errors[status_1];
        }
        else if (err.request) {
            result = err.request;
        }
        else {
            result = err.message;
        }
        throw result;
    };
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
    BrawlhallaApi.prototype.getPlayerStats = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        url = "https://api.brawlhalla.com/player/" + id + "/stats?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getPlayerRankedStats = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        url = "https://api.brawlhalla.com/player/" + id + "/ranked?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getRankedByName = function (name, region, page, exact, exactCharCase) {
        if (region === void 0) { region = this.region || "all"; }
        if (page === void 0) { page = 1; }
        if (exact === void 0) { exact = false; }
        if (exactCharCase === void 0) { exactCharCase = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        url = "https://api.brawlhalla.com/rankings/1v1/" + region + "/" + page + "?name=" + name + "&api_key=" + this.API_KEY;
                        // No support for 2v2 name searching yet.
                        // let url2v2 = `https://api.brawlhalla.com/rankings/2v2/${this.region}/${page}?name=${name}&api_key=${this.API_KEY}`
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var arr, i;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            arr = [];
                                            if (exact) {
                                                for (i = 0; i < result.length; i++) {
                                                    if (exactCharCase ? result[i].name === name : result[i].name.toLowerCase() === name.toLowerCase()) {
                                                        arr.push(result[i]);
                                                    }
                                                }
                                                result = arr;
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        // No support for 2v2 name searching yet.
                        // let url2v2 = `https://api.brawlhalla.com/rankings/2v2/${this.region}/${page}?name=${name}&api_key=${this.API_KEY}`
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.get1v1Rankings = function (page, region) {
        if (page === void 0) { page = 1; }
        if (region === void 0) { region = this.region || "all"; }
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        url = "https://api.brawlhalla.com/rankings/1v1/" + region + "/" + page + "?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getRankings = function (mode, page, region) {
        if (page === void 0) { page = 1; }
        if (region === void 0) { region = this.region || "all"; }
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        url = "https://api.brawlhalla.com/rankings/" + mode + "/" + region + "/" + page + "?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.get2v2Rankings = function (page, region) {
        if (page === void 0) { page = 1; }
        if (region === void 0) { region = this.region || "all"; }
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        url = "https://api.brawlhalla.com/rankings/2v2/" + region + "/" + page + "?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getPlayerBySteam64ID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        url = "https://api.brawlhalla.com/search?steamid=" + id + "&api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getClan = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        url = "https://api.brawlhalla.com/clan/" + id + "?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getLegends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        url = "https://api.brawlhalla.com/legend/all?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getLegendById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        url = "https://api.brawlhalla.com/legend/" + id + "?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.getLegendByName = function (name) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, legends, id, url;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = {};
                        return [4 /*yield*/, this.getLegends()];
                    case 1:
                        legends = _b.sent();
                        id = (_a = legends.find(function (legend) { return legend.legend_name_key.toLowerCase() === name.toLowerCase() || legend.bio_name.toLowerCase() === name.toLowerCase(); })) === null || _a === void 0 ? void 0 : _a.legend_id;
                        if (!id) return [3 /*break*/, 3];
                        url = "https://api.brawlhalla.com/legend/" + id + "?api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
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
    BrawlhallaApi.prototype.get = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.brawlhalla.com/" + path + "&api_key=" + this.API_KEY;
                        return [4 /*yield*/, axios_1["default"].get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.data];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](this.handleError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return BrawlhallaApi;
}());
exports["default"] = BrawlhallaApi;