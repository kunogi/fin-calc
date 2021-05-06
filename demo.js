import FinIndicator from './src/FinIndicator';
import FinUtil from './src/FinUtil';
import testdata from './testdata';

function getContainer() {
  const root = document.getElementById('root');
  const container = document.createElement('p');
  root.appendChild(container);
  return container;
}

window.addEventListener('load', () => {
  showTestData();
  testMA();
  testMACD();
  testOBV();
})

function showTestData() {
  console.log('original data:', testdata);
  const container = getContainer();
  //container.innerHTML = ['original data:', JSON.stringify(testdata)].join('<br/>');
  container.innerHTML = "original data example (see console for more): <br/>[{'open':2, 'high': 4, 'low': 1, 'close':3, 'volume':999, 'date':'2019-10-11T00:00:00.000Z'}, ...]";
}

function testMA() {
  const prop = 'close';//or any other prop of the original data
  const data = FinUtil.genArrByProp(testdata, prop);
  const a = FinIndicator.ma(data, 5);
  console.log('Moving Average(MA) based on', prop, a);
  const container = getContainer();
  container.innerHTML = `MA based on ${prop}:<br/>${a.slice(0,9)}...`;
}

function testMACD() {
  const a = FinIndicator.macd(testdata);
  console.log('MACD',a);
  const container = getContainer();
  container.innerHTML = `MACD:<br/>${JSON.stringify(a.slice(0,9))}...`;
}

function testOBV() {
  const a = FinIndicator.obv(testdata);
  console.log('OBV',a);
  const container = getContainer();
  container.innerHTML = `OBV:<br/>${JSON.stringify(a.slice(0,9))}...`;
}