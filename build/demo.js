(self["webpackChunkfin_calc"] = self["webpackChunkfin_calc"] || []).push([[0],[
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _testdata_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _src_util_FinUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _src_MA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _src_MACD__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _src_MACD__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_MACD__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_SAR__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _src_SAR__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_src_SAR__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_BBIBOLL__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _src_BBIBOLL__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_src_BBIBOLL__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _src_KDJ__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _src_KDJ__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_src_KDJ__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_DMI__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _src_DMI__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_src_DMI__WEBPACK_IMPORTED_MODULE_7__);










function getContainer() {
  const root = document.getElementById('root');
  const container = document.createElement('p');
  root.appendChild(container);
  return container;
}
function showTestData() {
  console.log('original data:', _testdata_json__WEBPACK_IMPORTED_MODULE_0__);
  const container = getContainer();
  // container.innerHTML = ['original data:', JSON.stringify(testdata)].join('<br/>');
  container.innerHTML = "original data example (see console for more): <br/>[{'open':2, 'high': 4, 'low': 1, 'close':3, 'volume':999, 'date':'2019-10-11T00:00:00.000Z'}, ...]";
}
function test(name_, data_) {
  data_ = data_.reverse();// show newer datas first
  console.log(name_, data_);
  const container = getContainer();
  container.innerHTML = `${name_}:<br/>${JSON.stringify(data_.slice(0, 9))}...`;
}
window.addEventListener('load', () => {
  showTestData();
  testMA();
  test('MACD', _src_MACD__WEBPACK_IMPORTED_MODULE_3___default()(_testdata_json__WEBPACK_IMPORTED_MODULE_0__));
  test('SAR', _src_SAR__WEBPACK_IMPORTED_MODULE_4___default()(_testdata_json__WEBPACK_IMPORTED_MODULE_0__));
  test('BBIBOLL', _src_BBIBOLL__WEBPACK_IMPORTED_MODULE_5___default()(_testdata_json__WEBPACK_IMPORTED_MODULE_0__));
  test('KDJ', _src_KDJ__WEBPACK_IMPORTED_MODULE_6___default()(_testdata_json__WEBPACK_IMPORTED_MODULE_0__));
  test('DMI', _src_DMI__WEBPACK_IMPORTED_MODULE_7___default()(_testdata_json__WEBPACK_IMPORTED_MODULE_0__));
})

function testMA() {
  const prop = 'close';// or any other prop of the original data
  const data = _src_util_FinUtil__WEBPACK_IMPORTED_MODULE_1__.default.genArrByProp(_testdata_json__WEBPACK_IMPORTED_MODULE_0__, prop);
  const a = (0,_src_MA__WEBPACK_IMPORTED_MODULE_2__.default)(data, 5);
  console.log('Moving Average(MA) based on', prop, a);
  const container = getContainer();
  container.innerHTML = `MA based on ${prop}:<br/>${a.slice(0, 9)}...`;
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var FinUtil = /** @class */ (function () {
    function FinUtil() {
    }
    /**
     *
     * @description calc average
     * @param arr_
     * @returns
     */
    FinUtil.prototype.avg = function (arr_) {
        var sum = 0;
        var l = arr_.length;
        for (var i = l; i--;) {
            sum += arr_[i];
        }
        return sum / l;
    };
    FinUtil.prototype.op = function (op_, s_, m_) {
        switch (op_) {
            case '+': return s_ + m_;
            case '-': return s_ - m_;
            case '*': return s_ * m_;
            case '/': return m_ ? s_ / m_ : NaN;
        }
        return NaN;
    };
    FinUtil.prototype.arrOp = function (arr1_, arr2_, op_) {
        var result = [];
        var i;
        var len1 = arr1_.length;
        var len2;
        switch (this.getClass(arr2_)) {
            case 'Array':
                len2 = arr2_.length;
                for (i = 0; i < len1; i++) {
                    if (this.getClass(arr1_[i]) === 'Number' && this.getClass(arr2_[i]) === 'Number') {
                        result.push(this.op(op_, arr1_[i], arr2_[i]));
                    }
                    else {
                        result.push(NaN);
                    }
                }
                while (result.length < len2) {
                    result.push(NaN);
                }
                break;
            case 'Number':
                for (i = 0; i < len1; i++) {
                    if (this.getClass(arr1_[i]) === 'Number') {
                        result.push(this.op(op_, arr1_[i], arr2_));
                    }
                    else {
                        result.push(NaN);
                    }
                }
                break;
            default:
                throw Error('argument of arrOp() is not supported');
        }
        return result;
    };
    /**
     * @description calculate standard deviation
     * @param arr_
     * @param n_
     * @returns
     */
    FinUtil.prototype.sd = function (arr_, n_) {
        var avg = this.avg(arr_);
        var l = arr_.length;
        var sum = 0;
        for (var i = l; i--;) {
            sum += Math.pow(arr_[i] - avg, 2);
        }
        return Math.sqrt(sum / (n_ ? l - n_ : l));
    };
    /**
     *
     * @description Simple Moving Average
     * @param arr_
     * @param days_
     * @param weight_
     * @returns
     */
    FinUtil.prototype.sma = function (arr_, days_, weight_) {
        var result = [arr_[0]];
        for (var i = 1, l = arr_.length; i < l; i++) {
            result.push((weight_ * arr_[i] + (days_ - weight_) * result[i - 1]) / days_);
        }
        return result;
    };
    /**
     *
     * @description
     * @param arr_
     * @param n_
     * @returns
     */
    FinUtil.prototype.std = function (arr_, n_) {
        var result = [];
        for (var i = 0, s = void 0, l = arr_.length; i < l; i++) {
            s = i < n_ ? 0 : i - n_ + 1;
            result.push(this.sd(arr_.slice(s, i + 1), 1));
        }
        return result;
    };
    /**
     *
     * @description calc absolute deviation
     * @link https://baike.baidu.com/item/%E7%BB%9D%E5%AF%B9%E5%81%8F%E5%B7%AE/5805166
     * @param arr_
     * @returns
     */
    FinUtil.prototype.ad = function (arr_) {
        var avg = this.avg(arr_);
        var sum = 0;
        var l = arr_.length;
        for (var i = l; i--;) {
            sum += Math.abs(arr_[i] - avg);
        }
        return sum / l;
    };
    /**
     *
     * @param arr_
     * @param n_
     * @returns
     */
    FinUtil.prototype.avedev = function (arr_, n_) {
        var result = [];
        for (var i = 0, s = void 0, l = arr_.length; i < l; i++) {
            s = i < n_ ? 0 : i - n_ + 1;
            result.push(this.ad(arr_.slice(s, i + 1)));
        }
        return result;
    };
    /**
     *
     * @param arr_
     * @param n_
     * @returns
     */
    FinUtil.prototype.hhv = function (arr_, n_) {
        var result = [];
        var l = arr_.length;
        var max = Math.max.apply(Math, arr_);
        for (var i = 0, s = void 0; i < l; i++) {
            if (n_) {
                s = i < n_ ? 0 : i - n_ + 1;
                result.push(Math.max.apply(Math, arr_.slice(s, i + 1)));
            }
            else {
                result.push(max);
            }
        }
        return result;
    };
    /**
     *
     * @param arr_
     * @param n_
     * @returns
     */
    FinUtil.prototype.llv = function (arr_, n_) {
        var result = [];
        var l = arr_.length;
        var min = Math.min.apply(Math, arr_);
        for (var i = 0, s = void 0; i < l; i++) {
            if (n_) {
                s = i < n_ ? 0 : i - n_ + 1;
                result.push(Math.min.apply(Math, arr_.slice(s, i + 1)));
            }
            else {
                result.push(min);
            }
        }
        return result;
    };
    FinUtil.prototype.abs = function (o_) {
        /*
            switch (this.getClass(o_)) {
              default:throw new Error('argument of abs() is not supported');
              case 'Number':
                return Math.abs(o_);
    
              case 'Array':
            */
        var result = [];
        for (var i = 0, l = o_.length; i < l; i++) {
            result.push(Math.abs(o_[i]));
        }
        return result;
    };
    FinUtil.prototype.sum = function (arr_, n_) {
        var result = [];
        if (n_) {
            for (var i = 0, s = void 0, l = arr_.length; i < l; i++) {
                s = i < n_ ? 0 : i - n_ + 1;
                result.push(this.getArrSum(arr_.slice(s, i + 1)));
            }
        }
        else {
            var last = 0;
            for (var i = 0, l = arr_.length; i < l; i++) {
                last += arr_[i];
                result.push(last);
            }
        }
        return result;
    };
    FinUtil.prototype.max = function (arr1_, arr2_) {
        var result;
        var i;
        var l;
        switch (this.getClass(arr1_)) {
            case 'Array':
                switch (this.getClass(arr2_)) {
                    case 'Array':
                        result = [];
                        for (i = 0, l = arr1_.length; i < l; i++) {
                            result.push(Math.max(arr1_[i], arr2_[i]));
                        }
                        return result;
                    case 'Number':
                        result = [];
                        for (i = 0, l = arr1_.length; i < l; i++) {
                            result.push(Math.max(arr1_[i], arr2_));
                        }
                        return result;
                    default:
                        throw new Error('argument of max() is not supported');
                }
            case 'Number':
                switch (this.getClass(arr2_)) {
                    case 'Array':
                        result = [];
                        for (i = 0, l = arr2_.length; i < l; i++) {
                            result.push(Math.max(arr1_, arr2_[i]));
                        }
                        return result;
                    case 'Number':
                        return Math.max(arr1_, arr2_);
                    default:
                        throw new Error('argument of max() is not supported');
                }
            default:
                throw new Error('argument of max() is not supported');
        }
    };
    FinUtil.prototype.ref = function (arr_, n_) {
        var result = new Array(n_).fill(0);
        for (var i = n_, l = arr_.length; i < l; i++) {
            result.push(arr_[i - n_]);
        }
        return result;
    };
    /**
     *
     * @param arr_
     * @param prop_
     * @param f_
     * @returns
     */
    FinUtil.prototype.genArrByProp = function (arr_, prop_, f_) {
        if (prop_) {
            var result = [];
            for (var i = 0, l = arr_.length; i < l; i++) {
                result.push(f_ ? f_(arr_[i][prop_]) : arr_[i][prop_]);
            }
            return result;
        }
        return arr_;
    };
    FinUtil.prototype.getClass = function (o_) {
        // return typeof o_ === 'undefined' ? 'undefined' : o_ === null ? 'null' : o_.constructor.name;
        if (typeof o_ === 'undefined') {
            return 'undefined';
        }
        if (o_ === null) {
            return 'null';
        }
        return o_.constructor.name;
    };
    FinUtil.prototype.getArrSum = function (arr_) {
        var sum = 0;
        for (var i = arr_.length; i--;) {
            sum += arr_[i];
        }
        return sum;
    };
    return FinUtil;
}());
exports.default = new FinUtil();


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @function MA
 * @description calculate moving average
 * @param {number[]} arr_ original data array
 * @param {number} days_ days
 * @param {boolean} calcAnyDays_ calculate or not based on not enough days
 * @returns {number[]} moving average array
 */
function default_1(arr_, days_, calcAnyDays_) {
    if (calcAnyDays_ === void 0) { calcAnyDays_ = true; }
    var result = [];
    for (var i = 0, sum = 0, ma = void 0, l = arr_.length; i < l; i++) {
        // add new incoming value to sum:
        arr_[i] && (sum += arr_[i]);
        if (i >= days_ - 1) {
            ma = sum / days_;
            // remove the oldest value from sum, to keep the total count
            arr_[i - days_ + 1] && (sum -= arr_[i - days_ + 1]);
        }
        else {
            // not enough days:
            ma = calcAnyDays_ ? sum / (i + 1) : 0;
        }
        result.push(ma);
    }
    return result;
}
exports.default = default_1;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var FinUtil_1 = __importDefault(__webpack_require__(2));
var EMA_1 = __importDefault(__webpack_require__(5));
/**
 *
 * @description MACD, Moving Average Convergence and Divergence
  DIF = EMA(CLOSE, SHORT) - EMA(CLOSE, LONG)
  DEA = EMA(DIF, MID)
  MACD = (DIF - DEA) * 2
 * @param arr_
 * @param customData_ default to calculate based on close price with params:12,26,9
 * @returns
 */
function default_1(arr_, customData_) {
    if (customData_ === void 0) { customData_ = { prop: 'close', v0: 12, v1: 26, v2: 9 }; }
    var result = [];
    var prop = customData_.prop, SHORT = customData_.v0, LONG = customData_.v1, MID = customData_.v2;
    var arr = FinUtil_1.default.genArrByProp(arr_, prop);
    var difArr = FinUtil_1.default.arrOp(EMA_1.default(arr, SHORT), EMA_1.default(arr, LONG), '-');
    var deaArr = EMA_1.default(difArr, MID);
    var macdArr = FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(difArr, deaArr, '-'), 2, '*');
    for (var i = 0, l = arr.length; i < l; i++) {
        result[i] = {
            dif: difArr[i],
            dea: deaArr[i],
            bar: macdArr[i]
        };
    }
    return result;
}
exports.default = default_1;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @function EMA
 * @description calculate exponential moving average
 * @param arr_ original data array
 * @param days_ days
 * @returns
 */
function default_1(arr_, days_) {
    if (typeof arr_ === 'number') {
        arr_ = [arr_];
    }
    var result = [arr_[0]];
    for (var i = 1, l = arr_.length; i < l; i++) {
        result.push((2 * arr_[i] + (days_ - 1) * result[i - 1]) / (days_ + 1));
    }
    return result;
}
exports.default = default_1;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var FinUtil_1 = __importDefault(__webpack_require__(2));
function calc(arr_, n_, step_, max_) {
    var highArr = FinUtil_1.default.genArrByProp(arr_, 'high');
    var lowArr = FinUtil_1.default.genArrByProp(arr_, 'low');
    var len = arr_.length;
    var result = [];
    var stepArr = [];
    var extremeArr = [];
    var directionArr = [];
    function up(l) {
        if (l < len) {
            result[l] = Math.min.apply(Math, lowArr.slice(l - n_, l));
            directionArr[l] = 1;
            if (result[l] > lowArr[l]) {
                down(l + 1);
            }
            else {
                extremeArr[l] = Math.max.apply(null, highArr.slice(l - n_ + 1, l + 1));
                for (stepArr[l] = step_; len - 1 > l;) {
                    result[l + 1] = result[l] + stepArr[l] * (extremeArr[l] - result[l]) / 100;
                    directionArr[l + 1] = 1;
                    if (result[l + 1] > lowArr[l + 1]) {
                        return down(l + 2);
                    }
                    extremeArr[l + 1] = Math.max.apply(Math, highArr.slice(l - n_ + 2, l + 2));
                    if (highArr[l + 1] > extremeArr[l]) {
                        stepArr[l + 1] = stepArr[l] + step_;
                        stepArr[l + 1] > max_ && (stepArr[l + 1] = max_);
                    }
                    else {
                        stepArr[l + 1] = stepArr[l];
                    }
                    l++;
                }
            }
        }
    }
    function down(l) {
        if (l < len) {
            result[l] = Math.max.apply(Math, highArr.slice(l - n_, l));
            directionArr[l] = 0;
            if (result[l] < highArr[l]) {
                return up(l + 1);
            }
            extremeArr[l] = Math.min.apply(Math, lowArr.slice(l - n_ + 1, l + 1));
            for (stepArr[l] = step_; len - 1 > l;) {
                result[l + 1] = result[l] + stepArr[l] * (extremeArr[l] - result[l]) / 100;
                directionArr[l + 1] = 0;
                if (result[l + 1] < highArr[l + 1]) {
                    return up(l + 2);
                }
                extremeArr[l + 1] = Math.min.apply(Math, lowArr.slice(l - n_ + 2, l + 2));
                if (lowArr[l + 1] < extremeArr[l]) {
                    stepArr[l + 1] = stepArr[l] + step_;
                    stepArr[l + 1] > max_ && (stepArr[l + 1] = max_);
                }
                else {
                    stepArr[l + 1] = stepArr[l];
                }
                l++;
            }
        }
    }
    highArr[n_] > highArr[0] || lowArr[n_] > lowArr[0] ? up(n_) : down(n_);
    return {
        data: result,
        direction: directionArr
    };
}
/**
 *
 * @param arr_
 * @param n_
 * @param step_
 * @param max_
 * @returns
 */
function default_1(arr_, customData_) {
    if (customData_ === void 0) { customData_ = { v0: 1, v1: 1, v2: 1 }; }
    var result = [];
    var v0 = customData_.v0, v1 = customData_.v1, v2 = customData_.v2;
    var sarArr = calc(arr_, v0, v1, v2);
    for (var i = 0, l = arr_.length; i < l; i++) {
        result[i] = {
            ignore_minmax: sarArr.direction[i],
            sar: sarArr.data[i]
        };
    }
    return result;
}
exports.default = default_1;


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var FinUtil_1 = __importDefault(__webpack_require__(2));
var MA_1 = __importDefault(__webpack_require__(3));
/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  BBIBOLL = (MA(CLOSE, 3) + MA(CLOSE, 6) + MA(CLOSE, 12) + MA(CLOSE, 24)) / 4
  UPR = BBIBOLL + M * STD(BBIBOLL, N)
  DWN = BBIBOLL - M * STD(BBIBOLL, N)
 */
function default_1(arr_, customData_) {
    if (customData_ === void 0) { customData_ = { prop: 'close', v0: 11, v1: 6 }; }
    var result = [];
    var prop = customData_.prop, N = customData_.v0, M = customData_.v1;
    var closeArr = FinUtil_1.default.genArrByProp(arr_, prop);
    // BBIBOLL:(MA(CLOSE,3)+MA(CLOSE,6)+MA(CLOSE,12)+MA(CLOSE,24))/4:
    var bbiArr = FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(MA_1.default(closeArr, 3), MA_1.default(closeArr, 6), '+'), MA_1.default(closeArr, 12), '+'), MA_1.default(closeArr, 24), '+'), 4, '/');
    // UPR:BBIBOLL+M*STD(BBIBOLL,N):
    var uprArr = FinUtil_1.default.arrOp(bbiArr, FinUtil_1.default.arrOp(FinUtil_1.default.std(bbiArr, N), M, '*'), '+');
    // DWN:BBIBOLL-M*STD(BBIBOLL,N):
    var dwnArr = FinUtil_1.default.arrOp(bbiArr, FinUtil_1.default.arrOp(FinUtil_1.default.std(bbiArr, N), M, '*'), '-');
    for (var i = 0, l = arr_.length; i < l; i++) {
        result[i] = {
            bbiboll: bbiArr[i],
            upr: uprArr[i],
            dwn: dwnArr[i]
        };
    }
    return result;
}
exports.default = default_1;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var FinUtil_1 = __importDefault(__webpack_require__(2));
/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  RSV = (CLOSE - LLV(LOW, P1)) / (HHV(HIGH, P1) - LLV(LOW, P1)) * 100
  K = SMA(RSV, P2, 1)
  D = SMA(K, P3, 1)
  J = 3 * K - 2 * D
 */
