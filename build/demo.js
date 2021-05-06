/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var FinCalc = /** @class */ (function () {
    function FinCalc() {
    }
    /**
     * @param {number[]} arr_ original data array
     * @param {number} days_ days
     * @param {boolean} calcAnyDays_ calculate or not based on not enough days
     * @returns {number[]} moving average array
     */
    FinCalc.prototype.calcMA = function (arr_, days_, calcAnyDays_) {
        if (calcAnyDays_ === void 0) { calcAnyDays_ = true; }
        var result = [];
        for (var i = 0, sum = 0, ma = void 0, l = arr_.length; i < l; i++) {
            //add new incoming value to sum:
            arr_[i] && (sum += arr_[i]);
            if (i >= days_ - 1) {
                ma = sum / days_;
                //remove the oldest value from sum, to keep the total count
                arr_[i - days_ + 1] && (sum -= arr_[i - days_ + 1]);
            }
            else {
                //not enough days:
                ma = calcAnyDays_ ? sum / (i + 1) : null;
            }
            result.push(ma);
        }
        return result;
    };
    ;
    return FinCalc;
}());
exports.default = new FinCalc();


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_FinCalc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


//generate some demo datas:
let test_data = [];
for (let i = 0; i < 100; i += 5) test_data.push(i);

window.addEventListener('load', () => {
  testMA();
})

function testMA() {
  const container = getContainer();

  //Moving Average (MA)：
  const ma = _src_FinCalc__WEBPACK_IMPORTED_MODULE_0__.default.calcMA(test_data, 5);
  console.log('original data:', test_data, 'Moving Average(MA):', ma);
  container.innerHTML = ma;
}

function getContainer() {
  const root = document.getElementById('root');
  const container = document.createElement('div');
  root.appendChild(container);
  return container;
}
})();

/******/ })()
;