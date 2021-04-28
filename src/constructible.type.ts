/**
 * Type that can be constructed.
 */
export interface Constructible<T = any> {
  new (...args: any[]): T;
}
