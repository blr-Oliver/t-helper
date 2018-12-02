import {Injectable} from '@angular/core';
import {IndexedDBUtils} from './IndexedDBUtils';

@Injectable()
export class IndexedDBProvider {
  private static readonly SCHEDULE = {
    id: 1,
    name: 'Короткий турнир для 4 пар',
    totalPairs: 4,
    totalTours: 12,
    totalTables: 2,
    players: ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd']
  };
  private static readonly GAME_SLOTS = [
    {sid: 1, tour: 1, table: 1, deal: 1, dealer: 'N', players: {N: 'A', E: 'B', S: 'a', W: 'b'}},
    {sid: 1, tour: 1, table: 2, deal: 2, dealer: 'E', players: {N: 'C', E: 'D', S: 'c', W: 'd'}},
    {sid: 1, tour: 2, table: 1, deal: 2, dealer: 'E', players: {N: 'A', E: 'B', S: 'a', W: 'b'}},
    {sid: 1, tour: 2, table: 2, deal: 1, dealer: 'N', players: {N: 'C', E: 'D', S: 'c', W: 'd'}},
    {sid: 1, tour: 3, table: 1, deal: 3, dealer: 'S', players: {N: 'A', E: 'B', S: 'a', W: 'b'}},
    {sid: 1, tour: 3, table: 2, deal: 4, dealer: 'W', players: {N: 'd', E: 'c', S: 'D', W: 'C'}},
    {sid: 1, tour: 4, table: 1, deal: 4, dealer: 'W', players: {N: 'A', E: 'B', S: 'a', W: 'b'}},
    {sid: 1, tour: 4, table: 2, deal: 3, dealer: 'S', players: {N: 'd', E: 'c', S: 'D', W: 'C'}},
    {sid: 1, tour: 5, table: 1, deal: 5, dealer: 'N', players: {N: 'A', E: 'C', S: 'a', W: 'c'}},
    {sid: 1, tour: 5, table: 2, deal: 6, dealer: 'E', players: {N: 'd', E: 'B', S: 'D', W: 'b'}},
    {sid: 1, tour: 6, table: 1, deal: 6, dealer: 'E', players: {N: 'A', E: 'C', S: 'a', W: 'c'}},
    {sid: 1, tour: 6, table: 2, deal: 5, dealer: 'N', players: {N: 'D', E: 'b', S: 'd', W: 'B'}},
    {sid: 1, tour: 7, table: 1, deal: 7, dealer: 'S', players: {N: 'A', E: 'C', S: 'a', W: 'c'}},
    {sid: 1, tour: 7, table: 2, deal: 8, dealer: 'W', players: {N: 'B', E: 'D', S: 'b', W: 'd'}},
    {sid: 1, tour: 8, table: 1, deal: 8, dealer: 'W', players: {N: 'A', E: 'C', S: 'a', W: 'c'}},
    {sid: 1, tour: 8, table: 2, deal: 7, dealer: 'S', players: {N: 'B', E: 'D', S: 'b', W: 'd'}},
    {sid: 1, tour: 9, table: 1, deal: 9, dealer: 'N', players: {N: 'A', E: 'D', S: 'a', W: 'd'}},
    {sid: 1, tour: 9, table: 2, deal: 10, dealer: 'E', players: {N: 'B', E: 'C', S: 'b', W: 'c'}},
    {sid: 1, tour: 10, table: 1, deal: 10, dealer: 'E', players: {N: 'A', E: 'D', S: 'a', W: 'd'}},
    {sid: 1, tour: 10, table: 2, deal: 9, dealer: 'N', players: {N: 'B', E: 'C', S: 'b', W: 'c'}},
    {sid: 1, tour: 11, table: 1, deal: 11, dealer: 'S', players: {N: 'A', E: 'D', S: 'a', W: 'd'}},
    {sid: 1, tour: 11, table: 2, deal: 12, dealer: 'W', players: {N: 'c', E: 'B', S: 'C', W: 'b'}},
    {sid: 1, tour: 12, table: 2, deal: 11, dealer: 'S', players: {N: 'C', E: 'b', S: 'c', W: 'B'}},
    {sid: 1, tour: 12, table: 1, deal: 12, dealer: 'W', players: {N: 'A', E: 'D', S: 'a', W: 'd'}}
  ];

  get(version = 1): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request: IDBOpenDBRequest = window.indexedDB.open('Tournament', version);
      request.onsuccess = e => resolve(request.result);
      request.onerror = e => reject(e);
      request.onupgradeneeded = e => {
        const stores = this.createSchema(request.result, e);
        this.initializeData(stores).then(() => resolve(request.result));
      };
    });
  }

  private createSchema(db: IDBDatabase, e: IDBVersionChangeEvent): { [key: string]: IDBObjectStore } {
    if (e.newVersion !== 1)
      throw new Error('Only version 1 is supported');

    const tournamentStore = db.createObjectStore('tournament', {keyPath: 'id', autoIncrement: true});

    const scheduleStore = db.createObjectStore('schedule', {keyPath: 'id', autoIncrement: false});

    const gameSlotStore = db.createObjectStore('gameSlot', {keyPath: 'id', autoIncrement: true});
    gameSlotStore.createIndex('schedule', 'sid', {unique: false});

    const playerStore = db.createObjectStore('player', {keyPath: 'id', autoIncrement: true});
    playerStore.createIndex('tournament', 'tid', {unique: false});

    const protocolStore = db.createObjectStore('protocol', {keyPath: 'id', autoIncrement: true});
    protocolStore.createIndex('tournament', 'tid', {unique: false});

    return {
      tournament: tournamentStore,
      schedule: scheduleStore,
      gameSlot: gameSlotStore,
      player: playerStore,
      protocol: protocolStore
    };
  }

  private initializeData(stores: { [key: string]: IDBObjectStore }): Promise<boolean> {
    return Promise.all([
      IndexedDBUtils.create(stores['schedule'], IndexedDBProvider.SCHEDULE),
      IndexedDBUtils.create(stores['gameSlot'], ...IndexedDBProvider.GAME_SLOTS)
    ]).then(() => true);
  }
}
