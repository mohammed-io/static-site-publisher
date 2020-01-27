// @ts-check

/**
 * @template T
 */
export class Result {
  /**
   * @param {T} value
   * @param {Error} error
   * @private
   */
  constructor(value = null, error = null) {
    this.value = value === undefined ? null : value;

    this.error = error === undefined ? null : error;
  }

  /**
   * @template T
   * @param {T} value
   * @returns {Result<T>}
   */
  static success(value) {
    return new Result(value);
  }

  /**
   * @template T
   * @param {Error} error
   * @returns {Result<T>}
   */
  static error(error) {
    return new Result(null, error);
  }

  /**
   * @returns {boolean}
   */
  hasValue() {
    return this.value !== null;
  }

  /**
   * @returns {boolean}
   */
  hasError() {
    return this.error !== null;
  }

  /**
   * @template R
   * @param {(f: T) => R} mapper
   * @returns {Result<R>}
   */
  map(mapper) {
    try {
      return this.hasValue()
        ? Result.success(mapper(this.value))
        : Result.error(this.error);
    } catch (err) {
      return Result.error(err);
    }
  }

  /**
   *
   * @template R
   * @param {(f: T) => Result<R>} mapper
   * @returns {Result<R>}
   */
  flatMap(mapper) {
    try {
      return this.hasValue() ? mapper(this.value) : Result.error(this.error);
    } catch (err) {
      return Result.error(err);
    }
  }

  /**
   * @param {any} matcher
   * @returns {any}
   */
  select(matcher) {
    if (!matcher) throw new Error('Matcher should have a value');

    if (this.hasValue() && 'success' in matcher) {
      return matcher.success(this.value);
    }

    if ('error' in matcher) {
      return matcher.error(this.error);
    }
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
    return this.hasValue()
      ? `Result[${this.value.toString()}]`
      : 'Result[None]';
  }
}
