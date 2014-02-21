var defaults = require('./defaults')
var xtend = require('xtend')

function printPriceCalculator(printOptions,admeshOutput) {
	var printOptions = xtend(defaults,printOptions)
	var materialPrices = {
		FFF: {
			ABS: {
				white: 1.05,
				black: 1.05,
				grey: 1.05,
				navyBlue: 1.05
			},
			NYL: {
				natural: 1.20
			}
		}
	}
	var pricePerCC = materialPrices[printOptions.method][printOptions.material][printOptions.color]
	//layer discount = 0% for 0.1mm, 5% for 0.2mm, 10% for 0.3mm
	var layerDiscount = (printOptions.layerResolution == 0.3 ? 0.1
		: printOptions.layerResolution == 0.2 ? 0.05
		: 0)
	//infill discount = from 0% to 20%, for 100% to 0% infill
	var infillDiscount = (100 - printOptions.percentInfill) * 0.002

	pricePerCC = pricePerCC * (1 - infillDiscount - layerDiscount)

	//volume * price per cubic centimeter * conversion factor to cm^3 from mm^3 or in^3
	//or $5, whichever is greater
	return Math.max(5,admeshOutput.volume * pricePerCC * (printOptions.units == 'mm' ? 0.001 : 16.387064))
}