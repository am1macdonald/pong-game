export interface Subscriber {
  self: unknown;
  next: (...args) => unknown;
}

export interface Observable {
  subscribe: (sub: Subscriber) => void;
  unsubscribe: (sub: Subscriber) => void;
}
