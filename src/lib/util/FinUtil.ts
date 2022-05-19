class FinUtil {
  
  public getArrSum(arr_: number[]): number {
    return arr_.reduce((a, c) => a + c, 0)
  }

  /**
   *
   * @description calc average
   * @param arr_
   * @returns
   */
  public avg(arr_: number[]): number {
    return this.getArrSum(arr_) / arr_.length;
  }
  public avgByProp(arr_: Record<string, number>[], prop: string): number {
    return arr_.map(item => item[prop]).reduce((a, c) => a + c, 0) / arr_.length;
  }

  private op(op_: '+' | '-' | '*' | '/', s_: number, m_: number): number {
    switch (op_) {
      case '+': return s_ + m_
      case '-': return s_ - m_
      case '*': return s_ * m_
      case '/': return m_ ? s_ / m_ : NaN
    }
    //return NaN
  }

  public arrOp(arr1_: number[], second_: number | number[], op_: '+' | '-' | '*' | '/'): number[] {
    const result: number[] = []
    const len1 = arr1_.length
    if (typeof second_ === 'number') {
      for (let i = 0; i < len1; i++) {
        result.push(this.op(op_, arr1_[i], second_))
      }
    } else {
      const len2 = second_.length
      for (let i = 0; i < len1; i++) {
        result.push(this.op(op_, arr1_[i], second_[i]))
      }
      while (result.length < len2) {
        result.push(NaN)
      }
    }
    return result
  }

  /**
   * @description calculate standard deviation
   * https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/standardDeviation.md
   * @param arr_
   * @param n_
   * @returns
   */
  public sd(arr_: number[], n_: number): number {
    const avg: number = this.avg(arr_)
    const sum = arr_.reduce((a, c) => a + Math.pow(c - avg, 2), 0)
    const l = arr_.length
    return Math.sqrt(sum / (n_ ? l - n_ : l))
  }

  /**
   *
   * @description Simple Moving Average
   * @param arr_
   * @param days_
   * @param weight_
   * @returns
   */
  public sma(arr_: number[], days_: number, weight_: number): number[] {
    const result: number[] = [arr_[0]]
    for (let i = 1, l = arr_.length; i < l; i++) {
      result.push((weight_ * arr_[i] + (days_ - weight_) * result[i - 1]) / days_)
    }
    return result
  }

  /**
   *
   * @description
   * @param arr_
   * @param n_
   * @returns
   */
  public std(arr_: number[], n_: number): number[] {
    const result: number[] = []
    for (let i = 0, s: number, l = arr_.length; i < l; i++) {
      s = i < n_ ? 0 : i - n_ + 1
      result.push(this.sd(arr_.slice(s, i + 1), 1))
    }
    return result
  }

  /**
   *
   * @description calc absolute deviation
   * @link https://baike.baidu.com/item/%E7%BB%9D%E5%AF%B9%E5%81%8F%E5%B7%AE/5805166
   * @param arr_
   * @returns
   */
  public ad(arr_: number[]): number {
    const avg: number = this.avg(arr_)
    const l = arr_.length
    const sum: number = arr_.reduce((a, c) => a + Math.abs(c - avg), 0)
    return sum / l
  }

  /**
   *
   * @param arr_
   * @param n_
   * @returns
   */
  public avedev(arr_: number[], n_: number): number[] {
    const result: number[] = []
    for (let i = 0, s: number, l = arr_.length; i < l; i++) {
      s = i < n_ ? 0 : i - n_ + 1
      result.push(this.ad(arr_.slice(s, i + 1)))
    }
    return result
  }

  /**
   *
   * @param arr_
   * @param n_
   * @returns
   */
  public hhv(arr_: number[], n_: number): number[] {
    const result: number[] = []
    const max: number = Math.max(...arr_)
    for (let i = 0, l = arr_.length, s: number; i < l; i++) {
      if (n_) {
        s = i < n_ ? 0 : i - n_ + 1
        result.push(Math.max(...arr_.slice(s, i + 1)))
      } else {
        result.push(max)
      }
    }
    return result
  }

  /**
   *
   * @param arr_
   * @param n_
   * @returns
   */
  public llv(arr_: number[], n_: number): number[] {
    const result: number[] = []
    const min: number = Math.min(...arr_)
    for (let i = 0, l = arr_.length, s: number; i < l; i++) {
      if (n_) {
        s = i < n_ ? 0 : i - n_ + 1
        result.push(Math.min(...arr_.slice(s, i + 1)))
      } else {
        result.push(min)
      }
    }
    return result
  }

  public abs(arr_: number[]): number[] {
    return arr_.map(i => Math.abs(i));
  }

  public sum(arr_: number[], n_: number): number[] {
    const result: number[] = []
    if (n_) {
      for (let i = 0, s: number, l = arr_.length; i < l; i++) {
        s = i < n_ ? 0 : i - n_ + 1
        result.push(this.getArrSum(arr_.slice(s, i + 1)))
      }
    } else {
      let last = 0
      for (let i = 0, l = arr_.length; i < l; i++) {
        last += arr_[i]
        result.push(last)
      }
    }
    return result
  }

  public max(first_: number | number[], second_: number | number[]): number | number[] {
    const result: number[] = []
    if (typeof first_ !== 'number') {//number[]
      if (typeof second_ !== 'number') {//number[]
        for (let i = 0, l = first_.length; i < l; i++) {
          result.push(Math.max(first_[i], second_[i]))
        }
      } else {
        for (let i = 0, l = first_.length; i < l; i++) {
          result.push(Math.max(first_[i], second_))
        }
      }
      return result
    } else {
      if (typeof second_ !== 'number') {//number[]
        for (let i = 0, l = second_.length; i < l; i++) {
          result.push(Math.max(first_, second_[i]))
        }
        return result;
      } else {
        return Math.max(first_, second_)
      }
    }
  }

  public ref(arr_: number[], n_: number): number[] {
    const result: number[] = new Array(n_).fill(0)
    for (let i = n_, l = arr_.length; i < l; i++) {
      result.push(arr_[i - n_])
    }
    return result
  }

  /**
   *
   * @param arr_
   * @param prop_
   * @param f_
   * @returns
   */
  public genArrByProp(arr_: any[], prop_: string, f_?: (n: unknown) => number): number[] {
    const result: number[] = [];
    for (let i = 0, l = arr_.length; i < l; i++) {
      result.push(f_ ? f_(arr_[i][prop_]) : arr_[i][prop_])
    }
    return result
  }

  private getClass(o_: Record<string, unknown>): string {
    return typeof o_ === 'undefined' ? 'undefined' : o_ === null ? 'null' : o_.constructor.name;
  }
}

export default new FinUtil()