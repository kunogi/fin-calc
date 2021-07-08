/**
 *
 * @function MA
 * @description calculate moving average
 * @param {number[]} arr_ original data array
 * @param {number} days_ days
 * @param {boolean} calcAnyDays_ calculate or not based on not enough days
 * @returns {number[]} moving average array
 */
export default function (arr_: number[], days_: number, calcAnyDays_: boolean = true): number[] {
    const result: number[] = [];

    for (let i: number = 0, sum: number = 0, ma: number | null, l: number = arr_.length; i < l; i++) {
    // add new incoming value to sum:
        arr_[i] && (sum += arr_[i]);

        if (i >= days_ - 1) {
            ma = sum / days_;
            // remove the oldest value from sum, to keep the total count
            arr_[i - days_ + 1] && (sum -= arr_[i - days_ + 1]);
        } else {
            // not enough days:
            ma = calcAnyDays_ ? sum / (i + 1) : 0;
        }

        result.push(ma);
    }

    return result;
}