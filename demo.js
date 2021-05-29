import testdata from './testdata.json';

import FinUtil from './src/util/FinUtil';
import MA from './src/MA';
import MACD from './src/MACD';
import SAR from './src/SAR';
import BBIBOLL from './src/BBIBOLL';
import KDJ from './src/KDJ';
import EMV from './src/EMV';
import BOLL from './src/BOLL';

function getContainer() {
  const root = document.getElementById('root');
  const container = document.createElement('p');
  root.appendChild(container);
  return container;
}
function showTestData() {
  console.log('original data:', testdata);
  const container = getContainer();
  //container.innerHTML = ['original data:', JSON.stringify(testdata)].join('<br/>');
  container.innerHTML = "original data example (see console for more): <br/>[{'open':2, 'high': 4, 'low': 1, 'close':3, 'volume':999, 'date':'2019-10-11T00:00:00.000Z'}, ...]";
}
function test(name_,data_){
  data_=data_.reverse();//show newer datas first
  console.log(name_,data_);
  const container = getContainer();
  container.innerHTML = `${name_}:<br/>${JSON.stringify(data_.slice(0,9))}...`;
}
window.addEventListener('load', () => {
  showTestData();
  testMA();
  test('MACD',MACD(testdata));
  test('SAR',SAR(testdata));
  test('BBIBOLL',BBIBOLL(testdata));
  test('KDJ',KDJ(testdata));
  test('EMV',EMV(testdata));
  BOLL()
})

function testMA() {
  const prop = 'close';//or any other prop of the original data
  const data = FinUtil.genArrByProp(testdata, prop);
  const a = MA(data, 5);
  console.log('Moving Average(MA) based on', prop, a);
  const container = getContainer();
  container.innerHTML = `MA based on ${prop}:<br/>${a.slice(0,9)}...`;
}