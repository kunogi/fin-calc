class FinUtil {
  /**
   *
   * @description calc average
   * @param arr_
   * @returns
   */
  public avg(arr_: number[]): number {
    return arr_.reduce((a, c) => a + c) / arr_.length;
  }

  /**
   * 
   * */
  public op(op_: string, s_: number, m_: number): number {
    switch (op_) {
      case '+': return s_ + m_
      case '-': return s_ - m_
      case '*': return s_ * m_
      case '/': return m_ ? s_ / m_ : NaN
    }
    return NaN
  }

  public arrOp(arr1_: number[], arr2_: number | number[], op_: string): number[] {
    const result: number[] = []
    const len1 = arr1_.length
    if (typeof arr2_ === 'number') {
      for (let i = 0; i < len1; i++) {
        result.push(this.op(op_, arr1_[i], arr2_))
      }
    } else {
      const len2 = arr2_.length
      for (let i = 0; i < len1; i++) {
        result.push(this.op(op_, arr1_[i], arr2_[i]))
      }
      while (result.length < len2) {
        result.push(NaN)
      }
    }
    return result
  }

  /**
   * @description calculate standard deviation
   * @param arr_
   * @param n_
   * @returns
   */
  public sd(arr_: number[], n_: number): number {
    const avg: number = this.avg(arr_)
    const l = arr_.length
    const sum = arr_.reduce((a, c) => a + Math.pow(c - avg, 2), 0)
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
    for (let i = 1, l: number = arr_.length; i < l; i++) {
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
    for (let i = 0, s: number, l: number = arr_.length; i < l; i++) {
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
    let sum = 0
    const l: number = arr_.length
    for (let i: number = l; i--;) {
      sum += Math.abs(arr_[i] - avg)
    }
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
    for (let i = 0, s: number, l: number = arr_.length; i < l; i++) {
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
    const l: number = arr_.length
    const max: number = Math.max(...arr_)
    for (let i = 0, s: number; i < l; i++) {
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
    const l: number = arr_.length
    const min: number = Math.min(...arr_)
    for (let i = 0, s: number; i < l; i++) {
      if (n_) {
        s = i < n_ ? 0 : i - n_ + 1
        result.push(Math.min(...arr_.slice(s, i + 1)))
      } else {
        result.push(min)
      }
    }
    return result
  }

  public abs(o_: number[]): number[] {
    /*
        switch (this.getClass(o_)) {
          default:throw new Error('argument of abs() is not supported');
          case 'Number':
            return Math.abs(o_);

          case 'Array':
        */
    const result: number[] = []
    for (let i = 0, l: number = o_.length; i < l; i++) {
      result.push(Math.abs(o_[i]))
    }
    return result
  }

  public sum(arr_: number[], n_: number): number[] {
    const result: number[] = []
    if (n_) {
      for (let i = 0, s: number, l: number = arr_.length; i < l; i++) {
        s = i < n_ ? 0 : i - n_ + 1
        result.push(this.getArrSum(arr_.slice(s, i + 1)))
      }
    } else {
      let last = 0
      for (let i = 0, l: number = arr_.length; i < l; i++) {
        last += arr_[i]
        result.push(last)
      }
    }
    return result
  }

  public max(arr1_: any, arr2_: any): number | number[] {
    let result: number[]
    let i: number
    let l: number
    switch (this.getClass(arr1_)) {
      case 'Array':
        switch (this.getClass(arr2_)) {
          case 'Array':
            result = []
            for (i = 0, l = arr1_.length; i < l; i++) {
              result.push(Math.max(arr1_[i], arr2_[i]))
            }
            return result

          case 'Number':
            result = []
            for (i = 0, l = arr1_.length; i < l; i++) {
              result.push(Math.max(arr1_[i], arr2_))
            }
            return result

          default:
            throw new Error('argument of max() is not supported')
        }

      case 'Number':
        switch (this.getClass(arr2_)) {
          case 'Array':
            result = []
            for (i = 0, l = arr2_.length; i < l; i++) {
              result.push(Math.max(arr1_, arr2_[i]))
            }
            return result

          case 'Number':
            return Math.max(arr1_, arr2_)

          default:
            throw new Error('argument of max() is not supported')
        }

      default:
        throw new Error('argument of max() is not supported')
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
  public genArrByProp(arr_: any[], prop_: string, f_?: (n: any) => any): any[] {
    if (prop_) {
      const result = [];
      for (let i = 0, l = arr_.length; i < l; i++) {
        result.push(f_ ? f_(arr_[i][prop_]) : arr_[i][prop_])
      }
      return result
    }
    return arr_
  }

  private getClass(o_: any): string {
    return typeof o_ === 'undefined' ? 'undefined' : o_ === null ? 'null' : o_.constructor.name;
  }

  private getArrSum(arr_: number[]): number {
    let sum = 0
    for (let i = arr_.length; i--;) {
      sum += arr_[i]
    }
    return sum
  }
}

export default new FinUtil()