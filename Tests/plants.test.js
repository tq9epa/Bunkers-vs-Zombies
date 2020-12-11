
const Shot2IsObject = require('../sources/plants.js');
const CannonIsObject = require('../sources/plants.js');
const OilIsObject = require('../sources/plants.js');
const ShotIsObject = require('.../sources/plants.js');
const WalkerIsObject = require('.../sources/plants.js');



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
  test('ShotIsObject with a number', () => {
    const mock = jest.fn();
    WalkerIsObject(mock);
    expect(mock).toBeCalledWith(expect.any(Object));
  });
 
