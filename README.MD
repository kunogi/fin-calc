# calculator lib for finance related indicators
## Moving Average (MA)
## EMA
## SAR
## MACD
```
DIF = EMA(CLOSE, SHORT) - EMA(CLOSE, LONG)
DEA = EMA(DIF, MID)
MACD= (DIF - DEA) *2
```

## KDJ
## RSI
## BOLL
```
MID=MA(CLOSE,PERIOD)
UPPER=MID + TIMES*STD(CLOSE,PERIOD)
LOWER=MID - TIMES*STD(CLOSE,PERIOD)
```
## WR
## DMI
## BBIBOLL
## ROC
## OBV
## WVAD
## CCI
## TRIX
## DMA
```
DIF = MA(CLOSE,SHORT) - MA(CLOSE,LONG)
DMA = MA(DIF,M)
```
## BIAS
## ASI
## VR
## EMV





