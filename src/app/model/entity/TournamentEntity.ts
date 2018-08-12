import {ExpandedTournamentDTO} from '../dto/TournamentDTO';
import {PairEntity} from './PairEntity';
import {ScheduleEntity} from './ScheduleEntity';
import {GameEntity, PairMap, PlayerMap} from './GameEntity';
import {PlayerEntity} from './PlayerEntity';
import {GameSlotDTO} from '../dto/GameSlotDTO';

export class TournamentEntity {
  readonly data: ExpandedTournamentDTO;
  readonly pairs: PairEntity[];
  readonly schedule: ScheduleEntity;
  readonly games: GameEntity[][];

  constructor(data: ExpandedTournamentDTO) {
    this.data = data;
    const
      allPlayers: PlayerMap = {},
      allPairs: PairMap = {},
      allGameSlots: {[id: number]: GameSlotDTO} = {};
    this.pairs = TournamentEntity.collectPlayerInfo(data, allPlayers, allPairs);
    this.schedule = new ScheduleEntity(data.schedule);
    data.schedule.games.reduce((hash, game) => (hash[game.id] = game, hash), allGameSlots);
    const allGames: GameEntity[] = data.protocols.map( p => GameEntity.create(allGameSlots[p.gid], p, allPairs, allPlayers));
    this.games = TournamentEntity.asGameTable(allGames);
  }

  get name(): string { return this.data.name; }
  set name(value: string) { this.data.name = value; }

  get description(): string { return this.data.description; }
  set description(value: string) { this.data.description = value; }

  get dateCreated(): Date { return this.data.dateCreated; }

  get status(): string { return this.data.status; }
  set status(value: string) { this.data.status = value; }

  private static pairSorter = (a: PairEntity, b: PairEntity) => a.name.localeCompare(b.name);
  private static collectPlayerInfo(data: ExpandedTournamentDTO, allPlayers: PlayerMap, allPairs: PairMap): PairEntity[] {
    data.players
      .map(pData => new PlayerEntity(pData))
      .reduce((hash, player) => (hash[player.slot] = player, hash), allPlayers);
    const slots = data.schedule.players;
    const pairList: PairEntity[] = [];
    for (let i = 0; i < slots.length; i += 2) {
      const pair = new PairEntity(allPlayers[slots[i]], allPlayers[slots[i + 1]]);
      pairList.push(allPairs[pair.name] = pair);
    }
    return pairList.sort(this.pairSorter);
  }

  private static asGameTable(allGames: GameEntity[]) {
    const sparsed = allGames.reduce(function (m: GameEntity[][], game: GameEntity) {
      const tour = game.tour, table = game.table;
      if (!(tour in m))
        m[tour] = [];
      m[tour][table] = game;
      return m;
    }, []);
    return sparsed.filter(row => row).map(row => row.filter(game => game));
  }
}
