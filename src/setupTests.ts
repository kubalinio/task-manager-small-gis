/* eslint-disable @typescript-eslint/no-empty-function */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom"

import { vi } from "vitest"

import { MockIDBFactory } from "./tests/mocks/indexedDB.mock"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      MutationObserver: typeof MutationObserver
      indexedDB: any
      IDBRequest: any
      IDBOpenDBRequest: any
      IDBDatabase: any
      IDBTransaction: any
      IDBCursor: any
      IDBKeyRange: any
    }
  }
}

// Mock MutationObserver
global.MutationObserver = class {
  disconnect(): void {}

  observe(target: Node, options?: MutationObserverInit): void {}
  takeRecords(): MutationRecord[] {
    return []
  }
}

// Set up the comprehensive IndexedDB mock
const mockIndexedDB = new MockIDBFactory()

// Mock IndexedDB objects
Object.defineProperty(window, "indexedDB", {
  value: mockIndexedDB,
  writable: true
})

Object.defineProperty(window, "IDBRequest", {
  value: {},
  writable: true
})

Object.defineProperty(window, "IDBOpenDBRequest", {
  value: {},
  writable: true
})

Object.defineProperty(window, "IDBDatabase", {
  value: {},
  writable: true
})

Object.defineProperty(window, "IDBTransaction", {
  value: {},
  writable: true
})

Object.defineProperty(window, "IDBCursor", {
  value: {},
  writable: true
})

Object.defineProperty(window, "IDBKeyRange", {
  value: {
    bound: vi.fn(),
    lowerBound: vi.fn(),
    upperBound: vi.fn(),
    only: vi.fn()
  },
  writable: true
})

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
})
