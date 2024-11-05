function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    // Regex to find numbers, including fractions
    const numberRegex = /^[\d\.\/]+/;
    const match = input.match(numberRegex);

    if (!match) {
      return 1; // Default to 1 if no number is provided
    }

    result = match[0];

    // Handle fractions
    if (result.includes('/')) {
      const nums = result.split('/');
      if (nums.length > 2) {
        return 'invalid number'; // More than one slash is invalid
      }
      result = parseFloat(nums[0]) / parseFloat(nums[1]);
    } else {
      result = parseFloat(result); // Parse float for decimals and whole numbers
    }

    if (isNaN(result)) {
      return 'invalid number';
    }

    return result;
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);

    if (!match) {
      return 'invalid unit';
    }

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unit = match[0].toLowerCase();

    if (unit === 'l') {
      return 'L'; // Handle 'L' as case-sensitive
    }

    if (validUnits.includes(unit)) {
      return unit;
    }

    return 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };

    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function (unit) {
    const spellOutMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };

    return spellOutMap[unit] || 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }

    return parseFloat(result.toFixed(5)); // Round to 5 decimal places
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.handleConversion = function(input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);

    // Check for both invalid number and unit
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    }

    if (initNum === 'invalid number') {
      return 'invalid number';
    }

    if (initUnit === 'invalid unit') {
      return 'invalid unit';
    }

    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    const conversionString = this.getString(initNum, initUnit, returnNum, returnUnit);

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: conversionString
    };
  };
}

module.exports = ConvertHandler;
