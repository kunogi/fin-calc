/* eslint-disable no-undef */
import FinUtil from "../../src/lib/util/FinUtil";

describe('FinUtil', () => {
  it('avg 计算数组平均数', () => {
    const arr = [];
    for (let i = 0; i < 99; i++) {
      arr.push(Math.random() * 100 - 50);
    }

    let avg = arr.reduce((a, c) => a + c) / arr.length;
    let result = FinUtil.avg(arr);
    //expect(result).toBeCloseTo(avg);
    const FIX = 4;
    avg = avg.toFixed(FIX);
    result = result.toFixed(FIX);
    expect(result).toBe(avg);
  })

  it('op 数字操作', () => {
    const num1 = Math.random() * 987654;
    const num2 = Math.random() * 987654;
    const zero = 0;
    expect(FinUtil.op('+', num1, num2)).toBe(num1 + num2);
    expect(FinUtil.op('-', num1, num2)).toBe(num1 - num2);
    expect(FinUtil.op('*', num1, num2)).toBe(num1 * num2);
    expect(FinUtil.op('/', num1, num2)).toBe(num1 / num2);

    expect(FinUtil.op('/', num1, zero)).toBeNaN();

    expect(FinUtil.op('others', num1, num2)).toBeNaN();
  })

  describe('arrOp', () => {
    it('arrOp 操作数组与数组', () => {
      const arr1 = [];
      const arr2 = [];
      for (let i = 0; i < 1; i++) {
        arr1.push(Math.random() * 1e5);
        arr2.push(Math.random() * 1e5);
      }

      const expected_plus = [];
      const expected_minus = [];
      const expected_multi = [];
      const expected_div = [];
      for (let i = 0; i < arr1.length; i++) {
        expected_plus.push(Number(arr1[i] + arr2[i]));
        expected_minus.push(Number(arr1[i] - arr2[i]));
        expected_multi.push(Number(arr1[i] * arr2[i]));
        expected_div.push(Number(arr1[i] / arr2[i]));
      }

      let received_plus = FinUtil.arrOp(arr1, arr2, '+');
      let received_minus = FinUtil.arrOp(arr1, arr2, '-');
      let received_multi = FinUtil.arrOp(arr1, arr2, '*');
      let received_div = FinUtil.arrOp(arr1, arr2, '/');

      expect(received_plus).toEqual(expected_plus);
      expect(received_minus).toEqual(expected_minus);
      expect(received_multi).toEqual(expected_multi);
      expect(received_div).toEqual(expected_div);

      arr1.push('not_a_number_test');
      arr2.push('not_a_number_test');
      expected_plus.push(NaN);
      expected_minus.push(NaN);
      expected_multi.push(NaN);
      expected_div.push(NaN);
      arr2.push('make arr2.length longer than arr1');
      expected_plus.push(NaN);
      expected_minus.push(NaN);
      expected_multi.push(NaN);
      expected_div.push(NaN);

      received_plus = FinUtil.arrOp(arr1, arr2, '+');
      received_minus = FinUtil.arrOp(arr1, arr2, '-');
      received_multi = FinUtil.arrOp(arr1, arr2, '*');
      received_div = FinUtil.arrOp(arr1, arr2, '/');

      expect(received_plus).toEqual(expected_plus);
      expect(received_minus).toEqual(expected_minus);
      expect(received_multi).toEqual(expected_multi);
      expect(received_div).toEqual(expected_div);
    })

    it('arrOp 操作数组与数字', () => {
      const arr1 = []; const num2 = 678;
      for (let i = 0; i < 9; i++) {
        if (i === 0) {
          arr1.push(undefined);
        } else {
          arr1.push(Math.random() * 1e5);
        }
      }

      const expected_plus = [];
      const expected_minus = [];
      const expected_multi = [];
      const expected_div = [];
      for (let i = 0; i < arr1.length; i++) {
        expected_plus.push(Number(arr1[i] + num2));
        expected_minus.push(Number(arr1[i] - num2));
        expected_multi.push(Number(arr1[i] * num2));
        expected_div.push(Number(arr1[i] / num2));
      }

      const received_plus = FinUtil.arrOp(arr1, num2, '+');
      const received_minus = FinUtil.arrOp(arr1, num2, '-');
      const received_multi = FinUtil.arrOp(arr1, num2, '*');
      const received_div = FinUtil.arrOp(arr1, num2, '/');

      expect(received_plus).toEqual(expected_plus);
      expect(received_minus).toEqual(expected_minus);
      expect(received_multi).toEqual(expected_multi);
      expect(received_div).toEqual(expected_div);
    })

    it('arrOp 操作数组与其他', () => {
      const arr1 = []; const others2 = null;
      expect(() => {
        FinUtil.arrOp(arr1, others2, '+');
      }).toThrow('argument of arrOp()')
    })
  })

  it('abs 绝对值', () => {
    const expected = [];
    const oriArr = [];
    for (let i = 0; i < 99; i++) {
      const oriNum = Math.random() * 100 - 50;
      oriArr.push(oriNum);
      expected.push(Math.abs(oriNum));
    }
    expect(FinUtil.abs(oriArr)).toEqual(expected);
  })
})