function default_1(arr_, customData_) {
    if (customData_ === void 0) { customData_ = { P1: 9, P2: 3, P3: 3 }; }
    var result = [];
    var P1 = customData_.P1, P2 = customData_.P2, P3 = customData_.P3;
    var closeArr = FinUtil_1.default.genArrByProp(arr_, 'close');
    var lowArr = FinUtil_1.default.genArrByProp(arr_, 'low');
    var highArr = FinUtil_1.default.genArrByProp(arr_, 'high');
    // RSV = (CLOSE - LLV(LOW, P1)) / (HHV(HIGH, P1) - LLV(LOW, P1)) * 100:
    var rsvArr = FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(closeArr, FinUtil_1.default.llv(lowArr, P1), '-'), FinUtil_1.default.arrOp(FinUtil_1.default.hhv(highArr, P1), FinUtil_1.default.llv(lowArr, P1), '-'), '/'), 100, '*');
    var kArr = FinUtil_1.default.sma(rsvArr, P2, 1);
    var dArr = FinUtil_1.default.sma(kArr, P3, 1);
    var jArr = FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(kArr, 3, '*'), FinUtil_1.default.arrOp(dArr, 2, '*'), '-');
    for (var i = 0, l = arr_.length; i < l; i++) {
        result[i] = {
            k: kArr[i],
            d: dArr[i],
            j: jArr[i]
        };
    }
    return result;
}
exports.default = default_1;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var FinUtil_1 = __importDefault(__webpack_require__(2));
var EMA_1 = __importDefault(__webpack_require__(5));
/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  MTR = EXPMEMA(MAX(MAX(HIGH - LOW, ABS(HIGH - REF(CLOSE, 1))), ABS(REF(CLOSE, 1) - LOW)), N)
  HD = HIGH - REF(HIGH, 1)
  LD = REF(LOW, 1) - LOW
  DMP = EXPMEMA(IF(HD > 0 && HD > LD, HD, 0), N)
  DMM = EXPMEMA(IF(LD > 0 && LD > HD, LD, 0), N)
  PDI = DMP * 100 / MTR
  MDI = DMM * 100 / MTR
  ADX = EXPMEMA(ABS(MDI - PDI) / (MDI + PDI) * 100, M)
  ADXR = EXPMEMA(ADX, M)
 */
