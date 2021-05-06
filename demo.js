import FinCalc from './src/FinCalc';

//generate some demo datas:
let test_data = [];
for (let i = 0; i < 100; i += 5) test_data.push(i);

function getContainer() {
  const root = document.getElementById('root');
  const container = document.createElement('p');
  root.appendChild(container);
  return container;
}

window.addEventListener('load', () => {
  showTestData();
  testMA();
  testEMA();
  testSMA();
})

function showTestData() {
  const container = getContainer();
  console.log('original data:', test_data);
  container.innerHTML = ['original data:', test_data].join('<br/>');
}

function testMA() {
  const container = getContainer();
  const ma = FinCalc.ma(test_data, 5);
  console.log('Moving Average(MA):', ma);
  container.innerHTML = ['MA:', ma].join('<br/>');
}

function testEMA(){
  const container=getContainer();
  const ema=FinCalc.ema(test_data, 5);
  console.log('Exponential Moving Average(EMA):',ema);
  container.innerHTML=['EMA:',ema].join('<br/>');
}

function testSMA(){
  const container=getContainer();
  const sma=FinCalc.sma(test_data, 5,9);
  console.log('Simple Moving Average(SMA):',sma);
  container.innerHTML=['SMA:',sma].join('<br/>');
}