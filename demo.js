const finCalc = require('./src/FinCalc');

//演示数据：
let test_data = [];
for (let i = 0; i < 100; i+=5) {
  test_data.push(i);
}

//Moving Average (MA) 移动平均线：
const ma = finCalc.calcMA(test_data, 5);
console.log('original data:', test_data, '移动平均Moving Average(MA):', ma);