function default_1(arr_, customData_) {
    if (customData_ === void 0) { customData_ = { v0: 14, v1: 6 }; }
    var result = [];
    var N = customData_.v0, M = customData_.v1;
    var closeArr = FinUtil_1.default.genArrByProp(arr_, 'close');
    var highArr = FinUtil_1.default.genArrByProp(arr_, 'high');
    var lowArr = FinUtil_1.default.genArrByProp(arr_, 'low');
    // MTR=EXPMEMA(MAX(MAX(HIGH-LOW, ABS(HIGH-REF(CLOSE,1))), ABS(REF(CLOSE,1)-LOW)),N):
    var mtrArr = EMA_1.default(FinUtil_1.default.max(FinUtil_1.default.max(FinUtil_1.default.arrOp(highArr, lowArr, '-'), FinUtil_1.default.abs(FinUtil_1.default.arrOp(highArr, FinUtil_1.default.ref(closeArr, 1), '-'))), FinUtil_1.default.abs(FinUtil_1.default.arrOp(FinUtil_1.default.ref(closeArr, 1), lowArr, '-'))), N);
    var hdArr = FinUtil_1.default.arrOp(highArr, FinUtil_1.default.ref(highArr, 1), '-');
    var ldArr = FinUtil_1.default.arrOp(FinUtil_1.default.ref(lowArr, 1), lowArr, '-');
    var dmpArr = [];
    var dmmArr = [];
    for (var hd = void 0, ld = void 0, i = 0, l = hdArr.length; i < l; i++) {
        hd = hdArr[i];
        ld = ldArr[i];
        dmpArr.push(hd > 0 && hd > ld ? hd : 0);
        dmmArr.push(ld > 0 && ld > hd ? ld : 0);
    }
    dmpArr = EMA_1.default(dmpArr, N);
    dmmArr = EMA_1.default(dmmArr, N);
    var pdiArr = FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(dmpArr, 100, '*'), mtrArr, '/');
    var mdiArr = FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(dmmArr, 100, '*'), mtrArr, '/');
    // ADX=EXPMEMA(ABS(MDI-PDI)/(MDI+PDI)*100,M):
    var adxArr = EMA_1.default(FinUtil_1.default.arrOp(FinUtil_1.default.arrOp(FinUtil_1.default.abs(FinUtil_1.default.arrOp(mdiArr, pdiArr, '-')), FinUtil_1.default.arrOp(mdiArr, pdiArr, '+'), '/'), 100, '*'), M);
    var adxrArr = EMA_1.default(adxArr, M);
    for (var i = 0, l = arr_.length; i < l; i++) {
        result[i] = {
            pdi: pdiArr[i],
            mdi: mdiArr[i],
            adx: adxArr[i],
            adxr: adxrArr[i]
        };
    }
    return result;
}
exports.default = default_1;


/***/ })
],
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(1));
/******/ }
]);