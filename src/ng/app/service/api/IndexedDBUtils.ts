export class IndexedDBUtils {
  static getOne<T>(store: IDBObjectStore, key: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = e => reject(e);
    });
  }

  static getAll<T>(store: IDBObjectStore): Promise<T[]> {
    return this.drainCursor(store.openCursor());
  }

  static findAll<T>(store: IDBObjectStore, index: string, key: any): Promise<T[]> {
    return this.drainCursor(store.index(index).openCursor(key));
  }

  static updateOne<T>(store: IDBObjectStore, value: T, key?: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const request = store.keyPath ? store.put(value) : store.put(value, key);
      request.onsuccess = () => resolve(value);
      request.onerror = e => reject(e);
    });
  }

  static deleteOne(store: IDBObjectStore, key: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = e => reject(e);
    });
  }

  static deleteAllWithIndex(store: IDBObjectStore, index: string, key: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = store.index(index).openCursor(key);
      request.onsuccess = () => {
        const cursor = <IDBCursorWithValue> request.result;
        if (cursor) {
          const deleteRequest = store.delete(cursor.value[<string> store.keyPath]);
          deleteRequest.onsuccess = () => cursor.continue();
          deleteRequest.onerror = e => reject(e);
        } else
          resolve();
      };
      request.onerror = e => reject(e);
    });
  }

  static create<T>(store: IDBObjectStore, ...values: T[]): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      let i = 0, request: IDBRequest;
      next();

      function next() {
        if (request)
          values[i++][<string> store.keyPath] = request.result;
        if (i < values.length) {
          request = store.add(values[i]);
          request.onsuccess = next;
          request.onerror = e => reject(e);
        } else
          resolve(values);
      }
    });
  }

  private static drainCursor<T>(cursorRequest: IDBRequest): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      const data: T[] = [];
      cursorRequest.onsuccess = () => {
        const cursor = <IDBCursorWithValue> cursorRequest.result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        } else
          resolve(data);
      };
      cursorRequest.onerror = e => reject(e);
    });
  }
}
