
const Shot2IsObject = require('./plants');
const CannonIsObject = require('./plants');
const OilIsObject = require('./plants');
const ShotIsObject = require('./plants');


test('Shot2IsObject with a number', () => {
    const mock = jest.fn();
    Shot2IsObject(mock);
    expect(mock).toBeCalledWith(expect.any(Object));
  });
  test('CannonIsObject with a number', () => {
    const mock = jest.fn();
    CannonIsObject(mock);
    expect(mock).toBeCalledWith(expect.any(Object));
  });
  test('OilIsObject with a number', () => {
    const mock = jest.fn();
    OilIsObject(mock);
    expect(mock).toBeCalledWith(expect.any(Object));
  });
  test('ShotIsObject with a number', () => {
    const mock = jest.fn();
    ShotIsObject(mock);
    expect(mock).toBeCalledWith(expect.any(Object));
  });

