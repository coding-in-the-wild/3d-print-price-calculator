var test = require('tap').test
var priceCalculator = require('../priceCalculator.js')
var defaultPrintOptions = require('../defaultPrintOptions.js')
var pricing = require('../pricing.js')


var volume = 10000

test("returns a function", function (t) {
	t.equal(typeof priceCalculator, 'function')
	t.end()
})

test("returns number", function (t){
	t.equal(typeof priceCalculator(defaultPrintOptions,volume), 'number')
	t.end()
})

test("price is right", function (t) {
	//should equal ((volume * pricePerCC * (1 - infillDiscount - layerResolutionDiscount) / 1000)
	//				+ printerPricing.basePrice)
	t.equal(Math.round(100*priceCalculator(defaultPrintOptions,volume)),1025)
	t.end()
})

test("price is right with different options", function(t){
	//should equal ((volume * pricePerCC * (1 - infillDiscount - layerResolutionDiscount) / 1000)
	//			 	+ printerPricing.basePrice)
	t.equal(Math.round(100*priceCalculator({
		printer:'FFF',
		material:'ABS',
		color:'silver',
		layerResolution:0.2,
		percentInfill:60},volume)),1260)
	t.end()
})

test("tiny object has minimum price", function (t){
	t.equal(Math.round(100*priceCalculator(defaultPrintOptions,100)),505)
	t.end()
})
