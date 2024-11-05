const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  
  // Test 1: Whole number input
  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  // Test 2: Decimal input
  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2kg'), 3.2);
  });

  // Test 3: Fractional input
  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  // Test 4: Fractional input with a decimal
  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
  });

  // Test 5: Double fraction error
  test('convertHandler should correctly return an error on a double-fraction (3/2/3)', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  // Test 6: Default to 1 when no number input is provided
  test('convertHandler should correctly default to a numerical input of 1 when no number is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  // Test 7: Valid unit inputs
  test('convertHandler should correctly read each valid input unit', function() {
    const inputUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(function(unit) {
      assert.equal(convertHandler.getUnit('10' + unit), unit);
    });
  });

  // Test 8: Invalid unit inputs
  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('10invalidUnit'), 'invalid unit');
  });

  // Test 9: Correct return unit for each valid input unit
  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const returnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    inputUnits.forEach(function(unit, i) {
      assert.equal(convertHandler.getReturnUnit(unit), returnUnits[i]);
    });
  });

  // Test 10: Correct spelled-out string unit
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const spelledOutUnits = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    inputUnits.forEach(function(unit, i) {
      assert.equal(convertHandler.spellOutUnit(unit), spelledOutUnits[i]);
    });
  });

  // Test 11: gal to L conversion
  test('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  // Test 12: L to gal conversion
  test('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });

  // Test 13: mi to km conversion
  test('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  // Test 14: km to mi conversion
  test('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  // Test 15: lbs to kg conversion
  test('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
  });

  // Test 16: kg to lbs conversion
  test('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });
});
