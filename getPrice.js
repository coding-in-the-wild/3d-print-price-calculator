var xtend = require('xtend')
var priceCalculator = require('./priceCalculator.js')
var defaultPrintOptions = require('./defaultPrintOptions.js')

module.exports = function getPrice(printOptions,admeshOutput) {
	var printOptions = xtend(defaultPrintOptions,printOptions)

	//make sure percentages are numbers and between 0 and 100
	if (isNaN(printOptions.percentInfill) || printOptions.percentInfill < 0 || printOptions.percentInfill > 100){
		throw new Error('invalid percent infill: ' + printOptions.percentInfill)
	}

	//make sure admeshOutput has volume
	if (typeof admeshOutput.volume === 'undefined') {
		throw new Error('undefined admesh volume: ' + admeshOutput.volume)
	}

	if (printOptions.units == "mm"){
		return priceCalculator(printOptions,admeshOutput.volume)
	} else if (printOptions.units == "in"){
		return priceCalculator(printOptions,admeshOutput.volume * 16387.064)
	} else {
		throw new Error('invalid print option units: ' + printOptions.units)
	}
}
