import {ExpandedTournamentDTO} from './dto/TournamentDTO';
import {Pair} from './Pair';
import {Schedule} from './Schedule';
import {Game, PairMap, PlayerMap} from './Game';
import {Player} from './Player';
import {GameSlotDTO} from './dto/GameSlotDTO';
import {Duel} from './Duel';
import {PairPosition} from './PairPosition';
import {Standings} from './Standings';
import {PairSummary} from './PairSummary';

export class Tournament {
  readonly data: ExpandedTournamentDTO;
  readonly pairs: Pair[];
  readonly schedule: Schedule;
  readonly games: Game[][];
  readonly duels: Duel[][][];
  readonly standings: Standings;

  constructor(data: ExpandedTournamentDTO) {
    this.data = data;
    const
      allPlayers: PlayerMap = {},
      allPairs: PairMap = {},
      allGameSlots: {[id: number]: GameSlotDTO} = {};
    this.pairs = Tournament.collectPlayerInfo(data, allPlayers, allPairs);
    this.schedule = new Schedule(data.schedule);
    data.schedule.games.reduce((hash, game) => (hash[game.id] = game, hash), allGameSlots);
    const allGames: Game[] = data.protocols.map(p => Game.create(allGameSlots[p.gid], p, allPairs, allPlayers));
    this.games = Tournament.asGameTable(allGames);
    this.duels = Tournament.initDuels(allGames, this.pairs);
    this.standings = new Standings(
      this.pairs.map((pair, i) => new PairSummary(pair, [].concat(...this.duels[i])))
    );
  }

  get name(): string { return this.data.name; }
  set name(value: string) { this.data.name = value; }

  get description(): string { return this.data.description; }
  set description(value: string) { this.data.description = value; }

  get dateCreated(): Date { return this.data.dateCreated; }

  get status(): string { return this.data.status; }
  set status(value: string) { this.data.status = value; }

  private static pairSorter = (a: Pair, b: Pair) => a.name.localeCompare(b.name);

  private static collectPlayerInfo(data: ExpandedTournamentDTO, allPlayers: PlayerMap, allPairs: PairMap): Pair[] {
    data.players
      .map(pData => new Player(pData))
      .reduce((hash, player) => (hash[player.slot] = player, hash), allPlayers);
    const slots = data.schedule.players;
    const pairList: Pair[] = [];
    for (let i = 0; i < slots.length; i += 2) {
      const pair = new Pair(allPlayers[slots[i]], allPlayers[slots[i + 1]]);
      pairList.push(allPairs[pair.name] = pair);
    }
    return pairList.sort(this.pairSorter);
  }

  private static asGameTable(allGames: Game[]) {
    const sparsed = allGames.reduce(function (m: Game[][], game: Game) {
      const tour = game.tour, table = game.table;
      if (!(tour in m))
        m[tour] = [];
      m[tour][table] = game;
      return m;
    }, []);
    return sparsed.filter(row => row).map(row => row.filter(game => game));
  }

  private static initDuels(allGames: Game[], allPairs: Pair[]): Duel[][][] {
    const dealMap: Game[][] = allGames.reduce(function (gamesByDeal, game) {
      if (!(game.deal in gamesByDeal)) {
        gamesByDeal[game.deal] = [];
      }
      gamesByDeal[game.deal].push(game);
      return gamesByDeal;
    }, []);
    const allDuels: Duel[] = [];
    for (const dealGames of dealMap) {
      if (!dealGames) continue;
      for (let i = 0; i < dealGames.length; ++i) {
        for (let j = i + 1; j < dealGames.length; ++j) {
          allDuels.push(new Duel(dealGames[i], dealGames[j], PairPosition.NS));
          allDuels.push(new Duel(dealGames[i], dealGames[j], PairPosition.EW));
        }
      }
    }
    const pairIndex: { [name: string]: number } = allPairs.reduce((hash, pair, i) => (hash[pair.name] = i, hash), {});
    const pairCount = allPairs.length;
    const duels: Duel[][][] = Array(...Array(pairCount)).map(() => Array(pairCount));
    for (let i = 0; i < pairCount; ++i) {
      for (let j = 0; j < pairCount; ++j) {
        if (i !== j) duels[i][j] = duels[j][i] = [];
      }
    }
    allDuels.forEach(function (duel) {
      duels[pairIndex[duel.pairs[0].name]][pairIndex[duel.pairs[1].name]].push(duel);
    });
    return duels;
  }
}
