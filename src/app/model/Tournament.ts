import {Game, GameSchedule} from './Game';
import {Pair, PairRepository} from './Pair';
import {Player} from './Player';
import {opposite, Position} from './Position';
import {Duel} from './Duel';
import {PairPosition} from './PairPosition';

export class Tournament {
  readonly games: Game[][];
  readonly pairs: Pair[];
  readonly duels: Duel[][];

  name: string;

  constructor(schedule: GameSchedule[]) {
    const players: { [id: string]: Player } = {};
    const pairs = new MapBasedPairRepository();
    Tournament.collectPlayerInfo(schedule, players, pairs);
    const allGames: Game[] = schedule.map(game => new Game(game, players, pairs));
    this.pairs = Tournament.initPairs(pairs);
    this.games = Tournament.initGames(allGames);
    this.duels = Tournament.initDuels(allGames, this.pairs.length);
  }

  private static collectPlayerInfo(schedule: GameSchedule[], players: { [p: string]: Player }, pairs: MapBasedPairRepository) {
    schedule.forEach(function (game) {
      for (const position of Position.values) {
        const playerId = game.players[position];
        if (!(playerId in players)) {
          players[playerId] = new Player(playerId);
        }
      }
      for (const position of [Position.N, Position.E]) {
        const player = players[game.players[position]];
        if (!pairs.find(player)) {
          pairs.add(player, players[game.players[opposite(position)]]);
        }
      }
    });
  }

  private static initPairs(pairs: MapBasedPairRepository): Pair[] {
    pairs.list.sort((a, b) => a.players[0].id.localeCompare(b.players[0].id));
    pairs.list.forEach((p, i) => p.id = i);
    return pairs.list;
  }

  private static initGames(gameList: Game[]): Game[][] {
    return gameList.reduce(function (tours, game) {
      const tourIndex = game.tour - 1;
      if (!(tourIndex in tours)) {
        tours[tourIndex] = [];
      }
      tours[tourIndex][game.table - 1] = game;
      return tours;
    }, []);
  }

  private static initDuels(gameList: Game[], pairCount: number): Duel[][] {
    const duels: Duel[][] = Array(...Array(pairCount)).map(() => []);
    const dealMap: Game[][] = gameList.reduce(function (gamesByDeal, game) {
      if (!(game.deal in gamesByDeal)) {
        gamesByDeal[game.deal] = [];
      }
      gamesByDeal[game.deal].push(game);
      return gamesByDeal;
    }, []);
    const allDuels: Duel[] = [];
    for (const dealGames of dealMap) {
      if (!dealGames) {
        continue;
      }
      for (let i = 0; i < dealGames.length; ++i) {
        for (let j = i + 1; j < dealGames.length; ++j) {
          allDuels.push(new Duel(dealGames[i], dealGames[j], PairPosition.NS));
          allDuels.push(new Duel(dealGames[i], dealGames[j], PairPosition.EW));
        }
      }
    }
    allDuels.forEach(function (duel) {
      duels[duel.pairs[0].id][duel.pairs[1].id] = duel;
      duels[duel.pairs[1].id][duel.pairs[0].id] = duel;
    }, this);
    return duels;
  }
}

class MapBasedPairRepository implements PairRepository {
  map: { [id: string]: Pair } = {};
  list: Pair[] = [];

  add(first: Player, second: Player): void {
    const pair = new Pair(first, second);
    this.list.push(pair);
    this.map[first.id] = this.map[second.id] = pair;
  }

  find(first: Player): Pair {
    return this.map[first.id];
  }
}
