var test = require('tap').test
var getPrice = require('../getPrice.js')

var admeshOutput = {
	volume: 10000
}

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

test("getPrice module returns a function", function(t){
	t.equal(typeof getPrice, "function")
	t.end()
})

test("printOptions returns price for defaultPrintOptions when empty or partially empty", function(t){
	t.equal(Math.round(100*getPrice(pricing,defaultPrintOptions,{},admeshOutput)),735)
	t.equal(Math.round(100*getPrice(pricing,defaultPrintOptions,{material:'NYL',color:'natural'},admeshOutput)),840)
	t.end()
})

test("using percentInfill out of range returns error", function(t){
	t.equal(getPrice(pricing,defaultPrintOptions,{percentInfill:120},admeshOutput),-1)
	t.equal(getPrice(pricing,defaultPrintOptions,{percentInfill:-10},admeshOutput),-1)
	t.end()
})

test("using method, material, units, or layerResolution not in pricing returns error", function(t){
	t.equal(getPrice(pricing,defaultPrintOptions,{method:'SLS'},admeshOutput),-1)
	t.equal(getPrice(pricing,defaultPrintOptions,{material:'PLA'},admeshOutput),-1)
	t.equal(getPrice(pricing,defaultPrintOptions,{color:'rainbow'},admeshOutput),-1)
	t.equal(getPrice(pricing,defaultPrintOptions,{layerResolution:0.5},admeshOutput),-1)
	t.end()
})

test("empty or partial pricing object returns error", function(t){
	t.equal(getPrice({},defaultPrintOptions,{},admeshOutput),-1)
	t.equal(getPrice({infillDiscount:0.2,infillDiscountThreshhold:50,layerResolutionDiscount:{'0.3':0.1},minimumPrice:5},defaultPrintOptions,{},admeshOutput),-1)
	t.equal(getPrice({FFF:{ABS:{white:1.05}},infillDiscountThreshhold:50,layerResolutionDiscount:{'0.3':0.1},minimumPrice:5},defaultPrintOptions,{},admeshOutput),-1)
	t.equal(getPrice({FFF:{ABS:{white:1.05}},infillDiscount:0.2,layerResolutionDiscount:{'0.3':0.1},minimumPrice:5},defaultPrintOptions,{},admeshOutput),-1)
	t.equal(getPrice({FFF:{ABS:{white:1.05}},infillDiscount:0.2,infillDiscountThreshhold:50,minimumPrice:5},defaultPrintOptions,{},admeshOutput),-1)
	t.equal(getPrice({FFF:{ABS:{white:1.05}},infillDiscount:0.2,infillDiscountThreshhold:50,layerResolutionDiscount:{'0.3':0.1}},defaultPrintOptions,{},admeshOutput),-1)
	t.end()
})

test("empty admeshOutput returns error", function(t){
	t.equal(getPrice(pricing,defaultPrintOptions,{},{}),-1)
	t.end()
})

test("price is right", function(t){
	t.equal(Math.round(100*getPrice(pricing,defaultPrintOptions,{},admeshOutput)),735)
	t.end()
})

test("price is right with units in inches", function(t){
	t.equal(Math.round(100*getPrice(pricing,defaultPrintOptions,{units:'in'},admeshOutput)),12044492)
	t.end()
})

test("returns error for units in anything other than 'mm' or 'in'", function(t){
	t.equal(getPrice(pricing,defaultPrintOptions,{units:'fake units'},admeshOutput),-1)
	t.end()
})









