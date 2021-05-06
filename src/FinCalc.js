module.exports = new FinCalc();
function FinCalc() {
	/**
	 * 
	 * @param {number[]} arr_ original data array
	 * @param {number} days_ days
	 * @param {boolean} calcAnyDays_ calculate or not based on not enough days
	 * @returns {number[]} moving average array
	 */
	this.calcMA = function (arr_, days_, calcAnyDays_ = true) {
		let result = [];
		for (let i = 0, sum = 0, ma, l = arr_.length; i < l; i++) {
			arr_[i] && (sum += arr_[i]);//sum动态维护，新进
			if (i >= days_ - 1) {
				ma = sum / days_;
				arr_[i - days_ + 1] && (sum -= arr_[i - days_ + 1]);//sum动态维护，旧出
			} else {
				//天数不足时，是否依然基于现有天数计算
				ma = calcAnyDays_ ? sum / (i + 1) : null;
			}

			result.push(ma);
		}
		return result;
	};
}
