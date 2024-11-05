// convertHandler.js - Enhanced version for better handling of invalid inputs

function ConvertHandler() {
  this.getNum = function (input) {
    const result = input.match(/[\.\d\/]+/);
    if (!result) return 1;

    const numString = result[0];
    if (numString.includes('/')) {
      const fractions = numString.split('/');
      if (fractions.length !== 2) return "invalid number";
      const [numerator, denominator] = fractions;
      if (isNaN(numerator) || isNaN(denominator) || denominator == 0) return "invalid number";
      return parseFloat(numerator) / parseFloat(denominator);
    }

    if (isNaN(numString)) return "invalid number";
    return parseFloat(numString);
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const result = input.match(unitRegex);
    if (!result) return "invalid unit";

    const unit = result[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (!validUnits.includes(unit)) return "invalid unit";

    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return unitMap[initUnit.toLowerCase()] || "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    const unitSpelling = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    return unitSpelling[unit.toLowerCase()] || "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      l: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592,
    };
    const lowerUnit = initUnit.toLowerCase();
    if (!conversionRates[lowerUnit]) {
      return NaN;
    }
    return parseFloat((initNum * conversionRates[lowerUnit]).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.handleConversion = function (input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);

    // Debugging statements to help identify issues
    console.log("Input:", input);
    console.log("Parsed Number:", initNum);
    console.log("Parsed Unit:", initUnit);

    // Check for both invalid number and unit
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return { error: "invalid number and unit" };
    }

    if (initNum === "invalid number") {
      return { error: "invalid number" };
    }

    if (initUnit === "invalid unit") {
      return { error: "invalid unit" };
    }

    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    if (returnUnit === "invalid unit") {
      return { error: "invalid unit" };
    }
    const conversionString = this.getString(initNum, initUnit, returnNum, returnUnit);

    console.log("Conversion Result:", {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: conversionString,
    });

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: conversionString,
    };
  };
}

module.exports = ConvertHandler;
