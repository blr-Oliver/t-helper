import {DTO} from '../../model/dto/DTO';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';
import {TournamentDTO} from '../../model/dto/TournamentDTO';

export class IndexedDBSerializer {
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

  serializeProtocols(...protocols: ProtocolDTO[]): Promise<ProtocolDTO[]> {
    return this.putAll('protocol', protocols);
  }

  serializeTournament(tournament: TournamentDTO): Promise<TournamentDTO> {
    return null;
  }

  private putAll<T extends DTO>(storage: string, items: T[]): Promise<T[]> {
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
          items[i][keyPath] = event.currentTarget.result;
        }
        if (++i < items.length) {
          const request = objectStore.put(items[i]);
          request.onsuccess = next;
        } else {
          resolve(items);
        }
      }
    });
  }
}
