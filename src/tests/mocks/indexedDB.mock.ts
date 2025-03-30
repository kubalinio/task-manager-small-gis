// Mock implementation of IndexedDB for testing

class MockIDBRequest {
  readonly source = null
  readonly transaction = null
  readonly readyState = "pending"

  _result: any = null
  _error: Error | null = null
  onsuccess: ((event: any) => void) | null = null
  onerror: ((event: any) => void) | null = null

  get result() {
    return this._result
  }

  get error() {
    return this._error
  }

  _triggerSuccess(data: any) {
    this._result = data
    if (typeof this.onsuccess === "function") {
      const event = { target: this }
      this.onsuccess(event)
    }
  }

  _triggerError(error: Error) {
    this._error = error
    if (typeof this.onerror === "function") {
      const event = { target: this }
      this.onerror(event)
    }
  }
}

class MockIDBObjectStore {
  readonly name: string
  readonly keyPath: string | null = null
  readonly indexNames: string[] = []

  constructor(name: string) {
    this.name = name
  }

  add(value: any, key?: any): MockIDBRequest {
    const request = new MockIDBRequest()
    setTimeout(() => {
      request._triggerSuccess(key || 1)
    }, 0)
    return request
  }

  put(value: any, key?: any): MockIDBRequest {
    const request = new MockIDBRequest()
    setTimeout(() => {
      request._triggerSuccess(key || 1)
    }, 0)
    return request
  }

  delete(key: any): MockIDBRequest {
    const request = new MockIDBRequest()
    setTimeout(() => {
      request._triggerSuccess(undefined)
    }, 0)
    return request
  }

  get(key: any): MockIDBRequest {
    const request = new MockIDBRequest()
    setTimeout(() => {
      request._triggerSuccess({})
    }, 0)
    return request
  }

  getAll(): MockIDBRequest {
    const request = new MockIDBRequest()
    setTimeout(() => {
      request._triggerSuccess([])
    }, 0)
    return request
  }

  createIndex(name: string, keyPath: string | string[], options?: any): any {
    return {}
  }
}

class MockIDBTransaction {
  readonly objectStoreNames: string[]
  readonly mode: string
  readonly db: MockIDBDatabase

  oncomplete: ((event: any) => void) | null = null
  onerror: ((event: any) => void) | null = null
  onabort: ((event: any) => void) | null = null

  constructor(db: MockIDBDatabase, storeNames: string[], mode: string) {
    this.db = db
    this.objectStoreNames = storeNames
    this.mode = mode
  }

  objectStore(name: string): MockIDBObjectStore {
    return new MockIDBObjectStore(name)
  }

  abort(): void {
    if (typeof this.onabort === "function") {
      const event = { target: this }
      this.onabort(event)
    }
  }

  commit(): void {
    if (typeof this.oncomplete === "function") {
      const event = { target: this }
      this.oncomplete(event)
    }
  }
}

class MockIDBDatabase {
  readonly name: string
  readonly version: number
  readonly objectStoreNames: string[] = []

  onclose: ((event: any) => void) | null = null
  onerror: ((event: any) => void) | null = null
  onversionchange: ((event: any) => void) | null = null

  constructor(name: string, version: number) {
    this.name = name
    this.version = version
  }

  createObjectStore(name: string, options?: any): MockIDBObjectStore {
    this.objectStoreNames.push(name)
    return new MockIDBObjectStore(name)
  }

  transaction(
    storeNames: string | string[],
    mode = "readonly"
  ): MockIDBTransaction {
    const storeNamesArray =
      typeof storeNames === "string" ? [storeNames] : storeNames
    return new MockIDBTransaction(this, storeNamesArray, mode)
  }

  close(): void {
    if (typeof this.onclose === "function") {
      const event = { target: this }
      this.onclose(event)
    }
  }

  deleteObjectStore(name: string): void {
    const index = this.objectStoreNames.indexOf(name)
    if (index !== -1) {
      this.objectStoreNames.splice(index, 1)
    }
  }
}

export class MockIDBFactory {
  databases(): Promise<any[]> {
    return Promise.resolve([])
  }

  open(name: string, version?: number): MockIDBRequest {
    const request = new MockIDBRequest()
    const db = new MockIDBDatabase(name, version || 1)
    setTimeout(() => {
      request._triggerSuccess(db)
    }, 0)
    return request
  }

  deleteDatabase(name: string): MockIDBRequest {
    const request = new MockIDBRequest()
    setTimeout(() => {
      request._triggerSuccess(undefined)
    }, 0)
    return request
  }
}

// Export types to match the actual IndexedDB API
export type { MockIDBRequest as IDBRequest }
export type { MockIDBObjectStore as IDBObjectStore }
export type { MockIDBTransaction as IDBTransaction }
export type { MockIDBDatabase as IDBDatabase }
