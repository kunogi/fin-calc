const finCalc = require('./FinCalc');

let test_data = [];
for (let i = 0; i < 100; i+=5) {
  test_data.push(i);
}

const ma = finCalc.calcMA(test_data, 5);
console.log('original data:', test_data, '移动平均Moving Average(MA):', ma);