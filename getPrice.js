var xtend = require('xtend')
var priceCalculator = require('./priceCalculator.js')

module.exports = function getPrice(pricing,defaultPrintOptions,printOptions,admeshOutput) {
	var printOptions = xtend(defaultPrintOptions,printOptions)

	try{
		//make sure percentages are numbers and between 0 and 100
		if(!(printOptions.percentInfill >= 0) || !(printOptions.percentInfill <= 100) ||
			!(pricing.infillDiscountThreshhold >= 0) || !(pricing.infillDiscountThreshhold <= 100)){
			return -1
		}

		if(printOptions.units == "mm"){
			var result = priceCalculator(pricing,printOptions,admeshOutput.volume)
			return (isNaN(result) ? -1 : result)
		} else if(printOptions.units == "in"){
			var result = priceCalculator(pricing,printOptions,admeshOutput.volume * 16387.064)
			return (isNaN(result) ? -1 : result)
		} else {
			return -1
		}
	}
	catch(err) {
		return -1
	}
}