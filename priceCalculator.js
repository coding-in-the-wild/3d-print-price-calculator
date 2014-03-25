var pricing = require('./pricing.js')

module.exports = function calculator(printOptions,volume) {
	// make sure printer type is defined in pricing object
	if (typeof pricing[printOptions.printer] === 'undefined') {
		throw new Error('invalid printer type: ' + printOptions.printer)
	}

	// just to make things simpler
	var printerPricing = pricing[printOptions.printer]
	
	// make sure material and color is defined in pricing object
	if (typeof printerPricing[printOptions.material] === 'undefined') {
		throw new Error('invalid print material for printer type: ' + printOptions.material)
	} else if (typeof printerPricing[printOptions.material][printOptions.color] === 'undefined') {
		throw new Error('invalid print color for material and printer type: ' + printOptions.color)
	}

	// make sure layer resolution discount is defined in pricing object
	if (typeof printerPricing.layerResolutionDiscount === 'undefined') {
		throw new Error('undefined layer resolution discount: ' + printerPricing.layerResolutionDiscount)
	} else if (typeof printerPricing.layerResolutionDiscount[printOptions.layerResolution] === 'undefined') {
		throw new Error('invalid layer resolution: ' + printOptions.layerResolution)
	}

	// make sure infillDiscountThreshhold is a number and is between 0 and 100
	if (isNaN(printerPricing.infillDiscountThreshhold) || printerPricing.infillDiscountThreshhold < 0 || printerPricing.infillDiscountThreshhold > 100) {
		throw new Error('invalid infill discount threshhold: ' + printerPricing.infillDiscountThreshhold)
	}

	// make sure all necessary variables are numbers
	if (isNaN(printerPricing[printOptions.material][printOptions.color])) {
		throw new Error('price for printer, material, and color is NaN: ' + printerPricing[printOptions.material][printOptions.color])
	} else if (isNaN(printerPricing.infillDiscount)) {
		throw new Error('infill discount is NaN: ' + printerPricing.infillDiscount)
	} else if (isNaN(printerPricing.layerResolutionDiscount[printOptions.layerResolution])) {
		throw new Error('layer resolution discount is NaN: ' + printerPricing.layerResolutionDiscount[printOptions.layerResolution])
	} else if (isNaN(printerPricing.basePrice)) {
		throw new Error('minimum price is NaN: ' + printerPricing.basePrice)
	}

	// make sure volume is a number greater than zero
	if (isNaN(volume)) {
		throw new Error('volume is NaN: ' + volume)
	} else if (volume <= 0) {
		throw new Error('volume is not greater than zero: ' + volume)
	}


	var pricePerCC = printerPricing[printOptions.material][printOptions.color]
	var infillDiscount = (printOptions.percentInfill <= printerPricing.infillDiscountThreshhold ? 
		printerPricing.infillDiscount : 0)
	var layerResolutionDiscount = printerPricing.layerResolutionDiscount[printOptions.layerResolution]
	var totalDiscount = infillDiscount + layerResolutionDiscount

	// make sure discount applied is not greater than 95%
	if (totalDiscount > 0.95) {
		throw new Error('total discount is greater than 95%: ' + totalDiscount)
	}

	return ((volume * pricePerCC * (1 - totalDiscount) / 1000) + printerPricing.basePrice)
}
