interface IImmutableMap<T> {
  toJS: () => T;
  // get<I extends keyof T>(key: I & K): T[I] & V;
  // set<S extends keyof T>(key: S & K, value: T[S] & V);
}

export default IImmutableMap;
