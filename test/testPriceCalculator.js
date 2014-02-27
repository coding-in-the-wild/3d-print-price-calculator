var test = require('tap').test
var priceCalculator = require('../priceCalculator.js')

var defaultPrintOptions = {
	method: 'FFF',
	material: 'ABS',
	color: 'white',
	units: 'mm',
	layerResolution: 0.3,
	percentInfill: 25
}

var pricing = {
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
	},
	infillDiscount: 0.2,
	infillDiscountThreshhold: 50,
	layerResolutionDiscount: {
		'0.1': 0,
		'0.2': 0.05,
		'0.3': 0.1
	},
	minimumPrice: 5
}

var volume = 10000

test("returns a function", function (t) {
	t.equal(typeof priceCalculator, 'function')
	t.end()
})

test("returns number", function (t){
	t.equal(typeof priceCalculator(pricing,defaultPrintOptions,volume), 'number')
	t.end()
})

test("price is right", function (t) {
	t.equal(Math.round(100*priceCalculator(pricing,defaultPrintOptions,volume)),735)
	t.end()
})

test("price is right with different options", function(t){
	t.equal(Math.round(100*priceCalculator(pricing,{
		method:'FFF',
		material:'NYL',
		color:'natural',
		layerResolution:0.2,
		percentInfill:60},volume)),1140)
	t.end()
})

test("price is right with different price", function(t){
	t.equal(Math.round(100*priceCalculator({
		FFF: {
			ABS: {
				white: 20.50,
			}
		},
		infillDiscount: 0.2,
		infillDiscountThreshhold: 50,
		layerResolutionDiscount: {
			'0.1': 0,
			'0.2': 0.05,
			'0.3': 0.1
		},
		minimumPrice: 5
		},defaultPrintOptions,volume)),14350)
	t.end()
})

test("tiny object has minimum price", function (t){
	t.equal(Math.round(100*priceCalculator(pricing,defaultPrintOptions,100)),500)
	t.end()
})

console.log(priceCalculator({},defaultPrintOptions,volume))
