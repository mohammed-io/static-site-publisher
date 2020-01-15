// @ts-check

/**
 * @template T
 */
export class Maybe {
  /**
   * @param {T} value
   */
  constructor(value) {
    /**
     * @private
     */
    this.value = value === undefined ? null : value;
  }

  /**
   * @template T
   * @param {T} value
   * @returns {Maybe<T>}
   */
  static of(value) {
    return new Maybe(value);
  }

  /**
   * @template T
   * @returns {Maybe<T>}
   */
  static none() {
    return new Maybe(null);
  }

  /**
   * @returns {boolean}
   */
  hasValue() {
    return this.value !== null;
  }

  /**
   * @template R
   * @param {(f: T) => R} mapper
   * @returns {Maybe<R>}
   */
  map(mapper) {
    return this.hasValue() ? Maybe.of(mapper(this.value)) : Maybe.none();
  }

  /**
   *
   * @template R
   * @param {(f: T) => Maybe<R>} mapper
   * @returns {Maybe<R>}
   */
  flatMap(mapper) {
    if (!this.hasValue()) return Maybe.none();

    return mapper(this.value);
  }

  /**
   * @template R
   * @param {R} otherwise
   * @returns {T|R}
   */
  getOrElse(otherwise) {
    return this.hasValue() ? this.value : otherwise;
  }

  /**
   * @template R
   * @param {() => R} otherwise
   * @returns {T|R}
   */
  getOr(otherwise) {
    return this.hasValue() ? this.value : otherwise();
  }

  /**
   * @returns {string}
   */
  toString() {
    return this.hasValue() ? `Maybe[${this.value.toString()}]` : 'Maybe[None]';
  }
}
