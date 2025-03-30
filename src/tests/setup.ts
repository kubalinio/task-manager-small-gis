import { MockIDBFactory } from "./mocks/indexedDB.mock"

// Set up global mocks for IndexedDB
const mockIndexedDB = new MockIDBFactory()

// Add IndexedDB global objects to the global context
Object.defineProperty(global, "indexedDB", {
  value: mockIndexedDB,
  writable: true
})

Object.defineProperty(global, "IDBRequest", {
  value: {},
  writable: true
})

Object.defineProperty(global, "IDBOpenDBRequest", {
  value: {},
  writable: true
})

Object.defineProperty(global, "IDBDatabase", {
  value: {},
  writable: true
})

Object.defineProperty(global, "IDBTransaction", {
  value: {},
  writable: true
})

Object.defineProperty(global, "IDBCursor", {
  value: {},
  writable: true
})

Object.defineProperty(global, "IDBKeyRange", {
  value: {
    bound: jest.fn(),
    lowerBound: jest.fn(),
    upperBound: jest.fn(),
    only: jest.fn()
  },
  writable: true
})

// Reset mocks between tests
beforeEach(() => {
  // Additional setup for each test if needed
})

afterEach(() => {
  // Cleanup after tests if needed
  jest.clearAllMocks()
})
