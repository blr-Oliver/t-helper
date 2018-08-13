/*
import {Suit} from './Suit';
import {PairPosition} from './PairPosition';
import {Position} from './Position';
import {Seating} from './Seating';

export interface ProtocolEntity {
  id: number;
  suit?: Suit;
  owner?: PairPosition;
  level?: number;
  tricks?: number;
}

export interface GameEntity {
  id?: number;
  tour: number;
  table: number;
  deal: number;
  dealer?: string;
  players: Seating<string>;
  tid: number;
}

export interface Converter<T, D> {
  serialize(item: T): D;

  deserialize(entity: D, target?: T): T;
}

export class IndexedDBSerializer {
  static PROTOCOL_CONVERTER: Converter<Protocol, ProtocolEntity> = {
    serialize: function (p: Protocol): ProtocolEntity {
      const result: ProtocolEntity = {
        id: p.game.id
      };
      if (p.contract.defined) {
        result.suit = p.contract.suit;
        result.owner = p.contract.owner;
        result.level = p.contract.level;
      }
      if (p.tricks.defined) {
        result.tricks = p.tricks.NS;
      }
      return result;
    },

    deserialize: function (entity: ProtocolEntity, target?: Protocol): Protocol {
      if ('id' in entity) {
        target.game.id = entity.id;
      }
      if ('suit' in entity) {
        target.contract.suit = entity.suit;
      }
      if ('owner' in entity) {
        target.contract.owner = entity.owner;
      }
      if ('level' in entity) {
        target.contract.level = entity.level;
      }
      if ('tricks' in entity) {
        target.tricks.NS = entity.tricks;
      }
      return target;
    }
  };

  static GAME_CONVERTER: Converter<Game, GameEntity> = {
    serialize: function (game: Game): GameEntity {
      const result: GameEntity = {
        tid: game.tournament.id,
        tour: game.tour,
        table: game.table,
        deal: game.deal,
        players: {
          [Position.N]: game.players[Position.N].id,
          [Position.E]: game.players[Position.E].id,
          [Position.S]: game.players[Position.S].id,
          [Position.W]: game.players[Position.W].id
        }
      };
      if ('dealer' in game) {
        result.dealer = game.dealer;
      }
      if ('id' in game) {
        result.id = game.id;
      }

      return result;
    },

    deserialize: function (entity: GameEntity, target?: Game): Game {
      // TODO
      target.id = entity.id;
      return target;
    }
  };

  db: IDBDatabase;

  constructor() {
    this.getDatabase().then(db => this.db = db);
  }

  static createDatabase(event: IDBVersionChangeEvent): IDBDatabase {
    const db: IDBDatabase = (<IDBOpenDBRequest> event.currentTarget).result;
    if (event.oldVersion < 1) {
      db.createObjectStore('tournament', {keyPath: 'id', autoIncrement: true});
      const gameStore = db.createObjectStore('game', {keyPath: 'id', autoIncrement: true});
      gameStore.createIndex('tournament-id', 'tid', {unique: false});
      db.createObjectStore('protocol', {keyPath: 'id', autoIncrement: false});
    }
    return db;
  }

  getDatabase(): Promise<IDBDatabase> {
    if (this.db) {
      return Promise.resolve(this.db);
    }
    return new Promise<IDBDatabase>(function (resolve, reject) {
      const openRequest: IDBOpenDBRequest = window.indexedDB.open('TournamentHelper', 1);
      openRequest.onsuccess = () => resolve(openRequest.result);
      openRequest.onerror = reject;
      openRequest.onupgradeneeded = function (event: IDBVersionChangeEvent) {
        resolve(IndexedDBSerializer.createDatabase(event));
      };
    });
  }

  serializeProtocols(...protocols: Protocol[]): Promise<Protocol[]> {
    return this.putAll('protocol', IndexedDBSerializer.PROTOCOL_CONVERTER, protocols);
  }

  serializeTournament(tournament: Tournament) {
  }

  serializeGames(...games: Game[]): Promise<Game[]> {
    return this.putAll('game', IndexedDBSerializer.GAME_CONVERTER, games);
  }

  private putAll<T>(storage: string, converter: Converter<T, any>, items: T[]): Promise<T[]> {
    if (!items || !items.length) {
      return Promise.resolve(items);
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storage], 'readwrite');
      const objectStore = transaction.objectStore(storage);
      const keyPath: string = <string> objectStore.keyPath;
      transaction.onerror = reject;
      transaction.onabort = reject;
      let i = -1;
      next();

      function next(event?) {
        if (event && keyPath) {
          converter.deserialize({[keyPath]: event.currentTarget.result}, items[i]);
        }
        if (++i < items.length) {
          const request = objectStore.put(converter.serialize(items[i]));
          request.onsuccess = next;
        } else {
          resolve(items);
        }
      }
    });
  }
}
*/
